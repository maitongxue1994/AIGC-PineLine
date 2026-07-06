import { PineHttpError, fetchWithRetry, fetchWithTimeout, pushGenLog, upstreamRequestId } from './utils'

/**
 * 火山方舟通用通道（与 Seedance 视频共用 ARK_API_KEY）：
 * - 豆包 Seed 语言模型（chat completions，OpenAI 兼容）
 * - Seedream 生图（images/generations，同步接口）
 * 端点依据 docs/模型API调研-2026-07.md（2026-07 官方文档核实）。
 */

const DEFAULT_BASE = 'https://ark.cn-beijing.volces.com'

export function arkBase(baseUrl?: string): string {
  return (baseUrl?.trim() || DEFAULT_BASE).replace(/\/$/, '')
}

const KEY_GUIDE =
  '豆包/Seedream 模型未接入：请配置 Worker secret ARK_API_KEY（与 Seedance 同一密钥），' +
  '并在方舟控制台开通对应模型。详见 docs/视频生成接入指南.md'

export function requireArkKey(key?: string): string {
  const k = key?.trim()
  if (!k) throw new PineHttpError(501, KEY_GUIDE)
  return k
}

/** 判断该 model id 是否走方舟通道 */
export function isArkModel(model?: string): boolean {
  return !!model?.startsWith('doubao-')
}

// ---------------- 豆包 Seed 语言模型 ----------------

export type ArkContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

/** content 支持多模态 parts（Seed 2.0 视觉：image_url 接受 base64 data URL，单图 ≤10MB） */
export type ArkChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string | ArkContentPart[]
}

type ArkChatResponse = {
  choices?: Array<{ message?: { content?: string; reasoning_content?: string } }>
  error?: { message?: string }
}

/** 日志预览：多模态 content 取首个 text part */
function arkMsgPreview(messages: ArkChatMessage[]): string {
  const c = messages[messages.length - 1]?.content
  if (typeof c === 'string') return c.slice(0, 80)
  return (c?.find((p) => p.type === 'text') as { text?: string } | undefined)?.text?.slice(0, 80) ?? '[多模态消息]'
}

/**
 * 多轮对话通道（Agent 编排等）：接收完整 messages[]，OpenAI 兼容 chat/completions。
 * 额外带出 Seed 推理模型的思考过程（与 callMinimaxChatFull 同形）。
 */
export async function callArkChat(
  model: string,
  messages: ArkChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; baseUrl?: string } = {},
): Promise<{ content: string; reasoning?: string }> {
  const key = requireArkKey(apiKey)
  const started = Date.now()
  const res = await fetchWithTimeout(
    `${arkBase(opts.baseUrl)}/api/v3/chat/completions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: opts.temperature ?? 0.7,
        max_tokens: opts.maxTokens ?? 4096,
      }),
    },
    // Seed 2.0 亦为推理系模型，长文预算与 MiniMax 对齐
    150_000,
  )
  const requestId = upstreamRequestId(res)
  const fail: (message: string) => never = (message) => {
    pushGenLog({
      ts: started,
      path: 'upstream:ark-text',
      ok: false,
      status: res.status,
      ms: Date.now() - started,
      error: message.slice(0, 300),
      ...(requestId ? { requestId } : {}),
      model,
      note: arkMsgPreview(messages),
    })
    throw new Error(requestId ? `${message}（request-id: ${requestId}）` : message)
  }
  const json = (await res.json().catch(() => null)) as ArkChatResponse | null
  if (!res.ok) {
    fail(`豆包 HTTP ${res.status}: ${json?.error?.message ?? ''}`.trim())
  }
  const message = json?.choices?.[0]?.message
  const content = message?.content
  if (!content) fail('豆包未返回内容')
  return {
    content,
    ...(message?.reasoning_content ? { reasoning: message.reasoning_content } : {}),
  }
}

/** system+user 两段的薄封装（剧本/分镜等单轮文本生成沿用） */
export async function callArkText(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; baseUrl?: string } = {},
): Promise<string> {
  const { content } = await callArkChat(
    model,
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    apiKey,
    opts,
  )
  return content
}

// ---------------- Seedream 生图（同步） ----------------

/** 前端 aspectRatio × quality → Seedream 显式宽高（5.0 总像素下限约 3.69M，即最低 ≈2K） */
const SIZE_2K: Record<string, [number, number]> = {
  '1:1': [2048, 2048],
  '16:9': [2848, 1600],
  '9:16': [1600, 2848],
  '4:3': [2496, 1872],
  '3:4': [1872, 2496],
  '3:2': [2544, 1696],
  '2:3': [1696, 2544],
  '4:5': [1824, 2280],
  '5:4': [2280, 1824],
  '21:9': [3024, 1296],
}

function seedreamSize(aspectRatio?: string, quality?: string): string {
  const is4K = quality === '4K'
  const base = aspectRatio ? SIZE_2K[aspectRatio] : undefined
  // 无比例要求（自适应）用预设档，模型按提示词语义定比例
  if (!base) return is4K ? '4K' : '2K'
  const scale = is4K ? 1.4 : 1
  const w = Math.round((base[0] * scale) / 16) * 16
  const h = Math.round((base[1] * scale) / 16) * 16
  return `${w}x${h}`
}

type ArkImageResponse = {
  data?: Array<{ b64_json?: string; url?: string }>
  error?: { message?: string }
}

export type SeedreamImageResult = { image: string; requestId?: string }

export async function callSeedreamImage(
  model: string,
  prompt: string,
  apiKey: string,
  opts: {
    referenceImages?: string[]
    aspectRatio?: string
    quality?: string
    baseUrl?: string
  } = {},
): Promise<SeedreamImageResult> {
  const key = requireArkKey(apiKey)
  const body: Record<string, unknown> = {
    model,
    prompt,
    size: seedreamSize(opts.aspectRatio, opts.quality),
    response_format: 'b64_json',
    watermark: false,
    sequential_image_generation: 'disabled',
  }
  const refs = (opts.referenceImages ?? []).filter(Boolean).slice(0, 14)
  if (refs.length) body.image = refs.length === 1 ? refs[0] : refs

  const started = Date.now()
  const res = await fetchWithRetry(
    `${arkBase(opts.baseUrl)}/api/v3/images/generations`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    },
    // 同步生图偶发慢（尤其 4K/多参考图），120s 仍见超时 → 提到 180s
    180_000,
  )
  const requestId = upstreamRequestId(res)
  const fail: (status: number, message: string) => never = (status, message) => {
    pushGenLog({
      ts: started,
      path: 'upstream:seedream',
      ok: false,
      status,
      ms: Date.now() - started,
      error: message.slice(0, 300),
      ...(requestId ? { requestId } : {}),
      model,
      note: prompt.slice(0, 80),
    })
    throw new Error(requestId ? `${message}（request-id: ${requestId}）` : message)
  }
  const json = (await res.json().catch(() => null)) as ArkImageResponse | null
  if (!res.ok) {
    fail(res.status, `Seedream HTTP ${res.status}: ${json?.error?.message ?? ''}`.trim())
  }
  const item = json?.data?.[0]
  if (item?.b64_json) return { image: `data:image/jpeg;base64,${item.b64_json}`, requestId }
  // 兜底：个别档位仅回 URL 时由 Worker 取回转 base64（URL 有时效，不下发前端）
  if (item?.url) {
    const img = await fetchWithTimeout(item.url, {}, 60_000)
    if (!img.ok) fail(img.status, `Seedream 图片下载失败（HTTP ${img.status}）`)
    const buf = new Uint8Array(await img.arrayBuffer())
    let bin = ''
    const CHUNK = 0x8000
    for (let i = 0; i < buf.length; i += CHUNK) {
      bin += String.fromCharCode(...buf.subarray(i, i + CHUNK))
    }
    return { image: `data:image/jpeg;base64,${btoa(bin)}`, requestId }
  }
  fail(res.status, 'Seedream 未返回图片')
}
