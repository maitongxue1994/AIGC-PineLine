import type { ReactNode } from 'react'
import { useReactFlow, useViewport } from '@xyflow/react'
import { HelpCircle, Magnet, Map, Scan, X } from 'lucide-react'
import { useUIStore } from './uiStore'
import { SHADOWS, TOKENS } from './designTokens'

const MIN_ZOOM = 0.1
const MAX_ZOOM = 2

/** 控制条按钮：34px 圆钮 + 上方即时黑胶囊 tooltip（原生 title 延迟长且被小地图遮挡） */
function CtrlBtn({
  tip,
  active,
  onClick,
  children,
}: {
  tip: string
  active?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className="flex h-[34px] w-[34px] items-center justify-center rounded-full transition hover:text-white"
        style={{
          color: active ? '#F5F5F7' : TOKENS.textMuted,
          background: active ? 'rgba(255,255,255,0.1)' : undefined,
        }}
      >
        {children}
      </button>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] px-3.5 py-1.5 text-[13px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: '#2A2A2D', boxShadow: SHADOWS.tooltip }}
      >
        {tip}
      </span>
    </div>
  )
}

/**
 * 左下控制区（TapNow 语义对照）：小地图开关 / 网格吸附 / 重置 / 缩放滑杆 + 帮助。
 * 小地图本体渲染在 StudioCanvas 内（MiniMap position=bottom-left）。
 */
export default function BottomControls() {
  const minimapOn = useUIStore((s) => s.minimapOn)
  const snapOn = useUIStore((s) => s.snapOn)
  const toggleMinimap = useUIStore((s) => s.toggleMinimap)
  const toggleSnap = useUIStore((s) => s.toggleSnap)
  const helpOpen = useUIStore((s) => s.helpOpen)
  const setHelpOpen = useUIStore((s) => s.setHelpOpen)
  const { fitView, zoomTo } = useReactFlow()
  const { zoom } = useViewport()

  // 滑杆用对数刻度：小缩放段更细腻
  const sliderVal = Math.log(zoom / MIN_ZOOM) / Math.log(MAX_ZOOM / MIN_ZOOM)

  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-30 flex items-center gap-2">
      <div
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/[0.08] px-2.5 py-1.5"
        style={{ background: TOKENS.railBg, boxShadow: SHADOWS.toolbar }}
      >
        <CtrlBtn tip={minimapOn ? '关闭小地图' : '打开小地图'} active={minimapOn} onClick={toggleMinimap}>
          <Map size={15} />
        </CtrlBtn>
        <CtrlBtn tip={snapOn ? '关闭网格吸附' : '网格吸附'} active={snapOn} onClick={toggleSnap}>
          <Magnet size={15} />
        </CtrlBtn>
        <CtrlBtn tip="重置（显示全部节点）" onClick={() => void fitView({ padding: 0.2, maxZoom: 1, duration: 300 })}>
          <Scan size={15} />
        </CtrlBtn>
        <div className="group relative flex items-center">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={sliderVal}
            onChange={(e) => {
              const t = Number(e.target.value)
              // duration 0：连续拖动时多段动画竞争会抖动
              void zoomTo(MIN_ZOOM * Math.pow(MAX_ZOOM / MIN_ZOOM, t))
            }}
            className="studio-zoom-slider mx-1.5 w-[70px]"
          />
          <span
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] px-3.5 py-1.5 text-[13px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
            style={{ background: '#2A2A2D', boxShadow: SHADOWS.tooltip }}
          >
            缩放 {(zoom * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="pointer-events-auto relative">
        <button
          title="帮助"
          onClick={() => setHelpOpen(!helpOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] text-[17px] font-semibold transition hover:text-white"
          style={{ background: TOKENS.railBg, boxShadow: SHADOWS.toolbar, color: '#B8B8BF' }}
        >
          <HelpCircle size={17} />
        </button>

        {helpOpen && (
          <div
            className="absolute bottom-full left-0 mb-2 w-[320px] rounded-[20px] border border-white/[0.08] p-4"
            style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.menu }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-semibold" style={{ color: TOKENS.textTitle }}>
                快捷键
              </span>
              <button
                onClick={() => setHelpOpen(false)}
                className="rounded p-0.5 transition hover:bg-white/[0.06]"
                style={{ color: TOKENS.textMuted }}
              >
                <X size={14} />
              </button>
            </div>
            <ShortcutRows />
            <div className="mt-3 border-t border-white/[0.07] pt-2 text-[11px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
              双击/右键空白可新建节点 · 拖图片进画布作参考 · 积分为本地模拟，仅作演示
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ShortcutRows() {
  const rows: [string, string][] = [
    ['删除', '⌫'],
    ['撤销 / 重做', '⌘Z / ⇧⌘Z'],
    ['复制 / 粘贴节点', '⌘C / ⌘V'],
    ['快速复制', '⌘D'],
    ['搜索节点', '⌘F'],
    ['多选', '⇧ 点击 / 框选'],
    ['运行选中节点', '⌘Enter'],
    ['放大 / 缩小', '⌘+ / ⌘−'],
    ['缩放', '⌘滚轮 / 触控板捏合'],
    ['平移画布', '滚轮 / 中键拖拽 / Space'],
    ['聚焦提示词输入', '⌘I'],
    ['打开/关闭 Agent', '⌘J'],
  ]
  return (
    <div className="space-y-1.5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between text-[13px]">
          <span style={{ color: '#98989F' }}>{k}</span>
          <span
            className="rounded-[6px] bg-white/[0.08] px-2 py-0.5 font-mono text-[12px]"
            style={{ color: '#D6D6DB' }}
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  )
}
