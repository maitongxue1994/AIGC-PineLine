import type {
  AspectRatio,
  NodeParams,
  NodeVersion,
  PineEdge,
  PineNode,
  PineNodeData,
  ShotItem,
} from './types'
import { GRID_VIEW_LABELS } from './nodeCatalog'

/**
 * v3 → v4 迁移：8 类业务节点收敛为 text/image/asset 三类内容节点。
 * 同时供 persist migrate 与 importProject（导入旧工程 JSON）复用。
 */

type LegacyKind =
  | 'script'
  | 'image'
  | 'storyboard'
  | 'scene'
  | 'character'
  | 'prop'
  | 'shot'
  | 'asset'

const LEGACY_KINDS = new Set<string>([
  'script',
  'image',
  'storyboard',
  'scene',
  'character',
  'prop',
  'shot',
  'asset',
])

type LegacyParams = {
  brief?: string
  tone?: NodeParams['tone']
  length?: NodeParams['length']
  prompt?: string
  aspectRatio?: string
  screenplay?: string
  splitter?: string
  mode?: 'auto' | 'manual'
  description?: string
  shotDescription?: string
}

type LegacyData = {
  kind: LegacyKind
  title?: string
  params?: LegacyParams
  output?: string | null
  outputs?: (string | null)[]
  outputErrors?: (string | null)[]
  shots?: ShotItem[]
  status?: string
  error?: string
}

export function isLegacyNode(node: unknown): boolean {
  const data = (node as { data?: { kind?: string; versions?: unknown } })?.data
  if (!data || typeof data.kind !== 'string') return false
  // 新模型必有 versions 数组；旧模型没有
  if (Array.isArray(data.versions)) return false
  return LEGACY_KINDS.has(data.kind)
}

const VALID_ASPECTS = new Set<string>([
  '1:1', '3:2', '2:3', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9',
])

function toAspect(v: string | undefined): AspectRatio | undefined {
  return v && VALID_ASPECTS.has(v) ? (v as AspectRatio) : undefined
}

function version(content: string | null, label?: string, error?: string | null): NodeVersion {
  return {
    id: crypto.randomUUID(),
    content,
    ...(label ? { label } : {}),
    ...(error ? { error } : {}),
    createdAt: Date.now(),
  }
}

/** 多输出（三视图/四宫格）→ versions，补视角标签与单格错误 */
function gridVersions(
  outputs: (string | null)[] | undefined,
  errors: (string | null)[] | undefined,
  labels: string[],
): NodeVersion[] {
  if (!outputs || outputs.length === 0) return []
  return outputs.map((o, i) => version(o, labels[i], errors?.[i] ?? null))
}

/** 单个旧节点 → 新数据模型（纯函数；未知类型原样返回避免白屏） */
export function migrateLegacyNode(node: PineNode): PineNode {
  const legacy = node.data as unknown as LegacyData
  if (!LEGACY_KINDS.has(legacy.kind)) return node

  const p = legacy.params ?? {}
  // 迁移时把遗留的 running 归位（在飞请求已随旧会话消失）
  const status =
    legacy.status === 'running' || !legacy.status
      ? 'idle'
      : (legacy.status as PineNodeData['status'])

  let data: PineNodeData

  switch (legacy.kind) {
    case 'script':
      data = {
        kind: 'text',
        preset: 'script',
        title: legacy.title ?? '剧本',
        prompt: p.brief ?? '',
        params: { tone: p.tone ?? 'cinematic', length: p.length ?? 'short' },
        versions: legacy.output ? [version(legacy.output)] : [],
        activeVersion: 0,
        status,
        error: legacy.error,
      }
      break
    case 'storyboard':
      data = {
        kind: 'text',
        preset: 'storyboard',
        title: legacy.title ?? '分镜',
        prompt: p.screenplay ?? '',
        params: { splitMode: p.mode ?? 'auto', splitter: p.splitter ?? '' },
        versions: legacy.output ? [version(legacy.output)] : [],
        activeVersion: 0,
        shots: legacy.shots,
        status,
        error: legacy.error,
      }
      break
    case 'image':
      data = {
        kind: 'image',
        preset: 'single',
        title: legacy.title ?? '图片',
        prompt: p.prompt ?? '',
        params: { aspectRatio: toAspect(p.aspectRatio) ?? '16:9', quality: '1K', batch: 1 },
        versions: legacy.output ? [version(legacy.output)] : [],
        activeVersion: 0,
        status,
        error: legacy.error,
      }
      break
    case 'shot':
      data = {
        kind: 'image',
        preset: 'shot',
        title: legacy.title ?? '分镜图',
        prompt: p.shotDescription ?? '',
        params: { aspectRatio: toAspect(p.aspectRatio) ?? '16:9', quality: '1K', batch: 1 },
        versions: legacy.output ? [version(legacy.output)] : [],
        activeVersion: 0,
        status,
        error: legacy.error,
      }
      break
    case 'scene':
      data = {
        kind: 'image',
        preset: 'scene-grid',
        title: legacy.title ?? '场景',
        prompt: p.description ?? '',
        params: { aspectRatio: toAspect(p.aspectRatio) ?? '16:9', quality: '1K' },
        versions: gridVersions(legacy.outputs, legacy.outputErrors, GRID_VIEW_LABELS['scene-grid']),
        activeVersion: 0,
        status,
        error: legacy.error,
      }
      break
    case 'character':
      data = {
        kind: 'image',
        preset: 'char-triview',
        title: legacy.title ?? '角色',
        prompt: p.description ?? '',
        params: { quality: '1K' },
        versions: gridVersions(legacy.outputs, legacy.outputErrors, GRID_VIEW_LABELS['char-triview']),
        activeVersion: 0,
        status,
        error: legacy.error,
      }
      break
    case 'prop':
      data = {
        kind: 'image',
        preset: 'prop-triview',
        title: legacy.title ?? '道具',
        prompt: p.description ?? '',
        params: { quality: '1K' },
        versions: gridVersions(legacy.outputs, legacy.outputErrors, GRID_VIEW_LABELS['prop-triview']),
        activeVersion: 0,
        status,
        error: legacy.error,
      }
      break
    case 'asset':
      data = {
        kind: 'asset',
        preset: null,
        title: legacy.title ?? '上传素材',
        prompt: '',
        params: {},
        versions: legacy.output ? [version(legacy.output)] : [],
        activeVersion: 0,
        // 素材节点内容即本体：有图=done，被 persist 剥离后=idle 提示重新上传
        status: legacy.output ? 'done' : 'idle',
      }
      break
  }

  return { ...node, type: data.kind, data }
}

/** 边清洗：剥离废弃 handle id 与旧橙色/动画样式（新默认灰边由 defaultEdgeOptions 提供） */
export function migrateLegacyEdge(edge: PineEdge): PineEdge {
  const e = { ...edge, sourceHandle: undefined, targetHandle: undefined }
  delete (e as { animated?: boolean }).animated
  delete (e as { style?: unknown }).style
  return e
}

/** 整图迁移：仅当检测到旧节点时才转换（幂等） */
export function migrateGraph(nodes: PineNode[], edges: PineEdge[]): {
  nodes: PineNode[]
  edges: PineEdge[]
} {
  const hasLegacy = nodes.some((n) => isLegacyNode(n))
  return {
    nodes: hasLegacy ? nodes.map((n) => (isLegacyNode(n) ? migrateLegacyNode(n) : n)) : nodes,
    edges: edges.map(migrateLegacyEdge),
  }
}
