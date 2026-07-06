import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Crop, X } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'

type Rect = { x: number; y: number; w: number; h: number } // 归一化 0~1（相对图片）
type Drag =
  | { mode: 'move'; sx: number; sy: number; rect: Rect }
  | { mode: 'resize'; corner: 'nw' | 'ne' | 'sw' | 'se'; rect: Rect }
  | null

const RATIOS: { label: string; value: number | null }[] = [
  { label: '自由', value: null },
  { label: '1:1', value: 1 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:4', value: 3 / 4 },
]

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))

/**
 * 图片裁剪对话框（本地 canvas，不走 API）：拖动选区/四角手柄调整裁剪范围，
 * 可锁定比例；确认后按选区裁出新图，作为节点新版本（保留原图可切回）。
 */
export default function ImageCropDialog({
  src,
  onApply,
  onClose,
}: {
  src: string
  onApply: (dataUrl: string) => void
  onClose: () => void
}) {
  const [rect, setRect] = useState<Rect>({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 })
  const [ratio, setRatio] = useState<number | null>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const imgBoxRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<Drag>(null)

  const onImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })
  }, [])

  // 应用比例约束：以中心为锚，按目标宽高比调整（相对显示框，需换算像素比例）
  const applyRatio = (r: Rect, targetRatio: number | null): Rect => {
    if (!targetRatio || !natural) return r
    // targetRatio = 宽/高（像素）；归一化坐标里要乘 natural 比换算
    const imgAspect = natural.w / natural.h
    // 归一化宽高之比 = (w*W)/(h*H) 要 = targetRatio → h = w * (W/H) / targetRatio
    let w = r.w
    let h = (w * imgAspect) / targetRatio
    if (h > 1) {
      h = 1
      w = (h * targetRatio) / imgAspect
    }
    const cx = r.x + r.w / 2
    const cy = r.y + r.h / 2
    return {
      w,
      h,
      x: clamp(cx - w / 2, 0, 1 - w),
      y: clamp(cy - h / 2, 0, 1 - h),
    }
  }

  const pickRatio = (v: number | null) => {
    setRatio(v)
    setRect((r) => applyRatio(r, v))
  }

  const pointerPos = (e: React.PointerEvent) => {
    const box = imgBoxRef.current!.getBoundingClientRect()
    return { px: clamp((e.clientX - box.left) / box.width), py: clamp((e.clientY - box.top) / box.height) }
  }

  const onPointerDown = (mode: 'move' | 'resize', corner?: 'nw' | 'ne' | 'sw' | 'se') => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    const { px, py } = pointerPos(e)
    dragRef.current =
      mode === 'move' ? { mode, sx: px - rect.x, sy: py - rect.y, rect } : { mode, corner: corner!, rect }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d) return
    const { px, py } = pointerPos(e)
    if (d.mode === 'move') {
      setRect((r) => ({ ...r, x: clamp(px - d.sx, 0, 1 - r.w), y: clamp(py - d.sy, 0, 1 - r.h) }))
    } else {
      setRect((r) => {
        let { x, y, w, h } = r
        const right = x + w
        const bottom = y + h
        if (d.corner === 'nw') { x = clamp(px, 0, right - 0.05); y = clamp(py, 0, bottom - 0.05); w = right - x; h = bottom - y }
        if (d.corner === 'ne') { y = clamp(py, 0, bottom - 0.05); w = clamp(px, x + 0.05, 1) - x; h = bottom - y }
        if (d.corner === 'sw') { x = clamp(px, 0, right - 0.05); w = right - x; h = clamp(py, y + 0.05, 1) - y }
        if (d.corner === 'se') { w = clamp(px, x + 0.05, 1) - x; h = clamp(py, y + 0.05, 1) - y }
        const next = { x, y, w, h }
        return ratio ? applyRatio(next, ratio) : next
      })
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null
    ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
  }

  const apply = () => {
    if (!natural) return
    const sx = Math.round(rect.x * natural.w)
    const sy = Math.round(rect.y * natural.h)
    const sw = Math.max(1, Math.round(rect.w * natural.w))
    const sh = Math.max(1, Math.round(rect.h * natural.h))
    const canvas = document.createElement('canvas')
    canvas.width = sw
    canvas.height = sh
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
      // 原图是 jpeg 就导 jpeg，否则 png（保透明）
      const isJpeg = src.startsWith('data:image/jpeg')
      onApply(canvas.toDataURL(isJpeg ? 'image/jpeg' : 'image/png', isJpeg ? 0.92 : undefined))
      onClose()
    }
    img.src = src
  }

  const pctW = natural ? `${Math.round(rect.w * natural.w)}×${Math.round(rect.h * natural.h)}` : ''

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        className="pl-pop-in flex max-h-[88vh] w-[760px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <Crop size={16} style={{ color: TOKENS.textMuted }} />
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            裁剪图片
          </span>
          {pctW && (
            <span className="text-[12px] tabular-nums" style={{ color: TOKENS.textFaint }}>
              裁剪后 {pctW}
            </span>
          )}
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

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-5">
          <div
            ref={imgBoxRef}
            className="relative select-none"
            style={{ maxHeight: '58vh', touchAction: 'none' }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <img src={src} alt="" onLoad={onImgLoad} draggable={false} className="block max-h-[58vh] max-w-full" />
            {/* 暗化遮罩（选区外）+ 选区框 */}
            <div
              className="absolute border-2"
              style={{
                left: `${rect.x * 100}%`,
                top: `${rect.y * 100}%`,
                width: `${rect.w * 100}%`,
                height: `${rect.h * 100}%`,
                borderColor: TOKENS.accent,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                cursor: 'move',
              }}
              onPointerDown={onPointerDown('move')}
            >
              {(['nw', 'ne', 'sw', 'se'] as const).map((c) => (
                <span
                  key={c}
                  onPointerDown={onPointerDown('resize', c)}
                  className="absolute h-3.5 w-3.5 rounded-full border-2 bg-white"
                  style={{
                    borderColor: TOKENS.accent,
                    cursor: `${c}-resize`,
                    left: c.includes('w') ? -7 : undefined,
                    right: c.includes('e') ? -7 : undefined,
                    top: c.includes('n') ? -7 : undefined,
                    bottom: c.includes('s') ? -7 : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            比例
          </span>
          {RATIOS.map((r) => (
            <button
              key={r.label}
              onClick={() => pickRatio(r.value)}
              className="rounded-full px-2.5 py-1 text-[12px] transition"
              style={{
                background: ratio === r.value ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.05)',
                color: ratio === r.value ? '#F5F5F7' : TOKENS.textMuted,
              }}
            >
              {r.label}
            </button>
          ))}
          <span className="flex-1" />
          <button
            onClick={onClose}
            className="rounded-full px-4 py-1.5 text-[13px] transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            取消
          </button>
          <button
            onClick={apply}
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition hover:opacity-90"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            裁剪为新版本
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
