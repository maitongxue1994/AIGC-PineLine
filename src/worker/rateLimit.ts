import { isAdminCode, PineHttpError } from './utils'

/**
 * 零依赖内存限流（固定窗口，per 访问码）。
 * 定位：访问门已把人群缩到已知客户，这里拦的是「码泄露后的爆刷」；
 * 多 isolate 下按码计数会被放大 N 倍（低估），可接受——真正的成本硬护栏是
 * T3 预充值扣费（余额不足即拒），限流只是第一道粗筛。管理员码豁免。
 */

type PathClass = 'video' | 'image' | 'text'

/** 各类每小时次数上限（env PINELINE_RATE_* 可覆写） */
const DEFAULTS: Record<PathClass, number> = {
  video: 12,
  image: 60,
  text: 120,
}

const WINDOW_MS = 60 * 60 * 1000

const buckets = new Map<string, { windowStart: number; count: number }>()

export function pathClassOf(pathname: string): PathClass {
  if (pathname === '/api/generate/video') return 'video'
  if (pathname === '/api/generate/image' || pathname === '/api/generate/image-grid') return 'image'
  return 'text' // script / storyboard / agent chat
}

function limitFor(cls: PathClass, env: Record<string, string | undefined>): number {
  const raw = env[`PINELINE_RATE_${cls.toUpperCase()}`]
  const n = raw ? Number(raw) : NaN
  return Number.isFinite(n) && n > 0 ? n : DEFAULTS[cls]
}

/** now 由调用方注入（Worker fetch 内 Date.now() 可用；纯函数便于测试） */
export function checkRateLimit(
  code: string,
  pathname: string,
  env: Record<string, string | undefined>,
  now: number,
): void {
  if (isAdminCode(code)) return
  const cls = pathClassOf(pathname)
  const key = `${code}:${cls}`
  const limit = limitFor(cls, env)
  const b = buckets.get(key)
  if (!b || now - b.windowStart >= WINDOW_MS) {
    buckets.set(key, { windowStart: now, count: 1 })
    return
  }
  if (b.count >= limit) {
    const mins = Math.ceil((WINDOW_MS - (now - b.windowStart)) / 60000)
    throw new PineHttpError(429, `请求过于频繁（${cls} 每小时上限 ${limit} 次），请约 ${mins} 分钟后再试`)
  }
  b.count++
}
