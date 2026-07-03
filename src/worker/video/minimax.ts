import { PineHttpError, fetchWithTimeout } from '../utils'
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

    const body: Record<string, unknown> = {
      model,
      prompt: req.prompt.slice(0, 2000),
      duration,
      resolution: mapResolution(req.resolution, !!req.firstFrame),
      prompt_optimizer: true,
    }
    if (req.firstFrame) body.first_frame_image = req.firstFrame
    if (req.lastFrame) body.last_frame_image = req.lastFrame

    const res = await fetchWithTimeout(`${BASE}/v1/video_generation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    })
    const data = (await res.json().catch(() => null)) as
      | { task_id?: string; base_resp?: BaseResp }
      | null
    if (!res.ok || !data?.task_id || (data.base_resp?.status_code ?? 0) !== 0) {
      throw new PineHttpError(502, `MiniMax 创建任务失败：${errText(data?.base_resp)}`)
    }
    return { taskId: data.task_id }
  },

  async query(taskId: string, env: VideoEnv): Promise<VideoTaskStatus> {
    const key = requireKey(env)
    const res = await fetchWithTimeout(
      `${BASE}/v1/query/video_generation?task_id=${encodeURIComponent(taskId)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    )
    const data = (await res.json().catch(() => null)) as
      | { status?: string; file_id?: string; base_resp?: BaseResp }
      | null
    if (!res.ok || !data?.status) {
      throw new PineHttpError(502, `MiniMax 查询任务失败：${errText(data?.base_resp)}`)
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
        const fres = await fetchWithTimeout(
          `${BASE}/v1/files/retrieve?file_id=${encodeURIComponent(data.file_id)}`,
          { headers: { Authorization: `Bearer ${key}` } },
        )
        const fdata = (await fres.json().catch(() => null)) as
          | { file?: { download_url?: string }; base_resp?: BaseResp }
          | null
        const url = fdata?.file?.download_url
        if (!fres.ok || !url) {
          return { status: 'error', error: `MiniMax 取件失败：${errText(fdata?.base_resp)}` }
        }
        return { status: 'done', videoUrl: url }
      }
      case 'Fail':
        return { status: 'error', error: errText(data.base_resp) || '生成失败' }
      default:
        return { status: 'running' }
    }
  },
}
