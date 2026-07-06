import type { Env } from '../index'
import { isAdminCode, jsonError, jsonOk, PineHttpError, readJson } from '../utils'

/**
 * 客户交付页（R2）：管理员上传成片 → 生成带有效期的分享链接 → 客户 /d/<token> 观看下载。
 * 无账号体系下的最小交付闭环：分享 token 即 R2 object key 前缀，过期时间写 customMetadata。
 * 上传仅管理员码；观看页公开只读。
 */

const TOKEN_RE = /^[a-z0-9]{10,40}$/i

function objectKey(token: string) {
  return `delivery/${token}`
}

/** POST /api/delivery/upload —— 管理员上传交付媒体，返回分享 token */
export async function deliveryUpload(req: Request, env: Env): Promise<Response> {
  const code = req.headers.get('x-pineline-access')?.trim()
  if (!isAdminCode(code)) return jsonError('仅管理员可上传交付', 403)
  if (!env.DELIVERY_BUCKET) return jsonError('未配置 R2 存储（DELIVERY_BUCKET）', 501)

  const body = await readJson<{
    token: string
    filename: string
    contentType: string
    dataUrl: string
    expiresDays?: number
    note?: string
  }>(req)

  if (!TOKEN_RE.test(body.token ?? '')) return jsonError('token 格式无效')
  if (!body.dataUrl?.startsWith('data:')) return jsonError('缺少媒体内容')

  const comma = body.dataUrl.indexOf(',')
  const bin = atob(body.dataUrl.slice(comma + 1))
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)

  // 经 Worker 请求体上传，受平台请求体上限约束（免费计划 ~100MB，base64 膨胀 33%）；
  // AI 短视频通常 <30MB 足够。更大文件需改直传 R2（presigned URL），本期不做。
  if (bytes.length > 80 * 1024 * 1024) {
    return jsonError('文件超过 80MB，暂不支持在线交付（请用网盘/微信发送）', 413)
  }

  const days = Math.min(90, Math.max(1, Math.round(body.expiresDays ?? 30)))
  const expiresAt = Date.now() + days * 24 * 3600 * 1000

  await env.DELIVERY_BUCKET.put(objectKey(body.token), bytes, {
    httpMetadata: { contentType: body.contentType || 'application/octet-stream' },
    customMetadata: {
      filename: body.filename || 'delivery',
      expiresAt: String(expiresAt),
      note: (body.note ?? '').slice(0, 200),
    },
  })

  return jsonOk({ token: body.token, expiresAt, days })
}

/** GET /d/<token> —— 公开交付页（HTML）；GET /d/<token>?raw=1 —— 媒体字节 */
export async function deliveryView(req: Request, env: Env, url: URL): Promise<Response> {
  const token = url.pathname.slice('/d/'.length).replace(/\/+$/, '')
  if (!TOKEN_RE.test(token)) return new Response('无效链接', { status: 404 })
  if (!env.DELIVERY_BUCKET) return new Response('交付服务未配置', { status: 501 })

  const obj = await env.DELIVERY_BUCKET.get(objectKey(token))
  if (!obj) return new Response('交付内容不存在或已过期', { status: 404 })

  const expiresAt = Number(obj.customMetadata?.expiresAt ?? 0)
  if (expiresAt && Date.now() > expiresAt) {
    return new Response('交付链接已过期，请联系服务方', { status: 410 })
  }

  const filename = obj.customMetadata?.filename ?? 'delivery'
  const contentType = obj.httpMetadata?.contentType ?? 'application/octet-stream'

  // ?raw=1 直接下发字节（<video src> / 下载用）
  if (url.searchParams.get('raw') === '1') {
    return new Response(obj.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  }

  const isVideo = contentType.startsWith('video')
  const rawUrl = `/d/${token}?raw=1`
  const expireStr = expiresAt ? new Date(expiresAt).toLocaleDateString('zh-CN') : ''
  const media = isVideo
    ? `<video src="${rawUrl}" controls playsinline style="max-width:100%;max-height:70vh;border-radius:12px"></video>`
    : `<img src="${rawUrl}" style="max-width:100%;max-height:70vh;border-radius:12px" />`

  const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>PineLine 交付 · ${filename}</title>
<style>body{margin:0;background:#0b0b0c;color:#e8e8ea;font:15px/1.6 system-ui,-apple-system,"PingFang SC",sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
.card{max-width:900px;width:100%;text-align:center}.t{font-size:18px;font-weight:600;margin-bottom:16px}
.b{display:inline-block;margin-top:20px;padding:10px 22px;border-radius:999px;background:#f5f5f7;color:#0b0b0c;text-decoration:none;font-weight:600}
.m{margin-top:14px;font-size:12px;color:#8a8a90}</style></head>
<body><div class="card"><div class="t">${filename}</div>${media}
<div><a class="b" href="${rawUrl}" download="${filename}">下载</a></div>
<div class="m">由 PineLine 交付 · 含 AI 生成内容${expireStr ? ` · 有效期至 ${expireStr}` : ''}</div></div></body></html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

/** 供 index.ts 统一错误转换 */
export function deliveryError(err: unknown): Response {
  if (err instanceof PineHttpError) return jsonError(err.message, err.status)
  throw err
}
