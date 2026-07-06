/**
 * CanvasBridge（Durable Object）：外部 Agent（MCP）↔ 浏览器 Studio 的中继。
 *
 * 画布真源在浏览器 IndexedDB/内存，Worker 无画布可操作——桥不迁移状态，
 * 只做转发：MCP tools/call → DO → WebSocket → 浏览器执行（复用 executeOps 链）→ 结果回传。
 * 每个会话码对应一个 DO 实例（idFromName），码即能力凭证，浏览器断开后调用返回 409。
 *
 * 零 npm 依赖（deploy 分支无 package.json，Cloudflare 直接 bundle 本目录 TS）。
 */

type CallBody = { tool?: string; args?: unknown }

const CALL_TIMEOUT_MS = 30_000

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export class CanvasBridge {
  private ws: WebSocket | null = null
  private pending = new Map<string, { resolve: (v: unknown) => void; timer: ReturnType<typeof setTimeout> }>()
  private seq = 0

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)

    // 浏览器侧：WebSocket 接入（新连接顶掉旧连接，刷新页面即重连）
    if (url.pathname === '/ws') {
      if (req.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
        return json({ error: '需要 WebSocket 升级' }, 426)
      }
      const pair = new WebSocketPair()
      const [client, server] = Object.values(pair)
      this.accept(server)
      return new Response(null, { status: 101, webSocket: client })
    }

    // MCP 侧：工具调用转发
    if (url.pathname === '/call' && req.method === 'POST') {
      if (!this.ws) {
        return json(
          { error: '浏览器未连接：请在 PineLine Studio 顶栏打开「外部 Agent」并保持页面开启' },
          409,
        )
      }
      const body = (await req.json().catch(() => null)) as CallBody | null
      if (!body?.tool) return json({ error: '缺少 tool 字段' }, 400)
      return this.call(body)
    }

    return json({ error: 'Not found' }, 404)
  }

  private accept(server: WebSocket): void {
    try {
      this.ws?.close(1000, 'replaced')
    } catch {
      /* 旧连接可能已断 */
    }
    server.accept()
    this.ws = server
    server.addEventListener('message', (e) => {
      try {
        const msg = JSON.parse(String(e.data)) as { id?: string; result?: unknown }
        if (msg.id && this.pending.has(msg.id)) {
          const p = this.pending.get(msg.id)!
          clearTimeout(p.timer)
          this.pending.delete(msg.id)
          p.resolve(msg.result ?? null)
        }
        // 无 id 的消息（心跳 ping 等）忽略
      } catch {
        /* 坏消息忽略 */
      }
    })
    const drop = () => {
      if (this.ws === server) this.ws = null
    }
    server.addEventListener('close', drop)
    server.addEventListener('error', drop)
  }

  private async call(body: CallBody): Promise<Response> {
    const id = `c${++this.seq}-${Date.now()}`
    const result = await new Promise<unknown>((resolve) => {
      const timer = setTimeout(() => {
        this.pending.delete(id)
        resolve({ error: '浏览器响应超时（30s）——长任务请用 run_pipeline 启动后以 get_canvas 轮询' })
      }, CALL_TIMEOUT_MS)
      this.pending.set(id, { resolve, timer })
      try {
        this.ws!.send(JSON.stringify({ id, tool: body.tool, args: body.args ?? {} }))
      } catch {
        clearTimeout(timer)
        this.pending.delete(id)
        resolve({ error: '向浏览器转发失败，连接可能已断开' })
      }
    })
    return json(result)
  }
}
