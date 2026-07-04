import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { listSeedanceTasks } from '../video/seedance'

type Body = {
  /** 目前仅 seedance 支持列表查询 */
  provider?: string
  /** queued / running / succeeded / failed / cancelled；缺省全部 */
  status?: string
  pageSize?: number
}

/**
 * POST /api/generate/video-tasks —— 供应商侧任务列表（云端任务找回）。
 * 方舟保留近 7 天任务：本地任务 ID 丢失（旧版超时丢弃/清档/换设备）时，
 * 由此找回已扣费成功的任务，再经 /api/generate/video-file 代理取件。
 * videoUrl（24h 时效）仅作导出诊断用途，前端取件一律走代理。
 */
export default function videoTasks(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const provider = body.provider ?? 'seedance'
    if (provider !== 'seedance') {
      return jsonError(`${provider} 暂不支持任务列表查询（仅 Seedance）`, 501)
    }
    const { items, total } = await listSeedanceTasks(env, {
      status: body.status,
      pageSize: body.pageSize,
    })
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
        // 官方临时 URL（24h）：仅导出/诊断，取件走 video-file 代理
        videoUrl: t.content?.video_url ?? null,
        error: t.error?.message ?? null,
      })),
    })
  })
}
