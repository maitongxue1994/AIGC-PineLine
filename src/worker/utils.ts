/**
 * 公共件：被 Worker 路由复用的小工具。
 *
 * 设计原则：
 * - 失败抛 PineHttpError，由路由的 try/catch 转 JSON 响应
 * - 默认行为是「宽松」：环境变量缺失时跳过对应保护，便于本地调试
 *   生产部署在 CF Dashboard 把 PINELINE_API_KEY / PINELINE_ALLOWED_ORIGINS 设上，保护自动开启
 */

export interface CoreEnv {
  PINELINE_API_KEY?: string
  PINELINE_ALLOWED_ORIGINS?: string
}

export class PineHttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function jsonError(msg: string, status = 400): Response {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function jsonOk(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}

const DEFAULT_TIMEOUT_MS = 25_000
const DEFAULT_MAX_BODY_BYTES = 10 * 1024 * 1024

export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new PineHttpError(504, `上游模型 ${timeoutMs / 1000}s 内未响应，请重试`)
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

export function assertBodySize(req: Request, max: number = DEFAULT_MAX_BODY_BYTES): void {
  const len = req.headers.get('content-length')
  if (!len) return
  const n = Number(len)
  if (!Number.isFinite(n) || n < 0) return
  if (n > max) {
    throw new PineHttpError(
      413,
      `请求体过大（${(n / 1024 / 1024).toFixed(1)}MB > ${max / 1024 / 1024}MB）`,
    )
  }
}

export function assertOrigin(req: Request, env: CoreEnv): void {
  const allow = env.PINELINE_ALLOWED_ORIGINS?.trim()
  if (!allow) return
  const origin = req.headers.get('origin') || req.headers.get('referer') || ''
  if (!origin) {
    throw new PineHttpError(403, '缺少 Origin')
  }
  const list = allow.split(',').map((s) => s.trim()).filter(Boolean)
  const ok = list.some((entry) => origin.startsWith(entry))
  if (!ok) {
    throw new PineHttpError(403, '来源不在白名单')
  }
}

export function assertAuth(req: Request, env: CoreEnv): void {
  const expected = env.PINELINE_API_KEY?.trim()
  if (!expected) return
  const got = req.headers.get('x-pineline-auth')?.trim()
  if (!got || got !== expected) {
    throw new PineHttpError(401, '未授权')
  }
}

export async function readJson<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T
  } catch {
    throw new PineHttpError(400, '请求体不是合法 JSON')
  }
}

export async function runRoute(
  handler: () => Promise<Response>,
): Promise<Response> {
  try {
    return await handler()
  } catch (err) {
    if (err instanceof PineHttpError) {
      return jsonError(err.message, err.status)
    }
    const msg = err instanceof Error ? err.message : String(err)
    return jsonError(msg, 502)
  }
}
