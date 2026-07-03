import { useCallback, useEffect, useRef, useState } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import { Check, Sparkles, X } from 'lucide-react'
import { useStudioStore } from '../../store'
import { SHADOWS, TOKENS } from '../../designTokens'

const SNAP = 0.5
const FINE = 0.01
const THUMBS = 9

/**
 * 剪辑模式（video-node-tools §8）：缩略帧时间轴 + 选区把手（吸附 0.5s / Shift 精确 0.01s）
 * + 快捷键（Shift+←/→ 微调、Space 预览、Enter 确认）+ 智能剪辑（模拟异步）。
 * 确认 → 派生软剪辑视频节点并连线。
 */
export default function VideoTrimMode({
  id,
  src,
  duration,
  initial,
  onCancel,
  onDone,
}: {
  id: string
  src: string
  duration: number
  initial?: { start: number; end: number }
  onCancel: () => void
  onDone: () => void
}) {
  const deriveVideoNode = useStudioStore((s) => s.deriveVideoNode)
  const total = duration || initial?.end || 10

  const [start, setStart] = useState(initial?.start ?? 0)
  const [end, setEnd] = useState(Math.min(initial?.end ?? total, total))
  const [precision, setPrecision] = useState(false)
  const [thumbs, setThumbs] = useState<string[]>([])
  const [smart, setSmart] = useState<'idle' | 'running' | 'done'>('idle')
  const [smartPct, setSmartPct] = useState(0)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<'start' | 'end' | null>(null)
  const previewRef = useRef<HTMLVideoElement | null>(null)

  // 离屏采样缩略帧
  useEffect(() => {
    let cancelled = false
    const v = document.createElement('video')
    v.muted = true
    v.playsInline = true
    v.src = src
    const frames: string[] = []
    let i = 0
    v.onloadedmetadata = () => {
      const c = document.createElement('canvas')
      const h = 64
      const w = Math.round((h * (v.videoWidth || 16)) / (v.videoHeight || 9))
      c.width = w
      c.height = h
      const g = c.getContext('2d')!
      const step = () => {
        if (cancelled) return
        v.currentTime = Math.min(v.duration - 0.05, (v.duration * i) / (THUMBS - 1) + 0.01)
      }
      v.onseeked = () => {
        if (cancelled) return
        g.drawImage(v, 0, 0, w, h)
        frames.push(c.toDataURL('image/jpeg', 0.6))
        i++
        if (i < THUMBS) step()
        else setThumbs([...frames])
      }
      step()
    }
    return () => {
      cancelled = true
      v.src = ''
    }
  }, [src])

  const confirm = useCallback(() => {
    if (end - start < 0.1) {
      window.dispatchEvent(new CustomEvent('pineline:flash', { detail: '选区太短，至少 0.1s' }))
      return
    }
    deriveVideoNode(id, {
      title: '剪辑视频',
      trim: { start: Number(start.toFixed(2)), end: Number(end.toFixed(2)) },
    })
    window.dispatchEvent(new CustomEvent('pineline:flash', { detail: '✓ 已生成剪辑节点' }))
    onDone()
  }, [start, end, id, deriveVideoNode, onDone])

  // 快捷键：Shift+←/→ 微调、Space 预览、Enter 确认、Esc 取消
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCancel()
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        confirm()
        return
      }
      if (e.key === ' ') {
        e.preventDefault()
        const v = previewRef.current
        if (!v) return
        if (v.paused) {
          v.currentTime = start
          void v.play()
        } else v.pause()
        return
      }
      if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault()
        const d = e.key === 'ArrowLeft' ? -FINE : FINE
        setEnd((cur) => Math.max(start + 0.1, Math.min(total, cur + d)))
      }
      if (e.shiftKey) setPrecision(true)
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (!e.shiftKey) setPrecision(false)
    }
    window.addEventListener('keydown', onKey, true)
    window.addEventListener('keyup', onKeyUp, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('keyup', onKeyUp, true)
    }
  }, [confirm, onCancel, start, total])

  // 预览播放 clamp
  useEffect(() => {
    const v = previewRef.current
    if (!v) return
    const onTime = () => {
      if (v.currentTime >= end) {
        v.pause()
        v.currentTime = start
      }
    }
    v.addEventListener('timeupdate', onTime)
    return () => v.removeEventListener('timeupdate', onTime)
  }, [start, end])

  const posToTime = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return 0
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    let t = ratio * total
    if (!precision) t = Math.round(t / SNAP) * SNAP
    return t
  }

  const onTrackPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    e.stopPropagation()
    const t = posToTime(e.clientX)
    if (dragRef.current === 'start') setStart(Math.max(0, Math.min(t, end - 0.1)))
    else setEnd(Math.min(total, Math.max(t, start + 0.1)))
  }

  const runSmartClip = () => {
    if (smart === 'running') return
    setSmart('running')
    setSmartPct(0)
    const timer = setInterval(() => {
      setSmartPct((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setSmart('done')
          return 100
        }
        return p + 7
      })
    }, 180)
  }

  const leftPct = (start / total) * 100
  const rightPct = (end / total) * 100

  const keycap = (label: string) => (
    <span
      className="rounded-[6px] px-2 py-0.5 font-mono text-[12px]"
      style={{ background: 'rgba(255,255,255,0.1)', color: '#D6D6DB' }}
    >
      {label}
    </span>
  )

  return (
    <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
      <div
        className="flex w-[640px] flex-col gap-3 rounded-[20px] border border-white/[0.08] p-4"
        style={{ background: TOKENS.inputBg, boxShadow: SHADOWS.panel }}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {/* 隐藏预览元素（Space 试听） */}
        <video ref={previewRef} src={src} muted playsInline className="hidden" />

        {/* 时间轴行 */}
        <div className="flex items-center gap-3">
          <button
            title="取消剪辑 (Esc)"
            onClick={onCancel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:bg-white/[0.12]"
            style={{ background: '#2A2A2D', color: TOKENS.textBody }}
          >
            <X size={16} />
          </button>

          <div
            ref={trackRef}
            className="relative h-16 min-w-0 flex-1 select-none overflow-hidden rounded-[14px]"
            style={{ background: '#0A0A0B', touchAction: 'none' }}
            onPointerMove={onTrackPointerMove}
            onPointerUp={() => (dragRef.current = null)}
          >
            {/* 缩略帧 */}
            <div className="absolute inset-0 flex">
              {thumbs.length
                ? thumbs.map((t, i) => (
                    <img key={i} src={t} alt="" className="h-full min-w-0 flex-1 object-cover" />
                  ))
                : Array.from({ length: THUMBS }, (_, i) => (
                    <div key={i} className="h-full min-w-0 flex-1" style={{ background: i % 2 ? '#141416' : '#18181A' }} />
                  ))}
            </div>
            {/* 区外压暗 */}
            <div className="absolute inset-y-0 left-0" style={{ width: `${leftPct}%`, background: 'rgba(0,0,0,0.55)' }} />
            <div className="absolute inset-y-0 right-0" style={{ width: `${100 - rightPct}%`, background: 'rgba(0,0,0,0.55)' }} />
            {/* 选区窗口 */}
            <div
              className="absolute inset-y-0 rounded-[9px]"
              style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%`, border: '2.5px solid #fff' }}
            >
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[14px] font-bold text-white"
                style={{ background: 'rgba(10,10,12,0.8)' }}
              >
                {(end - start).toFixed(2)}s
              </span>
              {/* 左右把手：视觉 5×26，命中区 16px（先设 dragRef 再捕获指针） */}
              <span
                className="absolute left-[-9px] top-0 flex h-full w-4 cursor-ew-resize items-center justify-center"
                onPointerDown={(e) => {
                  e.stopPropagation()
                  dragRef.current = 'start'
                  try {
                    e.currentTarget.setPointerCapture(e.pointerId)
                  } catch {
                    /* 合成事件无真实指针 */
                  }
                }}
                onPointerMove={onTrackPointerMove}
                onPointerUp={() => (dragRef.current = null)}
              >
                <span className="h-[26px] w-[5px] rounded-full bg-white" />
              </span>
              <span
                className="absolute right-[-9px] top-0 flex h-full w-4 cursor-ew-resize items-center justify-center"
                onPointerDown={(e) => {
                  e.stopPropagation()
                  dragRef.current = 'end'
                  try {
                    e.currentTarget.setPointerCapture(e.pointerId)
                  } catch {
                    /* 合成事件无真实指针 */
                  }
                }}
                onPointerMove={onTrackPointerMove}
                onPointerUp={() => (dragRef.current = null)}
              >
                <span className="h-[26px] w-[5px] rounded-full bg-white" />
              </span>
            </div>
            {precision && (
              <span className="absolute bottom-1 left-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                精确模式（禁用吸附）
              </span>
            )}
          </div>

          <button
            title="确认剪辑 (Enter)"
            onClick={confirm}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:bg-white"
            style={{ background: '#F5F5F7' }}
          >
            <Check size={17} stroke="#0B0B0C" strokeWidth={2.4} />
          </button>
        </div>

        {/* 快捷键 + 智能剪辑行 */}
        <div className="flex items-center gap-3 text-[13px]" style={{ color: '#98989F' }}>
          <span className="flex items-center gap-1.5">{keycap('Shift + ←/→')} 精确微调 0.01s</span>
          <span className="flex items-center gap-1.5">{keycap('Space')} 预览</span>
          <span className="flex items-center gap-1.5">{keycap('Enter')} 确认</span>
          <span className="flex-1" />
          {smart === 'idle' && (
            <button
              onClick={runSmartClip}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition hover:bg-white/[0.14]"
              style={{ background: 'rgba(255,255,255,0.08)', color: TOKENS.textBody }}
            >
              <Sparkles size={13} /> 智能剪辑
            </button>
          )}
          {smart === 'running' && (
            <button
              onClick={() => setSmart('idle')}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px]"
              style={{ background: 'rgba(255,255,255,0.08)', color: TOKENS.textBody }}
            >
              <Sparkles size={13} style={{ color: TOKENS.accent }} /> 正在分析 {smartPct}% · 点击可退出 ✕
            </button>
          )}
          {smart === 'done' && (
            <button
              onClick={() => setSmart('idle')}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px]"
              style={{ background: 'rgba(255,255,255,0.08)', color: TOKENS.textBody }}
            >
              <Sparkles size={13} style={{ color: '#4BBF6B' }} /> 智能剪辑完成，未检测到明显切换点 ✕
            </button>
          )}
        </div>
      </div>
    </NodeToolbar>
  )
}
