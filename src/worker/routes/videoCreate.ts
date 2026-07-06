import type { Env } from '../index'
import { isAdminCode, jsonError, jsonOk, readJson, runRoute } from '../utils'
import { getVideoProvider } from '../video/providers'
import type { VideoCreateReq, VideoProviderId } from '../video/types'

/** 成本护栏白名单（服务端硬校验，前端绕过也拦得住） */
const VALID_RESOLUTIONS = new Set(['480p', '720p', '1080p', '4k'])
const VALID_PROVIDERS = new Set<VideoProviderId>(['seedance', 'minimax', 'wan', 'kling', 'veo'])
/** 非管理员分辨率封顶：4k 单条最贵，试用/付费用户默认最高 1080p（env 可放开） */
const NON_ADMIN_MAX_RES = '1080p'

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

    // ---- 成本护栏（服务端硬校验，不信任前端 UI 约束） ----
    if (!VALID_PROVIDERS.has(body.provider)) return jsonError('未知视频供应商')
    const admin = isAdminCode(req.headers.get('x-pineline-access'))
    let resolution = body.resolution ?? '720p'
    if (!VALID_RESOLUTIONS.has(resolution)) return jsonError('不支持的分辨率')
    // 非管理员封顶（4k/超档 → 回落 1080p，防单条烧穿）；env 可整体放开
    const cap = env.PINELINE_MAX_RES?.trim()
    if (!admin && !cap && resolution === '4k') resolution = NON_ADMIN_MAX_RES
    // duration clamp 在 seedanceBody 内做 [4,15]；此处只挡异常大值防前端被篡改
    const duration =
      body.duration === -1 ? -1 : Math.min(15, Math.max(2, Math.round(body.duration ?? 5)))

    const provider = getVideoProvider(body.provider)
    const { taskId } = await provider.create(
      { ...body, prompt, resolution, duration, forceWatermark: !admin },
      env,
    )
    return jsonOk({ taskId })
  }, '/api/generate/video')
}
