/**
 * 视频生成 Provider 抽象（调研依据：docs/模型API调研-2026-07.md）。
 *
 * 各家均为异步任务模型：创建任务 → 轮询状态 → 成功后拿临时 video_url。
 * 临时 URL 均有时效（MiniMax 1h / Seedance·Wan 24h / Kling 30 天），且部分需要
 * 服务端鉴权头才能下载，因此取件统一走 /api/generate/video-file 代理：
 * 用 taskId 现查现取，不信任客户端传入的任意 URL。
 */

export type VideoProviderId = 'seedance' | 'minimax' | 'wan' | 'kling' | 'veo'

export interface VideoCreateReq {
  provider: VideoProviderId
  /** 各家真实模型 ID（由前端模型选择器给出，Provider 内部兜底默认值） */
  model?: string
  prompt: string
  /** data:image/...;base64, 形式的首/尾帧参考 */
  firstFrame?: string
  lastFrame?: string
  /** 全能参考（多模态参考生视频，仅 Seedance 2.0）：参考图 ≤9 / 参考视频 ≤3 / 参考音频 ≤3 */
  omniRefs?: string[]
  omniVideos?: string[]
  omniAudios?: string[]
  /** 前端语义时长（秒），Provider 内部映射到各家档位 */
  duration?: number
  /** 16:9 | 9:16 | 1:1 | auto；不支持比例的家跟随首帧 */
  ratio?: string
  /** 480p | 720p | 1080p | 4k（4k 仅 Seedance 2.0 标准版） */
  resolution?: string
  /** 是否生成同步音频（Seedance 2.0 系列/1.5 Pro 官方 generate_audio，默认 true） */
  generateAudio?: boolean
}

export type VideoTaskPhase = 'queued' | 'running' | 'done' | 'error'

export interface VideoTaskStatus {
  status: VideoTaskPhase
  /** status === 'done' 时的临时视频 URL（仅供 video-file 代理即时取件） */
  videoUrl?: string
  error?: string
}

/** 视频相关环境变量（叠加在 Worker Env 上，全部可选，缺失时返回接入指引） */
export interface VideoEnv {
  MINIMAX_API_KEY?: string
  GEMINI_API_KEY?: string
  /** 火山方舟 API Key（Seedance）；控制台 console.volcengine.com/ark */
  ARK_API_KEY?: string
  /** 默认 https://ark.cn-beijing.volces.com；BytePlus 用 https://ark.ap-southeast.bytepluses.com */
  ARK_BASE_URL?: string
  DASHSCOPE_API_KEY?: string
  KLING_API_KEY?: string
}

export interface VideoProvider {
  create(req: VideoCreateReq, env: VideoEnv): Promise<{ taskId: string }>
  query(taskId: string, env: VideoEnv): Promise<VideoTaskStatus>
  /** 取件时的定制下载（如 Veo 需要 x-goog-api-key）；缺省为普通 GET */
  fetchVideo?(url: string, env: VideoEnv): Promise<Response>
}
