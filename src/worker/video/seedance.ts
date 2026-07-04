import { PineHttpError, fetchWithRetry, fetchWithTimeout, pushGenLog, upstreamRequestId } from '../utils'
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

/** 列表接口（官方 82379/1521675）返回的单条任务摘要 */
export type SeedanceTaskItem = {
  id: string
  model?: string
  status?: string
  created_at?: number
  updated_at?: number
  resolution?: string
  ratio?: string
  duration?: number
  generate_audio?: boolean
  content?: { video_url?: string; last_frame_url?: string }
  error?: { code?: string; message?: string } | null
}

/**
 * 查询近 7 天任务列表（ListContentsGenerationsTasks，官方 82379/1521675）。
 * 用途：前端「云端任务找回」——本地任务 ID 丢失（旧版超时/清档）时，
 * 从方舟侧找回已扣费成功的任务并经 video-file 代理取件。
 */
export async function listSeedanceTasks(
  env: VideoEnv,
  opts: { status?: string; pageSize?: number } = {},
): Promise<{ items: SeedanceTaskItem[]; total: number }> {
  const { key, base } = requireKey(env)
  const params = new URLSearchParams({
    page_num: '1',
    page_size: String(Math.min(100, Math.max(1, opts.pageSize ?? 50))),
  })
  if (opts.status) params.set('filter.status', opts.status)
  const started = Date.now()
  const res = await fetchWithTimeout(
    `${base}/api/v3/contents/generations/tasks?${params.toString()}`,
    { headers: { Authorization: `Bearer ${key}` } },
    60_000,
  )
  const data = (await res.json().catch(() => null)) as
    | { items?: SeedanceTaskItem[]; total?: number; error?: { message?: string } }
    | null
  if (!res.ok || !Array.isArray(data?.items)) {
    const msg = `Seedance 任务列表查询失败（HTTP ${res.status}）：${data?.error?.message ?? '未知错误'}`
    const requestId = upstreamRequestId(res)
    pushGenLog({
      ts: started,
      path: 'upstream:seedance-list',
      ok: false,
      status: res.status,
      ms: Date.now() - started,
      error: msg.slice(0, 300),
      ...(requestId ? { requestId } : {}),
    })
    throw new PineHttpError(502, msg)
  }
  return { items: data.items, total: data.total ?? data.items.length }
}

export const seedance: VideoProvider = {
  async create(req: VideoCreateReq, env: VideoEnv): Promise<{ taskId: string }> {
    const { key, base } = requireKey(env)

    const body = buildSeedanceBody(req)

    const started = Date.now()
    const res = await fetchWithRetry(
      `${base}/api/v3/contents/generations/tasks`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
      },
      60_000,
    )
    const data = (await res.json().catch(() => null)) as
      | { id?: string; error?: { message?: string } }
      | null
    if (!res.ok || !data?.id) {
      const msg = `Seedance 创建任务失败（HTTP ${res.status}）：${data?.error?.message ?? '未知错误'}`
      const requestId = upstreamRequestId(res)
      pushGenLog({
        ts: started,
        path: 'upstream:seedance-create',
        ok: false,
        status: res.status,
        ms: Date.now() - started,
        error: msg.slice(0, 300),
        ...(requestId ? { requestId } : {}),
        ...(req.model ? { model: req.model } : {}),
        note: req.prompt.slice(0, 80),
      })
      throw new PineHttpError(502, msg)
    }
    return { taskId: data.id }
  },

  async query(taskId: string, env: VideoEnv): Promise<VideoTaskStatus> {
    const { key, base } = requireKey(env)
    const started = Date.now()
    const res = await fetchWithRetry(
      `${base}/api/v3/contents/generations/tasks/${encodeURIComponent(taskId)}`,
      { headers: { Authorization: `Bearer ${key}` } },
      60_000,
    )
    const data = (await res.json().catch(() => null)) as
      | {
          status?: string
          content?: { video_url?: string }
          error?: { message?: string }
        }
      | null
    if (!res.ok || !data?.status) {
      const requestId = upstreamRequestId(res)
      pushGenLog({
        ts: started,
        path: 'upstream:seedance-query',
        ok: false,
        status: res.status,
        ms: Date.now() - started,
        error: `Seedance 查询任务失败（HTTP ${res.status}）：${data?.error?.message ?? '未知错误'}`.slice(0, 300),
        ...(requestId ? { requestId } : {}),
        note: `taskId=${taskId}`,
      })
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
      case 'expired': {
        const error = data.error?.message ?? `任务${data.status === 'expired' ? '超时过期' : '失败'}`
        // 任务终态失败经 200 响应下发，路由层日志看不到 → 在此留痕
        pushGenLog({
          ts: started,
          path: 'upstream:seedance-task',
          ok: false,
          status: res.status,
          ms: Date.now() - started,
          error: error.slice(0, 300),
          note: `taskId=${taskId}`,
        })
        return { status: 'error', error }
      }
      default:
        return { status: 'running' }
    }
  },
}
