import { type NodeProps } from '@xyflow/react'
import { Package } from 'lucide-react'
import type { PineNode } from '../types'
import GridImageNode from './GridImageNode'
import { ACCENTS } from './shared'

export default function PropNode(props: NodeProps<PineNode>) {
  return (
    <GridImageNode
      {...props}
      accent={ACCENTS.prop}
      icon={Package}
      cols={3}
      placeholder="形态、材质、颜色、风格…"
    />
  )
}
