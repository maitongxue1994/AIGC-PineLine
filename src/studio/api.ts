import type {
  ApiError,
  ImageGridRequest,
  ImageGridResponse,
  ImageRequest,
  ImageResponse,
  ScriptRequest,
  ScriptResponse,
  StoryboardRequest,
  StoryboardResponse,
  VideoCreateRequest,
  VideoCreateResponse,
  VideoTasksRequest,
  VideoTasksResponse,
  VideoReadiness,
  VideoStatusResponse,
} from './types'
import type { AgentChatRequest, AgentChatResponse } from './agent/types'
import { appendGenLog } from './assetdb'

const AUTH_TOKEN = (import.meta.env.VITE_PINELINE_API_KEY as string | undefined)?.trim()

/** 从请求体里挑提示词/模型摘要（生成日志用，非生成类字段自然为空） */
function reqSummary(body: unknown): { prompt?: string; model?: string } {
  const b = body as { prompt?: string; brief?: string; prompts?: string[]; model?: string }
  const prompt = (b?.prompt ?? b?.brief ?? b?.prompts?.[0] ?? '').slice(0, 200)
  return {
    ...(prompt ? { prompt } : {}),
    ...(typeof b?.model === 'string' ? { model: b.model } : {}),
  }
}

/** 从响应体里挑供应商 request-id（Worker 侧已贯通），对账找回生成记录用 */
function resRequestId(res: unknown): string | undefined {
  const r = res as { requestId?: string; requestIds?: (string | null)[] }
  return r?.requestId ?? r?.requestIds?.find((x) => !!x) ?? undefined
}

/**
 * 生成请求统一漏斗：成败都写 IndexedDB 生成日志（含耗时/错误/request-id）。
 * 此前失败请求不留任何痕迹，Seedream 超时后既查无记录也无从对账（用户实测反馈）。
 */
async function postJson<TReq, TRes>(
  path: string,
  body: TReq,
  signal?: AbortSignal,
): Promise<TRes> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (AUTH_TOKEN) headers['X-Pineline-Auth'] = AUTH_TOKEN

  const shouldLog = path.startsWith('/api/generate/')
  const startedAt = Date.now()
  const log = (ok: boolean, extra: { error?: string; requestId?: string }) => {
    if (!shouldLog) return
    void appendGenLog({ path, ok, ms: Date.now() - startedAt, ...reqSummary(body), ...extra })
  }

  try {
    const res = await fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      ...(signal ? { signal } : {}),
    })
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as ApiError
      const msg = err.error || err.detail || `${res.status} ${res.statusText}`
      log(false, { error: msg })
      throw new Error(msg)
    }
    const data = (await res.json()) as TRes
    log(true, { requestId: resRequestId(data) })
    return data
  } catch (err) {
    // fetch 网络层失败（离线/中断）：上面 !res.ok 分支已记录过的不重复记
    if (err instanceof TypeError) {
      log(false, { error: `网络错误：${err.message}` })
    }
    throw err
  }
}

export function generateScript(req: ScriptRequest): Promise<ScriptResponse> {
  return postJson<ScriptRequest, ScriptResponse>('/api/generate/script', req)
}

export function generateImage(req: ImageRequest): Promise<ImageResponse> {
  return postJson<ImageRequest, ImageResponse>('/api/generate/image', req)
}

export function generateStoryboard(
  req: StoryboardRequest,
): Promise<StoryboardResponse> {
  return postJson<StoryboardRequest, StoryboardResponse>(
    '/api/generate/storyboard',
    req,
  )
}

export function generateImageGrid(
  req: ImageGridRequest,
): Promise<ImageGridResponse> {
  return postJson<ImageGridRequest, ImageGridResponse>(
    '/api/generate/image-grid',
    req,
  )
}

export function agentChat(req: AgentChatRequest, signal?: AbortSignal): Promise<AgentChatResponse> {
  return postJson<AgentChatRequest, AgentChatResponse>('/api/agent/chat', req, signal)
}

// ---------------- 视频生成（异步任务：创建 → 轮询 → 取件代理） ----------------

export function createVideoTask(req: VideoCreateRequest): Promise<VideoCreateResponse> {
  return postJson<VideoCreateRequest, VideoCreateResponse>('/api/generate/video', req)
}

/** 供应商侧近 7 天任务列表（云端任务找回；本地任务 ID 丢失时用） */
export function listVideoTasks(req: VideoTasksRequest): Promise<VideoTasksResponse> {
  return postJson<VideoTasksRequest, VideoTasksResponse>('/api/generate/video-tasks', req)
}

export function queryVideoTask(req: {
  provider: string
  taskId: string
}): Promise<VideoStatusResponse> {
  return postJson('/api/generate/video-status', req)
}

export async function fetchVideoReadiness(): Promise<VideoReadiness> {
  const res = await postJson<{ readiness: true }, { readiness: VideoReadiness }>(
    '/api/generate/video-status',
    { readiness: true },
  )
  return res.readiness
}

/** 取件代理：Worker 现查现取上游临时 URL 并流式返回视频字节 */
export async function fetchVideoFile(req: {
  provider: string
  taskId: string
}): Promise<Blob> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (AUTH_TOKEN) headers['X-Pineline-Auth'] = AUTH_TOKEN
  const startedAt = Date.now()
  const log = (ok: boolean, error?: string) =>
    void appendGenLog({
      path: '/api/generate/video-file',
      ok,
      ms: Date.now() - startedAt,
      // taskId 记入 requestId 位：取件失败时凭它续查/对账
      requestId: `${req.provider}:${req.taskId}`,
      ...(error ? { error } : {}),
    })
  const res = await fetch('/api/generate/video-file', {
    method: 'POST',
    headers,
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as ApiError
    const msg = err.error || err.detail || `${res.status} ${res.statusText}`
    log(false, msg)
    throw new Error(msg)
  }
  const blob = await res.blob()
  log(true)
  return blob
}
