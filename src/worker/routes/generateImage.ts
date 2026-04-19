import { callGeminiImage } from '../gemini'
import type { Env } from '../index'

type Body = {
  prompt?: string
  referenceImage?: string
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
}

function jsonError(msg: string, status = 400): Response {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function generateImage(req: Request, env: Env): Promise<Response> {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return jsonError('请求体不是合法 JSON')
  }

  const prompt = body.prompt?.trim()
  if (!prompt) return jsonError('prompt 不能为空')

  if (!env.GEMINI_API_KEY) return jsonError('服务端未配置 GEMINI_API_KEY', 500)

  try {
    const image = await callGeminiImage(prompt, env.GEMINI_API_KEY, {
      referenceImage: body.referenceImage,
      aspectRatio: body.aspectRatio,
    })
    return new Response(JSON.stringify({ image }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return jsonError(msg, 502)
  }
}
