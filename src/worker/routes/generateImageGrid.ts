import { callGeminiImage } from '../gemini'
import type { Env } from '../index'

type Body = {
  prompts?: string[]
  referenceImages?: string[]
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
}

function jsonError(msg: string, status = 400): Response {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function generateImageGrid(
  req: Request,
  env: Env,
): Promise<Response> {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return jsonError('请求体不是合法 JSON')
  }

  const prompts = (body.prompts ?? [])
    .map((p) => (typeof p === 'string' ? p.trim() : ''))
    .filter(Boolean)
  if (!prompts.length) return jsonError('prompts 不能为空')
  if (prompts.length > 6) return jsonError('一次最多 6 张')

  if (!env.GEMINI_API_KEY) return jsonError('服务端未配置 GEMINI_API_KEY', 500)

  try {
    const images = await Promise.all(
      prompts.map((p) =>
        callGeminiImage(p, env.GEMINI_API_KEY, {
          referenceImages: body.referenceImages,
          aspectRatio: body.aspectRatio,
        }),
      ),
    )
    return new Response(JSON.stringify({ images }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return jsonError(msg, 502)
  }
}
