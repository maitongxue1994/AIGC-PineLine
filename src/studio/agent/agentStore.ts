import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { agentChat } from '../api'
import { canvasSnapshot, executeOps } from './executeOps'
import { useStudioStore } from '../store'
import type { AgentMessage, AgentSession } from './types'

type AgentState = {
  open: boolean
  setOpen: (v: boolean) => void
  toggle: () => void
  /** 执行模式：手动确认（默认）/ 自动执行 */
  mode: 'manual' | 'auto'
  setMode: (m: 'manual' | 'auto') => void
  /** 聊天模型（TEXT_MODELS 的 id）：minimax 系走 MiniMax，doubao-* 走方舟 */
  model: string
  setModel: (m: string) => void
  sessions: AgentSession[]
  activeSessionId: string | null
  sending: boolean
  newSession: () => void
  switchSession: (id: string) => void
  send: (text: string) => Promise<void>
  /** 中止本次发送（发送按钮在 sending 期变为停止按钮） */
  stop: () => void
  confirmOps: (messageId: string) => Promise<void>
  dismissOps: (messageId: string) => void
}

function msg(role: 'user' | 'assistant', content: string): AgentMessage {
  return { id: crypto.randomUUID(), role, content, createdAt: Date.now() }
}

const MAX_SESSIONS = 20

/** 当前在飞请求的中止器（模块级，不持久化） */
let sendAbort: AbortController | null = null

export const useAgentStore = create<AgentState>()(
  persist<AgentState>(
    (set, get) => {
      const activeSession = (): AgentSession | null => {
        const { sessions, activeSessionId } = get()
        return sessions.find((s) => s.id === activeSessionId) ?? null
      }

      const patchSession = (id: string, fn: (s: AgentSession) => AgentSession) =>
        set((st) => ({ sessions: st.sessions.map((s) => (s.id === id ? fn(s) : s)) }))

      return {
        open: false,
        setOpen: (v) => set({ open: v }),
        toggle: () => set((s) => ({ open: !s.open })),
        mode: 'manual',
        setMode: (m) => set({ mode: m }),
        model: 'minimax-m2.7',
        setModel: (m) => set({ model: m }),
        sessions: [],
        activeSessionId: null,
        sending: false,

        newSession: () => {
          const session: AgentSession = {
            id: crypto.randomUUID(),
            title: '新建对话',
            messages: [],
            createdAt: Date.now(),
          }
          set((st) => ({
            sessions: [session, ...st.sessions].slice(0, MAX_SESSIONS),
            activeSessionId: session.id,
          }))
        },

        switchSession: (id) => set({ activeSessionId: id }),

        send: async (text) => {
          const content = text.trim()
          if (!content || get().sending) return
          if (!activeSession()) get().newSession()
          const session = activeSession()!
          const userMsg = msg('user', content)
          patchSession(session.id, (s) => ({
            ...s,
            title: s.messages.length ? s.title : content.slice(0, 24),
            messages: [...s.messages, userMsg],
          }))
          set({ sending: true })
          sendAbort = new AbortController()
          try {
            // 执行结果回喂：assistant 的 reply 是执行**前**写好的同包文本，若不把
            // 真实执行结果带回历史，LLM 会一直以为「已执行」（用户实测：先说已
            // 执行 15 项、下一轮才发现画布没变化说抱歉重来）
            const history = [...activeSession()!.messages].slice(-12).map((m) => {
              let content = m.content
              if (m.role === 'assistant' && m.ops?.length) {
                if (m.opsState === 'executed' && m.result) {
                  content += `\n[系统备注·画布操作执行结果] ${m.result}`
                } else if (m.opsState === 'dismissed') {
                  content += `\n[系统备注] 用户放弃了这批画布操作，均未执行`
                } else if (m.opsState === 'pending') {
                  content += `\n[系统备注] 这批画布操作尚未执行（等待用户确认）`
                }
              }
              return { role: m.role, content }
            })
            const res = await agentChat(
              {
                messages: history,
                model: get().model,
                canvas: canvasSnapshot(),
                selection: useStudioStore.getState().selectedNodeId
                  ? [useStudioStore.getState().selectedNodeId as string]
                  : [],
              },
              sendAbort.signal,
            )
            const reply: AgentMessage = {
              ...msg('assistant', res.reply),
              ...(res.thinking ? { thinking: res.thinking } : {}),
              ...(res.ops.length
                ? {
                    ops: res.ops,
                    opsState: 'pending' as const,
                    // 记录 ops 归属项目：切换项目后这批操作不能再执行
                    projectId: useStudioStore.getState().currentProjectId,
                  }
                : {}),
            }
            patchSession(session.id, (s) => ({ ...s, messages: [...s.messages, reply] }))
            // 自动执行模式：直接执行并写回结果
            if (res.ops.length && get().mode === 'auto') {
              await get().confirmOps(reply.id)
            }
          } catch (err) {
            const aborted =
              sendAbort?.signal.aborted || (err instanceof DOMException && err.name === 'AbortError')
            patchSession(session.id, (s) => ({
              ...s,
              messages: [
                ...s.messages,
                msg(
                  'assistant',
                  aborted
                    ? '已停止本次请求。'
                    : `请求失败：${err instanceof Error ? err.message : String(err)}`,
                ),
              ],
            }))
          } finally {
            sendAbort = null
            set({ sending: false })
          }
        },

        stop: () => {
          sendAbort?.abort()
        },

        confirmOps: async (messageId) => {
          const session = activeSession()
          if (!session) return
          const message = session.messages.find((m) => m.id === messageId)
          if (!message?.ops || message.opsState === 'executed') return
          // 跨项目防护：ops 针对生成时的画布，切项目后 ref 失效且可能误改新项目
          if (message.projectId && message.projectId !== useStudioStore.getState().currentProjectId) {
            patchSession(session.id, (s) => ({
              ...s,
              messages: s.messages.map((m) =>
                m.id === messageId
                  ? {
                      ...m,
                      opsState: 'dismissed' as const,
                      result: '已取消：这批操作属于另一个项目的画布，请回到原项目或重新对话',
                    }
                  : m,
              ),
            }))
            return
          }
          // 清空画布是破坏性操作：无论手动/自动模式，画布非空时都必须经用户确认
          if (
            message.ops.some((o) => o.op === 'clear_canvas') &&
            useStudioStore.getState().nodes.length > 0
          ) {
            const okToClear = window.confirm(
              'Agent 将清空当前画布，再创建新管线（清空后可用 ⌘/Ctrl+Z 撤销）。确定继续？',
            )
            if (!okToClear) {
              patchSession(session.id, (s) => ({
                ...s,
                messages: s.messages.map((m) =>
                  m.id === messageId
                    ? { ...m, opsState: 'dismissed' as const, result: '已取消：用户不同意清空画布' }
                    : m,
                ),
              }))
              return
            }
          }
          const result = await executeOps(message.ops)
          patchSession(session.id, (s) => ({
            ...s,
            messages: s.messages.map((m) =>
              m.id === messageId ? { ...m, opsState: 'executed' as const, result } : m,
            ),
          }))
        },

        dismissOps: (messageId) => {
          const session = activeSession()
          if (!session) return
          patchSession(session.id, (s) => ({
            ...s,
            messages: s.messages.map((m) =>
              m.id === messageId ? { ...m, opsState: 'dismissed' as const } : m,
            ),
          }))
        },
      }
    },
    {
      name: 'pineline-agent-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) =>
        ({
          mode: s.mode,
          model: s.model,
          sessions: s.sessions.slice(0, MAX_SESSIONS),
          activeSessionId: s.activeSessionId,
        }) as unknown as AgentState,
    },
  ),
)
