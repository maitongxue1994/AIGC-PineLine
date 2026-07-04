import { memo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { Clapperboard, FileText, Loader2, Maximize2, Play, X } from 'lucide-react'
import { useStudioStore } from '../store'
import { activeContent, type PineNode, type ShotItem } from '../types'
import { presetMeta } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar from './NodeToolbarBar'
import PromptComposer from './PromptComposer'
import PromptEditorDialog from '../dialogs/PromptEditorDialog'
import { SyncTextarea } from './composerKit'

const CARD_W = 340

/**
 * 分镜派生面板（store 驱动，已派生状态从下游节点实时计算）：
 * - 未全部派生：可展开勾选未派生镜头 → 派生（带取消）
 * - 已全部派生：入口直接变「全部生成图片」，不再重复派生（缺提示词的自动补齐）
 */
function ShotDerivePanel({ id, shots }: { id: string; shots: ShotItem[] }) {
  const deriveShotImageNodes = useStudioStore((s) => s.deriveShotImageNodes)
  const generateAllShotImages = useStudioStore((s) => s.generateAllShotImages)
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

  const [open, setOpen] = useState(false)
  // 展开时默认全选未派生镜头
  const [checked, setChecked] = useState<Set<number>>(() => new Set())
  const [busy, setBusy] = useState(false)

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
      await deriveShotImageNodes(id, toDerive.sort((a, b) => a - b))
      setOpen(false)
    } finally {
      setBusy(false)
    }
  }

  const generateAll = async () => {
    if (busy || pipelineRunning) return
    setBusy(true)
    try {
      await generateAllShotImages(id)
    } finally {
      setBusy(false)
    }
  }

  const btn =
    'flex items-center justify-center gap-1.5 rounded-[8px] px-3 py-2 text-[12px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-45'

  return (
    <div className="nodrag border-t border-white/[0.06] p-2.5">
      {allDerived ? (
        // 全部镜头都已派生分镜图节点：入口直接生成全部图片（缺提示词的自动补齐）
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
