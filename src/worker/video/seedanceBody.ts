import type { VideoCreateReq } from './types'

/**
 * Seedance（火山方舟 Ark）创建任务请求体组装——纯函数，无 IO，便于零依赖脚本校验。
 *
 * content[] 三种互斥场景（靠 image_url.role 区分）：
 *   - 首帧：image_url role=first_frame（可省）
 *   - 首尾帧：两张 image_url role=first_frame/last_frame
 *   - 多模态参考生视频（=「全能参考」，仅 2.0 系列）：
 *       reference_image ≤9 + reference_video ≤3（video_url）+ reference_audio ≤3（audio_url）
 * 官方文档 volcengine.com/docs/82379/1520757（2026-07 核实）。
 */

/** Seedance 默认主模型（旗舰标准版；缺省 model 时使用） */
export const SEEDANCE_DEFAULT_MODEL = 'doubao-seedance-2-0-260128'

type ArkContent =
  | { type: 'text'; text: string }
  | {
      type: 'image_url'
      image_url: { url: string }
      role?: 'first_frame' | 'last_frame' | 'reference_image'
    }
  | { type: 'video_url'; video_url: { url: string }; role: 'reference_video' }
  | { type: 'audio_url'; audio_url: { url: string }; role: 'reference_audio' }

/**
 * 组装 Ark 创建任务请求体。三种参考场景互斥，多模态优先。
 * duration：[4,15] 整数（clamp），-1 透传（模型自主选时长）；ratio：auto→adaptive。
 */
export function buildSeedanceBody(req: VideoCreateReq): Record<string, unknown> {
  const content: ArkContent[] = []
  const prompt = req.prompt?.trim()
  if (prompt) content.push({ type: 'text', text: prompt })

  const hasOmni = !!(req.omniRefs?.length || req.omniVideos?.length || req.omniAudios?.length)
  if (hasOmni) {
    // 多模态参考生视频（=「全能参考」）：图 ≤9 / 视频 ≤3 / 音频 ≤3，role 分别为 reference_*
    for (const url of (req.omniRefs ?? []).slice(0, 9)) {
      content.push({ type: 'image_url', image_url: { url }, role: 'reference_image' })
    }
    for (const url of (req.omniVideos ?? []).slice(0, 3)) {
      content.push({ type: 'video_url', video_url: { url }, role: 'reference_video' })
    }
    for (const url of (req.omniAudios ?? []).slice(0, 3)) {
      content.push({ type: 'audio_url', audio_url: { url }, role: 'reference_audio' })
    }
  } else if (req.firstFrame && req.lastFrame) {
    // 首尾帧模式：role 必填
    content.push(
      { type: 'image_url', image_url: { url: req.firstFrame }, role: 'first_frame' },
      { type: 'image_url', image_url: { url: req.lastFrame }, role: 'last_frame' },
    )
  } else if (req.firstFrame) {
    content.push({ type: 'image_url', image_url: { url: req.firstFrame }, role: 'first_frame' })
  }

  const model = req.model?.trim() || SEEDANCE_DEFAULT_MODEL
  const duration =
    req.duration === -1 ? -1 : Math.min(15, Math.max(4, Math.round(req.duration ?? 5)))
  const ratio = !req.ratio || req.ratio === 'auto' ? 'adaptive' : req.ratio
  return {
    model,
    content,
    resolution: req.resolution ?? '720p',
    ratio,
    duration,
    generate_audio: req.generateAudio ?? true,
    // 合规：非管理员请求强制供应商水印（forceWatermark），管理员自用不烧
    watermark: req.forceWatermark === true,
  }
}
