import { useRef, useState } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  ArrowLeftRight,
  ArrowUp,
  ChevronDown,
  Gem,
  Maximize2,
  Mic,
  Plus,
  Sparkles,
  UserRoundPlus,
  Zap,
} from 'lucide-react'
import { useStudioStore } from '../../store'
import { estimateCost, VIDEO_MODELS } from '../../nodeCatalog'
import { SHADOWS, TOKENS } from '../../designTokens'
import { Chip, VDivider } from '../composerKit'
import { isImageContent, type PineNodeData } from '../../types'
import VideoModelPicker from './VideoModelPicker'
import VideoParamsPopover from './VideoParamsPopover'

/**
 * 视频生成输入栏（video-node-tools §5）：
 * 顶行=焦点编辑/首尾帧参考(⇄交换)/添加参考/＋角色/收起；提示词；
 * 参数行=模型 · 参数聚合胶囊 · 🎤 · 倍数 · 积分+提交。
 * 生成后端接入规划中：提交给出诚实 Toast（runNode 内处理）。
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
  const [swapped, setSwapped] = useState(false)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const { params, status } = data
  const running = status === 'running'
  const cost = estimateCost('video', null, params)
  const model = VIDEO_MODELS.find((m) => m.id === (params.videoModel ?? '')) ?? VIDEO_MODELS[0]
  const modeLabel = (params.videoMode ?? 'frames') === 'frames' ? '首尾帧' : '全能参考'
  const ratioLabel = (params.videoRatio ?? 'auto') === 'auto' ? '自适应' : params.videoRatio
  const durationLabel = `${params.videoDuration ?? 10}s`

  const orderedFrames = swapped ? [...frames].reverse() : frames

  const flash = (msg: string) =>
    window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

  return (
    <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
      <div
        className="relative flex w-[720px] flex-col gap-4 rounded-[24px] border border-white/[0.08] px-5 pb-4 pt-5"
        style={{ background: TOKENS.inputBg, boxShadow: SHADOWS.panel }}
        onDoubleClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {!collapsed && (
          <>
            {/* 顶行：焦点编辑 + 首尾帧参考 + ＋角色 + 收起 */}
            <div className="flex items-center gap-2.5">
              <button
                disabled
                title="焦点编辑（规划中）"
                className="flex h-12 w-12 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] border border-white/[0.08] opacity-50"
                style={{ background: TOKENS.chipBg, color: TOKENS.textBody }}
              >
                <Sparkles size={18} />
              </button>
              <VDivider h={32} />

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
                onClick={() => setSwapped((v) => !v)}
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

              <button
                disabled
                title="＋角色：从画布提取角色（规划中）"
                className="flex h-12 w-12 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] opacity-50"
                style={{ background: TOKENS.chipBg, color: TOKENS.textBody }}
              >
                <UserRoundPlus size={18} />
              </button>

              <span className="flex-1" />
              <button
                title="收起为单行"
                onClick={() => setCollapsed(true)}
                className="self-start transition hover:text-white"
                style={{ color: TOKENS.textMuted }}
              >
                <Maximize2 size={15} className="rotate-45" />
              </button>
            </div>

            {/* 提示词 */}
            <textarea
              ref={textRef}
              value={data.prompt}
              placeholder="描述镜头运动与画面变化，或连线上游图片作首尾帧参考"
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
                  updateNodeParams(id, { videoModel: mid })
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
              {modeLabel} · {ratioLabel} · {durationLabel}
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
                if (!data.prompt.trim() && !frames.length) {
                  flash('请先输入提示词或连线首尾帧参考')
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
    </NodeToolbar>
  )
}
