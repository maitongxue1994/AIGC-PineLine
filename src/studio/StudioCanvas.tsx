import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
  useReactFlow,
  type NodeTypes,
  type OnConnectEnd,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useStudioStore } from './store'
import { useUIStore } from './uiStore'
import { useAgentStore } from './agent/agentStore'
import { KIND_ACCENTS } from './nodeCatalog'
import { TOKENS } from './designTokens'
import TextNode from './nodes/TextNode'
import ImageNode from './nodes/ImageNode'
import AssetNode from './nodes/AssetNode'
import VideoNode from './nodes/video/VideoNode'
import NodePaletteMenu, { type PaletteChoice } from './NodePaletteMenu'
import CanvasContextMenu from './CanvasContextMenu'

const nodeTypes: NodeTypes = {
  text: TextNode,
  image: ImageNode,
  asset: AssetNode,
  video: VideoNode,
}

const MAX_DROP_FILES = 4
const MAX_DROP_BYTES = 8 * 1024 * 1024

/**
 * 画布本体（需包裹在 ReactFlowProvider 内，由 Studio 页面提供）。
 * 交互对齐 TapNow：滚轮平移 / ⌘滚轮与捏合缩放 / Space 拖拽平移 /
 * 拖拽框选 / ⇧多选 / 双击空白建节点 / 右键上下文菜单。
 */
export default function StudioCanvas() {
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
  const addVideoNode = useStudioStore((s) => s.addVideoNode)
  const duplicateNode = useStudioStore((s) => s.duplicateNode)
  const copySelection = useStudioStore((s) => s.copySelection)
  const pasteClipboard = useStudioStore((s) => s.pasteClipboard)
  const undo = useStudioStore((s) => s.undo)
  const redo = useStudioStore((s) => s.redo)
  const fitViewTick = useStudioStore((s) => s.fitViewTick)
  const focusRequest = useStudioStore((s) => s.focusRequest)

  const gridOn = useUIStore((s) => s.gridOn)
  const minimapOn = useUIStore((s) => s.minimapOn)
  const setSearchOpen = useUIStore((s) => s.setSearchOpen)

  const { screenToFlowPosition, fitView, setCenter, getNode, zoomIn, zoomOut } = useReactFlow()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const pendingConnectRef = useRef<{
    fromNodeId: string
    fromHandle?: string | null
    fromType: 'source' | 'target'
    flowPos: { x: number; y: number }
  } | null>(null)
  // 双击空白画布新建节点时的落点（与拖线建节点互斥）
  const pendingAddPosRef = useRef<{ x: number; y: number } | null>(null)
  const [menu, setMenu] = useState<{ screenX: number; screenY: number } | null>(null)
  const [ctxMenu, setCtxMenu] = useState<{
    screenX: number
    screenY: number
    flowPos: { x: number; y: number }
  } | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
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

  // 面板/搜索点选节点 → 把节点带到视口中心
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

  const handleSelectionChange = useCallback(
    ({ nodes }: { nodes: { id: string }[] }) => {
      selectNode(nodes[0]?.id ?? null)
    },
    [selectNode],
  )

  // 快捷键：⌘Enter 运行 / ⌘Z ⇧⌘Z / ⌘D / ⌘C ⌘V / ⌘F / ⌘± / ⌘I / Esc
  useEffect(() => {
    const isEditable = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false
      const tag = el.tagName
      return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menu || ctxMenu) {
          pendingConnectRef.current = null
          pendingAddPosRef.current = null
          setMenu(null)
          setCtxMenu(null)
        }
        return
      }
      if (!(e.metaKey || e.ctrlKey)) return
      if (isEditable(e.target)) return
      // 按住不放的键盘重复不重复触发（避免连发并发付费请求）
      if (e.repeat) return

      const key = e.key.toLowerCase()
      if (e.key === 'Enter') {
        if (selectedNodeId) {
          e.preventDefault()
          void runNode(selectedNodeId)
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
      } else if (key === 'c') {
        copySelection()
      } else if (key === 'v') {
        pasteClipboard(
          screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 }),
        )
      } else if (key === 'f') {
        e.preventDefault()
        setSearchOpen(true)
      } else if (key === 'j') {
        e.preventDefault()
        useAgentStore.getState().toggle()
      } else if (e.key === '=' || e.key === '+') {
        e.preventDefault()
        void zoomIn({ duration: 150 })
      } else if (e.key === '-') {
        e.preventDefault()
        void zoomOut({ duration: 150 })
      } else if (key === 'i') {
        if (selectedNodeId) {
          e.preventDefault()
          window.dispatchEvent(
            new CustomEvent('pineline:focus-composer', { detail: selectedNodeId }),
          )
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [
    menu,
    ctxMenu,
    selectedNodeId,
    runNode,
    undo,
    redo,
    duplicateNode,
    copySelection,
    pasteClipboard,
    screenToFlowPosition,
    setSearchOpen,
    zoomIn,
    zoomOut,
  ])

  const handleConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (connectionState.isValid) return
      const fromNode = connectionState.fromNode
      if (!fromNode) return

      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : (event as MouseEvent)

      // 只有松手在画布空白处才弹「新建节点」菜单；拖到节点身上/自身直接放弃
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

  // 新建落点避让左下角小地图区域
  const avoidMiniMap = useCallback(
    (x: number, y: number) => {
      if (!minimapOn) return { x, y }
      const rect = wrapperRef.current?.getBoundingClientRect()
      if (!rect) return { x, y }
      const inZone = x < rect.left + 240 && y > rect.bottom - 220
      if (!inZone) return { x, y }
      return { x: Math.max(x, rect.left + 260), y: Math.min(y, rect.bottom - 240) }
    },
    [minimapOn],
  )

  // 双击空白画布 → 在落点弹新建菜单
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

  // 右键空白 → 上下文菜单（上传/添加节点/撤销/重做/粘贴）
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('react-flow__pane')) return
      e.preventDefault()
      setMenu(null)
      setCtxMenu({
        screenX: e.clientX,
        screenY: e.clientY,
        flowPos: screenToFlowPosition({ x: e.clientX, y: e.clientY }),
      })
    },
    [screenToFlowPosition],
  )

  // 拖图片文件进画布 → 生成「上传素材」节点
  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('Files')) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      // 无条件 preventDefault：拖入其他类型文件时浏览器默认会导航打开该文件
      if (e.dataTransfer.types.includes('Files')) e.preventDefault()
      const all = Array.from(e.dataTransfer.files)
      // 视频文件 → 视频节点（≤64MB）
      const videos = all.filter((f) => f.type.startsWith('video/'))
      videos.slice(0, 2).forEach((file, i) => {
        if (file.size > 64 * 1024 * 1024) {
          flash(`「${file.name}」超过 64MB，已跳过`)
          return
        }
        const reader = new FileReader()
        reader.onload = () => {
          const pt = avoidMiniMap(e.clientX + i * 48, e.clientY + i * 48)
          addVideoNode(String(reader.result ?? ''), screenToFlowPosition(pt))
        }
        reader.readAsDataURL(file)
      })
      const files = all.filter((f) => f.type.startsWith('image/'))
      if (!files.length) {
        if (all.length && !videos.length) flash('仅支持拖入图片或视频文件')
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
    [addAssetNode, addVideoNode, flash, screenToFlowPosition, avoidMiniMap],
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
      className="absolute inset-0"
      style={{ background: TOKENS.canvasBg }}
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
        panOnScroll
        zoomOnScroll={false}
        zoomActivationKeyCode={['Meta', 'Control']}
        panActivationKeyCode="Space"
        panOnDrag={[1]}
        selectionOnDrag
        multiSelectionKeyCode="Shift"
        deleteKeyCode={['Backspace', 'Delete']}
      >
        {gridOn && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={TOKENS.canvasDotGap}
            size={1}
            color="#222"
          />
        )}
        {minimapOn && (
          <MiniMap
            position="bottom-left"
            className="!mb-[68px] !ml-4 !h-[128px] !w-[200px] !rounded-[14px] !border !border-white/[0.08]"
            style={{ background: 'rgba(22,22,24,0.95)' }}
            nodeColor={(n) => KIND_ACCENTS[(n.type ?? 'image') as keyof typeof KIND_ACCENTS] ?? '#7C5CFF'}
            maskColor="rgba(7,7,11,0.6)"
            pannable
            zoomable
          />
        )}
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

      {ctxMenu && (
        <CanvasContextMenu
          x={ctxMenu.screenX}
          y={ctxMenu.screenY}
          flowPos={ctxMenu.flowPos}
          onAddNode={() => {
            const { screenX, screenY, flowPos } = ctxMenu
            setCtxMenu(null)
            pendingConnectRef.current = null
            pendingAddPosRef.current = flowPos
            setMenu({ screenX, screenY })
          }}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {notice && (
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-[12px] border border-white/[0.08] px-[18px] py-3 text-[14px] text-white shadow-xl"
          style={{ background: '#232326' }}
        >
          {notice.startsWith('✓') && (
            <span
              className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: '#1F8A5B' }}
            >
              ✓
            </span>
          )}
          {notice.replace(/^✓\s*/, '')}
        </div>
      )}
    </div>
  )
}
