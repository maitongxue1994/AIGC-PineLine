import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { getVideoProvider } from '../video/providers'
import type { VideoCreateReq } from '../video/types'

/**
 * POST /api/generate/video —— 创建视频生成异步任务。
 * 返回 { taskId }，前端随后轮询 /api/generate/video-status。
 */
export default function videoCreate(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<VideoCreateReq>(req)
    const prompt = body.prompt?.trim() ?? ''
    if (!prompt && !body.firstFrame) {
      return jsonError('请提供提示词或首帧参考图')
    }
    if (body.lastFrame && !body.firstFrame) {
      return jsonError('尾帧参考需要与首帧参考同时提供')
    }
    const provider = getVideoProvider(body.provider)
    const { taskId } = await provider.create({ ...body, prompt }, env)
    return jsonOk({ taskId })
  })
}
