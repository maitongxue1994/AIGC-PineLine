import type { Env } from '../index'
import { jsonError, jsonOk } from '../utils'

/**
 * Paddle 支付 webhook（海外自助购买闭环）：验签 → 按购买的套餐给对应访问码充积分。
 * Paddle Billing 用 HMAC-SHA256 签名（Paddle-Signature 头：ts=...;h1=...）。
 * 访问码由前端在下单时作为 customData.access_code 传入（新用户先在站内生成/领取码）。
 *
 * 套餐 → 积分映射（与 siteConfig.PRICING 对齐，price_id 在 Paddle 后台配置后填入 env
 * PADDLE_PRICE_MAP，格式 pri_xxx:6000,pri_yyy:20000）。
 */

async function verifyPaddleSignature(
  raw: string,
  sigHeader: string,
  secret: string,
): Promise<boolean> {
  // 解析 ts=...;h1=...
  const parts = Object.fromEntries(
    sigHeader.split(';').map((kv) => kv.split('=').map((s) => s.trim()) as [string, string]),
  )
  const ts = parts['ts']
  const h1 = parts['h1']
  if (!ts || !h1) return false
  const signedPayload = `${ts}:${raw}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload))
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  // 常量时间比较
  if (hex.length !== h1.length) return false
  let diff = 0
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ h1.charCodeAt(i)
  return diff === 0
}

function parsePriceMap(raw: string | undefined): Record<string, number> {
  const map: Record<string, number> = {}
  for (const pair of (raw ?? '').split(',')) {
    const [id, credits] = pair.split(':').map((s) => s.trim())
    if (id && credits && Number.isFinite(Number(credits))) map[id] = Number(credits)
  }
  return map
}

export async function paddleWebhook(req: Request, env: Env): Promise<Response> {
  const secret = env.PADDLE_WEBHOOK_SECRET?.trim()
  if (!secret) return jsonError('未配置 PADDLE_WEBHOOK_SECRET', 501)
  const sigHeader = req.headers.get('paddle-signature') ?? ''
  const raw = await req.text()
  if (!(await verifyPaddleSignature(raw, sigHeader, secret))) {
    return jsonError('签名校验失败', 401)
  }

  let event: {
    event_type?: string
    data?: {
      items?: { price?: { id?: string }; quantity?: number }[]
      custom_data?: { access_code?: string } | null
    }
  }
  try {
    event = JSON.parse(raw)
  } catch {
    return jsonError('无效 JSON')
  }

  // 只处理完成的交易/订阅付款
  if (event.event_type !== 'transaction.completed') {
    return jsonOk({ ignored: event.event_type })
  }

  const code = event.data?.custom_data?.access_code?.trim()
  if (!code) return jsonOk({ warning: '缺少 access_code，未充值（请客户在站内领码后重试或联系客服）' })

  const priceMap = parsePriceMap(env.PADDLE_PRICE_MAP)
  let credits = 0
  for (const item of event.data?.items ?? []) {
    const c = item.price?.id ? priceMap[item.price.id] : 0
    if (c) credits += c * (item.quantity ?? 1)
  }
  if (credits <= 0) return jsonOk({ warning: '未匹配到套餐积分（检查 PADDLE_PRICE_MAP）' })

  const ledger = env.CREDIT_LEDGER.get(env.CREDIT_LEDGER.idFromName(code))
  const r = await ledger.fetch('https://ledger/credit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: credits, note: `paddle:${event.event_type}` }),
  })
  const result = (await r.json().catch(() => ({}))) as { balance?: number }
  return jsonOk({ code, credited: credits, balance: result.balance })
}
