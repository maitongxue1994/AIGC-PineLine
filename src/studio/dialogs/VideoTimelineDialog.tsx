import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Film, Loader2, X } from 'lucide-react'
import { useStudioStore } from '../store'
import { activeContent, isVideoContent, type PineNode } from '../types'
import { stitchVideos } from '../stitchVideos'
import { SHADOWS, TOKENS } from '../designTokens'

type Clip = { id: string; title: string; url: string; duration: number }

/** 从「镜头视频 N」标题里取序号排序 */
function shotOrder(title: string): number {
  const m = title.match(/(\d+)/)
  return m ? Number(m[1]) : 9999
}

/**
 * 时间轴拼接导出（第一期）：把画布上已生成的镜头视频按镜头序拼成一整段完整视频。
 * 纯浏览器实时录制（stitchVideos），保留画面+音频，导出 webm/mp4。精剪仍建议用剪辑软件。
 */
export default function VideoTimelineDialog({ onClose }: { onClose: () => void }) {
  const clips = useMemo<Clip[]>(() => {
    const s = useStudioStore.getState()
    return s.nodes
      .filter((n: PineNode) => n.data.kind === 'video')
      .map((n): Clip | null => {
        const url = activeContent(n.data)
        return url && isVideoContent(url)
          ? { id: n.id, title: n.data.title, url, duration: n.data.params.videoDuration ?? 5 }
          : null
      })
      .filter((c): c is Clip => c !== null)
      .sort((a, b) => shotOrder(a.title) - shotOrder(b.title))
  }, [])

  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const totalDur = clips.reduce((s, c) => s + c.duration, 0)

  const doExport = async () => {
    if (busy || !clips.length) return
    setBusy(true)
    setProgress({ done: 0, total: clips.length })
    try {
      const blob = await stitchVideos(
        clips.map((c) => c.url),
        (done, total) => setProgress({ done, total }),
      )
      const ext = blob.type.includes('mp4') ? 'mp4' : 'webm'
      const name = (useStudioStore.getState().projectName.trim() || 'pineline') + '-完整片'
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${name}.${ext}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
      window.dispatchEvent(new CustomEvent('pineline:flash', { detail: '完整视频已导出' }))
      onClose()
    } catch (err) {
      window.dispatchEvent(
        new CustomEvent('pineline:flash', {
          detail: `拼接失败：${err instanceof Error ? err.message : String(err)}`,
        }),
      )
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6"
      onClick={busy ? undefined : onClose}
    >
      <div
        className="flex max-h-[82vh] w-[720px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <Film size={16} style={{ color: TOKENS.textMuted }} />
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            时间轴 · 拼接完整视频
          </span>
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            {clips.length} 段 · 约 {totalDur}s
          </span>
          <span className="flex-1" />
          {!busy && (
            <button
              onClick={onClose}
              className="rounded-full p-1.5 transition hover:bg-white/[0.08]"
              style={{ color: TOKENS.textMuted }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* 时间轴（横向缩略图条，镜头序） */}
        <div className="min-h-0 flex-1 overflow-x-auto p-4">
          {clips.length === 0 ? (
            <div className="py-12 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
              画布上还没有已生成的镜头视频
            </div>
          ) : (
            <div className="flex gap-2">
              {clips.map((c, i) => (
                <div key={c.id} className="shrink-0" style={{ width: 148 }}>
                  <div className="relative overflow-hidden rounded-[10px] border border-white/[0.08]" style={{ aspectRatio: '16/9' }}>
                    <video src={c.url} className="h-full w-full object-cover" muted preload="metadata" />

                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">
                      {c.duration}s
                    </span>
                    <span className="absolute left-1 top-1 rounded bg-black/70 px-1 text-[10px] text-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-[11px]" style={{ color: TOKENS.textMuted }} title={c.title}>
                    {c.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[11px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
            按镜头序拼接为一整段（保留音画）。浏览器实时录制，约需 {totalDur}s；精剪建议用剪辑软件。
          </span>
          <span className="flex-1" />
          <button
            onClick={() => void doExport()}
            disabled={busy || !clips.length}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            {busy ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                拼接中 {progress ? `${progress.done}/${progress.total}` : ''}
              </>
            ) : (
              <>
                <Film size={13} /> 导出完整视频
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
