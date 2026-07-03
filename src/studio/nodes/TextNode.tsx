import { memo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { Clapperboard, FileText, Loader2, Play } from 'lucide-react'
import { useStudioStore } from '../store'
import { activeContent, type PineNode, type ShotItem } from '../types'
import { presetMeta } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar from './NodeToolbarBar'
import PromptComposer from './PromptComposer'

const CARD_W = 340

/**
 * 分镜两段式派生面板：勾选镜头（默认全选）→ 派生分镜图节点并生成生图提示词
 * （节点保持待运行，用户确认/编辑提示词后再生图）→ 一键全部生成图片。
 */
function ShotDerivePanel({ id, shots }: { id: string; shots: ShotItem[] }) {
  const deriveShotImageNodes = useStudioStore((s) => s.deriveShotImageNodes)
  const runPipeline = useStudioStore((s) => s.runPipeline)
  const pipelineRunning = useStudioStore((s) => s.pipelineRunning)

  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState<Set<number>>(() => new Set(shots.map((_, i) => i)))
  const [busy, setBusy] = useState(false)
  const [derivedIds, setDerivedIds] = useState<string[]>([])

  const allOn = checked.size === shots.length
  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const derive = async () => {
    if (busy || !checked.size) return
    setBusy(true)
    try {
      const ids = await deriveShotImageNodes(id, [...checked].sort((a, b) => a - b))
      setDerivedIds(ids)
    } finally {
      setBusy(false)
    }
  }

  const btn =
    'flex items-center justify-center gap-1.5 rounded-[8px] px-3 py-2 text-[12px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-45'

  return (
    <div className="nodrag border-t border-white/[0.06] p-2.5">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className={`${btn} w-full`}
          style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
        >
          <Clapperboard size={13} /> 生成分镜图（全部或单选）
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-semibold" style={{ color: TOKENS.textBody }}>
              选择要生成的镜头（{checked.size}/{shots.length}）
            </span>
            <button
              onClick={() =>
                setChecked(allOn ? new Set() : new Set(shots.map((_, i) => i)))
              }
              className="text-[11px] transition hover:text-white"
              style={{ color: TOKENS.textMuted }}
            >
              {allOn ? '全不选' : '全选'}
            </button>
          </div>
          <div className="nowheel max-h-[140px] space-y-1 overflow-y-auto">
            {shots.map((s, i) => (
              <label
                key={s.id}
                className="flex cursor-pointer items-center gap-2 rounded-[6px] px-1.5 py-1 transition hover:bg-white/[0.05]"
              >
                <input
                  type="checkbox"
                  checked={checked.has(i)}
                  onChange={() => toggle(i)}
                  className="h-3 w-3 accent-white"
                />
                <span className="truncate text-[11px]" style={{ color: TOKENS.textSecondary }}>
                  #{i + 1} {s.title}
                </span>
              </label>
            ))}
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => void derive()}
              disabled={busy || !checked.size}
              className={`${btn} flex-1`}
              style={{ background: '#F5F5F7', color: '#0B0B0C' }}
            >
              {busy ? <Loader2 size={12} className="animate-spin" /> : <Clapperboard size={12} />}
              {busy ? '生成提示词中…' : `派生 ${checked.size} 个分镜图`}
            </button>
            {derivedIds.length > 0 && (
              <button
                onClick={() => void runPipeline(derivedIds)}
                disabled={pipelineRunning}
                className={`${btn} flex-1`}
                style={{ background: 'rgba(63,155,245,0.16)', color: '#8FC2F8' }}
              >
                <Play size={12} /> 全部生成图片
              </button>
            )}
          </div>
          {derivedIds.length > 0 && (
            <div className="px-0.5 text-[10px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
              提示词已回填到各分镜图节点，可先逐个确认/编辑，再单独运行或点上方「全部生成图片」
            </div>
          )}
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
          <textarea
            value={output}
            onChange={(e) => updateActiveContent(id, e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="nodrag nowheel block h-[240px] w-full resize-none bg-transparent p-4 text-[13px] leading-relaxed outline-none"
            style={{ color: TOKENS.textBody }}
          />
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
