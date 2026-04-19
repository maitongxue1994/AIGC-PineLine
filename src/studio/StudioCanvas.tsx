import { useCallback } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useStudioStore } from './store'
import ScriptNode from './nodes/ScriptNode'
import ImageNode from './nodes/ImageNode'

const nodeTypes: NodeTypes = {
  script: ScriptNode,
  image: ImageNode,
}

export default function StudioCanvas() {
  const nodes = useStudioStore((s) => s.nodes)
  const edges = useStudioStore((s) => s.edges)
  const onNodesChange = useStudioStore((s) => s.onNodesChange)
  const onEdgesChange = useStudioStore((s) => s.onEdgesChange)
  const onConnect = useStudioStore((s) => s.onConnect)
  const selectNode = useStudioStore((s) => s.selectNode)

  const handleSelectionChange = useCallback(
    ({ nodes }: { nodes: { id: string }[] }) => {
      selectNode(nodes[0]?.id ?? null)
    },
    [selectNode],
  )

  return (
    <div className="h-full w-full bg-bg-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
    </div>
  )
}
