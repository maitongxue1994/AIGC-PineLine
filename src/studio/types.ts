import type { Node, Edge } from '@xyflow/react'

/**
 * v4 节点体系：8 类业务节点收敛为 3 类内容节点（TapNow 式）。
 * 业务语义（剧本/分镜/三视图/四宫格…）下沉为节点上的「生成预设」preset。
 */
export type NodeKind = 'text' | 'image' | 'asset'

export type TextPreset = 'free' | 'script' | 'storyboard' | 'ad-copy'

export type ImagePreset =
  | 'single'
  | 'shot'
  | 'scene-grid'
  | 'char-triview'
  | 'prop-triview'

export type NodePreset = TextPreset | ImagePreset

export type NodeStatus = 'idle' | 'running' | 'done' | 'error'

/** Gemini imageConfig.aspectRatio 官方枚举（省略 = 自适应） */
export type AspectRatio =
  | '1:1'
  | '3:2'
  | '2:3'
  | '3:4'
  | '4:3'
  | '4:5'
  | '5:4'
  | '9:16'
  | '16:9'
  | '21:9'

/** Gemini imageConfig.imageSize 官方枚举（必须大写 K） */
export type ImageQuality = '1K' | '2K' | '4K'

/** 单次出图张数（设计稿倍数弹层：1× / 2× / 4×） */
export type BatchCount = 1 | 2 | 4

/** Pin 标记六色（设计稿 §01 色板） */
export type PinColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'

export type ShotItem = {
  id: string
  title: string
  description: string
}

/**
 * 节点产出的一个版本：文本节点为正文字符串，图像节点为 data URL。
 * 统一承载三视图/四宫格（带视角 label）、批量出图与版本层叠。
 */
export type NodeVersion = {
  id: string
  content: string | null
  label?: string
  error?: string | null
  createdAt: number
}

/** 扁平可选参数包：preset 决定实际使用哪些字段 */
export type NodeParams = {
  tone?: 'cinematic' | 'commercial' | 'drama' | 'documentary'
  length?: 'short' | 'medium' | 'long'
  splitMode?: 'auto' | 'manual'
  splitter?: string
  /** undefined = 自适应 */
  aspectRatio?: AspectRatio
  quality?: ImageQuality
  batch?: BatchCount
  /** 摄影机预设摘要（摄影机面板「保存」回填，注入生成提示词） */
  camera?: string
}

export type PineNodeData = {
  kind: NodeKind
  /** asset 节点无 preset */
  preset: NodePreset | null
  title: string
  /** 统一提示词（原 brief / screenplay / description / shotDescription） */
  prompt: string
  params: NodeParams
  versions: NodeVersion[]
  /** 当前展示的版本下标（版本层叠/批次徽章切换） */
  activeVersion: number
  /** storyboard 预设的结构化产出 */
  shots?: ShotItem[]
  status: NodeStatus
  error?: string
  /** Pin 标记颜色（无 = 未标记） */
  pin?: PinColor
}

export type PineNode = Node<PineNodeData>
export type PineEdge = Edge

/** 取当前激活版本内容（无版本时为 null） */
export function activeContent(data: PineNodeData): string | null {
  return data.versions[data.activeVersion]?.content ?? null
}

export function isImageContent(s: string | null | undefined): boolean {
  return !!s && s.startsWith('data:image')
}

// ---------------- API 契约 ----------------

export type ScriptRequest = {
  brief: string
  tone?: NodeParams['tone']
  length?: NodeParams['length']
  /** 文本预设：script=剧本（默认）/ ad-copy=广告词 / free=自由文本 */
  preset?: 'script' | 'ad-copy' | 'free'
}

export type ScriptResponse = {
  script: string
}

export type ImageRequest = {
  prompt: string
  referenceImage?: string
  referenceImages?: string[]
  aspectRatio?: AspectRatio
  quality?: ImageQuality
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
  quality?: ImageQuality
}

export type ImageGridResponse = {
  images: (string | null)[]
  errors?: (string | null)[]
}

export type ApiError = {
  error: string
  detail?: string
}
