import { useRef, useState, type ReactNode } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  ArrowUp,
  Check,
  ChevronDown,
  Cpu,
  Mic,
  Plus,
  Proportions,
  Sparkles,
  Square,
  Zap,
} from 'lucide-react'
import { useStudioStore } from '../store'
import {
  estimateCost,
  IMAGE_PRESETS,
  presetMeta,
  TEXT_PRESETS,
} from '../nodeCatalog'
import { SHADOWS, TOKENS } from '../designTokens'
import {
  isImageContent,
  type AspectRatio,
  type ImageQuality,
  type PineNodeData,
} from '../types'

const ASPECTS: { value: AspectRatio | ''; label: string; w: number; h: number }[] = [
  { value: '', label: '自适应', w: 14, h: 14 },
  { value: '1:1', label: '1:1', w: 13, h: 13 },
  { value: '9:16', label: '9:16', w: 9, h: 16 },
  { value: '16:9', label: '16:9', w: 16, h: 9 },
  { value: '3:4', label: '3:4', w: 12, h: 16 },
  { value: '4:3', label: '4:3', w: 16, h: 12 },
  { value: '3:2', label: '3:2', w: 15, h: 10 },
  { value: '2:3', label: '2:3', w: 10, h: 15 },
  { value: '5:4', label: '5:4', w: 15, h: 12 },
  { value: '4:5', label: '4:5', w: 12, h: 15 },
  { value: '21:9', label: '21:9', w: 21, h: 9 },
]

/** 参数 chip（设计稿 §04：padding 8/12、radius 12、15px 文字、hover 白 6%） */
function Chip({
  title,
  onClick,
  active,
  children,
}: {
  title?: string
  onClick?: () => void
  active?: boolean
  children: ReactNode
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={!onClick}
      className="flex shrink-0 items-center gap-2 rounded-[12px] px-3 py-2 text-[15px] transition enabled:hover:bg-white/[0.06] disabled:cursor-default"
      style={{ color: TOKENS.textBody, background: active ? 'rgba(255,255,255,0.06)' : undefined }}
    >
      {children}
    </button>
  )
}

function VDivider({ h = 20 }: { h?: number }) {
  return <span className="shrink-0 bg-white/[0.12]" style={{ width: 1, height: h }} />
}

function Popover({ width, children }: { width: number; children: ReactNode }) {
  return (
    <div
      className="nodrag nowheel absolute bottom-full left-0 z-30 mb-2 rounded-[20px] border border-white/[0.08]"
      style={{ width, background: TOKENS.popoverBg, boxShadow: SHADOWS.menu }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

/**
 * 生成输入栏（设计稿 §04）：吸附于选中节点下方。
 * 上区参考图行 · 中区提示词 · 下区参数条 + 积分提交组。
 */
export default function PromptComposer({ id, data }: { id: string; data: PineNodeData }) {
  const setPrompt = useStudioStore((s) => s.setPrompt)
  const setPreset = useStudioStore((s) => s.setPreset)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const runNode = useStudioStore((s) => s.runNode)
  const focusNode = useStudioStore((s) => s.focusNode)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const onConnect = useStudioStore((s) => s.onConnect)
  const credits = useStudioStore((s) => s.credits)
  // 上游参考图芯片：每个上游节点取第一张图
  const upstreamRefs = useStudioStore((s) => {
    const refs: { nodeId: string; src: string }[] = []
    for (const e of s.edges) {
      if (e.target !== id) continue
      const src = s.nodes.find((n) => n.id === e.source)
      if (!src) continue
      const img = src.data.versions.find((v) => isImageContent(v.content))?.content
      if (img) refs.push({ nodeId: src.id, src: img })
    }
    return JSON.stringify(refs.slice(0, 6))
  })
  const refs = JSON.parse(upstreamRefs) as { nodeId: string; src: string }[]

  const [openPop, setOpenPop] = useState<'preset' | 'ratio' | 'batch' | 'tone' | 'length' | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const { kind, preset, params, status } = data
  const meta = presetMeta(preset)
  const running = status === 'running'
  const cost = estimateCost(kind, preset, params)
  const isImage = kind === 'image'
  const canBatch = preset === 'single' || preset === 'shot'
  const presets = isImage ? IMAGE_PRESETS : TEXT_PRESETS

  const node = useStudioStore((s) => s.nodes.find((n) => n.id === id))

  const handleAddRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('image/') || !node) return
    const reader = new FileReader()
    reader.onload = () => {
      // 参考图落为素材节点（放在本节点左侧）并自动连线
      const assetId = addAssetNode(String(reader.result ?? ''), {
        x: node.position.x - 320,
        y: node.position.y + 40,
      })
      onConnect({ source: assetId, sourceHandle: null, target: id, targetHandle: null })
      focusNode(id)
    }
    reader.readAsDataURL(file)
  }

  const toneLabel: Record<string, string> = {
    cinematic: '电影级',
    commercial: '商业广告',
    drama: '短剧',
    documentary: '纪录片',
  }
  const lengthLabel: Record<string, string> = { short: '短', medium: '中', long: '长' }

  return (
    <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
      <div
        className="relative flex w-[720px] flex-col gap-4 rounded-[24px] border border-white/[0.08] px-5 pb-4 pt-5"
        style={{ background: TOKENS.inputBg, boxShadow: SHADOWS.panel }}
        onDoubleClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {/* 上区：灵感 + 参考图芯片行 */}
        <div className="flex items-center gap-2.5">
          <button
            disabled
            title="灵感增强（规划中）"
            className="flex h-12 w-12 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] border border-white/[0.08] opacity-50"
            style={{ background: TOKENS.chipBg, color: TOKENS.textBody }}
          >
            <Sparkles size={18} />
          </button>
          <VDivider h={32} />
          {refs.map((r) => (
            <button
              key={r.nodeId}
              title="参考图（点击选中上游节点）"
              onClick={() => focusNode(r.nodeId)}
              className="h-12 w-12 shrink-0 overflow-hidden rounded-[14px] border border-white/[0.14] transition hover:border-white/40"
            >
              <img src={r.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
          {kind !== 'asset' && (
            <button
              title="添加参考图（上传为素材节点并连线）"
              onClick={() => fileRef.current?.click()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border-[1.5px] border-dashed border-white/20 transition hover:border-white/40"
              style={{ color: TOKENS.textMuted }}
            >
              <Plus size={20} />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAddRef} />
        </div>

        {/* 中区：提示词 */}
        <textarea
          value={data.prompt}
          placeholder={meta?.promptPlaceholder ?? '描述任何你想要生成的内容'}
          onChange={(e) => setPrompt(id, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation()
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !running) runNode(id)
          }}
          className="nowheel min-h-[52px] w-full resize-none bg-transparent text-[16px] leading-relaxed outline-none"
          style={{ color: TOKENS.textBody }}
        />

        {/* 下区：参数条 */}
        <div className="flex items-center gap-1 pt-1">
          <Chip title={isImage ? '图像模型（固定）' : '文本模型（固定）'}>
            <Cpu size={16} style={{ color: TOKENS.textMuted }} />
            {isImage ? 'Gemini' : 'MiniMax'}
          </Chip>
          <VDivider />

          {/* 预设 */}
          <div className="relative">
            <Chip title="生成预设" active={openPop === 'preset'} onClick={() => setOpenPop(openPop === 'preset' ? null : 'preset')}>
              {meta?.label ?? '预设'}
              <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
            </Chip>
            {openPop === 'preset' && (
              <Popover width={240}>
                <div className="p-2.5">
                  {presets.map((p) => (
                    <button
                      key={p.preset}
                      onClick={() => { setPreset(id, p.preset); setOpenPop(null) }}
                      className="flex w-full items-center gap-3 rounded-[14px] p-3 text-left transition hover:bg-white/[0.05]"
                      style={{ background: preset === p.preset ? 'rgba(255,255,255,0.05)' : undefined }}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold" style={{ color: TOKENS.textBody }}>
                          {p.label}
                        </span>
                        <span className="block truncate text-[12px]" style={{ color: TOKENS.textFaint }}>
                          {p.promptPlaceholder}
                        </span>
                      </span>
                      {preset === p.preset && <Check size={15} style={{ color: TOKENS.textBody }} />}
                    </button>
                  ))}
                </div>
              </Popover>
            )}
          </div>

          {isImage && (
            <div className="relative">
              <Chip title="画质与比例" active={openPop === 'ratio'} onClick={() => setOpenPop(openPop === 'ratio' ? null : 'ratio')}>
                <Proportions size={16} style={{ color: TOKENS.textMuted }} />
                {params.aspectRatio ?? '自适应'} · {params.quality ?? '1K'}
              </Chip>
              {openPop === 'ratio' && (
                <Popover width={340}>
                  <div className="flex flex-col gap-5 p-[22px]">
                    <div>
                      <div className="mb-2.5 text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
                        画质
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['1K', '2K', '4K'] as ImageQuality[]).map((q) => {
                          const on = (params.quality ?? '1K') === q
                          return (
                            <button
                              key={q}
                              onClick={() => updateNodeParams(id, { quality: q })}
                              className="rounded-full py-2.5 text-[15px] font-semibold transition"
                              style={
                                on
                                  ? { border: '1.5px solid #F5F5F7', color: TOKENS.textTitle }
                                  : { background: 'rgba(255,255,255,0.07)', color: '#B8B8BF' }
                              }
                            >
                              {q}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2.5 text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
                        比例
                      </div>
                      <div
                        className="grid grid-cols-6 gap-1.5 rounded-[14px] p-2.5"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        {ASPECTS.map((a) => {
                          const on = (params.aspectRatio ?? '') === a.value
                          return (
                            <button
                              key={a.label}
                              onClick={() =>
                                updateNodeParams(id, { aspectRatio: (a.value || undefined) as AspectRatio | undefined })
                              }
                              className="flex flex-col items-center gap-1 rounded-[10px] px-1 py-2 transition"
                              style={{
                                color: on ? TOKENS.textTitle : TOKENS.textMuted,
                                background: on ? 'rgba(255,255,255,0.1)' : undefined,
                                fontWeight: on ? 600 : 400,
                              }}
                            >
                              <span
                                className="rounded-[3px]"
                                style={{ width: a.w, height: a.h, border: '1.5px solid currentColor' }}
                              />
                              <span className="text-[11px]">{a.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Popover>
              )}
            </div>
          )}

          {!isImage && preset !== 'storyboard' && (
            <>
              {preset !== 'free' && (
                <div className="relative">
                  <Chip title="风格" active={openPop === 'tone'} onClick={() => setOpenPop(openPop === 'tone' ? null : 'tone')}>
                    {toneLabel[params.tone ?? 'cinematic']}
                    <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
                  </Chip>
                  {openPop === 'tone' && (
                    <Popover width={160}>
                      <div className="p-2">
                        {Object.entries(toneLabel).map(([v, label]) => (
                          <button
                            key={v}
                            onClick={() => { updateNodeParams(id, { tone: v as never }); setOpenPop(null) }}
                            className="w-full rounded-[12px] px-3 py-2.5 text-left text-[15px] transition hover:bg-white/[0.05]"
                            style={{
                              color: TOKENS.textBody,
                              background: (params.tone ?? 'cinematic') === v ? 'rgba(255,255,255,0.08)' : undefined,
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </Popover>
                  )}
                </div>
              )}
              <div className="relative">
                <Chip title="篇幅" active={openPop === 'length'} onClick={() => setOpenPop(openPop === 'length' ? null : 'length')}>
                  {lengthLabel[params.length ?? 'short']}篇
                  <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
                </Chip>
                {openPop === 'length' && (
                  <Popover width={110}>
                    <div className="p-2">
                      {Object.entries(lengthLabel).map(([v, label]) => (
                        <button
                          key={v}
                          onClick={() => { updateNodeParams(id, { length: v as never }); setOpenPop(null) }}
                          className="w-full rounded-[12px] px-3 py-2.5 text-center text-[15px] transition hover:bg-white/[0.05]"
                          style={{
                            color: TOKENS.textBody,
                            background: (params.length ?? 'short') === v ? 'rgba(255,255,255,0.08)' : undefined,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </Popover>
                )}
              </div>
            </>
          )}

          {!isImage && preset === 'storyboard' && (
            <>
              <Chip title="拆分方式" onClick={() =>
                updateNodeParams(id, { splitMode: (params.splitMode ?? 'auto') === 'auto' ? 'manual' : 'auto' })
              }>
                {(params.splitMode ?? 'auto') === 'auto' ? '自动拆分' : '分隔符'}
              </Chip>
              {params.splitMode === 'manual' && (
                <input
                  value={params.splitter ?? ''}
                  placeholder="分隔符"
                  onChange={(e) => updateNodeParams(id, { splitter: e.target.value })}
                  onMouseDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-20 rounded-[12px] bg-white/[0.07] px-2.5 py-2 text-[13px] outline-none"
                  style={{ color: TOKENS.textBody }}
                />
              )}
            </>
          )}

          <span className="flex-1" />

          <button
            disabled
            title="语音输入（规划中）"
            className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full opacity-45"
            style={{ color: TOKENS.textBody }}
          >
            <Mic size={17} />
          </button>

          {isImage && canBatch && (
            <>
              <VDivider />
              <div className="relative">
                <Chip title="单次出图张数" active={openPop === 'batch'} onClick={() => setOpenPop(openPop === 'batch' ? null : 'batch')}>
                  <span className="font-semibold">{params.batch ?? 1}×</span>
                </Chip>
                {openPop === 'batch' && (
                  <Popover width={96}>
                    <div className="flex flex-col gap-1 p-2">
                      {[4, 2, 1].map((b) => (
                        <button
                          key={b}
                          onClick={() => { updateNodeParams(id, { batch: b as 1 | 2 | 4 }); setOpenPop(null) }}
                          className="rounded-[12px] py-2.5 text-center text-[16px] transition hover:bg-white/[0.05]"
                          style={{
                            color: (params.batch ?? 1) === b ? TOKENS.textTitle : TOKENS.textMuted,
                            background: (params.batch ?? 1) === b ? 'rgba(255,255,255,0.1)' : undefined,
                            fontWeight: (params.batch ?? 1) === b ? 700 : 400,
                          }}
                        >
                          {b}×
                        </button>
                      ))}
                    </div>
                  </Popover>
                )}
              </div>
            </>
          )}

          {/* 积分 + 提交组（积分为本地模拟） */}
          <div
            className="flex shrink-0 items-center gap-2.5 rounded-full py-[5px] pl-3.5 pr-1.5"
            style={{ background: TOKENS.chipBg }}
            title={`预计消耗 ${cost} 积分（本地模拟，余额 ${credits}）`}
          >
            <span className="flex items-center gap-1 text-[15px] font-semibold" style={{ color: TOKENS.textBody }}>
              <Zap size={16} style={{ color: TOKENS.textMuted }} />
              {cost}
            </span>
            <button
              disabled={running}
              onClick={() => runNode(id)}
              title={running ? '生成中…' : '运行（⌘Enter）'}
              className="flex h-9 w-9 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed"
              style={{ background: '#F5F5F7' }}
            >
              {running ? (
                <Square size={13} fill="#0B0B0C" stroke="#0B0B0C" />
              ) : (
                <ArrowUp size={16} stroke="#0B0B0C" strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>
      </div>
    </NodeToolbar>
  )
}
