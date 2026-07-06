import { useState, type ReactNode } from 'react'
import { NodeToolbar, Position } from '@xyflow/react'
import {
  Aperture,
  Box,
  Copy,
  Crop,
  Download,
  Eraser,
  Expand,
  FolderPlus,
  Grid3x3,
  Highlighter,
  MoreHorizontal,
  Paintbrush,
  PenLine,
  Pin,
  Scaling,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trash2,
  Wand2,
} from 'lucide-react'
import { useStudioStore } from '../store'
import { PIN_COLORS } from '../nodeCatalog'
import { SHADOWS, TOKENS } from '../designTokens'
import { downloadDataUrl } from './shared'
import { aiFileName, markImageDataUrl } from '../aigcMark'
import { Popover } from './composerKit'
import type { NodeKind, PinColor } from '../types'

export type OpsPanelKind = 'angle' | 'inpaint' | 'light' | 'camera'

/** 44px 圆形图标按钮 + 上方 400ms 延迟 tooltip（设计稿 §03）；视频工具栏等复用 */
export function TBtn({
  tip,
  active,
  disabled,
  dot,
  onClick,
  children,
}: {
  tip: string
  active?: boolean
  disabled?: boolean
  dot?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <div className="group relative">
      <button
        disabled={disabled}
        onClick={onClick}
        className="relative flex h-11 w-11 items-center justify-center rounded-full transition enabled:hover:bg-[#29292C] enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          color: active ? '#FFFFFF' : TOKENS.textBody,
          background: active ? '#2E2E31' : undefined,
          boxShadow: active ? 'inset 0 0 0 1px rgba(255,255,255,0.12)' : undefined,
        }}
      >
        {children}
        {dot && (
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
            style={{ background: TOKENS.accent }}
          />
        )}
      </button>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] px-4 py-2 text-[14px] font-medium text-white opacity-0 transition-opacity delay-[400ms] group-hover:opacity-100"
        style={{ background: '#2A2A2D', boxShadow: SHADOWS.tooltip }}
      >
        {tip}
      </span>
    </div>
  )
}

export function ToolbarDivider() {
  return <span className="mx-1.5 h-6 w-px shrink-0 bg-white/[0.12]" />
}
const Divider = ToolbarDivider

/**
 * 节点上方浮动工具栏（设计稿 §03）：编辑 · Pin 标记 · 归档 三组。
 * 图像操作面板（多角度/重绘/打光/摄影机）经 onOpenPanel 唤起（M5 接真面板）。
 */
export default function NodeToolbarBar({
  id,
  kind,
  hasImage,
  output,
  filename,
  onOpenPanel,
  onPreview,
  onSaveToLibrary,
}: {
  id: string
  kind: NodeKind
  hasImage: boolean
  output: string | null
  filename: string
  onOpenPanel?: (panel: OpsPanelKind) => void
  onPreview?: () => void
  onSaveToLibrary?: () => void
}) {
  const setPin = useStudioStore((s) => s.setPin)
  const pin = useStudioStore((s) => s.nodes.find((n) => n.id === id)?.data.pin ?? null)
  const duplicateNode = useStudioStore((s) => s.duplicateNode)
  const deleteNode = useStudioStore((s) => s.deleteNode)
  const [pinOpen, setPinOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const isImage = kind === 'image'
  const canDownload = !!output

  const moreDisabled: { label: string; icon: ReactNode; extra?: string }[] = [
    { label: '扩图', icon: <Scaling size={17} /> },
    { label: '擦除', icon: <Eraser size={17} /> },
    { label: '标注', icon: <Highlighter size={17} /> },
    { label: '增强', icon: <Sparkles size={17} /> },
    { label: '调整像素', icon: <PenLine size={17} /> },
    { label: '抠图', icon: <Wand2 size={17} /> },
    { label: '快速切分', icon: <Grid3x3 size={17} />, extra: '2×2 3×3 4×4' },
    { label: '合规验证', icon: <ShieldCheck size={17} /> },
  ]

  return (
    // 菜单/色板走 Popover（portal 到 body，z-[70]）：同节点的 composer NodeToolbar 在 DOM
    // 后侧且包裹层 zIndex 相同，节点内 absolute 弹层永远被输入面板盖住（历史坑见 composerKit）。
    // Popover 优先在锚点上方展开、贴视口顶时自动翻转到下方，不会冲出屏幕。
    <NodeToolbar position={Position.Top} offset={12}>
      <div
        className="flex items-center gap-0.5 rounded-full border border-white/[0.07] px-2.5 py-2"
        style={{ background: TOKENS.toolbarBg, boxShadow: SHADOWS.toolbar }}
      >
        {isImage && (
          <>
            <TBtn tip="裁剪（规划中）" disabled>
              <Crop size={18} strokeWidth={1.8} />
            </TBtn>
            <TBtn tip="多角度" disabled={!hasImage} onClick={() => onOpenPanel?.('angle')}>
              <Box size={18} strokeWidth={1.8} />
            </TBtn>
            <TBtn tip="重绘" disabled={!hasImage} onClick={() => onOpenPanel?.('inpaint')}>
              <Paintbrush size={18} strokeWidth={1.8} />
            </TBtn>
            <TBtn tip="打光" disabled={!hasImage} onClick={() => onOpenPanel?.('light')}>
              <SunMedium size={18} strokeWidth={1.8} />
            </TBtn>
            <TBtn tip="摄影机" disabled={!hasImage} onClick={() => onOpenPanel?.('camera')}>
              <Aperture size={18} strokeWidth={1.8} />
            </TBtn>
          </>
        )}
        {/* 更多菜单（浏览全部）：Popover 锚定触发钮所在包裹层 */}
        <div className="relative">
          <TBtn tip="浏览全部" dot active={moreOpen} onClick={() => { setMoreOpen((v) => !v); setPinOpen(false) }}>
            <MoreHorizontal size={18} strokeWidth={1.8} />
          </TBtn>
          {moreOpen && (
            <Popover width={300} style={{ background: TOKENS.chipBg }} onClose={() => setMoreOpen(false)}>
              <div className="overflow-y-auto rounded-[20px] p-2.5" style={{ maxHeight: 'min(60vh, 480px)' }}>
                <button
                  onClick={() => { setMoreOpen(false); duplicateNode(id) }}
                  className="flex w-full items-center gap-3 rounded-[10px] px-3 py-[11px] text-left text-[15px] transition hover:bg-white/[0.06]"
                  style={{ color: TOKENS.textBody }}
                >
                  <Copy size={17} style={{ color: TOKENS.textBody }} />
                  复制节点
                  <span className="ml-auto text-[13px]" style={{ color: TOKENS.textMuted }}>⌘D</span>
                </button>
                <button
                  onClick={() => { setMoreOpen(false); deleteNode(id) }}
                  className="flex w-full items-center gap-3 rounded-[10px] px-3 py-[11px] text-left text-[15px] text-red-300 transition hover:bg-red-500/10"
                >
                  <Trash2 size={17} />
                  删除节点
                  <span className="ml-auto text-[13px]" style={{ color: TOKENS.textMuted }}>⌫</span>
                </button>
                {isImage && (
                  <>
                    <div className="mx-2 my-1.5 h-px bg-white/[0.07]" />
                    {moreDisabled.map((it) => (
                      <div
                        key={it.label}
                        className="flex w-full cursor-not-allowed items-center gap-3 rounded-[10px] px-3 py-[11px] text-[15px] opacity-45"
                        style={{ color: TOKENS.textBody }}
                      >
                        <span style={{ color: TOKENS.textBody }}>{it.icon}</span>
                        {it.label}
                        {it.extra && (
                          <span className="text-[13px]" style={{ color: TOKENS.textMuted }}>
                            {it.extra}
                          </span>
                        )}
                        <span className="ml-auto text-[11px]" style={{ color: TOKENS.textDisabled }}>
                          规划中
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Popover>
          )}
        </div>

        <Divider />

        {/* Pin 色板浮条：Popover 锚定触发钮所在包裹层 */}
        <div className="relative">
          <TBtn tip="Pin 标记" active={pinOpen} onClick={() => { setPinOpen((v) => !v); setMoreOpen(false) }}>
            <Pin size={18} strokeWidth={1.8} style={pin ? { color: PIN_COLORS[pin] } : undefined} />
          </TBtn>
          {pinOpen && (
            <Popover
              width={300}
              style={{ background: TOKENS.toolbarBg, boxShadow: SHADOWS.toolbar, borderRadius: 9999 }}
              onClose={() => setPinOpen(false)}
            >
              <div className="flex items-center justify-center gap-3.5 px-5 py-3">
                <button
                  onClick={() => { setPin(id, null); setPinOpen(false) }}
                  className="text-[14px] transition hover:text-white"
                  style={{ color: TOKENS.textBody }}
                >
                  无
                </button>
                {(Object.keys(PIN_COLORS) as PinColor[]).map((c) => (
                  <button
                    key={c}
                    title={c}
                    onClick={() => { setPin(id, c); setPinOpen(false) }}
                    className="h-[26px] w-[26px] rounded-full transition-transform hover:scale-[1.15]"
                    style={{
                      background: PIN_COLORS[c],
                      boxShadow: pin === c ? '0 0 0 2px rgba(255,255,255,0.7)' : undefined,
                    }}
                  />
                ))}
              </div>
            </Popover>
          )}
        </div>

        <Divider />

        <TBtn tip="保存到素材库" disabled={!hasImage || !onSaveToLibrary} onClick={onSaveToLibrary}>
          <FolderPlus size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn
          tip="下载（含 AI 生成标识）"
          disabled={!canDownload}
          onClick={() =>
            output &&
            void markImageDataUrl(output).then((marked) => downloadDataUrl(marked, aiFileName(filename)))
          }
        >
          <Download size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn tip="全屏查看" disabled={!hasImage} onClick={onPreview}>
          <Expand size={18} strokeWidth={1.8} />
        </TBtn>
      </div>
    </NodeToolbar>
  )
}
