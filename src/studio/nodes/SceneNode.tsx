import { type NodeProps } from '@xyflow/react'
import { Mountain } from 'lucide-react'
import type { PineNode } from '../types'
import GridImageNode from './GridImageNode'
import { ACCENTS } from './shared'

export default function SceneNode(props: NodeProps<PineNode>) {
  return (
    <GridImageNode
      {...props}
      kind="scene"
      accent={ACCENTS.scene}
      kindLabel="SCENE"
      label="场景"
      icon={Mountain}
      cols={2}
      runLabel="生成场景四宫格"
      placeholder="场景地点、时段、光线、氛围…"
      showAspectRatio={true}
    />
  )
}
