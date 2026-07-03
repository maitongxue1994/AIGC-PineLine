import { useEffect, useState } from 'react'
import { useOnViewportChange, useReactFlow, type Viewport } from '@xyflow/react'
import { useStudioStore } from './store'
import { SHADOWS, TOKENS } from './designTokens'

/**
 * 空视窗提示（TapNow 同款）：视窗内没有任何节点且画布非空时，
 * 底部弹「当前视窗没有节点【回到节点】」。
 */
export default function EmptyViewportHint() {
  const nodes = useStudioStore((s) => s.nodes)
  const { fitView, getViewport } = useReactFlow()
  const [show, setShow] = useState(false)

  const check = (vp: Viewport) => {
    if (!nodes.length) {
      setShow(false)
      return
    }
    // 视口矩形（flow 坐标系）
    const vw = window.innerWidth / vp.zoom
    const vh = window.innerHeight / vp.zoom
    const vx = -vp.x / vp.zoom
    const vy = -vp.y / vp.zoom
    const visible = nodes.some((n) => {
      const w = n.measured?.width ?? 340
      const h = n.measured?.height ?? 200
      return n.position.x + w > vx && n.position.x < vx + vw && n.position.y + h > vy && n.position.y < vy + vh
    })
    setShow(!visible)
  }

  useOnViewportChange({ onEnd: check })
  // 节点集变化（删除全部→新建等）时延迟一帧校验，避免级联渲染
  useEffect(() => {
    const t = setTimeout(() => check(getViewport()), 60)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes])

  if (!show) return null

  return (
    <div
      className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/[0.08] py-2 pl-5 pr-2"
      style={{ background: TOKENS.railBg, boxShadow: SHADOWS.toolbar }}
    >
      <span className="text-[13px]" style={{ color: TOKENS.textSecondary }}>
        当前视窗没有节点，可点击按钮快速回到内容区域
      </span>
      <button
        onClick={() => void fitView({ padding: 0.2, maxZoom: 1, duration: 400 })}
        className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition hover:opacity-90"
        style={{ background: TOKENS.accent, color: '#fff' }}
      >
        回到节点
      </button>
    </div>
  )
}
