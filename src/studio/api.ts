import type {
  ApiError,
  ImageRequest,
  ImageResponse,
  ScriptRequest,
  ScriptResponse,
} from './types'

async function postJson<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
