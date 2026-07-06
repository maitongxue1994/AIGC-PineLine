import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Clapperboard, X } from 'lucide-react'
import { useStudioStore } from '../store'
import { estimateCost } from '../nodeCatalog'
import { isImageContent, type PineNode } from '../types'
import { SHADOWS, TOKENS } from '../designTokens'

type Candidate = { shotIndex: number; title: string; hasImage: boolean; hasVideo: boolean }

/**
 * 一键成片二次确认（防误点生成一堆视频无法反悔）：打开时读画布快照列出可成片的
 * 镜头（已出图、未挂视频），可勾选要生成的镜头（默认全选已出图未成片的），底部显示
 * 数量与预估积分，确认后才真正派生+生成。
 */
export default function VideoGenConfirmDialog({
  storyboardId,
  onConfirm,
  onClose,
}: {
  storyboardId: string
  onConfirm: (indices: number[]) => void
  onClose: () => void
}) {
  const candidates = useMemo<Candidate[]>(() => {
    const s = useStudioStore.getState()
    const shots = s.edges
      .filter((e) => e.source === storyboardId)
      .map((e) => s.nodes.find((n) => n.id === e.target))
      .filter(
        (n): n is PineNode =>
          !!n && n.data.kind === 'image' && n.data.preset === 'shot' && n.data.params.shotIndex != null,
      )
      .sort((a, b) => a.data.params.shotIndex! - b.data.params.shotIndex!)
    return shots.map((img) => ({
      shotIndex: img.data.params.shotIndex!,
      title: img.data.title,
      hasImage: img.data.versions.some((v) => isImageContent(v.content)),
      hasVideo: s.edges.some((e) => {
        if (e.source !== img.id) return false
        const t = s.nodes.find((n) => n.id === e.target)
        return t?.data.kind === 'video'
      }),
    }))
  }, [storyboardId])

  // 单个视频默认成本（Seedance 2.0 720p 5s）用于预估
  const perVideoCost = useMemo(() => estimateCost('video', null, {}), [])

  // 默认勾选：已出图且未挂视频的镜头
  const [checked, setChecked] = useState<Set<number>>(
    () => new Set(candidates.filter((c) => c.hasImage && !c.hasVideo).map((c) => c.shotIndex)),
  )
  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const selectable = candidates.filter((c) => c.hasImage && !c.hasVideo)
  const allOn = selectable.length > 0 && selectable.every((c) => checked.has(c.shotIndex))
  const toggleAll = () =>
    setChecked(allOn ? new Set() : new Set(selectable.map((c) => c.shotIndex)))

  const count = checked.size
  const estCredits = count * perVideoCost

  const confirm = () => {
    if (!count) return
    onConfirm([...checked].sort((a, b) => a - b))
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-6"
      onClick={onClose}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        className="pl-pop-in flex max-h-[80vh] w-[520px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <Clapperboard size={16} style={{ color: TOKENS.textMuted }} />
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            一键成片 · 确认生成镜头
          </span>
          <span className="flex-1" />
          <button
            title="关闭 (Esc)"
            onClick={onClose}
            className="rounded-full p-1.5 transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between px-5 pt-3 pb-1.5">
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            勾选要生成视频的镜头（生成后消耗积分，不可撤销）
          </span>
          {selectable.length > 0 && (
            <button
              onClick={toggleAll}
              className="text-[12px] transition hover:opacity-80"
              style={{ color: TOKENS.accent }}
            >
              {allOn ? '取消全选' : '全选'}
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2">
          {candidates.map((c) => {
            const disabled = !c.hasImage || c.hasVideo
            const on = checked.has(c.shotIndex)
            return (
              <button
                key={c.shotIndex}
                disabled={disabled}
                onClick={() => toggle(c.shotIndex)}
                className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left transition disabled:cursor-not-allowed disabled:opacity-45 enabled:hover:bg-white/[0.04]"
              >
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border text-[10px]"
                  style={{
                    borderColor: on ? TOKENS.accent : 'rgba(255,255,255,0.25)',
                    background: on ? TOKENS.accent : 'transparent',
                    color: '#fff',
                  }}
                >
                  {on ? '✓' : ''}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px]" style={{ color: TOKENS.textBody }}>
                  #{c.shotIndex + 1} {c.title}
                </span>
                <span className="shrink-0 text-[11px]" style={{ color: TOKENS.textFaint }}>
                  {c.hasVideo ? '已成片' : c.hasImage ? '' : '未出图'}
                </span>
              </button>
            )
          })}
          {candidates.length === 0 && (
            <div className="py-10 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
              还没有已派生的分镜图，请先生成分镜图
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[12px]" style={{ color: TOKENS.textBody }}>
            将生成 <b style={{ color: TOKENS.textTitle }}>{count}</b> 个视频
            <span style={{ color: TOKENS.textFaint }}>（预计约 {estCredits} 积分）</span>
          </span>
          <span className="flex-1" />
          <button
            onClick={onClose}
            className="rounded-full px-4 py-1.5 text-[13px] transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            取消
          </button>
          <button
            onClick={confirm}
            disabled={!count}
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            确认生成 {count || ''}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
