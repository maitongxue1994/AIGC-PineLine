import { PineHttpError, fetchWithRetry, pushGenLog } from '../utils'
import type { VideoCreateReq, VideoEnv, VideoProvider, VideoTaskStatus } from './types'

/**
 * MiniMax 海螺视频——与文本 API 同 host 同 key（MINIMAX_API_KEY 直接可用），
 * 是当前唯一无需新增密钥即可真实跑通的链路。
 *
 * 端点（官方文档 platform.minimaxi.com/docs/api-reference/video-generation-*，2026-07 核实）：
 *   创建 POST /v1/video_generation
 *   查询 GET  /v1/query/video_generation?task_id=
 *   取件 GET  /v1/files/retrieve?file_id=   → download_url（1 小时过期）
 * 约束：duration 仅 6|10；首尾帧（fl2v）仅 MiniMax-Hailuo-02；无比例参数（跟随首帧）。
 */

const BASE = 'https://api.minimaxi.com'
export const MINIMAX_DEFAULT_MODEL = 'MiniMax-Hailuo-2.3'
/** 首尾帧模式唯一支持的模型 */
export const MINIMAX_FL2V_MODEL = 'MiniMax-Hailuo-02'

function requireKey(env: VideoEnv): string {
  const key = env.MINIMAX_API_KEY?.trim()
  if (!key) throw new PineHttpError(501, '服务端未配置 MINIMAX_API_KEY')
  return key
}

/** 前端 480p/720p/1080p → MiniMax 512P/768P/1080P；512P 仅 i2v 支持（线上实测校验） */
function mapResolution(r: string | undefined, hasFirstFrame: boolean): string {
  if (r === '480p') return hasFirstFrame ? '512P' : '768P'
  if (r === '1080p') return '1080P'
  return '768P'
}

type BaseResp = { status_code?: number; status_msg?: string }
const errText = (b?: BaseResp) =>
  b?.status_code === 1008
    ? 'MiniMax 账户余额不足'
    : b?.status_code === 1026
      ? '内容被安全审核拦截，请调整提示词或参考图'
      : (b?.status_msg ?? '未知错误')

export const minimax: VideoProvider = {
  async create(req: VideoCreateReq, env: VideoEnv): Promise<{ taskId: string }> {
    const key = requireKey(env)

    // duration 只有 6|10：前端 5s 档映射 6s
    const duration = (req.duration ?? 5) > 6 ? 10 : 6
    const model = req.model?.trim() || MINIMAX_DEFAULT_MODEL
    if (req.lastFrame && model !== MINIMAX_FL2V_MODEL) {
      // 尾帧参考仅 Hailuo-02 支持，静默降级会改变计费，明确报错由前端引导
      throw new PineHttpError(400, `首尾帧模式仅支持 ${MINIMAX_FL2V_MODEL}，请在模型选择器切换`)
    }

    // 官方互斥：10s 仅 768P，1080P 只支持 6s → 10s 时自动降档到 768P
    let resolution = mapResolution(req.resolution, !!req.firstFrame)
    if (duration === 10 && resolution === '1080P') resolution = '768P'

    const body: Record<string, unknown> = {
      model,
      prompt: req.prompt.slice(0, 2000),
      duration,
      resolution,
      prompt_optimizer: true,
    }
    if (req.firstFrame) body.first_frame_image = req.firstFrame
    if (req.lastFrame) body.last_frame_image = req.lastFrame

    const started = Date.now()
    const res = await fetchWithRetry(
      `${BASE}/v1/video_generation`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
      },
      60_000,
    )
    const data = (await res.json().catch(() => null)) as
      | { task_id?: string; base_resp?: BaseResp }
      | null
    if (!res.ok || !data?.task_id || (data.base_resp?.status_code ?? 0) !== 0) {
      const msg = `MiniMax 创建任务失败：${errText(data?.base_resp)}`
      pushGenLog({
        ts: started,
        path: 'upstream:minimax-video-create',
        ok: false,
        status: res.status,
        ms: Date.now() - started,
        error: msg.slice(0, 300),
        model,
        note: req.prompt.slice(0, 80),
      })
      throw new PineHttpError(502, msg)
    }
    return { taskId: data.task_id }
  },

  async query(taskId: string, env: VideoEnv): Promise<VideoTaskStatus> {
    const key = requireKey(env)
    const started = Date.now()
    const res = await fetchWithRetry(
      `${BASE}/v1/query/video_generation?task_id=${encodeURIComponent(taskId)}`,
      { headers: { Authorization: `Bearer ${key}` } },
      60_000,
    )
    const data = (await res.json().catch(() => null)) as
      | { status?: string; file_id?: string; base_resp?: BaseResp }
      | null
    if (!res.ok || !data?.status) {
      const msg = `MiniMax 查询任务失败：${errText(data?.base_resp)}`
      pushGenLog({
        ts: started,
        path: 'upstream:minimax-video-query',
        ok: false,
        status: res.status,
        ms: Date.now() - started,
        error: msg.slice(0, 300),
        note: `taskId=${taskId}`,
      })
      throw new PineHttpError(502, msg)
    }
    switch (data.status) {
      case 'Preparing':
      case 'Queueing':
        return { status: 'queued' }
      case 'Processing':
        return { status: 'running' }
      case 'Success': {
        if (!data.file_id) return { status: 'error', error: 'MiniMax 任务成功但缺少 file_id' }
        // 现查现取 download_url（1h 时效），交给 video-file 代理即时下载
        const fres = await fetchWithRetry(
          `${BASE}/v1/files/retrieve?file_id=${encodeURIComponent(data.file_id)}`,
          { headers: { Authorization: `Bearer ${key}` } },
          60_000,
        )
        const fdata = (await fres.json().catch(() => null)) as
          | { file?: { download_url?: string }; base_resp?: BaseResp }
          | null
        const url = fdata?.file?.download_url
        if (!fres.ok || !url) {
          const msg = `MiniMax 取件失败：${errText(fdata?.base_resp)}`
          pushGenLog({
            ts: started,
            path: 'upstream:minimax-video-retrieve',
            ok: false,
            status: fres.status,
            ms: Date.now() - started,
            error: msg.slice(0, 300),
            note: `taskId=${taskId} fileId=${data.file_id}`,
          })
          return { status: 'error', error: msg }
        }
        return { status: 'done', videoUrl: url }
      }
      case 'Fail': {
        const error = errText(data.base_resp) || '生成失败'
        // 任务终态失败经 200 响应下发，路由层日志看不到 → 在此留痕
        pushGenLog({
          ts: started,
          path: 'upstream:minimax-video-task',
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
