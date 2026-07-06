/**
 * 真实积分费率表（服务端扣费真理；前端 nodeCatalog.estimateCost 与本表对齐，
 * scripts/verify-billing.mjs 交叉断言防漂移）。
 *
 * 锚：1 积分 = ¥0.01 成本口径；档位积分 = 官方成本 × ~2.0-2.5 毛利加成取整。
 * 官方价格（2026-07-06 官网核实，docs/商业化落地方案.md 有信源）：
 *   Seedance 2.0     480p ¥0.46/s · 720p ¥0.99/s · 1080p ¥2.48/s · 4k ¥5.05/s
 *   Seedance 2.0fast 480p ¥0.37/s · 720p ¥0.80/s
 *   Seedance 2.0mini 480p ¥0.23/s · 720p ¥0.50/s
 *   Hailuo-2.3 768P ¥0.33/s · 1080P ¥0.58/s；Hailuo-02 512P ¥0.10/s
 *   Seedream 5.0 ¥0.22/张；Gemini 3.1 Flash Image 1K ¥0.48 / 2K ¥0.73 / 4K ¥1.09
 *   文本（豆包 pro / MiniMax M 系）单次 ¥0.005-0.03
 */

/** 视频每秒积分（模型 apiModel 前缀 × 分辨率）；未知模型回落 default（按最贵档保守） */
const VIDEO_PER_SEC: Record<string, Record<string, number>> = {
  'doubao-seedance-2-0-fast': { '480p': 80, '720p': 180 },
  'doubao-seedance-2-0-mini': { '480p': 50, '720p': 110 },
  'doubao-seedance-2-0': { '480p': 100, '720p': 200, '1080p': 500, '4k': 1200 },
  // 海螺按条计费（768P 6s ¥2 / 1080P 6s ¥3.5），折算每秒
  'MiniMax-Hailuo-2.3': { '480p': 75, '720p': 75, '768p': 75, '1080p': 130 },
  'MiniMax-Hailuo-02': { '480p': 25, '512p': 25, '720p': 75, '1080p': 130 },
  default: { '480p': 100, '720p': 200, '1080p': 500, '4k': 1200 },
}

/** 图像每张积分（模型 × 质量档）；Seedream 官方不分档同价 */
const IMAGE_PER_SHOT: Record<string, Record<string, number>> = {
  'doubao-seedream': { '1K': 50, '2K': 50, '4K': 50 },
  gemini: { '1K': 100, '2K': 150, '4K': 250 },
  default: { '1K': 100, '2K': 150, '4K': 250 },
}

/** 文本/编排类每次调用积分（成本 ¥0.005-0.03，统一档覆盖并留联网/长上下文余量） */
export const TEXT_CALL_CREDITS = 5

function videoPerSec(model: string | undefined, resolution: string): number {
  const m = model ?? ''
  const key =
    Object.keys(VIDEO_PER_SEC).find((k) => k !== 'default' && m.startsWith(k)) ?? 'default'
  const table = VIDEO_PER_SEC[key]
  return table[resolution.toLowerCase()] ?? table['720p'] ?? VIDEO_PER_SEC.default['720p']
}

function imagePerShot(model: string | undefined, quality: string | undefined): number {
  const m = model ?? ''
  const key = m.startsWith('doubao-seedream') ? 'doubao-seedream' : m ? 'gemini' : 'default'
  const table = IMAGE_PER_SHOT[key] ?? IMAGE_PER_SHOT.default
  return table[quality ?? '1K'] ?? table['1K']
}

type ChargeBody = {
  model?: string
  resolution?: string
  duration?: number
  quality?: string
  prompts?: unknown[]
}

/**
 * 按路径+请求体估算本次调用扣费积分（预扣制：创建成功即扣）。
 * duration=-1（模型智能时长）按上限 15s 计，防钻空。
 */
export function chargeFor(pathname: string, body: ChargeBody): number {
  switch (pathname) {
    case '/api/generate/video': {
      const sec = body.duration === -1 ? 15 : Math.min(15, Math.max(2, Math.round(body.duration ?? 5)))
      return videoPerSec(body.model, body.resolution ?? '720p') * sec
    }
    case '/api/generate/image':
      return imagePerShot(body.model, body.quality)
    case '/api/generate/image-grid': {
      const n = Math.min(6, Math.max(1, Array.isArray(body.prompts) ? body.prompts.length : 1))
      return imagePerShot(body.model, body.quality) * n
    }
    case '/api/generate/script':
    case '/api/generate/storyboard':
    case '/api/agent/chat':
      return TEXT_CALL_CREDITS
    default:
      return 0
  }
}
