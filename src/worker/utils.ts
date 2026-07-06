/**
 * 公共件：被 Worker 路由复用的小工具。
 *
 * 设计原则：
 * - 失败抛 PineHttpError，由路由的 try/catch 转 JSON 响应
 * - assertOrigin 缺配时「宽松」跳过（本地调试用，CSRF 防线非成本防线）
 * - assertAccess 缺配时「fail-closed」锁死（生成会烧真实模型费，绝不能因忘配 secret 而敞开）
 */

export interface CoreEnv {
  /** 生成访问码（逗号分隔，可多码）；`admin-` 前缀 = 管理员码（免限流/免扣费/放开上限） */
  PINELINE_ACCESS_CODES?: string
  PINELINE_ALLOWED_ORIGINS?: string
}

/** 访问码是否为管理员码（自用/代工，免限流免扣费） */
export function isAdminCode(code: string | null | undefined): boolean {
  return !!code && code.startsWith('admin-')
}

export class PineHttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function jsonError(msg: string, status = 400, code?: string): Response {
  return new Response(JSON.stringify({ error: msg, ...(code ? { code } : {}) }), {
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

const RETRY_DELAY_MS = 1_500

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 有限重试版 fetch：仅当「上游 5xx」或「网络层 TypeError（DNS/连接重置）」时重试 1 次（间隔 1.5s）。
 * 超时（AbortError → PineHttpError 504）**不重试**：生成类请求可能已在上游执行，重试会重复扣费。
 */
export async function fetchWithRetry(
  url: string,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
  opts: { retries?: number; retryDelayMs?: number } = {},
): Promise<Response> {
  const retries = opts.retries ?? 1
  const delayMs = opts.retryDelayMs ?? RETRY_DELAY_MS
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetchWithTimeout(url, init, timeoutMs)
      if (res.status >= 500 && attempt < retries) {
        // 释放连接后退避重试；重试后仍 5xx 则原样返回，交调用方定错
        await res.body?.cancel()
        await sleep(delayMs)
        continue
      }
      return res
    } catch (err) {
      // PineHttpError(504) = 超时：不重试，直接上抛
      if (err instanceof PineHttpError) throw err
      if (err instanceof TypeError && attempt < retries) {
        await sleep(delayMs)
        continue
      }
      throw err
    }
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

/** 取请求来源的 origin（无端口差异归一），失败返回 '' */
function requestOrigin(req: Request): string {
  const raw = req.headers.get('origin') || req.headers.get('referer') || ''
  if (!raw) return ''
  try {
    return new URL(raw).origin
  } catch {
    return ''
  }
}

export function assertOrigin(req: Request, env: CoreEnv): void {
  const allow = env.PINELINE_ALLOWED_ORIGINS?.trim()
  if (!allow) return
  const origin = requestOrigin(req)
  if (!origin) {
    throw new PineHttpError(403, '缺少 Origin')
  }
  // 全等匹配（此前 startsWith 有前缀漏洞：allowed.evil.com 可绕过）。
  // Origin 头 curl 可伪造，这是浏览器场景的 CSRF 防线，真正的成本防线是 assertAccess + 限流。
  const list = allow.split(',').map((s) => s.trim()).filter(Boolean)
  const ok = list.some((entry) => {
    try {
      return new URL(entry).origin === origin
    } catch {
      return false
    }
  })
  if (!ok) {
    throw new PineHttpError(403, '来源不在白名单')
  }
}

/**
 * 生成访问门：校验 X-Pineline-Access ∈ PINELINE_ACCESS_CODES，返回命中的码值。
 * **fail-closed**：secret 未配置时锁死（503）——生成路由会烧真实模型费，
 * 绝不能因忘配而对公众敞开（与 assertOrigin 的宽松惯例相反，刻意为之）。
 */
export function assertAccess(req: Request, env: CoreEnv): string {
  const configured = env.PINELINE_ACCESS_CODES?.trim()
  if (!configured) {
    throw new PineHttpError(503, '服务端未配置访问码（PINELINE_ACCESS_CODES），生成能力暂不可用')
  }
  const got = req.headers.get('x-pineline-access')?.trim()
  const codes = configured.split(',').map((s) => s.trim()).filter(Boolean)
  if (!got || !codes.includes(got)) {
    throw new PineHttpError(403, 'ACCESS_REQUIRED')
  }
  return got
}

export async function readJson<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T
  } catch {
    throw new PineHttpError(400, '请求体不是合法 JSON')
  }
}

// ---------------- 结构化生成日志（环形缓冲 + Workers Logs） ----------------

export type GenLogEntry = {
  ts: number
  path: string
  ok: boolean
  status: number
  ms: number
  error?: string
  requestId?: string
  model?: string
  note?: string
}

const GEN_LOG_CAP = 300
const genLogBuffer: GenLogEntry[] = []

/**
 * 记一条生成日志：写入模块级环形缓冲（/api/debug/logs 可查，仅当前实例 best-effort），
 * 同时 console.log 结构化 JSON —— wrangler observability 已开启，会进 Cloudflare
 * 仪表盘的 Workers Logs 持久检索（筛 tag=pineline-api），事后可凭 requestId 找上游记录。
 */
export function pushGenLog(entry: GenLogEntry): void {
  genLogBuffer.push(entry)
  if (genLogBuffer.length > GEN_LOG_CAP) {
    genLogBuffer.splice(0, genLogBuffer.length - GEN_LOG_CAP)
  }
  try {
    console.log(JSON.stringify({ tag: 'pineline-api', ...entry }))
  } catch {
    /* 日志失败不影响主流程 */
  }
}

export function getGenLogs(): GenLogEntry[] {
  return genLogBuffer.slice()
}

/** 读上游响应的请求标识：x-request-id（通用）→ x-tt-logid（方舟/火山网关惯用），失败排查凭据 */
export function upstreamRequestId(res: Response): string | undefined {
  return res.headers.get('x-request-id') ?? res.headers.get('x-tt-logid') ?? undefined
}

export async function runRoute(
  handler: () => Promise<Response>,
  path = 'unknown',
): Promise<Response> {
  const started = Date.now()
  try {
    const res = await handler()
    let error: string | undefined
    if (!res.ok) {
      // 路由内直接 return jsonError(...) 的失败也留下错误细节
      const j = (await res.clone().json().catch(() => null)) as { error?: string } | null
      if (typeof j?.error === 'string') error = j.error.slice(0, 300)
    }
    pushGenLog({
      ts: started,
      path,
      ok: res.ok,
      status: res.status,
      ms: Date.now() - started,
      ...(error ? { error } : {}),
    })
    return res
  } catch (err) {
    const ms = Date.now() - started
    const status = err instanceof PineHttpError ? err.status : 502
    const msg = err instanceof Error ? err.message : String(err)
    pushGenLog({ ts: started, path, ok: false, status, ms, error: msg.slice(0, 300) })
    console.error(`[pineline-api] ${path} ${status} (${ms}ms): ${msg}`)
    return jsonError(msg, status)
  }
}
