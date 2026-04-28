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
} from './types'

const AUTH_TOKEN = (import.meta.env.VITE_PINELINE_API_KEY as string | undefined)?.trim()

async function postJson<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (AUTH_TOKEN) headers['X-Pineline-Auth'] = AUTH_TOKEN

  const res = await fetch(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
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
