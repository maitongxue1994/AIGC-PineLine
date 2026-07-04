import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { getVideoProvider, providerReadiness } from '../video/providers'

type Body = {
  provider?: string
  taskId?: string
  /** 传 true 时仅返回各 provider 密钥就绪状态（供模型选择器显示可用态） */
  readiness?: boolean
}

/**
 * POST /api/generate/video-status —— 查询视频任务状态。
 * done 时不直接把临时 URL 交给浏览器播放（有时效/鉴权限制），
 * 前端应紧接着调 /api/generate/video-file 代理取件。
 */
export default function videoStatus(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    if (body.readiness) return jsonOk({ readiness: providerReadiness(env) })
    if (!body.taskId) return jsonError('缺少 taskId')
    const provider = getVideoProvider(body.provider)
    const status = await provider.query(body.taskId, env)
    // 临时 URL 不下发前端，避免误用过期链接
    return jsonOk({ status: status.status, error: status.error })
  }, '/api/generate/video-status')
}
