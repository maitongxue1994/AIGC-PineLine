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
  VideoReadiness,
  VideoStatusResponse,
} from './types'
import type { AgentChatRequest, AgentChatResponse } from './agent/types'

const AUTH_TOKEN = (import.meta.env.VITE_PINELINE_API_KEY as string | undefined)?.trim()

async function postJson<TReq, TRes>(
  path: string,
  body: TReq,
  signal?: AbortSignal,
): Promise<TRes> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (AUTH_TOKEN) headers['X-Pineline-Auth'] = AUTH_TOKEN

  const res = await fetch(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    ...(signal ? { signal } : {}),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as ApiError
    throw new Error(err.error || err.detail || `${res.status} ${res.statusText}`)
  }
  return (await res.json()) as TRes
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
  const res = await fetch('/api/generate/video-file', {
    method: 'POST',
    headers,
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as ApiError
    throw new Error(err.error || err.detail || `${res.status} ${res.statusText}`)
  }
  return await res.blob()
}
