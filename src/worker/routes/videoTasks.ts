import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { listSeedanceTasks } from '../video/seedance'

type Body = {
  /** 目前仅 seedance 支持列表查询 */
  provider?: string
  /** queued / running / succeeded / failed / cancelled / expired；缺省全部 */
  status?: string
  pageSize?: number
}

/** 官方任务状态枚举（82379/1521675）——白名单外的过滤值直接忽略 */
const VALID_STATUS = new Set(['queued', 'running', 'cancelled', 'succeeded', 'failed', 'expired'])

/**
 * POST /api/generate/video-tasks —— 供应商侧任务列表（云端任务找回）。
 * 方舟保留近 7 天任务：本地任务 ID 丢失（旧版超时丢弃/清档/换设备）时，
 * 由此找回已扣费成功的任务，再经 /api/generate/video-file 代理取件。
 * 与 videoFile 同原则：上游签名 URL 一律不下发前端，只给 hasVideo 布尔。
 */
export default function videoTasks(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const provider = body.provider ?? 'seedance'
    if (provider !== 'seedance') {
      return jsonError(`${provider} 暂不支持任务列表查询（仅 Seedance）`, 501)
    }
    // 输入规整：pageSize 非数值兜底 50；status 走官方枚举白名单
    const rawSize = Number(body.pageSize)
    const pageSize = Number.isFinite(rawSize) ? rawSize : 50
    const status =
      typeof body.status === 'string' && VALID_STATUS.has(body.status) ? body.status : undefined
    const { items, total } = await listSeedanceTasks(env, { status, pageSize })
    return jsonOk({
      total,
      tasks: items.map((t) => ({
        id: t.id,
        model: t.model ?? '',
        status: t.status ?? 'unknown',
        createdAt: (t.created_at ?? 0) * 1000,
        updatedAt: (t.updated_at ?? 0) * 1000,
        resolution: t.resolution ?? '',
        ratio: t.ratio ?? '',
        duration: t.duration ?? 0,
        hasVideo: !!t.content?.video_url,
        error: t.error?.message ?? null,
      })),
    })
  })
}
