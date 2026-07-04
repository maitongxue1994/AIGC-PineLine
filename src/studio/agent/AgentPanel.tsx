import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  Clock,
  Hand,
  Loader2,
  Play,
  Plus,
  Send,
  Sparkles,
  Square,
  X,
  Zap,
} from 'lucide-react'
import { useAgentStore } from './agentStore'
import { useStudioStore } from '../store'
import { activeContent, isImageContent } from '../types'
import { describeOp } from './types'
import { SHADOWS, TOKENS } from '../designTokens'

/** 右下角 AI 助手入口（⌘J）：图标 + 文案，让功能可被发现 */
export function AgentLauncher() {
  const toggle = useAgentStore((s) => s.toggle)
  const open = useAgentStore((s) => s.open)
  if (open) return null
  return (
    <button
      title="AI 助手：对话搭建生成管线 (⌘J)"
      onClick={toggle}
      className="absolute bottom-5 right-5 z-30 flex h-12 items-center gap-2 rounded-full px-4 text-[14px] font-semibold text-white transition hover:scale-105"
      style={{ background: TOKENS.brandGradient, boxShadow: SHADOWS.toolbar }}
    >
      <Sparkles size={17} />
      AI 助手
    </button>
  )
}

/** sending 期的分阶段 loading 文案（M2.7 推理模型响应较慢，给出进行中的具体感） */
const SENDING_STAGES = ['正在理解需求…', '正在规划节点与连线…', '正在组装画布操作…']

function SendingIndicator() {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setStage((s) => Math.min(s + 1, SENDING_STAGES.length - 1)),
      6000,
    )
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex items-center gap-2 text-[13px]" style={{ color: TOKENS.textMuted }}>
      <Loader2 size={14} className="animate-spin" /> {SENDING_STAGES[stage]}
    </div>
  )
}

/** 推理模型思考过程折叠块 */
function ThinkingBlock({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="mb-1 max-w-[92%]">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 text-[12px] transition hover:text-white"
        style={{ color: TOKENS.textFaint }}
      >
        <ChevronDown size={12} className={`transition-transform ${expanded ? '' : '-rotate-90'}`} />
        思考过程
      </button>
      {expanded && (
        <div
          className="mt-1 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-[10px] border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[12px] leading-relaxed"
          style={{ color: TOKENS.textFaint }}
        >
          {text}
        </div>
      )}
    </div>
  )
}

const SUGGESTIONS = [
  { title: '搭一条完整短片管线', prompt: '帮我搭一条完整管线：一个雨夜屋顶等待的少年的短片——剧本、分镜、3 个分镜图、3 个视频节点，并直接运行' },
  { title: '为产品图做广告词', prompt: '新建一个广告词节点，为一款磨砂玻璃香水写主标语和社媒文案' },
]

/**
 * Agent 对话面板（TapNow 形制）：右侧滑出全高 ~480px；
 * 消息流带操作预览卡（手动确认整批执行，⌘Z 一步撤销）；选中节点自动进入上下文。
 */
export default function AgentPanel() {
  const open = useAgentStore((s) => s.open)
  const setOpen = useAgentStore((s) => s.setOpen)
  const mode = useAgentStore((s) => s.mode)
  const setMode = useAgentStore((s) => s.setMode)
  const sessions = useAgentStore((s) => s.sessions)
  const activeSessionId = useAgentStore((s) => s.activeSessionId)
  const sending = useAgentStore((s) => s.sending)
  const newSession = useAgentStore((s) => s.newSession)
  const switchSession = useAgentStore((s) => s.switchSession)
  const send = useAgentStore((s) => s.send)
  const stop = useAgentStore((s) => s.stop)
  const confirmOps = useAgentStore((s) => s.confirmOps)
  const dismissOps = useAgentStore((s) => s.dismissOps)

  const selectedNode = useStudioStore((s) =>
    s.selectedNodeId ? s.nodes.find((n) => n.id === s.selectedNodeId) ?? null : null,
  )

  const [draft, setDraft] = useState('')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [modeOpen, setModeOpen] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  const session = sessions.find((s) => s.id === activeSessionId) ?? null
  const messages = session?.messages ?? []

  // 新消息自动滚到底
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length, sending, open])

  if (!open) return null

  const selThumb = selectedNode
    ? selectedNode.data.versions.find((v) => isImageContent(v.content))?.content ?? null
    : null
  const selText = selectedNode ? activeContent(selectedNode.data) : null

  const handleSend = () => {
    const text = draft.trim()
    if (!text || sending) return
    setDraft('')
    void send(text)
  }

  return (
    <div
      className="absolute bottom-0 right-0 top-0 z-40 flex w-[480px] max-w-[92vw] flex-col border-l border-white/[0.08]"
      style={{ background: 'rgba(16,16,18,0.98)', boxShadow: SHADOWS.modal }}
    >
      {/* 头部 */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
          {session?.title ?? '新建对话'}
        </span>
        <span className="flex-1" />
        <button
          title="新建对话"
          onClick={newSession}
          className="rounded-full p-2 transition hover:bg-white/[0.08]"
          style={{ color: TOKENS.textMuted }}
        >
          <Plus size={16} />
        </button>
        <div className="relative">
          <button
            title="历史对话"
            onClick={() => setHistoryOpen((v) => !v)}
            className="rounded-full p-2 transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            <Clock size={15} />
          </button>
          {historyOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-1 max-h-72 w-64 overflow-y-auto rounded-[14px] border border-white/[0.08] p-1.5"
              style={{ background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
            >
              {sessions.length === 0 && (
                <div className="px-3 py-4 text-center text-[12px]" style={{ color: TOKENS.textFaint }}>
                  暂无历史对话
                </div>
              )}
              {sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    switchSession(s.id)
                    setHistoryOpen(false)
                  }}
                  className="block w-full truncate rounded-[10px] px-3 py-2 text-left text-[13px] transition hover:bg-white/[0.06]"
                  style={{
                    color: TOKENS.textBody,
                    background: s.id === activeSessionId ? 'rgba(255,255,255,0.07)' : undefined,
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          title="关闭 (⌘J)"
          onClick={() => setOpen(false)}
          className="rounded-full p-2 transition hover:bg-white/[0.08]"
          style={{ color: TOKENS.textMuted }}
        >
          <X size={16} />
        </button>
      </div>

      {/* 消息流 / 空态 */}
      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-center gap-4">
            <div
              className="h-10 w-10 rounded-full"
              style={{ background: TOKENS.brandGradient }}
            />
            <div className="text-[26px] font-bold leading-snug" style={{ color: TOKENS.textTitle }}>
              今天一起创作点什么？
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.title}
                  onClick={() => void send(s.prompt)}
                  className="rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3.5 text-left transition hover:border-white/25 hover:bg-white/[0.05]"
                >
                  <div className="text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
                    {s.title}
                  </div>
                  <div className="mt-1 line-clamp-2 text-[12px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                    {s.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === 'assistant' && m.thinking && <ThinkingBlock text={m.thinking} />}
                <div
                  className={`max-w-[92%] whitespace-pre-wrap rounded-[14px] px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    m.role === 'user' ? 'ml-auto' : ''
                  }`}
                  style={{
                    background: m.role === 'user' ? 'rgba(46,155,255,0.16)' : 'rgba(255,255,255,0.05)',
                    color: TOKENS.textBody,
                  }}
                >
                  {m.content}
                </div>

                {/* 操作预览卡 */}
                {m.ops && m.ops.length > 0 && (
                  <div
                    className="mt-2 max-w-[92%] rounded-[14px] border border-white/[0.08] p-3"
                    style={{ background: TOKENS.chipBg }}
                  >
                    <div className="mb-2 text-[12px] font-semibold" style={{ color: TOKENS.textMuted }}>
                      画布操作 · {m.ops.length} 项
                    </div>
                    <div className="space-y-1.5">
                      {m.ops.map((op, i) => (
                        <div key={i} className="flex items-start gap-2 text-[13px]" style={{ color: TOKENS.textBody }}>
                          <Zap size={12} className="mt-1 shrink-0" style={{ color: TOKENS.accent }} />
                          {describeOp(op)}
                        </div>
                      ))}
                    </div>
                    {m.opsState === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => void confirmOps(m.id)}
                          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition hover:opacity-90"
                          style={{ background: TOKENS.accent }}
                        >
                          <Play size={12} /> 全部执行
                        </button>
                        <button
                          onClick={() => dismissOps(m.id)}
                          className="rounded-full px-4 py-2 text-[13px] transition hover:bg-white/[0.1]"
                          style={{ background: 'rgba(255,255,255,0.06)', color: TOKENS.textMuted }}
                        >
                          放弃
                        </button>
                      </div>
                    )}
                    {m.opsState === 'executed' && (
                      <div className="mt-2 flex items-center gap-1.5 text-[12px]" style={{ color: '#4BBF6B' }}>
                        <Check size={13} /> {m.result ?? '已执行'}（⌘Z 可整批撤销）
                      </div>
                    )}
                    {m.opsState === 'dismissed' && (
                      <div className="mt-2 text-[12px]" style={{ color: TOKENS.textFaint }}>
                        已放弃
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {sending && <SendingIndicator />}
          </div>
        )}
      </div>

      {/* 输入区 */}
      <div className="border-t border-white/[0.07] p-3.5">
        {selectedNode && (
          <div className="mb-2 flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-[12px]"
              style={{ background: TOKENS.chipBg, color: TOKENS.textBody }}
              title="选中节点将作为对话上下文"
            >
              {selThumb ? (
                <img src={selThumb} alt="" className="h-6 w-6 rounded-full object-cover" />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.08] text-[10px]">
                  {selectedNode.data.kind === 'text' ? '文' : '图'}
                </span>
              )}
              <span className="max-w-[140px] truncate">{selectedNode.data.title}</span>
              {selText && !isImageContent(selText) && (
                <span className="max-w-[100px] truncate" style={{ color: TOKENS.textFaint }}>
                  {selText.slice(0, 20)}
                </span>
              )}
            </span>
          </div>
        )}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation()
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="描述创意或需求，选中节点自动进入上下文…"
          className="min-h-[64px] w-full resize-none rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-[14px] leading-relaxed outline-none transition focus:border-white/25"
          style={{ color: TOKENS.textBody }}
        />
        <div className="mt-2 flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setModeOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition hover:bg-white/[0.1]"
              style={{ background: 'rgba(255,255,255,0.06)', color: TOKENS.textBody }}
            >
              <Hand size={13} />
              {mode === 'manual' ? '手动确认' : '自动执行'}
              <ChevronDown size={12} style={{ color: TOKENS.textMuted }} />
            </button>
            {modeOpen && (
              <div
                className="absolute bottom-full left-0 z-50 mb-1 w-44 rounded-[12px] border border-white/[0.08] p-1.5"
                style={{ background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
              >
                {(
                  [
                    ['manual', '手动确认', '操作先出预览卡，确认后执行'],
                    ['auto', '自动执行', '收到操作立即执行'],
                  ] as const
                ).map(([k, label, desc]) => (
                  <button
                    key={k}
                    onClick={() => {
                      setMode(k)
                      setModeOpen(false)
                    }}
                    className="block w-full rounded-[9px] px-2.5 py-2 text-left transition hover:bg-white/[0.06]"
                    style={{ background: mode === k ? 'rgba(255,255,255,0.07)' : undefined }}
                  >
                    <span className="block text-[13px]" style={{ color: TOKENS.textBody }}>
                      {label}
                    </span>
                    <span className="block text-[11px]" style={{ color: TOKENS.textFaint }}>
                      {desc}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            MiniMax
          </span>
          <span className="flex-1" />
          {sending ? (
            <button
              onClick={stop}
              title="停止本次请求"
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white"
              style={{ background: '#F5F5F7' }}
            >
              <Square size={12} fill="#0B0B0C" stroke="#0B0B0C" />
            </button>
          ) : (
            <button
              disabled={!draft.trim()}
              onClick={handleSend}
              title="发送 (Enter)"
              className="flex h-9 w-9 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: '#F5F5F7' }}
            >
              <Send size={14} stroke="#0B0B0C" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
