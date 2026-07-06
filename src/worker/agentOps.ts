/**
 * Agent ops 白名单校验——纯函数、零运行时依赖，便于零依赖脚本直测
 * （scripts/verify-agent-ops.mjs；与 seedanceBody.ts 同一抽取模式）。
 */

export type AgentOp =
  | { op: 'add_node'; ref: string; kind: 'text' | 'image' | 'video'; preset?: string; title?: string; prompt?: string; params?: Record<string, unknown>; position?: { x: number; y: number } }
  | { op: 'set_prompt'; id: string; prompt: string }
  | { op: 'set_params'; id: string; params: Record<string, unknown> }
  | { op: 'rename'; id: string; title: string }
  | { op: 'connect'; source: string; target: string }
  | { op: 'delete_node'; id: string }
  | { op: 'run'; ids: string[] }
  | { op: 'clear_canvas' }
  /** 分镜两段式派生（单条 op 替代 N×add_node+connect）：id 为 storyboard 节点 */
  | { op: 'derive_shot_images'; id: string; indices?: number[] }
  | { op: 'derive_shot_videos'; id: string; run?: boolean }
  /** 把用户的稳定偏好/项目设定写入本地长期记忆 */
  | { op: 'remember'; content: string }

const VALID_OPS = new Set(['add_node', 'set_prompt', 'set_params', 'rename', 'connect', 'delete_node', 'run', 'clear_canvas', 'derive_shot_images', 'derive_shot_videos', 'remember'])
const VALID_KINDS = new Set(['text', 'image', 'video'])
const VALID_PRESETS = new Set([
  'free', 'script', 'storyboard', 'ad-copy',
  'single', 'shot', 'scene-grid', 'char-triview', 'prop-triview',
])
/** add_node/set_params 允许透传的参数键（对齐前端 NodeParams 白名单） */
const VALID_PARAM_KEYS = new Set([
  'shotIndex', 'aspectRatio', 'quality', 'batch', 'tone', 'length', 'splitMode', 'splitter',
  'videoMode', 'videoRatio', 'videoDuration', 'videoResolution', 'videoModel', 'videoAudio',
  'videoNoSubtitles', 'videoNoBgm', 'videoNoSfx', 'voiceNarration', 'voiceCast',
  'textModel', 'imageModel',
])
/**
 * 模型键的值白名单（对齐前端 nodeCatalog 的 TEXT/IMAGE/VIDEO_MODELS id）。
 * 本模块零依赖（test:agent-ops 门禁直测），不 import 前端文件——枚举以字面量维护。
 * 非法模型值只丢该键，不整条丢 op。
 */
const MODEL_VALUE_WHITELIST: Record<string, ReadonlySet<string>> = {
  textModel: new Set(['minimax-m2.7', 'minimax-m3', 'doubao-seed-2.0-pro', 'doubao-seed-2.0-lite', 'doubao-seed-evolving']),
  imageModel: new Set(['gemini-3.1-flash', 'seedream-5.0']),
  videoModel: new Set([
    'seedance-2.0', 'seedance-2.0-fast', 'seedance-2.0-mini',
    'hailuo-2.3', 'hailuo-02', 'wan-2.7', 'kling-v2-6', 'veo-3.1-fast',
  ]),
}
// 完整管线（剧本+分镜+N分镜图+N视频+连线+run）很容易超 20 条，放宽到 48
export const MAX_OPS = 48

/** 参数白名单过滤：只留已知键的标量值 */
function pickParams(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!VALID_PARAM_KEYS.has(k)) continue
    if (typeof v !== 'string' && typeof v !== 'number' && typeof v !== 'boolean') continue
    const allowValues = MODEL_VALUE_WHITELIST[k]
    if (allowValues && (typeof v !== 'string' || !allowValues.has(v))) continue
    out[k] = v
  }
  return Object.keys(out).length ? out : null
}

/** 服务端白名单校验：非法 op 丢弃，附注说明 */
export function sanitizeOps(rawOps: unknown[]): { ops: AgentOp[]; dropped: number } {
  const ops: AgentOp[] = []
  let dropped = 0
  for (const raw of rawOps.slice(0, MAX_OPS)) {
    const o = raw as Record<string, unknown>
    if (!o || typeof o.op !== 'string' || !VALID_OPS.has(o.op)) {
      dropped++
      continue
    }
    switch (o.op) {
      case 'add_node': {
        if (
          typeof o.ref !== 'string' ||
          typeof o.kind !== 'string' ||
          !VALID_KINDS.has(o.kind) ||
          // video 节点无 preset；text/image 的 preset 走白名单
          (o.kind !== 'video' && o.preset != null && !VALID_PRESETS.has(String(o.preset)))
        ) {
          dropped++
          continue
        }
        const params = pickParams(o.params)
        ops.push({
          op: 'add_node',
          ref: o.ref.slice(0, 24),
          kind: o.kind as 'text' | 'image' | 'video',
          ...(o.preset && o.kind !== 'video' ? { preset: String(o.preset) } : {}),
          ...(typeof o.title === 'string' ? { title: o.title.slice(0, 60) } : {}),
          ...(typeof o.prompt === 'string' ? { prompt: o.prompt.slice(0, 2000) } : {}),
          ...(params ? { params } : {}),
          ...(o.position &&
          typeof (o.position as { x?: unknown }).x === 'number' &&
          typeof (o.position as { y?: unknown }).y === 'number'
            ? { position: o.position as { x: number; y: number } }
            : {}),
        })
        break
      }
      case 'set_prompt':
        if (typeof o.id !== 'string' || typeof o.prompt !== 'string') { dropped++; continue }
        ops.push({ op: 'set_prompt', id: o.id, prompt: o.prompt.slice(0, 2000) })
        break
      case 'set_params': {
        const params = typeof o.id === 'string' ? pickParams(o.params) : null
        if (!params) { dropped++; continue }
        ops.push({ op: 'set_params', id: o.id as string, params })
        break
      }
      case 'rename':
        if (typeof o.id !== 'string' || typeof o.title !== 'string') { dropped++; continue }
        ops.push({ op: 'rename', id: o.id, title: o.title.slice(0, 60) })
        break
      case 'connect':
        if (typeof o.source !== 'string' || typeof o.target !== 'string') { dropped++; continue }
        ops.push({ op: 'connect', source: o.source, target: o.target })
        break
      case 'delete_node':
        if (typeof o.id !== 'string') { dropped++; continue }
        ops.push({ op: 'delete_node', id: o.id })
        break
      case 'run':
        if (!Array.isArray(o.ids) || !o.ids.every((x) => typeof x === 'string')) { dropped++; continue }
        ops.push({ op: 'run', ids: o.ids.slice(0, MAX_OPS) as string[] })
        break
      case 'clear_canvas':
        ops.push({ op: 'clear_canvas' })
        break
      case 'derive_shot_images': {
        if (typeof o.id !== 'string') { dropped++; continue }
        const indices = Array.isArray(o.indices)
          ? (o.indices.filter((x) => typeof x === 'number' && Number.isInteger(x) && x >= 0) as number[]).slice(0, MAX_OPS)
          : undefined
        ops.push({ op: 'derive_shot_images', id: o.id, ...(indices?.length ? { indices } : {}) })
        break
      }
      case 'derive_shot_videos':
        if (typeof o.id !== 'string') { dropped++; continue }
        ops.push({ op: 'derive_shot_videos', id: o.id, ...(o.run === true ? { run: true } : {}) })
        break
      case 'remember':
        if (typeof o.content !== 'string' || !o.content.trim()) { dropped++; continue }
        ops.push({ op: 'remember', content: o.content.trim().slice(0, 500) })
        break
    }
  }
  return { ops, dropped }
}
