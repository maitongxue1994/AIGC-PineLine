import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  type NodeTypes,
  type OnConnectEnd,
} from '@xyflow/react'
import { HelpCircle, LayoutTemplate, Redo2, RotateCcw, Undo2, X } from 'lucide-react'
import '@xyflow/react/dist/style.css'
import { useStudioStore } from './store'
import { KIND_ACCENTS } from './nodeCatalog'
import { TOKENS } from './designTokens'
import TextNode from './nodes/TextNode'
import ImageNode from './nodes/ImageNode'
import AssetNode from './nodes/AssetNode'
import NodePaletteMenu, { type PaletteChoice } from './NodePaletteMenu'

const nodeTypes: NodeTypes = {
  text: TextNode,
  image: ImageNode,
  asset: AssetNode,
}

const MAX_DROP_FILES = 4
const MAX_DROP_BYTES = 8 * 1024 * 1024

function StudioCanvasInner() {
  const nodes = useStudioStore((s) => s.nodes)
  const edges = useStudioStore((s) => s.edges)
  const onNodesChange = useStudioStore((s) => s.onNodesChange)
  const onEdgesChange = useStudioStore((s) => s.onEdgesChange)
  const onConnect = useStudioStore((s) => s.onConnect)
  const addNode = useStudioStore((s) => s.addNode)
  const selectNode = useStudioStore((s) => s.selectNode)
  const runNode = useStudioStore((s) => s.runNode)
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const duplicateNode = useStudioStore((s) => s.duplicateNode)
  const undo = useStudioStore((s) => s.undo)
  const redo = useStudioStore((s) => s.redo)
  const canUndo = useStudioStore((s) => s.past.length > 0)
  const canRedo = useStudioStore((s) => s.future.length > 0)
  const resetProject = useStudioStore((s) => s.resetProject)
  const fitViewTick = useStudioStore((s) => s.fitViewTick)
  const focusRequest = useStudioStore((s) => s.focusRequest)

  const { screenToFlowPosition, fitView, setCenter, getNode } = useReactFlow()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const pendingConnectRef = useRef<{
    fromNodeId: string
    fromHandle?: string | null
    fromType: 'source' | 'target'
    flowPos: { x: number; y: number }
  } | null>(null)
  // 双击空白画布新建节点时的落点（与拖线建节点互斥）
  const pendingAddPosRef = useRef<{ x: number; y: number } | null>(null)
  const [menu, setMenu] = useState<{ screenX: number; screenY: number } | null>(
    null,
  )
  const [notice, setNotice] = useState<string | null>(null)
  // 首次进入自动展示一次帮助
  const [helpOpen, setHelpOpen] = useState(() => {
    try {
      return !localStorage.getItem('pineline-help-seen')
    } catch {
      return false
    }
  })
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flash = useCallback((msg: string) => {
    setNotice(msg)
    if (noticeTimer.current) clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(null), 2600)
  }, [])

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current)
    },
    [],
  )

  // 全局轻提示：节点组件等经 CustomEvent 发起（如禁用功能占位提示）
  useEffect(() => {
    const onFlash = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) flash(detail)
    }
    window.addEventListener('pineline:flash', onFlash)
    return () => window.removeEventListener('pineline:flash', onFlash)
  }, [flash])

  // 模板/建链后自动把新节点带入视野（等渲染一帧再适配）
  useEffect(() => {
    if (fitViewTick === 0) return
    const raf = requestAnimationFrame(() => {
      void fitView({ padding: 0.2, maxZoom: 1, duration: 400 })
    })
    return () => cancelAnimationFrame(raf)
  }, [fitViewTick, fitView])

  // 面板/搜索点选节点 → 把节点带到视口中心（审计修复：focusNode 不入视口）
  useEffect(() => {
    if (!focusRequest) return
    const node = getNode(focusRequest.id)
    if (!node) return
    const w = node.measured?.width ?? 340
    const h = node.measured?.height ?? 200
    void setCenter(node.position.x + w / 2, node.position.y + h / 2, {
      zoom: 1,
      duration: 400,
    })
  }, [focusRequest, getNode, setCenter])

  // 帮助实际展示过（自动或手动）才写「已看过」标记
  useEffect(() => {
    if (!helpOpen) return
    try {
      localStorage.setItem('pineline-help-seen', '1')
    } catch {
      /* 隐私模式等场景拿不到 localStorage，忽略 */
    }
  }, [helpOpen])

  const handleSelectionChange = useCallback(
    ({ nodes }: { nodes: { id: string }[] }) => {
      selectNode(nodes[0]?.id ?? null)
    },
    [selectNode],
  )

  // 键盘快捷键：⌘/Ctrl+Enter 运行选中；⌘/Ctrl+Z 撤销；⌘/Ctrl+Shift+Z 重做；
  // ⌘/Ctrl+D 复制；Esc 关闭菜单。Delete/Backspace 由 ReactFlow 内置。
  useEffect(() => {
    const isEditable = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false
      const tag = el.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu) {
        pendingConnectRef.current = null
        pendingAddPosRef.current = null
        setMenu(null)
        return
      }
      if (!(e.metaKey || e.ctrlKey)) return
      if (isEditable(e.target)) return
      // 按住不放的键盘重复不重复触发（审计修复：连发会产生并发付费请求）
      if (e.repeat) return

      const key = e.key.toLowerCase()
      if (e.key === 'Enter') {
        if (selectedNodeId) {
          e.preventDefault()
          runNode(selectedNodeId)
        }
      } else if (key === 'z') {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      } else if (key === 'y') {
        e.preventDefault()
        redo()
      } else if (key === 'd') {
        if (selectedNodeId) {
          e.preventDefault()
          duplicateNode(selectedNodeId)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu, selectedNodeId, runNode, undo, redo, duplicateNode])

  const handleConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (connectionState.isValid) return
      const fromNode = connectionState.fromNode
      if (!fromNode) return

      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : (event as MouseEvent)

      // 审计修复：只有松手在画布空白处才弹「新建节点」菜单；
      // 拖到其他节点身上/自身（无效落点）直接放弃，避免误建重叠节点
      const target = event.target as HTMLElement | null
      if (!target?.classList?.contains('react-flow__pane')) return

      pendingAddPosRef.current = null
      pendingConnectRef.current = {
        fromNodeId: fromNode.id,
        fromHandle: connectionState.fromHandle?.id ?? null,
        fromType: (connectionState.fromHandle?.type as 'source' | 'target') ?? 'source',
        flowPos: screenToFlowPosition({ x: clientX, y: clientY }),
      }
      setMenu({ screenX: clientX, screenY: clientY })
    },
    [screenToFlowPosition],
  )

  // 新建落点避让右下角 MiniMap：节点若铺在小地图底下会被遮住
  const MINIMAP_ZONE = { w: 230, h: 180 }
  const avoidMiniMap = useCallback((x: number, y: number) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return { x, y }
    const inZone = x > rect.right - MINIMAP_ZONE.w && y > rect.bottom - MINIMAP_ZONE.h
    if (!inZone) return { x, y }
    // 节点卡片约 340px 宽，整体左移/上移出小地图区域
    return {
      x: Math.min(x, rect.right - MINIMAP_ZONE.w - 340),
      y: Math.min(y, rect.bottom - MINIMAP_ZONE.h - 80),
    }
  }, [MINIMAP_ZONE.w, MINIMAP_ZONE.h])

  // 双击/右键空白画布 → 在落点弹新建菜单（TapNow 同款交互）
  const openPaletteAt = useCallback(
    (clientX: number, clientY: number) => {
      pendingConnectRef.current = null
      pendingAddPosRef.current = screenToFlowPosition(avoidMiniMap(clientX, clientY))
      setMenu({ screenX: clientX, screenY: clientY })
    },
    [screenToFlowPosition, avoidMiniMap],
  )

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('react-flow__pane')) return
      openPaletteAt(e.clientX, e.clientY)
    },
    [openPaletteAt],
  )

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('react-flow__pane')) return
      e.preventDefault()
      openPaletteAt(e.clientX, e.clientY)
    },
    [openPaletteAt],
  )

  // 拖图片文件进画布 → 生成「上传素材」节点，可直接作下游参考图
  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('Files')) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      // 审计修复：无条件 preventDefault——拖入非图片文件（如 .txt）时
      // 浏览器默认行为是直接导航打开该文件，内存中的生成图会全部丢失
      if (e.dataTransfer.types.includes('Files')) e.preventDefault()
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/'),
      )
      if (!files.length) {
        if (e.dataTransfer.files.length) flash('仅支持拖入图片文件')
        return
      }

      if (files.length > MAX_DROP_FILES) {
        flash(`一次最多拖入 ${MAX_DROP_FILES} 张图片，已取前 ${MAX_DROP_FILES} 张`)
      }
      const base = { x: e.clientX, y: e.clientY }
      files.slice(0, MAX_DROP_FILES).forEach((file, i) => {
        if (file.size > MAX_DROP_BYTES) {
          flash(`「${file.name}」超过 8MB，已跳过`)
          return
        }
        const reader = new FileReader()
        reader.onload = () => {
          const pt = avoidMiniMap(base.x + i * 48, base.y + i * 48)
          addAssetNode(String(reader.result ?? ''), screenToFlowPosition(pt))
        }
        reader.onerror = () => flash(`读取「${file.name}」失败`)
        reader.readAsDataURL(file)
      })
    },
    [addAssetNode, flash, screenToFlowPosition, avoidMiniMap],
  )

  const handlePick = useCallback(
    (choice: PaletteChoice) => {
      const pending = pendingConnectRef.current
      if (!pending) {
        const pos = pendingAddPosRef.current
        pendingAddPosRef.current = null
        setMenu(null)
        if (pos) addNode(choice.kind, choice.preset, pos)
        return
      }
      const newId = addNode(choice.kind, choice.preset, pending.flowPos)

      if (pending.fromType === 'source') {
        onConnect({
          source: pending.fromNodeId,
          sourceHandle: pending.fromHandle ?? null,
          target: newId,
          targetHandle: null,
        })
      } else {
        onConnect({
          source: newId,
          sourceHandle: null,
          target: pending.fromNodeId,
          targetHandle: pending.fromHandle ?? null,
        })
      }
      pendingConnectRef.current = null
      setMenu(null)
    },
    [addNode, onConnect],
  )

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full bg-bg-0"
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={handleConnectEnd}
        onSelectionChange={handleSelectionChange}
        defaultEdgeOptions={{
          style: { stroke: TOKENS.edgeStroke, strokeWidth: TOKENS.edgeWidth },
        }}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
        proOptions={{ hideAttribution: true }}
        colorMode="dark"
        zoomOnDoubleClick={false}
      >
        <Panel position="top-left" className="!m-2 flex gap-1">
          <button
            title="撤销 (⌘/Ctrl+Z)"
            onClick={undo}
            disabled={!canUndo}
            className="rounded-md border border-white/[0.07] bg-bg-2/80 p-1.5 text-ink-1 backdrop-blur transition hover:bg-bg-2 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Undo2 size={13} />
          </button>
          <button
            title="重做 (⌘/Ctrl+Shift+Z)"
            onClick={redo}
            disabled={!canRedo}
            className="rounded-md border border-white/[0.07] bg-bg-2/80 p-1.5 text-ink-1 backdrop-blur transition hover:bg-bg-2 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Redo2 size={13} />
          </button>
          <button
            title="快速开始与快捷键"
            onClick={() => setHelpOpen((v) => !v)}
            className="rounded-md border border-white/[0.07] bg-bg-2/80 p-1.5 text-ink-1 backdrop-blur transition hover:bg-bg-2 hover:text-white"
          >
            <HelpCircle size={13} />
          </button>
          <button
            title="从模板开始"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('pineline:open-templates'))
            }}
            className="flex items-center gap-1 rounded-md border border-white/[0.07] bg-bg-2/80 px-2 py-1.5 text-[10px] text-ink-1 backdrop-blur transition hover:bg-bg-2 hover:text-white"
          >
            <LayoutTemplate size={13} />
            模板
          </button>
          <button
            title="清空画布（=新建空工程，⌘/Ctrl+Z 可撤销）"
            onClick={() => {
              if (
                window.confirm(
                  '清空画布（=新建空工程）。建议先「导出」备份；清空后可用 ⌘/Ctrl+Z 撤销。确定继续？',
                )
              ) {
                resetProject()
                flash('已清空画布（⌘/Ctrl+Z 可撤销）')
              }
            }}
            className="flex items-center gap-1 rounded-md border border-[#22D3EE]/40 bg-bg-2/80 px-2 py-1.5 text-[10px] text-[#22D3EE] backdrop-blur transition hover:bg-bg-2 hover:text-white"
          >
            <RotateCcw size={12} />
            清空画布
          </button>
          <span className="ml-1 hidden self-center text-[10px] text-ink-3 lg:inline">
            双击/右键空白新建节点 · 拖图片进画布作参考
          </span>
        </Panel>

        {helpOpen && (
          <Panel position="top-left" className="!m-2 !mt-12">
            <div className="w-[300px] rounded-xl border border-white/10 bg-bg-1/95 p-4 text-[12px] shadow-2xl backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-2">
                  快速开始
                </span>
                <button
                  onClick={() => setHelpOpen(false)}
                  className="rounded p-0.5 text-ink-2 hover:bg-white/5 hover:text-white"
                >
                  <X size={13} />
                </button>
              </div>
              <ol className="ml-4 list-decimal space-y-1 leading-relaxed text-ink-1">
                <li>双击/右键画布空白新建节点，左上角「模板」一键铺链</li>
                <li>从节点右端口拖线到空白 → 选下一环（分镜/图片…）</li>
                <li>把图片拖进画布 → 成为下游参考图</li>
                <li>选中节点 → 上方工具条可运行/复制/下载/删除</li>
              </ol>
              <div className="mt-3 border-t border-white/[0.06] pt-2 leading-relaxed text-ink-2">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-3">
                  快捷键
                </div>
                <div>⌘/Ctrl+Enter 运行选中 · ⌘/Ctrl+D 复制</div>
                <div>⌘/Ctrl+Z 撤销 · ⌘/Ctrl+Shift+Z 重做</div>
                <div>Delete 删除 · Esc 关闭菜单</div>
              </div>
              <div className="mt-2 text-[10px] text-ink-3">积分为本地模拟，仅作演示。</div>
            </div>
          </Panel>
        )}
        <Background
          variant={BackgroundVariant.Dots}
          gap={TOKENS.canvasDotGap}
          size={1}
          color="#222"
        />
        <Controls
          className="!border !border-white/[0.07] !bg-bg-2/80 !shadow-none [&>button]:!border-white/[0.07] [&>button]:!bg-bg-1 [&>button]:!text-ink-1 [&>button:hover]:!bg-bg-2"
          showInteractive={false}
        />
        <MiniMap
          className="!border !border-white/[0.07] !bg-bg-2/70"
          nodeColor={(n) => KIND_ACCENTS[(n.type ?? 'image') as keyof typeof KIND_ACCENTS] ?? '#7C5CFF'}
          maskColor="rgba(7,7,11,0.6)"
          pannable
          zoomable
        />
      </ReactFlow>

      {menu && (
        <NodePaletteMenu
          x={menu.screenX}
          y={menu.screenY}
          onPick={handlePick}
          onClose={() => {
            pendingConnectRef.current = null
            pendingAddPosRef.current = null
            setMenu(null)
          }}
        />
      )}

      {notice && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 -translate-x-1/2 rounded-md border border-white/10 bg-bg-2/95 px-4 py-2 text-xs text-white shadow-xl backdrop-blur">
          {notice}
        </div>
      )}
    </div>
  )
}

export default function StudioCanvas() {
  return (
    <ReactFlowProvider>
      <StudioCanvasInner />
    </ReactFlowProvider>
  )
}
