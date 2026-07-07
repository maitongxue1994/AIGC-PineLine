import { useRef, useState } from 'react'
import { ArrowUp, ChevronDown, Globe, ImagePlus, Sparkles, X } from 'lucide-react'
import { useAgentStore, MAX_ATTACH_IMAGES } from './agent/agentStore'
import { SUGGESTIONS } from './agent/suggestions'
import { compressImageFile, imagesFromClipboard } from './agent/imageAttach'
import { useStudioStore } from './store'
import { TEXT_MODELS } from './nodeCatalog'
import { useDismissable } from './hooks/useDismissable'
import { SHADOWS, TOKENS } from './designTokens'

/**
 * 新建项目进入页（居中落地层）：仅在**空画布**（nodes 为 0，即新建项目）显示；
 * 已有项目走常规右下角 AI 助手，不再弹居中层。醒目大号 AI 输入框（含模型选择 +
 * 图片上传，与主面板能力一致）+ 3 个经典案例引导。发送/关闭后进入常规画布 + AgentPanel。
 */
export default function StudioLanding() {
  // localStorage persist 已存画布结构（媒体后补），故已有项目挂载即 nodes>0 → 不显示
  const isEmpty = useStudioStore((s) => s.nodes.length === 0)
  const [dismissed, setDismissed] = useState(false)
  const [draft, setDraft] = useState('')
  const [modelOpen, setModelOpen] = useState(false)
  const modelRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  useDismissable(modelOpen, () => setModelOpen(false), () => [modelRef.current])

  const send = useAgentStore((s) => s.send)
  const panelOpen = useAgentStore((s) => s.open)
  const setPanelOpen = useAgentStore((s) => s.setOpen)
  const webSearch = useAgentStore((s) => s.webSearch)
  const setWebSearch = useAgentStore((s) => s.setWebSearch)
  const chatModel = useAgentStore((s) => s.model)
  const setChatModel = useAgentStore((s) => s.setModel)
  const pendingImages = useAgentStore((s) => s.pendingImages)
  const addPendingImages = useAgentStore((s) => s.addPendingImages)
  const removePendingImage = useAgentStore((s) => s.removePendingImage)

  // AgentPanel 打开时不显示进入页，避免两个助手输入框重叠（用户反馈）
  const open = isEmpty && !dismissed && !panelOpen
  if (!open) return null

  const attachFiles = async (files: File[]) => {
    const room = MAX_ATTACH_IMAGES - useAgentStore.getState().pendingImages.length
    if (room <= 0) return
    const picked = files.filter((f) => f.type.startsWith('image/')).slice(0, room)
    const results = await Promise.allSettled(picked.map(compressImageFile))
    const okItems = results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []))
    if (okItems.length) addPendingImages(okItems)
  }

  const go = (text: string) => {
    const t = text.trim()
    if (!t) return
    setPanelOpen(true) // 打开对话面板承接后续
    setDraft('') // 乐观清空
    void send(t).then((accepted) => {
      if (accepted) setDismissed(true)
      else setDraft(t) // 被拦截（如 M2.7 带图）→ 还原输入，落地层保留
    })
  }

  return (
    <div
      className="absolute inset-0 z-[35] flex flex-col items-center justify-center px-6"
      style={{ background: 'rgba(11,11,12,0.72)', backdropFilter: 'blur(2px)' }}
    >
      <button
        title="关闭，进入空白画布"
        onClick={() => setDismissed(true)}
        className="absolute right-5 top-5 rounded-full p-2 transition hover:bg-white/[0.08]"
        style={{ color: TOKENS.textMuted }}
      >
        <X size={18} />
      </button>

      <div className="w-full max-w-[720px] -translate-y-6">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="h-8 w-8 rounded-[10px]" style={{ background: TOKENS.brandGradient }} />
          <span className="text-[24px] font-bold" style={{ color: TOKENS.textTitle }}>
            今天想创作点什么？
          </span>
        </div>

        {/* 大号输入框 */}
        <div
          className="rounded-[20px] border border-white/[0.1] p-3.5"
          style={{ background: 'rgba(28,28,31,0.96)', boxShadow: SHADOWS.modal }}
        >
          {pendingImages.length > 0 && (
            <div className="mb-2 flex items-center gap-1.5 px-1">
              {pendingImages.map((img, i) => (
                <span key={i} className="relative">
                  <img
                    src={img.thumb}
                    alt=""
                    className="h-12 w-12 rounded-[10px] border border-white/[0.12] object-cover"
                  />
                  <button
                    title="移除"
                    onClick={() => removePendingImage(i)}
                    className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/85 text-white/80 transition hover:text-white"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <span className="text-[11px]" style={{ color: TOKENS.textFaint }}>
                {pendingImages.length}/{MAX_ATTACH_IMAGES}
              </span>
            </div>
          )}
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault()
                go(draft)
              }
            }}
            onPaste={(e) => {
              const files = imagesFromClipboard(e)
              if (files.length) {
                e.preventDefault()
                void attachFiles(files)
              }
            }}
            placeholder="用一句话描述你想做的片子，或上传参考图作为角色/场景/道具，AI 助手会帮你搭好整条管线…"
            className="block h-[76px] w-full resize-none bg-transparent px-1.5 text-[16px] leading-relaxed outline-none placeholder:text-white/30"
            style={{ color: TOKENS.textBody }}
          />
          <div className="flex items-center gap-2 px-1 pt-1">
            {/* 模型选择 */}
            <div ref={modelRef} className="relative">
              <button
                onClick={() => setModelOpen((v) => !v)}
                title="选择对话编排模型（含图请选 M3 / 豆包）"
                className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] transition hover:bg-white/[0.08]"
                style={{ color: TOKENS.textFaint }}
              >
                {TEXT_MODELS.find((m) => m.id === chatModel)?.name ?? 'MiniMax M2.7'}
                <ChevronDown size={11} />
              </button>
              {modelOpen && (
                <div
                  className="absolute bottom-full left-0 z-50 mb-1 w-52 rounded-[12px] border border-white/[0.08] p-1.5"
                  style={{ background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
                >
                  {TEXT_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setChatModel(m.id)
                        setModelOpen(false)
                      }}
                      className="block w-full rounded-[9px] px-2.5 py-2 text-left transition hover:bg-white/[0.06]"
                      style={{ background: chatModel === m.id ? 'rgba(255,255,255,0.07)' : undefined }}
                    >
                      <span className="block text-[13px]" style={{ color: TOKENS.textBody }}>
                        {m.name}
                      </span>
                      <span className="block text-[11px]" style={{ color: TOKENS.textFaint }}>
                        {m.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setWebSearch(!webSearch)}
              title="联网搜索"
              className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] transition hover:bg-white/[0.08]"
              style={{
                color: webSearch ? '#8AB8FF' : TOKENS.textFaint,
                background: webSearch ? 'rgba(46,155,255,0.12)' : undefined,
              }}
            >
              <Globe size={13} /> 联网
            </button>
            <button
              title="上传参考图（角色/场景/道具，可多选或粘贴）——请配合 M3/豆包模型"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full p-2 transition hover:bg-white/[0.08]"
              style={{ color: pendingImages.length ? TOKENS.textBody : TOKENS.textFaint }}
            >
              <ImagePlus size={15} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? [])
                e.target.value = ''
                if (files.length) void attachFiles(files)
              }}
            />
            <span className="flex-1" />
            <button
              disabled={!draft.trim()}
              onClick={() => go(draft)}
              title="发送 (Enter)"
              className="flex h-9 w-9 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: '#F5F5F7' }}
            >
              <ArrowUp size={16} stroke="#0B0B0C" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* 3 个经典案例引导 */}
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.title}
              onClick={() => go(s.prompt)}
              className="rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3 text-left transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: TOKENS.accent }} />
                <span className="text-[13px] font-semibold" style={{ color: TOKENS.textBody }}>
                  {s.title}
                </span>
              </div>
              <div className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                {s.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
