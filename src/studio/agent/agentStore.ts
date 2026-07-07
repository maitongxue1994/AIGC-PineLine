import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { agentChat } from '../api'
import { listMemories } from '../assetdb'
import { canvasSnapshot, executeOps } from './executeOps'
import { guardedLocalStorage, useStudioStore } from '../store'
import type { AttachedImage } from './imageAttach'
import { completeSelection } from './types'
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
  /** 联网搜索开关（持久化）：豆包走方舟 Responses web_search，MiniMax 走 Tavily */
  webSearch: boolean
  setWebSearch: (v: boolean) => void
  /** 待发送图片附件（不持久化；full 喂模型 / thumb 回显） */
  pendingImages: AttachedImage[]
  addPendingImages: (items: AttachedImage[]) => void
  removePendingImage: (index: number) => void
  sessions: AgentSession[]
  activeSessionId: string | null
  sending: boolean
  newSession: () => void
  switchSession: (id: string) => void
  /** 返回是否已受理（false = 发送前被拦截，如 M2.7 带图，调用方据此保留输入框内容） */
  send: (text: string) => Promise<boolean>
  /** 中止本次发送（发送按钮在 sending 期变为停止按钮） */
  stop: () => void
  confirmOps: (messageId: string, selectedIndices?: number[]) => Promise<void>
  dismissOps: (messageId: string) => void
}

function msg(role: 'user' | 'assistant', content: string): AgentMessage {
  return { id: crypto.randomUUID(), role, content, createdAt: Date.now() }
}

const MAX_SESSIONS = 20
/** 单条消息最多附图数（与 Worker 校验一致） */
export const MAX_ATTACH_IMAGES = 4
/** 历史回带原图的总预算（Worker body 上限 10MB，留出文本余量） */
const IMG_HISTORY_BUDGET = 8 * 1024 * 1024

/** 当前在飞请求的中止器（模块级，不持久化） */
let sendAbort: AbortController | null = null
/** ops 执行阶段（confirmOps→executeOps）的中止器：停止按钮要能中断执行中的长任务 */
let opsAbort: AbortController | null = null

/**
 * 消息附图原图（模块级内存，不进 localStorage——原图 base64 会瞬间打爆 5MB 配额）。
 * 刷新后原图失效：历史回带时降级为文字备注，消息气泡仍有缩略图回显。
 */
const fullImagesByMsg = new Map<string, string[]>()

const dataUrlBytes = (u: string) => Math.ceil((u.length - (u.indexOf(',') + 1)) * 0.75)

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
        webSearch: false,
        setWebSearch: (v) => set({ webSearch: v }),
        pendingImages: [],
        addPendingImages: (items) =>
          set((st) => ({
            pendingImages: [...st.pendingImages, ...items].slice(0, MAX_ATTACH_IMAGES),
          })),
        removePendingImage: (index) =>
          set((st) => ({ pendingImages: st.pendingImages.filter((_, i) => i !== index) })),
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
          if (!content || get().sending) return false
          const attached = get().pendingImages
          if (attached.length && get().model === 'minimax-m2.7') {
            // 发送前拦截：返回 false，调用方保留输入框内容（不清空）
            window.dispatchEvent(
              new CustomEvent('pineline:flash', {
                detail: 'MiniMax M2.7 不支持图片理解，请切换 MiniMax M3 或豆包模型后再发送',
              }),
            )
            return false
          }
          if (!activeSession()) get().newSession()
          const session = activeSession()!
          const userMsg: AgentMessage = {
            ...msg('user', content),
            ...(attached.length ? { images: attached.map((i) => i.thumb) } : {}),
          }
          if (attached.length) {
            fullImagesByMsg.set(userMsg.id, attached.map((i) => i.full))
          }
          patchSession(session.id, (s) => ({
            ...s,
            title: s.messages.length ? s.title : content.slice(0, 24),
            messages: [...s.messages, userMsg],
          }))
          set({ sending: true, pendingImages: [] })
          sendAbort = new AbortController()
          try {
            // 执行结果回喂：assistant 的 reply 是执行**前**写好的同包文本，若不把
            // 真实执行结果带回历史，LLM 会一直以为「已执行」（用户实测：先说已
            // 执行 15 项、下一轮才发现画布没变化说抱歉重来）
            const recent = [...activeSession()!.messages].slice(-12)
            // 附图从新到旧在预算内回带原图，超出/已失效（刷新）的降级为文字备注
            const carried = new Map<string, string[]>()
            let imgBytes = 0
            for (let i = recent.length - 1; i >= 0; i--) {
              const full = fullImagesByMsg.get(recent[i].id)
              if (!full?.length) continue
              const bytes = full.reduce((sum, u) => sum + dataUrlBytes(u), 0)
              if (imgBytes + bytes > IMG_HISTORY_BUDGET) break
              imgBytes += bytes
              carried.set(recent[i].id, full)
            }
            const history = recent.map((m) => {
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
              const images = carried.get(m.id)
              if (!images && m.images?.length) {
                content += `\n[系统备注] 本条消息原附带 ${m.images.length} 张图片，已不在本次请求中`
              }
              return { role: m.role, content, ...(images ? { images } : {}) }
            })
            // 用户长期记忆随请求注入（读失败不阻断对话）
            const memory = await listMemories()
              .then((rows) => rows.map((m) => m.content))
              .catch(() => [] as string[])
            const res = await agentChat(
              {
                messages: history,
                model: get().model,
                webSearch: get().webSearch,
                ...(memory.length ? { memory: memory.slice(0, 30) } : {}),
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
              ...(res.citations?.length ? { citations: res.citations } : {}),
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
          return true
        },

        stop: () => {
          sendAbort?.abort() // 中止在飞的 agentChat 请求
          opsAbort?.abort() // 中止 executeOps 的协作式长轮询（ensureStoryboardShots/waitShotImages）
          useStudioStore.getState().interruptGeneration() // 停 store 在飞的 runPipeline/runNode 生成
        },

        confirmOps: async (messageId, selectedIndices) => {
          const session = activeSession()
          if (!session) return
          const message = session.messages.find((m) => m.id === messageId)
          if (!message?.ops || message.opsState === 'executed') return
          // 多选执行：补全依赖闭包（选了 connect 就带上它引用的 add_node），按原顺序取子集
          const chosen = selectedIndices
            ? completeSelection(message.ops, new Set(selectedIndices))
            : new Set(message.ops.map((_, i) => i))
          const subset = message.ops.filter((_, i) => chosen.has(i))
          if (!subset.length) return
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
          // 清空画布是破坏性操作：无论手动/自动模式，画布非空时都必须经用户确认（只看选中子集）
          if (
            subset.some((o) => o.op === 'clear_canvas') &&
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
          // add_reference 需要本轮用户上传的原图：从该 assistant 消息往前找最近的 user 消息
          const msgIdx = session.messages.findIndex((m) => m.id === messageId)
          let roundImages: string[] = []
          for (let i = msgIdx - 1; i >= 0; i--) {
            if (session.messages[i].role !== 'user') continue
            roundImages = fullImagesByMsg.get(session.messages[i].id) ?? []
            break
          }
          // ops 执行阶段建专用中止器：停止按钮据此中断长任务（轮询/派生）
          opsAbort = new AbortController()
          let result: string
          try {
            result = await executeOps(subset, roundImages, opsAbort.signal)
          } finally {
            opsAbort = null
          }
          const skippedCount = message.ops.length - subset.length
          if (skippedCount > 0) result = `${result}（另跳过未选 ${skippedCount} 项）`
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
      version: 2,
      // 消息带缩略图后体积上涨：写入容错防 QuotaExceededError 穿透卡死所有 action
      storage: createJSONStorage(() => guardedLocalStorage),
      // v1→v2：新增 webSearch（缺省 false）与消息缩略图字段，均向后兼容直接沿用
      migrate: (persisted) => persisted as AgentState,
      partialize: (s) =>
        ({
          mode: s.mode,
          model: s.model,
          webSearch: s.webSearch,
          sessions: s.sessions.slice(0, MAX_SESSIONS),
          activeSessionId: s.activeSessionId,
        }) as unknown as AgentState,
    },
  ),
)
