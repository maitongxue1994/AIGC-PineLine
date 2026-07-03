import { PineHttpError, fetchWithTimeout } from '../utils'
import type { VideoCreateReq, VideoEnv, VideoProvider, VideoTaskStatus } from './types'
import { buildSeedanceBody } from './seedanceBody'

export { SEEDANCE_DEFAULT_MODEL } from './seedanceBody'

/**
 * 字节跳动 Seedance（火山方舟 Ark）——本项目视频生成主模型。
 *
 * 端点（官方文档 volcengine.com/docs/82379/1520757，2026-07 核实）：
 *   创建 POST {base}/api/v3/contents/generations/tasks
 *   查询 GET  {base}/api/v3/contents/generations/tasks/{id}
 * 请求体组装（含三种互斥参考场景）见 seedanceBody.ts。
 * ratio/resolution/duration 为顶层字段。video_url 24h 过期，取件必须经 video-file 代理即时下载。
 * Seedance 2.5 上线后（官方口径 2026-07 内）沿用同一 API，仅新增 Model ID。
 */

const DEFAULT_BASE = 'https://ark.cn-beijing.volces.com'

const GUIDE =
  'Seedance 未接入：请在火山方舟控制台创建 API Key（console.volcengine.com/ark → API Key 管理），' +
  '开通 Seedance 2.0 模型（需余额>200 元或资源包），再把密钥配置为 Worker secret ARK_API_KEY。' +
  '详见 docs/视频生成接入指南.md'

function requireKey(env: VideoEnv): { key: string; base: string } {
  const key = env.ARK_API_KEY?.trim()
  if (!key) throw new PineHttpError(501, GUIDE)
  return { key, base: (env.ARK_BASE_URL?.trim() || DEFAULT_BASE).replace(/\/$/, '') }
}

export const seedance: VideoProvider = {
  async create(req: VideoCreateReq, env: VideoEnv): Promise<{ taskId: string }> {
    const { key, base } = requireKey(env)

    const body = buildSeedanceBody(req)

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
