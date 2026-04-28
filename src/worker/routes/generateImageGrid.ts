import { callGeminiImage } from '../gemini'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

type Body = {
  prompts?: string[]
  referenceImages?: string[]
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
}

export default function generateImageGrid(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)

    const prompts = (body.prompts ?? [])
      .map((p) => (typeof p === 'string' ? p.trim() : ''))
      .filter(Boolean)
    if (!prompts.length) return jsonError('prompts 不能为空')
    if (prompts.length > 6) return jsonError('一次最多 6 张')

    if (!env.GEMINI_API_KEY) return jsonError('服务端未配置 GEMINI_API_KEY', 500)

    const settled = await Promise.allSettled(
      prompts.map((p) =>
        callGeminiImage(p, env.GEMINI_API_KEY, {
          referenceImages: body.referenceImages,
          aspectRatio: body.aspectRatio,
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
