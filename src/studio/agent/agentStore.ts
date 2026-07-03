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
  sessions: AgentSession[]
  activeSessionId: string | null
  sending: boolean
  newSession: () => void
  switchSession: (id: string) => void
  send: (text: string) => Promise<void>
  confirmOps: (messageId: string) => Promise<void>
  dismissOps: (messageId: string) => void
}

function msg(role: 'user' | 'assistant', content: string): AgentMessage {
  return { id: crypto.randomUUID(), role, content, createdAt: Date.now() }
}

const MAX_SESSIONS = 20

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
          try {
            const history = [...activeSession()!.messages]
              .slice(-12)
              .map((m) => ({ role: m.role, content: m.content }))
            const res = await agentChat({
              messages: history,
              canvas: canvasSnapshot(),
              selection: useStudioStore.getState().selectedNodeId
                ? [useStudioStore.getState().selectedNodeId as string]
                : [],
            })
            const reply: AgentMessage = {
              ...msg('assistant', res.reply),
              ...(res.ops.length ? { ops: res.ops, opsState: 'pending' as const } : {}),
            }
            patchSession(session.id, (s) => ({ ...s, messages: [...s.messages, reply] }))
            // 自动执行模式：直接执行并写回结果
            if (res.ops.length && get().mode === 'auto') {
              await get().confirmOps(reply.id)
            }
          } catch (err) {
            const emsg = err instanceof Error ? err.message : String(err)
            patchSession(session.id, (s) => ({
              ...s,
              messages: [...s.messages, msg('assistant', `请求失败：${emsg}`)],
            }))
          } finally {
            set({ sending: false })
          }
        },

        confirmOps: async (messageId) => {
          const session = activeSession()
          if (!session) return
          const message = session.messages.find((m) => m.id === messageId)
          if (!message?.ops || message.opsState === 'executed') return
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
          sessions: s.sessions.slice(0, MAX_SESSIONS),
          activeSessionId: s.activeSessionId,
        }) as unknown as AgentState,
    },
  ),
)
