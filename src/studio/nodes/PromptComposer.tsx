import { useEffect, useRef, useState } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  ArrowUp,
  Camera,
  Check,
  ChevronDown,
  Cpu,
  Maximize2,
  Mic,
  Plus,
  Proportions,
  Sparkles,
  Square,
  X,
  Zap,
} from 'lucide-react'
import { useStudioStore } from '../store'
import {
  estimateCost,
  IMAGE_MODELS,
  IMAGE_PRESETS,
  presetMeta,
  TEXT_MODELS,
  TEXT_PRESETS,
} from '../nodeCatalog'
import { SHADOWS, TOKENS } from '../designTokens'
import { Chip, CopyButton, Popover, SyncInput, SyncTextarea, VDivider } from './composerKit'
import AssetPickerDialog from '../dialogs/AssetPickerDialog'
import PromptEditorDialog from '../dialogs/PromptEditorDialog'
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

  const [openPop, setOpenPop] = useState<'model' | 'preset' | 'ratio' | 'batch' | 'tone' | 'length' | 'addref' | null>(null)
  // false=关闭；'library'/'history'=打开且落在对应 tab（参考素材可来自素材库或生成历史）
  const [pickerOpen, setPickerOpen] = useState<false | 'library' | 'history'>(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  // ⌘I：聚焦选中节点的提示词输入
  useEffect(() => {
    const onFocusReq = (e: Event) => {
      if ((e as CustomEvent<string>).detail === id) textRef.current?.focus()
    }
    window.addEventListener('pineline:focus-composer', onFocusReq)
    return () => window.removeEventListener('pineline:focus-composer', onFocusReq)
  }, [id])

  const { kind, preset, params, status } = data
  const meta = presetMeta(preset)
  const running = status === 'running'
  const cost = estimateCost(kind, preset, params)
  const isImage = kind === 'image'
  const canBatch = preset === 'single' || preset === 'shot'
  const presets = isImage ? IMAGE_PRESETS : TEXT_PRESETS

  // 参考图落为素材节点（放在本节点左侧）并自动连线
  // 注意：不要在此订阅 s.nodes.find(...)——每次击键都会返回新引用触发陈旧渲染
  // （IME 乱码根因之一），节点位置在回调里现取即可。
  const attachRef = (dataUrl: string) => {
    const node = useStudioStore.getState().nodes.find((n) => n.id === id)
    if (!node) return
    const assetId = addAssetNode(dataUrl, {
      x: node.position.x - 320,
      y: node.position.y + 40,
    })
    onConnect({ source: assetId, sourceHandle: null, target: id, targetHandle: null })
    focusNode(id)
  }

  const handleAddRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => attachRef(String(reader.result ?? ''))
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
        style={{ maxWidth: 'calc(100vw - 32px)', background: TOKENS.inputBg, boxShadow: SHADOWS.panel }}
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
            <div className="relative">
              <button
                title="添加参考图"
                onClick={() => setOpenPop(openPop === 'addref' ? null : 'addref')}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border-[1.5px] border-dashed border-white/20 transition hover:border-white/40"
                style={{ color: TOKENS.textMuted }}
              >
                <Plus size={20} />
              </button>
              {openPop === 'addref' && (
                <Popover width={170} onClose={() => setOpenPop(null)}>
                  <div className="p-2">
                    <button
                      onClick={() => { setOpenPop(null); fileRef.current?.click() }}
                      className="w-full rounded-[12px] px-3 py-2.5 text-left text-[14px] transition hover:bg-white/[0.05]"
                      style={{ color: TOKENS.textBody }}
                    >
                      本地上传
                    </button>
                    <button
                      onClick={() => { setOpenPop(null); setPickerOpen('library') }}
                      className="w-full rounded-[12px] px-3 py-2.5 text-left text-[14px] transition hover:bg-white/[0.05]"
                      style={{ color: TOKENS.textBody }}
                    >
                      从素材库选择
                    </button>
                    <button
                      onClick={() => { setOpenPop(null); setPickerOpen('history') }}
                      className="w-full rounded-[12px] px-3 py-2.5 text-left text-[14px] transition hover:bg-white/[0.05]"
                      style={{ color: TOKENS.textBody }}
                    >
                      从生成历史选择
                    </button>
                  </div>
                </Popover>
              )}
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAddRef} />
        </div>

        {/* 中区：提示词（半受控 SyncTextarea，IME/光标安全；可展开大编辑器；按 preset 限字数，剧本/分镜不限） */}
        <div className="group/prompt relative">
          <SyncTextarea
            ref={textRef}
            value={data.prompt}
            placeholder={meta?.promptPlaceholder ?? '描述任何你想要生成的内容'}
            maxLength={meta?.maxChars}
            onValueChange={(v) => setPrompt(id, v)}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation()
              if (
                (e.metaKey || e.ctrlKey) &&
                e.key === 'Enter' &&
                !e.nativeEvent.isComposing &&
                !running
              )
                runNode(id)
            }}
            className={`nowheel min-h-[52px] w-full resize-none bg-transparent pr-12 text-[16px] leading-relaxed outline-none ${
              meta?.maxChars && data.prompt.length >= meta.maxChars * 0.8 ? 'pb-6' : ''
            }`}
            style={{ color: TOKENS.textBody }}
          />
          {/* right-4 让出滚动条带，半透明胶囊压在文字上仍可辨识 */}
          <button
            title="展开编辑器"
            onClick={() => setEditorOpen(true)}
            className="absolute right-4 top-1 rounded-[8px] bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition hover:bg-white/[0.14] group-hover/prompt:opacity-100"
            style={{ color: TOKENS.textMuted }}
          >
            <Maximize2 size={14} />
          </button>
          <CopyButton
            text={data.prompt}
            title="复制提示词"
            className="absolute right-12 top-1 rounded-[8px] bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition hover:bg-white/[0.14] group-hover/prompt:opacity-100"
            style={{ color: TOKENS.textMuted }}
          />
          {meta?.maxChars && data.prompt.length >= meta.maxChars * 0.8 && (
            <span
              className="pointer-events-none absolute bottom-1 right-4 rounded-[6px] bg-black/50 px-1.5 py-0.5 text-[11px] tabular-nums backdrop-blur-sm"
              style={{ color: '#E8A33D' }}
            >
              {data.prompt.length} / {meta.maxChars}
            </span>
          )}
        </div>

        {/* 下区：参数条 */}
        <div className="flex items-center gap-1 pt-1">
          <div className="relative">
            <Chip
              title={isImage ? '图像模型' : '文本模型'}
              active={openPop === 'model'}
              onClick={() => setOpenPop(openPop === 'model' ? null : 'model')}
            >
              <Cpu size={16} style={{ color: TOKENS.textMuted }} />
              {(isImage
                ? IMAGE_MODELS.find((m) => m.id === data.params.imageModel)
                : TEXT_MODELS.find((m) => m.id === data.params.textModel)
              )?.name ?? (isImage ? 'Gemini 3.1 Flash' : 'MiniMax M2.7')}
              <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
            </Chip>
            {openPop === 'model' && (
              <ModelPickerPopover
                isImage={isImage}
                current={isImage ? data.params.imageModel : data.params.textModel}
                onClose={() => setOpenPop(null)}
                onPick={(mid) => {
                  updateNodeParams(id, isImage ? { imageModel: mid } : { textModel: mid })
                  setOpenPop(null)
                }}
              />
            )}
          </div>
          <VDivider />

          {/* 预设 */}
          <div className="relative">
            <Chip title="生成预设" active={openPop === 'preset'} onClick={() => setOpenPop(openPop === 'preset' ? null : 'preset')}>
              {meta?.label ?? '预设'}
              <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
            </Chip>
            {openPop === 'preset' && (
              <Popover width={240} onClose={() => setOpenPop(null)}>
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
                <Popover width={340} onClose={() => setOpenPop(null)}>
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
                    <Popover width={160} onClose={() => setOpenPop(null)}>
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
                  <Popover width={110} onClose={() => setOpenPop(null)}>
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

          {/* 摄影机预设胶囊（摄影机面板「保存」回填） */}
          {isImage && params.camera && (
            <span
              className="flex max-w-[180px] shrink items-center gap-1.5 rounded-full py-1.5 pl-1.5 pr-2.5"
              style={{ background: TOKENS.chipBg }}
              title={params.camera}
            >
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
                <Camera size={13} style={{ color: TOKENS.textBody }} />
              </span>
              <span className="min-w-0 truncate text-[13px]" style={{ color: TOKENS.textBody }}>
                {params.camera.replace(/^Shot on /, '').split(' with ')[0]}
              </span>
              <button
                title="移除摄影机预设"
                onClick={() => updateNodeParams(id, { camera: undefined })}
                className="shrink-0 transition hover:text-white"
                style={{ color: TOKENS.textMuted }}
              >
                <X size={12} />
              </button>
            </span>
          )}

          {!isImage && preset === 'storyboard' && (
            <>
              <Chip title="拆分方式" onClick={() =>
                updateNodeParams(id, { splitMode: (params.splitMode ?? 'auto') === 'auto' ? 'manual' : 'auto' })
              }>
                {(params.splitMode ?? 'auto') === 'auto' ? '自动拆分' : '分隔符'}
              </Chip>
              {params.splitMode === 'manual' && (
                <SyncInput
                  value={params.splitter ?? ''}
                  placeholder="分隔符"
                  onValueChange={(v) => updateNodeParams(id, { splitter: v })}
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
                  <Popover width={96} onClose={() => setOpenPop(null)}>
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

        {editorOpen && (
          <PromptEditorDialog
            title={`${data.title} · 提示词`}
            value={data.prompt}
            placeholder={meta?.promptPlaceholder}
            maxLength={meta?.maxChars}
            onChange={(v) => setPrompt(id, v)}
            onClose={() => setEditorOpen(false)}
          />
        )}

        {pickerOpen && (
          <AssetPickerDialog
            title="选择参考图"
            initialTab={pickerOpen}
            onPick={(a) => {
              setPickerOpen(false)
              attachRef(a.dataUrl)
            }}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </div>
    </NodeToolbar>
  )
}

/**
 * 文本/图像模型选择弹层：豆包 Seed 系与 Seedream 走方舟（与 Seedance 共用 ARK_API_KEY），
 * 密钥未配置时显示 🔑 提示（就绪状态复用 videoReadiness.seedance——同一把钥匙）。
 */
function ModelPickerPopover({
  isImage,
  current,
  onPick,
  onClose,
}: {
  isImage: boolean
  current?: string
  onPick: (id: string) => void
  onClose?: () => void
}) {
  const readiness = useStudioStore((s) => s.videoReadiness)
  const loadVideoReadiness = useStudioStore((s) => s.loadVideoReadiness)
  useEffect(() => {
    void loadVideoReadiness()
  }, [loadVideoReadiness])

  const models = isImage ? IMAGE_MODELS : TEXT_MODELS
  const arkReady = readiness ? readiness.seedance : true

  return (
    <Popover width={260} onClose={onClose}>
      <div className="p-2.5">
        {models.map((m) => {
          const isDefault = m.provider !== 'ark'
          const active = current === m.id || (!current && isDefault && models.indexOf(m) === 0)
          const needsKey = m.provider === 'ark' && !arkReady
          return (
            <button
              key={m.id}
              onClick={() => onPick(m.id)}
              className="flex w-full items-center gap-3 rounded-[12px] p-3 text-left transition hover:bg-white/[0.05]"
              style={{ background: active ? 'rgba(255,255,255,0.05)' : undefined }}
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
                  {m.name}
                  {needsKey && <span title="未配置 ARK_API_KEY，运行会给出接入指引">🔑</span>}
                </span>
                {m.desc && (
                  <span className="block text-[11px]" style={{ color: TOKENS.textFaint }}>
                    {m.desc}
                  </span>
                )}
              </span>
              {active && <Check size={14} style={{ color: TOKENS.textBody }} />}
            </button>
          )
        })}
      </div>
    </Popover>
  )
}
