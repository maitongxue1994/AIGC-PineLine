import { type NodeProps } from '@xyflow/react'
import { Package } from 'lucide-react'
import type { PineNode } from '../types'
import GridImageNode from './GridImageNode'
import { ACCENTS } from './shared'

export default function PropNode(props: NodeProps<PineNode>) {
  return (
    <GridImageNode
      {...props}
      kind="prop"
      accent={ACCENTS.prop}
      kindLabel="PROP"
      label="道具"
      icon={Package}
      cols={3}
      runLabel="生成道具三视图"
      placeholder="形态、材质、颜色、风格…"
    />
  )
}
