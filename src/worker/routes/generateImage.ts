import { callGeminiImage } from '../gemini'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

import type { GeminiAspectRatio, GeminiImageSize } from '../gemini'

type Body = {
  prompt?: string
  referenceImage?: string
  referenceImages?: string[]
  aspectRatio?: GeminiAspectRatio
  quality?: GeminiImageSize
}

export default function generateImage(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const prompt = body.prompt?.trim()
    if (!prompt) return jsonError('prompt 不能为空')
    if (!env.GEMINI_API_KEY) return jsonError('服务端未配置 GEMINI_API_KEY', 500)

    const image = await callGeminiImage(prompt, env.GEMINI_API_KEY, {
      referenceImage: body.referenceImage,
      referenceImages: body.referenceImages,
      aspectRatio: body.aspectRatio,
      quality: body.quality,
    })
    return jsonOk({ image })
  })
}
