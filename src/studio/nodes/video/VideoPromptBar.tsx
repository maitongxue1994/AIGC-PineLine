import { Fragment, useRef, useState } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  ArrowLeftRight,
  ArrowUp,
  ChevronDown,
  Film,
  Gem,
  Image as ImageIcon,
  Maximize2,
  Mic,
  Music,
  Plus,
  Sparkles,
  UserRoundPlus,
  X,
  Zap,
} from 'lucide-react'
import { useStudioStore } from '../../store'
import { estimateCost, VIDEO_MODELS } from '../../nodeCatalog'
import { SHADOWS, TOKENS } from '../../designTokens'
import { Chip, VDivider } from '../composerKit'
import { isImageContent, type NodeParams, type PineNodeData } from '../../types'
import VideoModelPicker from './VideoModelPicker'
import VideoParamsPopover from './VideoParamsPopover'

/** 全能参考三类素材（多模态参考生视频，仅 Seedance 2.0 系列）：官方上限 图9/视频3/音频3 */
const OMNI_KINDS = [
  { kind: 'image', field: 'omniRefs', accept: 'image/*', prefix: 'image/', max: 9, maxMB: 30, label: '参考图', Icon: ImageIcon },
  { kind: 'video', field: 'omniVideos', accept: 'video/*', prefix: 'video/', max: 3, maxMB: 50, label: '参考视频', Icon: Film },
  { kind: 'audio', field: 'omniAudios', accept: 'audio/*', prefix: 'audio/', max: 3, maxMB: 20, label: '参考音频', Icon: Music },
] as const

type OmniKind = (typeof OMNI_KINDS)[number]['kind']
type OmniField = (typeof OMNI_KINDS)[number]['field']

/** data URL 的近似字节数（base64 段 × 3/4） */
const dataUrlBytes = (u: string) => Math.ceil((u.length - (u.indexOf(',') + 1)) * 0.75)

/**
 * 视频生成输入栏（video-node-tools §5）：
 * 顶行=焦点编辑/参考区（首尾帧 or 全能参考多模态上传）/＋角色/收起；提示词；
 * 参数行=模型 · 参数聚合胶囊 · 🎤 · 倍数 · 积分+提交。
 * 提交走真实生成链路（runNode video：创建任务→轮询→取件）。
 */
export default function VideoPromptBar({ id, data }: { id: string; data: PineNodeData }) {
  const setPrompt = useStudioStore((s) => s.setPrompt)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const runNode = useStudioStore((s) => s.runNode)
  const focusNode = useStudioStore((s) => s.focusNode)
  const credits = useStudioStore((s) => s.credits)
  // 上游图片作为首/尾帧参考
  const upstreamImgs = useStudioStore((s) => {
    const refs: { nodeId: string; src: string }[] = []
    for (const e of s.edges) {
      if (e.target !== id) continue
      const src = s.nodes.find((n) => n.id === e.source)
      if (!src) continue
      const img = src.data.versions.find((v) => isImageContent(v.content))?.content
      if (img) refs.push({ nodeId: src.id, src: img })
    }
    return JSON.stringify(refs.slice(0, 2))
  })
  const frames = JSON.parse(upstreamImgs) as { nodeId: string; src: string }[]

  const [openPop, setOpenPop] = useState<'model' | 'params' | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const { params, status } = data
  const running = status === 'running'
  const cost = estimateCost('video', null, params)
  const model = VIDEO_MODELS.find((m) => m.id === (params.videoModel ?? '')) ?? VIDEO_MODELS[0]
  const mode = (params.videoMode ?? 'frames') as 'frames' | 'omni'
  const modeLabel = mode === 'frames' ? '首尾帧' : '全能参考'
  const ratioLabel = (params.videoRatio ?? 'auto') === 'auto' ? '自适应' : params.videoRatio
  const resLabel = params.videoResolution ?? '720p'
  const durationLabel = `${params.videoDuration ?? 5}s`

  const swapped = params.framesSwapped ?? false
  const orderedFrames = swapped ? [...frames].reverse() : frames

  const flash = (msg: string) =>
    window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

  const omniRefs = params.omniRefs ?? []
  const omniVideos = params.omniVideos ?? []

  const omniTotalBytes = (extra: string[]) =>
    [...(params.omniRefs ?? []), ...(params.omniVideos ?? []), ...(params.omniAudios ?? []), ...extra].reduce(
      (sum, u) => sum + dataUrlBytes(u),
      0,
    )

  const handleOmniUpload = (kind: OmniKind, e: React.ChangeEvent<HTMLInputElement>) => {
    const cfg = OMNI_KINDS.find((k) => k.kind === kind)!
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    if (!files.length) return
    const current = (params[cfg.field] ?? []) as string[]
    const slots = cfg.max - current.length
    if (slots <= 0) {
      flash(`${cfg.label}最多 ${cfg.max} 个`)
      return
    }
    const valid = files.filter((f) => f.type.startsWith(cfg.prefix)).slice(0, slots)
    if (!valid.length) {
      flash(`仅支持${cfg.label}文件`)
      return
    }
    Promise.all(
      valid.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            if (file.size > cfg.maxMB * 1024 * 1024) {
              reject(new Error('oversize'))
              return
            }
            const reader = new FileReader()
            reader.onload = () => resolve(String(reader.result))
            reader.onerror = reject
            reader.readAsDataURL(file)
          }),
      ),
    )
      .then((loaded) => {
        // 官方约束：整个请求体 ≤64MB，前端拦截超限
        if (omniTotalBytes(loaded) > 64 * 1024 * 1024) {
          flash('参考素材总大小超过 64MB，请压缩或减少')
          return
        }
        updateNodeParams(id, { [cfg.field]: [...current, ...loaded] } as Partial<NodeParams>)
      })
      .catch(() => flash(`${cfg.label}上传失败（单个需 ≤${cfg.maxMB}MB）`))
  }

  const removeOmni = (field: OmniField, idx: number) => {
    const next = [...((params[field] ?? []) as string[])]
    next.splice(idx, 1)
    updateNodeParams(id, { [field]: next } as Partial<NodeParams>)
  }

  return (
    <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
      <div
        className="relative flex w-[720px] flex-col gap-4 rounded-[24px] border border-white/[0.08] px-5 pb-4 pt-5"
        style={{ maxWidth: 'calc(100vw - 32px)', background: TOKENS.inputBg, boxShadow: SHADOWS.panel }}
        onDoubleClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {!collapsed && (
          <>
            {/* 顶行：焦点编辑 + 参考区（首尾帧 / 全能参考多模态）+ ＋角色 + 收起 */}
            <div className="flex items-start gap-2.5">
              <button
                disabled
                title="焦点编辑（规划中）"
                className="flex h-12 w-12 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] border border-white/[0.08] opacity-50"
                style={{ background: TOKENS.chipBg, color: TOKENS.textBody }}
              >
                <Sparkles size={18} />
              </button>
              <VDivider h={32} />

              {mode === 'frames' ? (
                <div className="flex items-center gap-2.5">
                  {orderedFrames[0] ? (
                    <button
                      title="首帧参考（点击选中上游节点）"
                      onClick={() => focusNode(orderedFrames[0].nodeId)}
                      className="h-12 w-12 shrink-0 overflow-hidden rounded-[14px] border border-white/[0.14] transition hover:border-white/40"
                    >
                      <img src={orderedFrames[0].src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ) : (
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border-[1.5px] border-dashed border-white/20 text-[10px]"
                      style={{ color: TOKENS.textFaint }}
                    >
                      首帧
                    </span>
                  )}

                  <button
                    title="交换首/尾帧"
                    onClick={() => updateNodeParams(id, { framesSwapped: !swapped })}
                    className="shrink-0 transition hover:text-white"
                    style={{ color: TOKENS.textMuted }}
                  >
                    <ArrowLeftRight size={16} />
                  </button>

                  {orderedFrames[1] ? (
                    <button
                      title="尾帧参考（点击选中上游节点）"
                      onClick={() => focusNode(orderedFrames[1].nodeId)}
                      className="h-12 w-12 shrink-0 overflow-hidden rounded-[14px] border border-white/[0.14] transition hover:border-white/40"
                    >
                      <img src={orderedFrames[1].src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ) : (
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border-[1.5px] border-dashed border-white/20"
                      style={{ color: TOKENS.textMuted }}
                      title="连线上游图片节点作为尾帧参考"
                    >
                      <Plus size={18} />
                    </span>
                  )}
                </div>
              ) : (
                /* 全能参考：图 ≤9 / 视频 ≤3 / 音频 ≤3 本地上传，可换行 */
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  {OMNI_KINDS.map((k) => {
                    const list = (params[k.field] ?? []) as string[]
                    return (
                      <Fragment key={k.kind}>
                        {list.map((src, i) => (
                          <div key={`${k.kind}-${i}`} className="group/ref relative h-12 w-12 shrink-0">
                            {k.kind === 'image' ? (
                              <img
                                src={src}
                                alt={`${k.label} ${i + 1}`}
                                className="h-full w-full rounded-[14px] border border-white/[0.14] object-cover"
                              />
                            ) : (
                              <div
                                className="flex h-full w-full items-center justify-center rounded-[14px] border border-white/[0.14]"
                                style={{ background: TOKENS.chipBg, color: TOKENS.textMuted }}
                              >
                                <k.Icon size={18} />
                              </div>
                            )}
                            {k.kind !== 'image' && (
                              <span
                                className="absolute bottom-0.5 left-0.5 rounded px-1 text-[8px]"
                                style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                              >
                                {k.kind === 'video' ? '视频' : '音频'}
                              </span>
                            )}
                            <button
                              title="移除"
                              onClick={() => removeOmni(k.field, i)}
                              className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white group-hover/ref:flex"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                        {list.length < k.max && (
                          <button
                            title={`上传${k.label}（${list.length}/${k.max}）`}
                            onClick={() => inputRefs.current[k.kind]?.click()}
                            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-[14px] border-[1.5px] border-dashed border-white/20 transition hover:border-white/40"
                            style={{ color: TOKENS.textMuted }}
                          >
                            <k.Icon size={14} />
                            <span className="text-[8px]" style={{ color: TOKENS.textFaint }}>
                              {k.label}
                            </span>
                          </button>
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              )}

              <button
                disabled
                title="＋角色：从画布提取角色（规划中）"
                className="flex h-12 w-12 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] opacity-50"
                style={{ background: TOKENS.chipBg, color: TOKENS.textBody }}
              >
                <UserRoundPlus size={18} />
              </button>

              {mode === 'frames' && <span className="flex-1" />}
              <button
                title="收起为单行"
                onClick={() => setCollapsed(true)}
                className="shrink-0 self-start transition hover:text-white"
                style={{ color: TOKENS.textMuted }}
              >
                <Maximize2 size={15} className="rotate-45" />
              </button>
            </div>

            {/* 提示词 */}
            <textarea
              ref={textRef}
              value={data.prompt}
              placeholder={
                mode === 'omni'
                  ? '描述镜头运动与画面变化，或上传参考图/视频/音频作全能参考'
                  : '描述镜头运动与画面变化，或连线上游图片作首尾帧参考'
              }
              onChange={(e) => setPrompt(id, e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="nowheel min-h-[48px] w-full resize-none bg-transparent text-[15px] leading-[1.7] outline-none"
              style={{ color: TOKENS.textBody }}
            />
          </>
        )}

        {/* 参数行 */}
        <div className="flex items-center gap-1.5">
          {collapsed && (
            <button
              title="展开"
              onClick={() => setCollapsed(false)}
              className="shrink-0 transition hover:text-white"
              style={{ color: TOKENS.textMuted }}
            >
              <Maximize2 size={15} className="rotate-45" />
            </button>
          )}

          <div className="relative">
            <Chip
              title="视频模型"
              active={openPop === 'model'}
              onClick={() => setOpenPop(openPop === 'model' ? null : 'model')}
            >
              <Gem size={16} style={{ color: TOKENS.textMuted }} />
              {model.name}
              <ChevronDown size={13} style={{ color: TOKENS.textMuted }} />
            </Chip>
            {openPop === 'model' && (
              <VideoModelPicker
                current={params.videoModel ?? model.id}
                onPick={(mid) => {
                  // 切模型时修正不被新模型支持的分辨率/时长/生成方式，避免发出非法参数
                  const nm = VIDEO_MODELS.find((m) => m.id === mid)
                  const patch: Partial<NodeParams> = { videoModel: mid }
                  if (nm) {
                    const curRes = params.videoResolution ?? '720p'
                    if (!nm.resolutions.includes(curRes)) patch.videoResolution = nm.resolutions[0]
                    const curDur = params.videoDuration ?? 5
                    const clamped = Math.min(nm.durationMax, Math.max(nm.durationMin, curDur))
                    if (clamped !== curDur) patch.videoDuration = clamped
                    if (!nm.omniReference && (params.videoMode ?? 'frames') === 'omni') {
                      patch.videoMode = 'frames'
                      patch.videoRatio = 'auto'
                    }
                  }
                  updateNodeParams(id, patch)
                  setOpenPop(null)
                }}
              />
            )}
          </div>

          <VDivider />

          <div className="relative">
            <button
              title="视频参数"
              onClick={() => setOpenPop(openPop === 'params' ? null : 'params')}
              className="shrink-0 rounded-[12px] px-3.5 py-2 text-[14px] transition hover:bg-white/[0.1]"
              style={{
                background: openPop === 'params' ? 'rgba(255,255,255,0.1)' : TOKENS.chipBg,
                color: TOKENS.textBody,
              }}
            >
              {modeLabel} · {ratioLabel} · {resLabel} · {durationLabel}
            </button>
            {openPop === 'params' && <VideoParamsPopover id={id} data={data} />}
          </div>

          <span className="flex-1" />

          <button
            disabled
            title="语音输入（规划中）"
            className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full opacity-45"
            style={{ color: TOKENS.textBody }}
          >
            <Mic size={17} />
          </button>

          <VDivider />

          <Chip
            title="单次生成条数"
            onClick={() =>
              updateNodeParams(id, { videoMultiplier: (params.videoMultiplier ?? 1) === 1 ? 2 : 1 })
            }
          >
            <span className="font-semibold">{params.videoMultiplier ?? 1}×</span>
          </Chip>

          {/* 积分 + 提交组（本地模拟） */}
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
              onClick={() => {
                const hasRef =
                  mode === 'omni' ? omniRefs.length > 0 || omniVideos.length > 0 : frames.length > 0
                if (!data.prompt.trim() && !hasRef) {
                  flash(
                    mode === 'omni'
                      ? '请先上传参考图/参考视频，或输入提示词'
                      : '请先输入提示词或连线首尾帧参考',
                  )
                  return
                }
                void runNode(id)
              }}
              title="生成视频"
              className="flex h-9 w-9 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed"
              style={{ background: '#F5F5F7' }}
            >
              <ArrowUp size={16} stroke="#0B0B0C" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* 全能参考三类隐藏上传 input（图/视频/音频，均支持多选） */}
      {OMNI_KINDS.map((k) => (
        <input
          key={k.kind}
          ref={(el) => {
            inputRefs.current[k.kind] = el
          }}
          type="file"
          accept={k.accept}
          multiple
          className="hidden"
          onChange={(e) => handleOmniUpload(k.kind, e)}
        />
      ))}
    </NodeToolbar>
  )
}
