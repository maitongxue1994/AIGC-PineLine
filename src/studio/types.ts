import type { Node, Edge } from '@xyflow/react'

export type NodeKind = 'script' | 'image'

export type NodeStatus = 'idle' | 'running' | 'done' | 'error'

export type ScriptParams = {
  brief: string
  tone: 'cinematic' | 'commercial' | 'drama' | 'documentary'
  length: 'short' | 'medium' | 'long'
}

export type ImageParams = {
  prompt: string
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
  referenceImage?: string
}

export type PineNodeData = {
  kind: NodeKind
  title: string
  params: ScriptParams | ImageParams
  output: string | null
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
  aspectRatio?: ImageParams['aspectRatio']
}

export type ImageResponse = {
  image: string
}

export type ApiError = {
  error: string
  detail?: string
}
