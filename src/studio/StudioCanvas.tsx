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
import { Redo2, Undo2 } from 'lucide-react'
import '@xyflow/react/dist/style.css'
import { useStudioStore } from './store'
import ScriptNode from './nodes/ScriptNode'
import ImageNode from './nodes/ImageNode'
import StoryboardNode from './nodes/StoryboardNode'
import SceneNode from './nodes/SceneNode'
import CharacterNode from './nodes/CharacterNode'
import PropNode from './nodes/PropNode'
import ShotNode from './nodes/ShotNode'
import AssetNode from './nodes/AssetNode'
import NodePaletteMenu, { type PaletteChoice } from './NodePaletteMenu'

const nodeTypes: NodeTypes = {
  script: ScriptNode,
  image: ImageNode,
  storyboard: StoryboardNode,
  scene: SceneNode,
  character: CharacterNode,
  prop: PropNode,
  shot: ShotNode,
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
  const addScriptNode = useStudioStore((s) => s.addScriptNode)
  const addImageNode = useStudioStore((s) => s.addImageNode)
  const addStoryboardNode = useStudioStore((s) => s.addStoryboardNode)
  const addSceneNode = useStudioStore((s) => s.addSceneNode)
  const addCharacterNode = useStudioStore((s) => s.addCharacterNode)
  const addPropNode = useStudioStore((s) => s.addPropNode)
  const addShotNode = useStudioStore((s) => s.addShotNode)
  const selectNode = useStudioStore((s) => s.selectNode)
  const runNode = useStudioStore((s) => s.runNode)
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const duplicateNode = useStudioStore((s) => s.duplicateNode)
  const undo = useStudioStore((s) => s.undo)
  const redo = useStudioStore((s) => s.redo)
  const canUndo = useStudioStore((s) => s.past.length > 0)
  const canRedo = useStudioStore((s) => s.future.length > 0)

  const { screenToFlowPosition } = useReactFlow()
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

  const handleSelectionChange = useCallback(
    ({ nodes }: { nodes: { id: string }[] }) => {
      selectNode(nodes[0]?.id ?? null)
    },
    [selectNode],
  )

  // 键盘快捷键：Cmd/Ctrl+Enter 运行选中节点；Cmd/Ctrl+Z 撤销；Cmd/Ctrl+Shift+Z 重做；
  // Cmd/Ctrl+D 复制选中节点；Esc 关闭新建菜单
  // Delete/Backspace 由 ReactFlow 内置（onNodesChange 收到 remove 即可）
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

  // 双击空白画布 → 在落点弹新建菜单（TapNow 同款交互）
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('react-flow__pane')) return
      pendingConnectRef.current = null
      pendingAddPosRef.current = screenToFlowPosition({ x: e.clientX, y: e.clientY })
      setMenu({ screenX: e.clientX, screenY: e.clientY })
    },
    [screenToFlowPosition],
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
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/'),
      )
      if (!files.length) return
      e.preventDefault()

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
          const pos = screenToFlowPosition({
            x: base.x + i * 48,
            y: base.y + i * 48,
          })
          addAssetNode(String(reader.result ?? ''), pos)
        }
        reader.onerror = () => flash(`读取「${file.name}」失败`)
        reader.readAsDataURL(file)
      })
    },
    [addAssetNode, flash, screenToFlowPosition],
  )

  const handlePick = useCallback(
    (choice: PaletteChoice) => {
      const pending = pendingConnectRef.current
      if (!pending) {
        const pos = pendingAddPosRef.current
        pendingAddPosRef.current = null
        setMenu(null)
        if (pos) {
          const adders: Record<PaletteChoice, (p: { x: number; y: number }) => string> = {
            script: addScriptNode,
            storyboard: addStoryboardNode,
            scene: addSceneNode,
            character: addCharacterNode,
            prop: addPropNode,
            shot: addShotNode,
            image: addImageNode,
          }
          adders[choice](pos)
        }
        return
      }
      const adders: Record<PaletteChoice, (pos: { x: number; y: number }) => string> = {
        script: addScriptNode,
        storyboard: addStoryboardNode,
        scene: addSceneNode,
        character: addCharacterNode,
        prop: addPropNode,
        shot: addShotNode,
        image: addImageNode,
      }
      const newId = adders[choice](pending.flowPos)

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
    [
      addScriptNode,
      addImageNode,
      addStoryboardNode,
      addSceneNode,
      addCharacterNode,
      addPropNode,
      addShotNode,
      onConnect,
    ],
  )

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full bg-bg-0"
      onDoubleClick={handleDoubleClick}
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
          <span className="ml-1 hidden self-center text-[10px] text-ink-3 lg:inline">
            双击空白新建节点 · 拖图片进画布作参考
          </span>
        </Panel>
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#222"
        />
        <Controls
          className="!border !border-white/[0.07] !bg-bg-2/80 !shadow-none [&>button]:!border-white/[0.07] [&>button]:!bg-bg-1 [&>button]:!text-ink-1 [&>button:hover]:!bg-bg-2"
          showInteractive={false}
        />
        <MiniMap
          className="!border !border-white/[0.07] !bg-bg-2/70"
          nodeColor={(n) => {
            const colors: Record<string, string> = {
              script: '#FF6A3D',
              storyboard: '#FF6A3D',
              scene: '#2BE3C2',
              character: '#F4A64F',
              prop: '#B6FF5F',
              shot: '#7C5CFF',
              image: '#7C5CFF',
              asset: '#22D3EE',
            }
            return colors[n.type ?? ''] ?? '#7C5CFF'
          }}
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
