import { memo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { ChevronDown, Clapperboard, FileText, Film, Loader2, Maximize2, Mic, Play, X } from 'lucide-react'
import { useStudioStore } from '../store'
import {
  activeContent,
  isImageContent,
  isVideoContent,
  type PineNode,
  type PineNodeData,
  type ShotItem,
} from '../types'
import { IMAGE_MODELS, presetMeta } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar from './NodeToolbarBar'
import PromptComposer from './PromptComposer'
import PromptEditorDialog from '../dialogs/PromptEditorDialog'
import { CopyButton, SyncInput, SyncTextarea } from './composerKit'

const CARD_W = 340

/**
 * 分镜派生面板（store 驱动，已派生状态从下游节点实时计算）：
 * - 未全部派生：可展开勾选未派生镜头 → 派生（带取消）
 * - 已全部派生：入口直接变「全部生成图片」，不再重复派生（缺提示词的自动补齐）
 */
function ShotDerivePanel({ id, shots }: { id: string; shots: ShotItem[] }) {
  const deriveShotImageNodes = useStudioStore((s) => s.deriveShotImageNodes)
  const generateAllShotImages = useStudioStore((s) => s.generateAllShotImages)
  const deriveShotVideoNodes = useStudioStore((s) => s.deriveShotVideoNodes)
  const pipelineRunning = useStudioStore((s) => s.pipelineRunning)

  // 已派生的镜头下标（沿连线找下游分镜图节点的 shotIndex；序列化避免选择器每次新引用）
  const derivedKey = useStudioStore((s) => {
    const set = new Set<number>()
    for (const e of s.edges) {
      if (e.source !== id) continue
      const n = s.nodes.find((x) => x.id === e.target)
      if (n && n.data.kind === 'image' && n.data.preset === 'shot' && n.data.params.shotIndex != null) {
        set.add(n.data.params.shotIndex)
      }
    }
    return [...set].sort((a, b) => a - b).join(',')
  })
  const derived = new Set(derivedKey ? derivedKey.split(',').map(Number) : [])
  const undived = shots.map((_, i) => i).filter((i) => !derived.has(i))
  const allDerived = shots.length > 0 && undived.length === 0

  // 一键成片阶段状态：已出图的分镜图数 / 已挂视频节点数 / 待生成的视频节点数（序列化防新引用）
  const videoStageKey = useStudioStore((s) => {
    let withImage = 0
    let withVideo = 0
    let videoPending = 0
    for (const e of s.edges) {
      if (e.source !== id) continue
      const n = s.nodes.find((x) => x.id === e.target)
      if (!n || n.data.kind !== 'image' || n.data.preset !== 'shot' || n.data.params.shotIndex == null)
        continue
      if (n.data.versions.some((v) => isImageContent(v.content))) withImage++
      const videos = s.edges
        .filter((e2) => e2.source === n.id)
        .map((e2) => s.nodes.find((x) => x.id === e2.target))
        .filter((x) => x?.data.kind === 'video')
      if (videos.length) withVideo++
      videoPending += videos.filter(
        (v) => v!.data.status !== 'running' && !v!.data.versions.some((x) => isVideoContent(x.content)),
      ).length
    }
    return `${withImage},${withVideo},${videoPending}`
  })
  const [withImage, withVideo, videoPending] = videoStageKey.split(',').map(Number)

  const deriveVideos = async () => {
    if (busy || pipelineRunning) return
    setBusy(true)
    try {
      await deriveShotVideoNodes(id)
    } finally {
      setBusy(false)
    }
  }

  const runAllShotVideos = () => {
    if (pipelineRunning) return
    const s = useStudioStore.getState()
    const vids: string[] = []
    for (const e of s.edges) {
      if (e.source !== id) continue
      const img = s.nodes.find((x) => x.id === e.target)
      if (!img || img.data.kind !== 'image' || img.data.preset !== 'shot') continue
      for (const e2 of s.edges) {
        if (e2.source !== img.id) continue
        const v = s.nodes.find((x) => x.id === e2.target)
        // 只跑还没有产出的视频节点，避免重复扣积分重生成
        if (
          v?.data.kind === 'video' &&
          v.data.status !== 'running' &&
          !v.data.versions.some((x) => isVideoContent(x.content))
        )
          vids.push(v.id)
      }
    }
    if (vids.length) void useStudioStore.getState().runPipeline(vids)
  }

  const [open, setOpen] = useState(false)
  // 展开时默认全选未派生镜头
  const [checked, setChecked] = useState<Set<number>>(() => new Set())
  const [busy, setBusy] = useState(false)
  // 批量生图模型（undefined = 各节点默认 Gemini）；用户实测要求派生/批量生成可选模型
  const [imageModel, setImageModel] = useState<string | undefined>(undefined)

  const openPanel = () => {
    setChecked(new Set(undived))
    setOpen(true)
  }
  const toDerive = [...checked].filter((i) => !derived.has(i))
  const allOn = toDerive.length === undived.length && undived.length > 0
  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const derive = async () => {
    if (busy || !toDerive.length) return
    setBusy(true)
    try {
      await deriveShotImageNodes(id, toDerive.sort((a, b) => a - b), { imageModel })
      setOpen(false)
    } finally {
      setBusy(false)
    }
  }

  const generateAll = async () => {
    if (busy || pipelineRunning) return
    setBusy(true)
    try {
      await generateAllShotImages(id, { imageModel })
    } finally {
      setBusy(false)
    }
  }

  const btn =
    'flex items-center justify-center gap-1.5 rounded-[8px] px-3 py-2 text-[12px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-45'

  // 生图模型选择（分段小胶囊）：undefined = 默认（各节点自己的设置/Gemini）
  const modelPicker = (
    <div className="space-y-1 px-0.5">
      <div className="flex items-center gap-1">
        <span className="shrink-0 text-[10px]" style={{ color: TOKENS.textFaint }}>
          生图模型
        </span>
        {IMAGE_MODELS.map((m) => {
          const active = imageModel === m.id
          return (
            <button
              key={m.id}
              onClick={() => setImageModel(active ? undefined : m.id)}
              title={active ? '再点一次恢复默认' : m.desc}
              className="rounded-full px-2 py-0.5 text-[10px] transition"
              style={{
                background: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.05)',
                color: active ? '#F5F5F7' : TOKENS.textMuted,
              }}
            >
              {m.name}
            </button>
          )
        })}
      </div>
      <div className="text-[10px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
        画面含人物且要生成 Seedance 视频时建议选 Seedream（Seedance 2.0 不接受疑似真人人脸的参考图）
      </div>
    </div>
  )

  return (
    <div className="nodrag border-t border-white/[0.06] p-2.5">
      {allDerived ? (
        // 全部镜头都已派生分镜图节点：入口直接生成全部图片（缺提示词的自动补齐）
        <div className="space-y-1.5">
        {modelPicker}
        <button
          onClick={() => void generateAll()}
          disabled={busy || pipelineRunning}
          className={`${btn} w-full`}
          style={{ background: '#F5F5F7', color: '#0B0B0C' }}
        >
          {busy || pipelineRunning ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Play size={12} />
          )}
          {busy || pipelineRunning ? '生成中…' : `全部生成图片（${shots.length} 张）`}
        </button>
        {/* 一键成片：分镜图出图后派生镜头视频节点（预填官方公式提示词），再整批生成 */}
        {withImage > 0 && withVideo < derived.size && (
          <button
            onClick={() => void deriveVideos()}
            disabled={busy || pipelineRunning}
            className={`${btn} w-full`}
            style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
          >
            <Film size={12} />
            一键成片（{derived.size - withVideo} 镜头 → 视频）
          </button>
        )}
        {videoPending > 0 && (
          <button
            onClick={runAllShotVideos}
            disabled={pipelineRunning}
            className={`${btn} w-full`}
            style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
          >
            {pipelineRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {pipelineRunning ? '生成中…' : `生成全部镜头视频（${videoPending}）`}
          </button>
        )}
        </div>
      ) : !open ? (
        <button
          onClick={openPanel}
          className={`${btn} w-full`}
          style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
        >
          <Clapperboard size={13} />
          {derived.size ? `继续派生分镜图（剩 ${undived.length}）` : '生成分镜图（全部或单选）'}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-semibold" style={{ color: TOKENS.textBody }}>
              选择要派生的镜头（{toDerive.length}/{undived.length}）
            </span>
            <button
              onClick={() => setChecked(allOn ? new Set() : new Set(undived))}
              className="text-[11px] transition hover:text-white"
              style={{ color: TOKENS.textMuted }}
            >
              {allOn ? '全不选' : '全选'}
            </button>
          </div>
          <div className="nowheel max-h-[140px] space-y-1 overflow-y-auto">
            {shots.map((s, i) => {
              const isDerived = derived.has(i)
              return (
                <label
                  key={s.id}
                  className={`flex items-center gap-2 rounded-[6px] px-1.5 py-1 transition ${
                    isDerived ? 'cursor-default opacity-45' : 'cursor-pointer hover:bg-white/[0.05]'
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={isDerived}
                    checked={isDerived || checked.has(i)}
                    onChange={() => toggle(i)}
                    className="h-3 w-3 accent-white"
                  />
                  <span className="truncate text-[11px]" style={{ color: TOKENS.textSecondary }}>
                    #{i + 1} {s.title}
                  </span>
                  {isDerived && (
                    <span className="ml-auto shrink-0 text-[10px]" style={{ color: TOKENS.textFaint }}>
                      已派生
                    </span>
                  )}
                </label>
              )
            })}
          </div>
          {modelPicker}
          <div className="flex gap-1.5">
            <button
              onClick={() => void derive()}
              disabled={busy || !toDerive.length}
              className={`${btn} flex-1`}
              style={{ background: '#F5F5F7', color: '#0B0B0C' }}
            >
              {busy ? <Loader2 size={12} className="animate-spin" /> : <Clapperboard size={12} />}
              {busy ? '生成提示词中…' : `派生 ${toDerive.length} 个分镜图`}
            </button>
            <button
              onClick={() => setOpen(false)}
              disabled={busy}
              className={btn}
              style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
            >
              <X size={12} /> 取消
            </button>
          </div>
          <div className="px-0.5 text-[10px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
            派生后会为每个分镜图节点生成生图提示词（可确认/编辑），再单独运行或用「全部生成图片」
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 音色设定折叠面板（storyboard 节点）：旁白音色串 + 角色音色表。
 * 官方公式：性别+年龄区间+声音属性+语速+情绪基线（Seedance 1.5 Pro 指南，2.0 指南沿用）；
 * 派生镜头视频时由 buildVideoPrompt 自动注入，保证整条管线多段视频音色一致。
 */
function VoicePanel({ id, data }: { id: string; data: PineNodeData }) {
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const configured = !!(data.params.voiceNarration?.trim() || data.params.voiceCast?.trim())
  const [open, setOpen] = useState(false)

  return (
    <div className="nodrag border-t border-white/[0.06]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 px-3 py-2 text-[11px] font-semibold transition hover:bg-white/[0.03]"
        style={{ color: TOKENS.textBody }}
      >
        <Mic size={12} style={{ color: TOKENS.textMuted }} />
        音色设定
        <span className="font-normal" style={{ color: configured ? '#4BBF6B' : TOKENS.textFaint }}>
          {configured ? '已设置' : '· 保证多镜头声音一致'}
        </span>
        <ChevronDown
          size={12}
          className={`ml-auto transition-transform ${open ? 'rotate-180' : ''}`}
          style={{ color: TOKENS.textMuted }}
        />
      </button>
      {open && (
        <div className="space-y-1.5 px-3 pb-2.5">
          <SyncInput
            value={data.params.voiceNarration ?? ''}
            onValueChange={(v) => updateNodeParams(id, { voiceNarration: v })}
            placeholder="旁白音色：如 中年男性，声音低沉温润，语速偏慢，情绪平静克制"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="w-full rounded-[8px] bg-white/[0.04] px-2.5 py-1.5 text-[11px] outline-none placeholder:text-white/25"
            style={{ color: TOKENS.textBody }}
          />
          <SyncTextarea
            value={data.params.voiceCast ?? ''}
            onValueChange={(v) => updateNodeParams(id, { voiceCast: v })}
            placeholder={'角色音色（每行一个）：\n张三：青年男声，明亮有弹性，语速中等偏快\n李四：老年女声，沙哑缓慢，情绪温和'}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="nowheel min-h-[56px] w-full resize-none rounded-[8px] bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-relaxed outline-none placeholder:text-white/25"
            style={{ color: TOKENS.textBody }}
          />
          <div className="text-[10px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
            官方音色公式：性别 + 年龄区间 + 声音属性 + 语速 + 情绪基线；派生镜头视频时自动注入提示词
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 文本内容节点（TapNow 式内容卡）：卡片即正文；
 * 分镜预设展示结构化镜头列表 + 两段式「生成分镜图」派生面板。
 */
function TextNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const updateActiveContent = useStudioStore((s) => s.updateActiveContent)
  const [editorOpen, setEditorOpen] = useState(false)

  const meta = presetMeta(data.preset)
  const output = activeContent(data)
  const running = data.status === 'running'
  const shots = data.preset === 'storyboard' ? data.shots ?? [] : []

  // 文本下载走 text/plain data URL
  const downloadHref = output
    ? `data:text/plain;charset=utf-8,${encodeURIComponent(output)}`
    : null

  return (
    <NodeShell
      id={id}
      data={data}
      selected={selected}
      width={CARD_W}
      typeIcon={<FileText />}
      toolbar={
        <NodeToolbarBar
          id={id}
          kind="text"
          hasImage={false}
          output={downloadHref}
          filename={`${data.title}.txt`}
        />
      }
      composer={<PromptComposer id={id} data={data} />}
    >
      <div className="min-h-[120px]" style={{ background: '#131316' }}>
        {running ? (
          <div className="flex h-[120px] items-center justify-center">
            <Loader2 size={20} className="animate-spin" style={{ color: TOKENS.textMuted }} />
          </div>
        ) : shots.length > 0 ? (
          <>
            <div className="nowheel max-h-[280px] space-y-2 overflow-y-auto p-4">
              {shots.map((s, i) => (
                <div key={s.id} className="rounded-[8px] bg-white/[0.04] p-2.5">
                  <div className="text-[12px] font-semibold" style={{ color: TOKENS.textBody }}>
                    #{i + 1} {s.title}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed" style={{ color: TOKENS.textSecondary }}>
                    {s.description}
                  </div>
                </div>
              ))}
            </div>
            <VoicePanel id={id} data={data} />
            {/* key=镜头数：分镜重跑后面板重挂载，勾选态回到全选 */}
            <ShotDerivePanel key={shots.length} id={id} shots={shots} />
          </>
        ) : output != null ? (
          <div className="group/body relative">
            {/* 半受控（SyncTextarea）：正文同样走 store→RF→data 异步回流链，受控写法会杀 IME/甩光标 */}
            <SyncTextarea
              value={output}
              onValueChange={(v) => updateActiveContent(id, v)}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="nodrag nowheel block h-[240px] w-full resize-none bg-transparent p-4 pr-9 text-[13px] leading-relaxed outline-none"
              style={{ color: TOKENS.textBody }}
            />
            <button
              title="展开编辑器"
              onClick={(e) => {
                e.stopPropagation()
                setEditorOpen(true)
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="nodrag absolute right-4 top-1.5 rounded-[8px] bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition hover:bg-white/[0.14] group-hover/body:opacity-100"
              style={{ color: TOKENS.textMuted }}
            >
              <Maximize2 size={13} />
            </button>
            <CopyButton
              text={output}
              title="复制正文"
              iconSize={13}
              className="nodrag absolute right-12 top-1.5 rounded-[8px] bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition hover:bg-white/[0.14] group-hover/body:opacity-100"
              style={{ color: TOKENS.textMuted }}
            />
            {editorOpen && (
              <PromptEditorDialog
                title={`${data.title} · 正文`}
                value={output}
                maxLength={20000}
                onChange={(v) => updateActiveContent(id, v)}
                onClose={() => setEditorOpen(false)}
              />
            )}
          </div>
        ) : (
          <div
            className="flex h-[120px] items-center justify-center px-6 text-center text-[12px] leading-relaxed"
            style={{ color: TOKENS.textFaint }}
          >
            {meta ? `${meta.label} · 选中后在下方输入提示词并运行` : '未生成'}
          </div>
        )}
      </div>
    </NodeShell>
  )
}

export default memo(TextNodeInner)
