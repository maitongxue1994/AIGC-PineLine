import { callGeminiImage } from '../gemini'
import { callSeedreamImage, isArkModel } from '../ark'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

import type { GeminiAspectRatio, GeminiImageSize } from '../gemini'

type Body = {
  prompt?: string
  referenceImage?: string
  referenceImages?: string[]
  aspectRatio?: GeminiAspectRatio
  quality?: GeminiImageSize
  /** 图像模型：缺省 Gemini；doubao-seedream-* 走方舟（ARK_API_KEY） */
  model?: string
}

export default function generateImage(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const prompt = body.prompt?.trim()
    if (!prompt) return jsonError('prompt 不能为空')

    if (isArkModel(body.model)) {
      const image = await callSeedreamImage(body.model!, prompt, env.ARK_API_KEY ?? '', {
        referenceImages: body.referenceImages ?? (body.referenceImage ? [body.referenceImage] : []),
        aspectRatio: body.aspectRatio,
        quality: body.quality,
      })
      return jsonOk({ image })
    }

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
