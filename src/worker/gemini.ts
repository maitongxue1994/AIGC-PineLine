const MODEL = 'gemini-3.1-flash-image-preview'
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

export type GeminiImageOptions = {
  referenceImage?: string
  referenceImages?: string[]
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
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

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      ...(opts.aspectRatio ? { imageConfig: { aspectRatio: opts.aspectRatio } } : {}),
    },
  }

  const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
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
