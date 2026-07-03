import { fetchWithTimeout } from './utils'

// 稳定版（preview 版官方已于 2026-06-25 弃用关停，见 docs/模型API调研-2026-07.md 图片模型节）
const MODEL = 'gemini-3.1-flash-image'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

type ImagePart = { inlineData: { mimeType: string; data: string } }
type TextPart = { text: string }
type Part = TextPart | ImagePart

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ inlineData?: { mimeType?: string; data?: string }; text?: string }> }
    finishReason?: string
  }>
  promptFeedback?: { blockReason?: string }
  error?: { message?: string }
}

/** Gemini imageConfig 官方枚举（aspectRatio 省略 = 自适应；imageSize 必须大写 K） */
export type GeminiAspectRatio =
  | '1:1' | '3:2' | '2:3' | '3:4' | '4:3'
  | '4:5' | '5:4' | '9:16' | '16:9' | '21:9'

export type GeminiImageSize = '1K' | '2K' | '4K'

export type GeminiImageOptions = {
  referenceImage?: string
  referenceImages?: string[]
  aspectRatio?: GeminiAspectRatio
  quality?: GeminiImageSize
}

function parseDataUrl(dataUrl: string): { mimeType: string; data: string } | null {
  const m = /^data:([^;]+);base64,(.+)$/.exec(dataUrl)
  if (!m) return null
  return { mimeType: m[1], data: m[2] }
}

export async function callGeminiImage(
  prompt: string,
  apiKey: string,
  opts: GeminiImageOptions = {},
): Promise<string> {
  const parts: Part[] = [{ text: prompt }]

  const refs: string[] = []
  if (opts.referenceImage) refs.push(opts.referenceImage)
  if (opts.referenceImages) refs.push(...opts.referenceImages)

  for (const ref of refs) {
    const parsed = parseDataUrl(ref)
    if (parsed) parts.push({ inlineData: parsed })
  }

  const imageConfig = {
    ...(opts.aspectRatio ? { aspectRatio: opts.aspectRatio } : {}),
    ...(opts.quality ? { imageSize: opts.quality } : {}),
  }
  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      ...(Object.keys(imageConfig).length ? { imageConfig } : {}),
    },
  }

  const res = await fetchWithTimeout(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Gemini HTTP ${res.status}: ${text.slice(0, 300)}`)
  }

  const json = (await res.json()) as GeminiResponse
  if (json.error?.message) throw new Error(`Gemini: ${json.error.message}`)
  if (json.promptFeedback?.blockReason) {
    throw new Error(`Gemini 拒绝生成: ${json.promptFeedback.blockReason}`)
  }

  const partsOut = json.candidates?.[0]?.content?.parts ?? []
  const imgPart = partsOut.find((p) => p.inlineData?.data)
  if (!imgPart?.inlineData?.data) throw new Error('Gemini 未返回图片数据')

  const mime = imgPart.inlineData.mimeType ?? 'image/png'
  return `data:${mime};base64,${imgPart.inlineData.data}`
}
