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
    // 全能参考（多模态参考生视频）官方允许无文本：至少 1 张参考图或 1 段参考视频即可
    const hasOmniVisual = !!(body.omniRefs?.length || body.omniVideos?.length)
    if (!prompt && !body.firstFrame && !hasOmniVisual) {
      return jsonError('请提供提示词、首帧参考图，或全能参考素材（图/视频）')
    }
    // 官方约束：不支持「纯音频」「文本+音频」组合
    if (body.omniAudios?.length && !hasOmniVisual) {
      return jsonError('参考音频需搭配至少 1 张参考图或 1 段参考视频')
    }
    if (body.lastFrame && !body.firstFrame) {
      return jsonError('尾帧参考需要与首帧参考同时提供')
    }
    const provider = getVideoProvider(body.provider)
    const { taskId } = await provider.create({ ...body, prompt }, env)
    return jsonOk({ taskId })
  }, '/api/generate/video')
}
