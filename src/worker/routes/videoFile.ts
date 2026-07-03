import type { Env } from '../index'
import { PineHttpError, jsonError, readJson, runRoute } from '../utils'
import { getVideoProvider } from '../video/providers'

type Body = { provider?: string; taskId?: string }

/** 各家临时 URL 的下载超时：视频体积可达几十 MB，给足流式转发时间 */
const DOWNLOAD_TIMEOUT_MS = 120_000

/**
 * POST /api/generate/video-file —— 视频取件代理。
 * 用 taskId 现查现取（不信任客户端传 URL）：各家 video_url 均有时效
 * （MiniMax 1h / Seedance·Wan 24h），且可能需要服务端鉴权头，统一在此代理下载并流式返回。
 */
export default function videoFile(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    if (!body.taskId) return jsonError('缺少 taskId')
    const provider = getVideoProvider(body.provider)
    const status = await provider.query(body.taskId, env)
    if (status.status !== 'done' || !status.videoUrl) {
      return jsonError(
        status.status === 'error' ? (status.error ?? '任务失败') : '任务尚未完成，无法取件',
        409,
      )
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS)
    let upstream: Response
    try {
      upstream = provider.fetchVideo
        ? await provider.fetchVideo(status.videoUrl, env)
        : await fetch(status.videoUrl, { redirect: 'follow', signal: controller.signal })
    } catch (err) {
      clearTimeout(timer)
      if (err instanceof Error && err.name === 'AbortError') {
        throw new PineHttpError(504, '视频下载超时，请重试')
      }
      throw err
    }
    if (!upstream.ok || !upstream.body) {
      clearTimeout(timer)
      return jsonError(`视频源下载失败（HTTP ${upstream.status}）`, 502)
    }
    // 流式转发，避免整段视频驻留 Worker 内存
    return new Response(upstream.body, {
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'video/mp4',
        'Cache-Control': 'no-store',
      },
    })
  })
}
