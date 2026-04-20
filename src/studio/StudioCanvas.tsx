import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useReactFlow,
  type NodeTypes,
  type OnConnectEnd,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useStudioStore } from './store'
import ScriptNode from './nodes/ScriptNode'
import ImageNode from './nodes/ImageNode'
import NodePaletteMenu, { type PaletteChoice } from './NodePaletteMenu'

const nodeTypes: NodeTypes = {
  script: ScriptNode,
  image: ImageNode,
}

function StudioCanvasInner() {
  const nodes = useStudioStore((s) => s.nodes)
  const edges = useStudioStore((s) => s.edges)
  const onNodesChange = useStudioStore((s) => s.onNodesChange)
  const onEdgesChange = useStudioStore((s) => s.onEdgesChange)
  const onConnect = useStudioStore((s) => s.onConnect)
  const addScriptNode = useStudioStore((s) => s.addScriptNode)
  const addImageNode = useStudioStore((s) => s.addImageNode)
  const selectNode = useStudioStore((s) => s.selectNode)

  const { screenToFlowPosition } = useReactFlow()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const pendingConnectRef = useRef<{
    fromNodeId: string
    fromHandle?: string | null
    fromType: 'source' | 'target'
    flowPos: { x: number; y: number }
  } | null>(null)
  const [menu, setMenu] = useState<{ screenX: number; screenY: number } | null>(
    null,
  )

  const handleSelectionChange = useCallback(
    ({ nodes }: { nodes: { id: string }[] }) => {
      selectNode(nodes[0]?.id ?? null)
    },
    [selectNode],
  )

  const handleConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (connectionState.isValid) return
      const fromNode = connectionState.fromNode
      if (!fromNode) return

      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : (event as MouseEvent)

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

  const handlePick = useCallback(
    (choice: PaletteChoice) => {
      const pending = pendingConnectRef.current
      if (!pending) {
        setMenu(null)
        return
      }
      const newId =
        choice === 'script'
          ? addScriptNode(pending.flowPos)
          : addImageNode(pending.flowPos)

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
    [addScriptNode, addImageNode, onConnect],
  )

  return (
    <div ref={wrapperRef} className="relative h-full w-full bg-bg-0">
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
      >
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
          nodeColor={(n) => (n.type === 'script' ? '#FF6A3D' : '#7C5CFF')}
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
            setMenu(null)
          }}
        />
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
