import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NodeToolbar, Position } from '@xyflow/react'
import { ArrowUp, Eraser, Loader2, Paintbrush, Redo2, Square, Undo2, X, Zap } from 'lucide-react'
import { useStudioStore } from '../store'
import { estimateCost } from '../nodeCatalog'
import { SHADOWS, TOKENS } from '../designTokens'
import type { PineNodeData } from '../types'
import { compositeByMask, isMaskEmpty, makeOverlay } from './maskCanvas'

type Tool = 'brush' | 'rect' | 'eraser'

/**
 * 蒙版重绘（设计稿 §05）：
 * 节点进入蒙版模式 → 图上直接绘制蒙版（画笔/矩形/橡皮/粗细/撤销重做）
 * → 顶部蒙版工具条 + 底部精简输入栏 + 顶部居中模式横幅（Esc 退出）。
 * 提交 = 原图 + 蒙版高亮图双参考 + 语义指令 → 结果按蒙版客户端合成（蒙版外像素保底）。
 */
export function useInpaint(
  id: string,
  data: PineNodeData,
  originalUrl: string | null,
  active: boolean,
  onExit: () => void,
) {
  const runImageEdit = useStudioStore((s) => s.runImageEdit)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [tool, setTool] = useState<Tool>('brush')
  const [brushSize, setBrushSize] = useState(36)
  const [desc, setDesc] = useState('')
  const [undoStack, setUndoStack] = useState<ImageData[]>([])
  const [redoStack, setRedoStack] = useState<ImageData[]>([])
  const drawingRef = useRef<{ startX: number; startY: number; snapshot: ImageData } | null>(null)

  const running = data.status === 'running'
  const cost = estimateCost('image', 'single', data.params)

  // Esc 退出蒙版模式（仅激活时监听，避免劫持全局 Esc）
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onExit()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [active, onExit])

  const toCanvasPos = (e: React.PointerEvent) => {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    }
  }

  const pushUndo = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const g = c.getContext('2d')!
    setUndoStack((s) => [...s.slice(-19), g.getImageData(0, 0, c.width, c.height)])
    setRedoStack([])
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    const c = canvasRef.current
    if (!c || running) return
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    pushUndo()
    const g = c.getContext('2d')!
    const p = toCanvasPos(e)
    drawingRef.current = {
      startX: p.x,
      startY: p.y,
      snapshot: g.getImageData(0, 0, c.width, c.height),
    }
    if (tool !== 'rect') {
      strokeTo(p.x, p.y, true)
    }
  }

  const strokeTo = (x: number, y: number, dot = false) => {
    const c = canvasRef.current
    const d = drawingRef.current
    if (!c || !d) return
    const g = c.getContext('2d')!
    // 画笔涂实色蓝，透明度由画布 CSS 控制；橡皮抠 alpha
    g.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over'
    g.strokeStyle = '#3F9BF5'
    g.fillStyle = '#3F9BF5'
    g.lineWidth = brushSize
    g.lineCap = 'round'
    g.lineJoin = 'round'
    if (dot) {
      g.beginPath()
      g.arc(x, y, brushSize / 2, 0, Math.PI * 2)
      g.fill()
    } else {
      g.beginPath()
      g.moveTo(d.startX, d.startY)
      g.lineTo(x, y)
      g.stroke()
    }
    d.startX = x
    d.startY = y
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const c = canvasRef.current
    const d = drawingRef.current
    if (!c || !d) return
    e.stopPropagation()
    const p = toCanvasPos(e)
    if (tool === 'rect') {
      const g = c.getContext('2d')!
      g.putImageData(d.snapshot, 0, 0)
      g.globalCompositeOperation = 'source-over'
      g.fillStyle = '#3F9BF5'
      const x0 = Math.min(d.startX, p.x)
      const y0 = Math.min(d.startY, p.y)
      g.fillRect(x0, y0, Math.abs(p.x - d.startX), Math.abs(p.y - d.startY))
    } else {
      strokeTo(p.x, p.y)
    }
  }

  const onPointerUp = () => {
    drawingRef.current = null
  }

  const undo = () => {
    const c = canvasRef.current
    if (!c || !undoStack.length) return
    const g = c.getContext('2d')!
    setRedoStack((s) => [...s, g.getImageData(0, 0, c.width, c.height)])
    const last = undoStack[undoStack.length - 1]
    g.putImageData(last, 0, 0)
    setUndoStack((s) => s.slice(0, -1))
  }

  const redo = () => {
    const c = canvasRef.current
    if (!c || !redoStack.length) return
    const g = c.getContext('2d')!
    setUndoStack((s) => [...s, g.getImageData(0, 0, c.width, c.height)])
    const next = redoStack[redoStack.length - 1]
    g.putImageData(next, 0, 0)
    setRedoStack((s) => s.slice(0, -1))
  }

  const submit = async () => {
    const c = canvasRef.current
    if (!c || !originalUrl) return
    if (isMaskEmpty(c)) {
      window.dispatchEvent(new CustomEvent('pineline:flash', { detail: '请先在图上绘制蒙版区域' }))
      return
    }
    if (!desc.trim()) {
      window.dispatchEvent(new CustomEvent('pineline:flash', { detail: '请描述你想改变什么' }))
      return
    }
    const overlay = await makeOverlay(originalUrl, c)
    const prompt = `Edit the reference image. The second reference shows the SAME image with a translucent blue highlight marking the edit region. Modify ONLY the highlighted region: ${desc.trim()}. Keep every pixel outside the highlighted region exactly identical to the first reference image. Blend seamlessly at the region edges. Photorealistic.（只修改蓝色高亮区域，其余保持不变）`
    void runImageEdit(id, prompt, {
      label: '重绘',
      extraRefs: [overlay],
      composite: (gen) => compositeByMask(originalUrl, gen, c, 4),
    })
    onExit()
  }

  /** 图上的蒙版绘制层（挂在节点卡片内部，覆盖图片） */
  const overlay = (
    <canvas
      ref={(el) => {
        if (el && originalUrl && (el.width <= 1 || el.dataset.src !== originalUrl)) {
          const img = new Image()
          img.onload = () => {
            el.width = img.naturalWidth
            el.height = img.naturalHeight
            el.dataset.src = originalUrl
          }
          img.src = originalUrl
        }
        canvasRef.current = el
      }}
      className="nodrag absolute inset-0 h-full w-full cursor-crosshair opacity-[0.42]"
      style={{ filter: 'blur(1px)', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  )

  const tbtn = (active: boolean, disabled = false) =>
    `flex h-[38px] w-[38px] items-center justify-center rounded-full transition ${
      disabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-[#29292C] hover:text-white'
    }`

  /** 顶部蒙版工具条（替换常规节点工具栏） */
  const toolbar = (
    <NodeToolbar position={Position.Top} offset={12}>
      <div
        className="flex items-center gap-0.5 rounded-full border border-white/[0.07] px-3 py-2"
        style={{ background: TOKENS.toolbarBg, boxShadow: SHADOWS.toolbar }}
      >
        <button title="退出蒙版模式 (Esc)" onClick={onExit} className={tbtn(false)} style={{ color: TOKENS.textBody }}>
          <X size={15} />
        </button>
        <span className="mx-1.5 h-6 w-px bg-white/[0.12]" />
        <button
          title="画笔"
          onClick={() => setTool('brush')}
          className={tbtn(tool === 'brush')}
          style={{ color: tool === 'brush' ? '#fff' : TOKENS.textBody, background: tool === 'brush' ? '#2E2E31' : undefined, boxShadow: tool === 'brush' ? 'inset 0 0 0 1px rgba(255,255,255,0.12)' : undefined }}
        >
          <Paintbrush size={15} />
        </button>
        <button
          title="矩形"
          onClick={() => setTool('rect')}
          className={tbtn(tool === 'rect')}
          style={{ color: tool === 'rect' ? '#fff' : TOKENS.textBody, background: tool === 'rect' ? '#2E2E31' : undefined, boxShadow: tool === 'rect' ? 'inset 0 0 0 1px rgba(255,255,255,0.12)' : undefined }}
        >
          <Square size={15} />
        </button>
        <button
          title="橡皮"
          onClick={() => setTool('eraser')}
          className={tbtn(tool === 'eraser')}
          style={{ color: tool === 'eraser' ? '#fff' : TOKENS.textBody, background: tool === 'eraser' ? '#2E2E31' : undefined, boxShadow: tool === 'eraser' ? 'inset 0 0 0 1px rgba(255,255,255,0.12)' : undefined }}
        >
          <Eraser size={15} />
        </button>
        <span className="mx-1.5 h-6 w-px bg-white/[0.12]" />
        <input
          type="range"
          min={8}
          max={120}
          value={brushSize}
          title={`笔刷粗细 ${brushSize}px`}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="studio-zoom-slider w-[90px]"
        />
        <span className="mx-1.5 h-6 w-px bg-white/[0.12]" />
        <button title="撤销蒙版" onClick={undo} disabled={!undoStack.length} className={tbtn(false, !undoStack.length)} style={{ color: TOKENS.textMuted }}>
          <Undo2 size={15} />
        </button>
        <button title="重做蒙版" onClick={redo} disabled={!redoStack.length} className={tbtn(false, !redoStack.length)} style={{ color: TOKENS.textMuted }}>
          <Redo2 size={15} />
        </button>
      </div>
    </NodeToolbar>
  )

  /** 底部精简输入栏 */
  const bar = (
    <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
      <div
        className="flex w-[560px] flex-col gap-3 rounded-[18px] border border-white/[0.08] px-4 py-3.5"
        style={{ background: TOKENS.inputBg, boxShadow: SHADOWS.panel }}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <textarea
          value={desc}
          autoFocus
          placeholder="描述你想改变什么..."
          onChange={(e) => setDesc(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation()
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') void submit()
          }}
          className="nowheel min-h-[44px] w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none"
          style={{ color: TOKENS.textBody }}
        />
        <div className="flex items-center gap-2">
          <span className="text-[13px]" style={{ color: TOKENS.textMuted }}>
            绘制蒙版以重绘
          </span>
          <span className="flex-1" />
          {[data.params.quality ?? '1K', '×1', 'PRO'].map((chip, i) => (
            <span
              key={chip}
              className="rounded-[8px] px-[9px] py-1 text-[12px]"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: i === 2 ? '#F5F5F7' : TOKENS.textMuted,
                fontWeight: i === 2 ? 700 : 400,
              }}
            >
              {chip}
            </span>
          ))}
          <div
            className="flex items-center gap-2 rounded-full py-1 pl-3 pr-1"
            style={{ background: '#2A2A2D' }}
            title={`预计消耗 ${cost} 积分（本地模拟）`}
          >
            <span className="flex items-center gap-1 text-[13px] font-semibold" style={{ color: TOKENS.textBody }}>
              <Zap size={13} style={{ color: TOKENS.textMuted }} />
              {cost}
            </span>
            <button
              disabled={running}
              onClick={() => void submit()}
              title={running ? '生成中…' : '重绘（⌘Enter）'}
              className="flex h-7 w-7 items-center justify-center rounded-full transition enabled:hover:bg-white disabled:cursor-not-allowed"
              style={{ background: '#F5F5F7' }}
            >
              {running ? (
                <Loader2 size={12} className="animate-spin" stroke="#0B0B0C" />
              ) : (
                <ArrowUp size={13} stroke="#0B0B0C" strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>
      </div>
    </NodeToolbar>
  )

  /** 顶部居中模式横幅（portal 到 body） */
  const banner = createPortal(
    <div
      className="fixed left-1/2 top-5 z-[70] flex -translate-x-1/2 items-center gap-4 rounded-[14px] px-4 py-3"
      style={{ background: TOKENS.accent, boxShadow: SHADOWS.banner }}
    >
      <div>
        <div className="text-[15px] font-bold text-white">重绘模式</div>
        <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
          在图上绘制蒙版，然后描述想要的改动
        </div>
      </div>
      <button
        onClick={onExit}
        className="rounded-[9px] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:opacity-90"
        style={{ background: 'rgba(0,0,0,0.35)' }}
      >
        退出 (Esc)
      </button>
    </div>,
    document.body,
  )

  return { overlay, toolbar, bar, banner }
}
