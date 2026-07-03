import { PineHttpError, fetchWithTimeout } from '../utils'
import type { VideoCreateReq, VideoEnv, VideoProvider, VideoTaskStatus } from './types'

/**
 * 字节跳动 Seedance（火山方舟 Ark）——本项目视频生成主模型。
 *
 * 端点（官方文档 volcengine.com/docs/82379/1520757，2026-07 核实）：
 *   创建 POST {base}/api/v3/contents/generations/tasks
 *   查询 GET  {base}/api/v3/contents/generations/tasks/{id}
 * 首尾帧走 content[] 的 image_url + role；ratio/resolution/duration 为顶层字段。
 * video_url 24h 过期，取件必须经 video-file 代理即时下载。
 * Seedance 2.5 上线后（官方口径 2026-07 内）沿用同一 API，仅新增 Model ID。
 */

const DEFAULT_BASE = 'https://ark.cn-beijing.volces.com'
export const SEEDANCE_DEFAULT_MODEL = 'doubao-seedance-2-0-260128'

const GUIDE =
  'Seedance 未接入：请在火山方舟控制台创建 API Key（console.volcengine.com/ark → API Key 管理），' +
  '开通 Seedance 2.0 模型（需余额>200 元或资源包），再把密钥配置为 Worker secret ARK_API_KEY。' +
  '详见 docs/视频生成接入指南.md'

function requireKey(env: VideoEnv): { key: string; base: string } {
  const key = env.ARK_API_KEY?.trim()
  if (!key) throw new PineHttpError(501, GUIDE)
  return { key, base: (env.ARK_BASE_URL?.trim() || DEFAULT_BASE).replace(/\/$/, '') }
}

type ArkContent =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string }; role?: 'first_frame' | 'last_frame' }

export const seedance: VideoProvider = {
  async create(req: VideoCreateReq, env: VideoEnv): Promise<{ taskId: string }> {
    const { key, base } = requireKey(env)

    const content: ArkContent[] = [{ type: 'text', text: req.prompt }]
    if (req.firstFrame && req.lastFrame) {
      // 首尾帧模式：role 必填
      content.push(
        { type: 'image_url', image_url: { url: req.firstFrame }, role: 'first_frame' },
        { type: 'image_url', image_url: { url: req.lastFrame }, role: 'last_frame' },
      )
    } else if (req.firstFrame) {
      content.push({ type: 'image_url', image_url: { url: req.firstFrame }, role: 'first_frame' })
    }

    const model = req.model?.trim() || SEEDANCE_DEFAULT_MODEL
    // 2.0 系时长 [4,15]；前端 5|10 直接落在区间内
    const duration = Math.min(15, Math.max(4, Math.round(req.duration ?? 5)))
    const ratio = !req.ratio || req.ratio === 'auto' ? 'adaptive' : req.ratio
    const body: Record<string, unknown> = {
      model,
      content,
      resolution: req.resolution ?? '720p',
      ratio,
      duration,
      generate_audio: true,
      watermark: false,
    }

    const res = await fetchWithTimeout(`${base}/api/v3/contents/generations/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    })
    const data = (await res.json().catch(() => null)) as
      | { id?: string; error?: { message?: string } }
      | null
    if (!res.ok || !data?.id) {
      throw new PineHttpError(
        502,
        `Seedance 创建任务失败（HTTP ${res.status}）：${data?.error?.message ?? '未知错误'}`,
      )
    }
    return { taskId: data.id }
  },

  async query(taskId: string, env: VideoEnv): Promise<VideoTaskStatus> {
    const { key, base } = requireKey(env)
    const res = await fetchWithTimeout(
      `${base}/api/v3/contents/generations/tasks/${encodeURIComponent(taskId)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    const data = (await res.json().catch(() => null)) as
      | {
          status?: string
          content?: { video_url?: string }
          error?: { message?: string }
        }
      | null
    if (!res.ok || !data?.status) {
      throw new PineHttpError(502, `Seedance 查询任务失败（HTTP ${res.status}）`)
    }
    switch (data.status) {
      case 'queued':
        return { status: 'queued' }
      case 'running':
        return { status: 'running' }
      case 'succeeded':
        return { status: 'done', videoUrl: data.content?.video_url }
      case 'failed':
      case 'expired':
        return { status: 'error', error: data.error?.message ?? `任务${data.status === 'expired' ? '超时过期' : '失败'}` }
      default:
        return { status: 'running' }
    }
  },
}
