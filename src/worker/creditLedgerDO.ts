/**
 * CreditLedger（Durable Object）：积分账本——每个访问码一个实例（idFromName(code)）。
 * 选 DO 而非 D1：无需创建外部资源（免费档 SQLite DO），部署链已有 CanvasBridge 先例；
 * DO 单实例串行处理请求，余额读写天然无竞态。零 npm 依赖。
 *
 * 预扣制：生成创建成功即扣（上游已产生成本）；HTTP 层失败由 index.ts 自动退款；
 * 异步任务终态失败不自动退（上游失败不计费、概率低），管理员可 /api/admin/credit 补偿。
 */

type LedgerRow = {
  ts: number
  /** 正 = 充值，负 = 消耗 */
  delta: number
  balance: number
  note: string
}

const LEDGER_KEEP = 200

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export class CreditLedger {
  constructor(private state: DurableObjectState) {}

  private async balance(): Promise<number> {
    return (await this.state.storage.get<number>('balance')) ?? 0
  }

  private async appendLedger(row: LedgerRow): Promise<void> {
    const rows = (await this.state.storage.get<LedgerRow[]>('ledger')) ?? []
    rows.push(row)
    if (rows.length > LEDGER_KEEP) rows.splice(0, rows.length - LEDGER_KEEP)
    await this.state.storage.put('ledger', rows)
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const body = (await req.json().catch(() => ({}))) as {
      cost?: number
      amount?: number
      note?: string
    }

    switch (url.pathname) {
      // 扣费（预扣）：余额不足返回 402，不扣
      case '/debit': {
        const cost = Math.max(0, Math.round(body.cost ?? 0))
        const bal = await this.balance()
        if (cost === 0) return json({ ok: true, balance: bal })
        if (bal < cost) {
          return json({ error: `积分不足（余额 ${bal}，本次需 ${cost}），请充值`, balance: bal }, 402)
        }
        const next = bal - cost
        await this.state.storage.put('balance', next)
        await this.appendLedger({ ts: Date.now(), delta: -cost, balance: next, note: body.note ?? '' })
        return json({ ok: true, balance: next })
      }
      // 充值 / 退款（amount 正数）
      case '/credit': {
        const amount = Math.round(body.amount ?? 0)
        if (!Number.isFinite(amount) || amount === 0) return json({ error: 'amount 无效' }, 400)
        const bal = await this.balance()
        const next = Math.max(0, bal + amount)
        await this.state.storage.put('balance', next)
        await this.appendLedger({ ts: Date.now(), delta: amount, balance: next, note: body.note ?? '' })
        return json({ ok: true, balance: next })
      }
      // 查询余额与最近流水
      case '/account': {
        const bal = await this.balance()
        const rows = (await this.state.storage.get<LedgerRow[]>('ledger')) ?? []
        return json({ balance: bal, ledger: rows.slice(-20).reverse() })
      }
      default:
        return json({ error: 'Not found' }, 404)
    }
  }
}
