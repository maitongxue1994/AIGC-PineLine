import { type NodeProps } from '@xyflow/react'
import { User } from 'lucide-react'
import type { PineNode } from '../types'
import GridImageNode from './GridImageNode'
import { ACCENTS } from './shared'

export default function CharacterNode(props: NodeProps<PineNode>) {
  return (
    <GridImageNode
      {...props}
      accent={ACCENTS.character}
      icon={User}
      cols={3}
      placeholder="外貌、服装、年龄、气质…"
    />
  )
}
