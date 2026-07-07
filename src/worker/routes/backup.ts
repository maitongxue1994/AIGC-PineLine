import type { Env } from '../index'
import { assertAccess, jsonError, jsonOk, PineHttpError } from '../utils'

/**
 * 付费用户项目云备份（R2）：把项目完整工程 JSON（含图/视频/文本）存到 R2，按访问码
 * 哈希分区（不明文暴露访问码）。付费增值——只对填了有效访问码的用户开放；免费/个人
 * 用户仍走本地存储。复用 delivery 的 R2 桶，key 前缀 backup/ 与交付内容隔离。
 *
 * PUT  /api/backup?id=<projectId>&name=<name>  body=工程 JSON 原文 → 存/覆盖备份
 * GET  /api/backup                              → 列出本账户所有备份
 * GET  /api/backup?id=<projectId>               → 下载单个备份 JSON
 * DELETE /api/backup?id=<projectId>             → 删除备份
 */

const PROJECT_ID_RE = /^[a-zA-Z0-9_-]{4,64}$/
const MAX_BYTES = 80 * 1024 * 1024 // 单项目上限（超大提示走本地导出）

/** 访问码 → R2 key 前缀（SHA-256 前 16 位，账户隔离且不明文暴露码） */
async function accountPrefix(code: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code))
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  return `backup/${hex.slice(0, 16)}/`
}

export async function backupRoute(req: Request, env: Env, url: URL): Promise<Response> {
  const code = assertAccess(req, env) // 付费用户有码；无码 fail-closed
  if (!env.DELIVERY_BUCKET) {
    return jsonError('云备份未开通（服务端未配置 R2 存储）', 501)
  }
  const prefix = await accountPrefix(code)
  const projectId = (url.searchParams.get('id') || '').trim()

  if (req.method === 'PUT') {
    if (!PROJECT_ID_RE.test(projectId)) return jsonError('projectId 无效')
    const name = (url.searchParams.get('name') || '未命名项目').trim().slice(0, 120)
    const buf = await req.arrayBuffer()
    if (buf.byteLength < 2) return jsonError('备份内容为空')
    if (buf.byteLength > MAX_BYTES)
      return jsonError('项目过大（>80MB），请用「导出工程 JSON」在本地备份', 413)
    await env.DELIVERY_BUCKET.put(prefix + projectId + '.json', buf, {
      httpMetadata: { contentType: 'application/json' },
      customMetadata: {
        // customMetadata 值须 ASCII 安全 → 中文名 encode 存、取时 decode
        name: encodeURIComponent(name),
        updatedAt: String(Date.now()),
        size: String(buf.byteLength),
      },
    })
    return jsonOk({ ok: true, size: buf.byteLength })
  }

  if (req.method === 'DELETE') {
    if (!PROJECT_ID_RE.test(projectId)) return jsonError('projectId 无效')
    await env.DELIVERY_BUCKET.delete(prefix + projectId + '.json')
    return jsonOk({ ok: true })
  }

  if (req.method === 'GET') {
    // 单个下载
    if (projectId) {
      if (!PROJECT_ID_RE.test(projectId)) return jsonError('projectId 无效')
      const obj = await env.DELIVERY_BUCKET.get(prefix + projectId + '.json')
      if (!obj) return jsonError('云端没有这个备份', 404)
      return new Response(obj.body, { headers: { 'Content-Type': 'application/json' } })
    }
    // 列表
    const listed = await env.DELIVERY_BUCKET.list({ prefix })
    const items = listed.objects
      .map((o) => ({
        projectId: o.key.slice(prefix.length).replace(/\.json$/, ''),
        name: safeDecode(o.customMetadata?.name) || '未命名项目',
        updatedAt: Number(o.customMetadata?.updatedAt ?? 0),
        size: Number(o.customMetadata?.size ?? o.size),
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt)
    return jsonOk({ items })
  }

  return jsonError('不支持的方法', 405)
}

function safeDecode(s: string | undefined): string {
  if (!s) return ''
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

/** 供 index.ts 统一错误转换 */
export function backupError(err: unknown): Response {
  if (err instanceof PineHttpError) return jsonError(err.message, err.status)
  throw err
}
