import type { Node, Edge } from '@xyflow/react'

export type NodeKind =
  | 'script'
  | 'image'
  | 'storyboard'
  | 'scene'
  | 'character'
  | 'prop'
  | 'shot'
  | 'asset'

export type NodeStatus = 'idle' | 'running' | 'done' | 'error'

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4'

export type ScriptParams = {
  brief: string
  tone: 'cinematic' | 'commercial' | 'drama' | 'documentary'
  length: 'short' | 'medium' | 'long'
}

export type ImageParams = {
  prompt: string
  aspectRatio: AspectRatio
}

export type StoryboardParams = {
  screenplay: string
  splitter: string
  mode: 'auto' | 'manual'
}

export type SceneParams = {
  description: string
  aspectRatio: AspectRatio
}

// 角色/道具的参考图不再是参数：把「上传素材」节点连进来即可（v3 去死参数）
export type CharacterParams = {
  description: string
}

export type PropParams = {
  description: string
}

export type ShotParams = {
  shotDescription: string
  aspectRatio: AspectRatio
}

// 上传素材节点：output 即图片本体（data URL），不调模型，仅作下游参考图；无可编辑参数
export type AssetParams = Record<string, never>

export type ShotItem = {
  id: string
  title: string
  description: string
}

export type PineNodeData = {
  kind: NodeKind
  title: string
  params:
    | ScriptParams
    | ImageParams
    | StoryboardParams
    | SceneParams
    | CharacterParams
    | PropParams
    | ShotParams
    | AssetParams
  output: string | null
  outputs?: (string | null)[]
  outputErrors?: (string | null)[]
  shots?: ShotItem[]
  status: NodeStatus
  error?: string
}

export type PineNode = Node<PineNodeData>
export type PineEdge = Edge

export type ScriptRequest = {
  brief: string
  tone?: ScriptParams['tone']
  length?: ScriptParams['length']
}

export type ScriptResponse = {
  script: string
}

export type ImageRequest = {
  prompt: string
  referenceImage?: string
  referenceImages?: string[]
  aspectRatio?: AspectRatio
}

export type ImageResponse = {
  image: string
}

export type StoryboardRequest = {
  screenplay: string
  splitter?: string
}

export type StoryboardResponse = {
  shots: ShotItem[]
}

export type ImageGridRequest = {
  prompts: string[]
  referenceImages?: string[]
  aspectRatio?: AspectRatio
}

export type ImageGridResponse = {
  images: (string | null)[]
  errors?: (string | null)[]
}

export type ApiError = {
  error: string
  detail?: string
}
