import { type NodeProps } from '@xyflow/react'
import { User } from 'lucide-react'
import type { PineNode } from '../types'
import GridImageNode from './GridImageNode'
import { ACCENTS } from './shared'

export default function CharacterNode(props: NodeProps<PineNode>) {
  return (
    <GridImageNode
      {...props}
      kind="character"
      accent={ACCENTS.character}
      kindLabel="CHARACTER"
      label="角色"
      icon={User}
      cols={3}
      runLabel="生成角色三视图"
      placeholder="外貌、服装、年龄、气质…"
    />
  )
}
