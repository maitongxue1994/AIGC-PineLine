import { callGeminiImage } from '../gemini'
import { callSeedreamImage, isArkModel } from '../ark'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

import type { GeminiAspectRatio, GeminiImageSize } from '../gemini'

type Body = {
  prompts?: string[]
  referenceImages?: string[]
  aspectRatio?: GeminiAspectRatio
  quality?: GeminiImageSize
  /** 图像模型：缺省 Gemini；doubao-seedream-* 走方舟（ARK_API_KEY） */
  model?: string
}

export default function generateImageGrid(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)

    const prompts = (body.prompts ?? [])
      .map((p) => (typeof p === 'string' ? p.trim() : ''))
      .filter(Boolean)
    if (!prompts.length) return jsonError('prompts 不能为空')
    if (prompts.length > 6) return jsonError('一次最多 6 张')

    const useArk = isArkModel(body.model)
    if (!useArk && !env.GEMINI_API_KEY) return jsonError('服务端未配置 GEMINI_API_KEY', 500)

    const settled = await Promise.allSettled(
      prompts.map((p) =>
        useArk
          ? callSeedreamImage(body.model!, p, env.ARK_API_KEY ?? '', {
              referenceImages: body.referenceImages,
              aspectRatio: body.aspectRatio,
              quality: body.quality,
            })
          : callGeminiImage(p, env.GEMINI_API_KEY, {
              referenceImages: body.referenceImages,
              aspectRatio: body.aspectRatio,
              quality: body.quality,
            }),
      ),
    )

    const images: (string | null)[] = settled.map((r) =>
      r.status === 'fulfilled' ? r.value : null,
    )
    const errors: (string | null)[] = settled.map((r) =>
      r.status === 'rejected'
        ? r.reason instanceof Error
          ? r.reason.message
          : String(r.reason)
        : null,
    )

    if (images.every((x) => x === null)) {
      return jsonError(`全部生成失败：${errors.find(Boolean) ?? '未知错误'}`, 502)
    }

    return jsonOk({ images, errors })
  })
}
