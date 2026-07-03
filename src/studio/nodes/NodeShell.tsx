import { useCallback, useState, type ReactNode } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { ChevronDown, Plus, Star, X } from 'lucide-react'
import { useStudioStore } from '../store'
import { PIN_COLORS } from '../nodeCatalog'
import { SHADOWS, TOKENS } from '../designTokens'
import { NodeTitle } from './shared'
import QuickAddMenu, { type QuickAddChoice } from './QuickAddMenu'
import type { PineNodeData } from '../types'

/**
 * 节点通用外壳（设计稿 §02）：
 * 上方外置类型标签 → 内容卡片（圆角 14 / 选中蓝描边+外发光 / 版本层叠背卡）
 * → 左右 24px ⊕ 连接端口（选中/悬停出现，点击弹「引用该节点生成」）
 * → 卡片下方错误条（可 ✕ 清除）。
 */
export default function NodeShell({
  id,
  data,
  selected,
  width,
  typeIcon,
  labelExtra,
  hasTarget = true,
  hasSource = true,
  onSaveToLibrary,
  toolbar,
  composer,
  children,
}: {
  id: string
  data: PineNodeData
  selected?: boolean
  width: number
  typeIcon: ReactNode
  /** 外置标签行追加内容（如视频合规蓝勾徽章） */
  labelExtra?: ReactNode
  hasTarget?: boolean
  hasSource?: boolean
  onSaveToLibrary?: () => void
  toolbar?: ReactNode
  composer?: ReactNode
  children: ReactNode
}) {
  const clearNodeError = useStudioStore((s) => s.clearNodeError)
  const setActiveVersion = useStudioStore((s) => s.setActiveVersion)
  const addNode = useStudioStore((s) => s.addNode)
  const onConnect = useStudioStore((s) => s.onConnect)
  const focusNode = useStudioStore((s) => s.focusNode)
  const { getNode } = useReactFlow()

  const [quickAdd, setQuickAdd] = useState<{ x: number; y: number; side: 'source' | 'target' } | null>(null)
  const [stripOpen, setStripOpen] = useState(false)

  const versions = data.versions
  const stacked = versions.length > 1
  const running = data.status === 'running'

  // ⊕ 点击（未拖拽成连线时触发）→ 弹引用生成菜单
  const handlePortClick = useCallback(
    (e: React.MouseEvent, side: 'source' | 'target') => {
      e.stopPropagation()
      setQuickAdd({ x: e.clientX, y: e.clientY, side })
    },
    [],
  )

  const handleQuickPick = useCallback(
    (c: QuickAddChoice) => {
      const side = quickAdd?.side ?? 'source'
      setQuickAdd(null)
      const node = getNode(id)
      if (!node) return
      const pos =
        side === 'source'
          ? { x: node.position.x + width + 160, y: node.position.y }
          : { x: node.position.x - 480, y: node.position.y }
      const newId = addNode(c.kind, c.preset, pos)
      if (side === 'source') {
        onConnect({ source: id, sourceHandle: null, target: newId, targetHandle: null })
      } else {
        onConnect({ source: newId, sourceHandle: null, target: id, targetHandle: null })
      }
      focusNode(newId)
    },
    [quickAdd, getNode, id, width, addNode, onConnect, focusNode],
  )

  const portCls =
    'flex h-6 w-6 items-center justify-center rounded-full transition-opacity ' +
    (selected ? 'opacity-100' : 'opacity-0 group-hover/shell:opacity-100')

  return (
    <div className="group/shell relative" style={{ width }}>
      {toolbar}

      {/* 外置类型标签（icon 14 + 13px #9A9AA2，间距 6，距卡片 8） */}
      <div className="mb-2 flex items-center gap-1.5 text-[13px]" style={{ color: '#9A9AA2' }}>
        <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">{typeIcon}</span>
        <NodeTitle id={id} title={data.title} />
        {labelExtra}
        {running && (
          <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[11px]" style={{ color: TOKENS.accent }}>
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full" style={{ background: TOKENS.accent }} />
            生成中
          </span>
        )}
      </div>

      {/* 版本层叠背卡（两层，右下阶梯偏移） */}
      <div className="relative">
        {stacked && (
          <>
            <div
              className="absolute rounded-[14px] border"
              style={{ top: 34, left: 10, right: -10, bottom: -8, background: '#141416', borderColor: 'rgba(255,255,255,0.08)' }}
            />
            <div
              className="absolute rounded-[14px] border"
              style={{ top: 30, left: 5, right: -5, bottom: -4, background: '#18181A', borderColor: 'rgba(255,255,255,0.1)' }}
            />
          </>
        )}

        {/* 内容卡片 */}
        <div
          className="relative overflow-hidden rounded-[14px] transition-shadow"
          style={{
            border: selected ? `2px solid ${TOKENS.selection}` : '1px solid rgba(255,255,255,0.16)',
            boxShadow: selected ? `0 0 0 4px ${TOKENS.selectionRing}` : SHADOWS.node,
          }}
        >
          {children}

          {/* 悬停：左上收藏 ★（视频节点自带静音/收藏组，不重复渲染） */}
          {onSaveToLibrary && data.kind !== 'video' && (
            <button
              title="保存到素材库"
              onClick={(e) => { e.stopPropagation(); onSaveToLibrary() }}
              className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-[10px] text-white opacity-0 backdrop-blur transition group-hover/shell:opacity-100"
              style={{ background: 'rgba(10,10,12,0.65)' }}
            >
              <Star size={15} />
            </button>
          )}

          {/* 右上：批次切换徽章 */}
          {stacked && (
            <button
              title="切换版本"
              onClick={(e) => { e.stopPropagation(); setStripOpen((v) => !v) }}
              className="absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-[5px] text-[13px] font-semibold text-white backdrop-blur"
              style={{ background: 'rgba(10,10,12,0.65)' }}
            >
              {versions.length}
              <ChevronDown size={11} strokeWidth={2.4} />
            </button>
          )}
        </div>

        {/* Pin 标记（18px 色点 + 画布底色挖空描边，吸附卡片右上角） */}
        {data.pin && (
          <span
            className="absolute -right-2 -top-2 z-10 h-[18px] w-[18px] rounded-full"
            style={{ background: PIN_COLORS[data.pin], border: `3px solid ${TOKENS.canvasBg}` }}
          />
        )}

        {/* 版本缩略条 */}
        {stripOpen && stacked && (
          <div
            className="nodrag absolute right-0 top-12 z-20 flex max-w-full gap-1.5 overflow-x-auto rounded-[12px] border border-white/[0.08] p-2"
            style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.menu }}
          >
            {versions.map((v, i) => (
              <button
                key={v.id}
                title={v.label ?? `版本 ${i + 1}`}
                onClick={(e) => { e.stopPropagation(); setActiveVersion(id, i); setStripOpen(false) }}
                className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[8px] border transition"
                style={{
                  borderColor: i === data.activeVersion ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.1)',
                  opacity: i === data.activeVersion ? 1 : 0.75,
                }}
              >
                {v.content && v.content.startsWith('data:image') ? (
                  <img src={v.content} alt="" className="h-full w-full object-cover" />
                ) : v.content ? (
                  <span className="flex h-full w-full items-center justify-center bg-white/[0.05] px-1 text-[8px] leading-tight" style={{ color: TOKENS.textMuted }}>
                    文本
                  </span>
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-red-500/10 text-[9px] text-red-300">
                    失败
                  </span>
                )}
                {v.label && (
                  <span className="absolute inset-x-0 bottom-0 bg-black/65 text-center text-[8px] leading-3 text-white/90">
                    {v.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 错误条（审计修复：必须可清除） */}
      {data.error && (
        <div className="mt-2 flex items-start gap-2 rounded-[10px] border border-red-400/30 bg-red-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-red-300">
          <span className="min-w-0 flex-1 break-all">{data.error}</span>
          <button
            title="清除错误"
            onClick={(e) => { e.stopPropagation(); clearNodeError(id) }}
            className="nodrag shrink-0 rounded p-0.5 text-red-300/80 transition hover:bg-red-500/20 hover:text-red-200"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* 左右 ⊕ 连接端口（24px 圆，白 α.4 描边；可拖出连线，点按弹菜单） */}
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className={`${portCls} !left-[-34px] !h-6 !w-6 !border-[1.5px] !border-white/40 !bg-transparent`}
          onClick={(e) => handlePortClick(e, 'target')}
        >
          <Plus size={15} className="pointer-events-none" style={{ color: 'rgba(255,255,255,0.7)' }} />
        </Handle>
      )}
      {hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          className={`${portCls} !right-[-34px] !h-6 !w-6 !border-[1.5px] !border-white/40 !bg-transparent`}
          onClick={(e) => handlePortClick(e, 'source')}
        >
          <Plus size={15} className="pointer-events-none" style={{ color: 'rgba(255,255,255,0.7)' }} />
        </Handle>
      )}

      {quickAdd && (
        <QuickAddMenu
          x={quickAdd.x}
          y={quickAdd.y}
          side={quickAdd.side}
          onPick={handleQuickPick}
          onClose={() => setQuickAdd(null)}
        />
      )}

      {composer}
    </div>
  )
}
