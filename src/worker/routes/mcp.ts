import { sanitizeOps } from '../agentOps'
import type { Env } from '../index'

/**
 * 手写 MCP 服务端（Streamable HTTP，无状态单 JSON 响应；零 npm 依赖——
 * deploy 分支无 package.json，@modelcontextprotocol/sdk 进不了 Worker）。
 *
 * 端点：POST /mcp/<会话码>。会话码即能力凭证（浏览器「外部 Agent」对话框生成），
 * 对应一个 CanvasBridge DO；tools/call 经 DO WebSocket 转发浏览器执行。
 * 按 2026-07 RC 方向设计为无协议级 session：每个请求独立处理。
 */

const CODE_RE = /^[a-z0-9]{6,32}$/i
const KNOWN_PROTOCOLS = new Set(['2024-11-05', '2025-03-26', '2025-06-18', '2025-11-25'])
const DEFAULT_PROTOCOL = '2025-06-18'

const TOOLS = [
  {
    name: 'get_canvas',
    description:
      '读取 PineLine 画布快照：节点（id/kind/preset/title/prompt 摘要/status/hasImage/参数）与连线。搭建或修改管线前先调用它了解现状。',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'apply_ops',
    description:
      '批量执行画布操作（add_node/set_prompt/set_params/connect/run/derive_shot_images/derive_shot_videos/remember 等，单批 ≤48 条）。搭「剧本→分镜→分镜图→视频」管线时优先用 derive 派生 op。ops schema 详见部署站 /assets/skills/pineline/references/ops.md',
    inputSchema: {
      type: 'object',
      properties: {
        ops: { type: 'array', items: { type: 'object' }, description: '画布操作列表' },
      },
      required: ['ops'],
    },
  },
  {
    name: 'run_pipeline',
    description:
      '按依赖拓扑顺序运行指定节点（异步启动，立即返回启动回执）。生成需数秒到数分钟：用 get_canvas 轮询节点 status（running/done/error）。',
    inputSchema: {
      type: 'object',
      properties: { ids: { type: 'array', items: { type: 'string' }, description: '节点 id 列表' } },
      required: ['ids'],
    },
  },
  {
    name: 'read_node_text',
    description: '读取某节点当前激活版本的完整文本产出（截 8000 字）；图片/视频节点返回元信息。',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: '节点 id' } },
      required: ['id'],
    },
  },
  {
    name: 'remember',
    description: '把一条用户长期偏好/项目设定写入 PineLine 本地记忆（画布助手后续对话自动携带），用于跨 Agent 记忆互通。',
    inputSchema: {
      type: 'object',
      properties: { content: { type: 'string', maxLength: 500, description: '一条稳定偏好/设定' } },
      required: ['content'],
    },
  },
]

type RpcId = string | number

type RpcRequest = {
  jsonrpc?: string
  id?: unknown
  method?: string
  params?: {
    protocolVersion?: unknown
    name?: unknown
    arguments?: unknown
  }
}

function rpc(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

const rpcResult = (id: RpcId, result: unknown) => rpc({ jsonrpc: '2.0', id, result })
const rpcError = (id: RpcId | null, code: number, message: string) =>
  rpc({ jsonrpc: '2.0', id, error: { code, message } })

function bridgeStub(env: Env, code: string) {
  return env.CANVAS_BRIDGE.get(env.CANVAS_BRIDGE.idFromName(code.toLowerCase()))
}

/** 浏览器侧 WebSocket 接入 → 转发到对应会话码的 DO（同源页面发起，无法带自定义鉴权头） */
export function handleBridgeWs(req: Request, env: Env, url: URL): Response | Promise<Response> {
  const code = url.searchParams.get('session') ?? ''
  if (!CODE_RE.test(code)) return new Response('无效会话码', { status: 400 })
  if (req.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
    return new Response('需要 WebSocket 升级', { status: 426 })
  }
  return bridgeStub(env, code).fetch(new Request('https://bridge/ws', req))
}

/** MCP 端点（外部 agent 直连）：initialize / tools/list / tools/call / ping */
export async function handleMcp(req: Request, env: Env, url: URL): Promise<Response> {
  const code = url.pathname.slice('/mcp/'.length).replace(/\/+$/, '')
  if (!CODE_RE.test(code)) {
    return rpcError(null, -32600, '无效的 MCP 地址：应为 /mcp/<会话码>（在 PineLine Studio「外部 Agent」对话框获取）')
  }

  let msg: RpcRequest
  try {
    msg = (await req.json()) as RpcRequest
  } catch {
    return rpcError(null, -32700, 'JSON 解析失败')
  }
  // 通知（无 id，如 notifications/initialized）：202 空响应
  if (msg.id === undefined || msg.id === null) return new Response(null, { status: 202 })
  const id = msg.id as RpcId

  switch (msg.method) {
    case 'initialize': {
      const requested = String(msg.params?.protocolVersion ?? '')
      return rpcResult(id, {
        protocolVersion: KNOWN_PROTOCOLS.has(requested) ? requested : DEFAULT_PROTOCOL,
        capabilities: { tools: {} },
        serverInfo: { name: 'pineline-canvas-bridge', version: '1.0.0' },
        instructions:
          'PineLine 画布桥：get_canvas 看现状 → apply_ops 搭链（优先 derive_shot_images/derive_shot_videos 派生 op）→ run_pipeline → 轮询 get_canvas → read_node_text 取产出。用户浏览器中的 Studio 页面必须保持打开，否则调用返回「浏览器未连接」。',
      })
    }
    case 'ping':
      return rpcResult(id, {})
    case 'tools/list':
      return rpcResult(id, { tools: TOOLS })
    case 'tools/call': {
      const name = String(msg.params?.name ?? '')
      const rawArgs = msg.params?.arguments
      const args: Record<string, unknown> =
        rawArgs && typeof rawArgs === 'object' && !Array.isArray(rawArgs)
          ? (rawArgs as Record<string, unknown>)
          : {}
      if (!TOOLS.some((t) => t.name === name)) return rpcError(id, -32602, `未知工具：${name}`)

      let forwarded: Record<string, unknown> = args
      if (name === 'apply_ops') {
        // 与画布助手共用同一套服务端白名单：非法 op 在桥上即被拦下
        const { ops, dropped } = sanitizeOps(Array.isArray(args.ops) ? (args.ops as unknown[]) : [])
        if (!ops.length) {
          return rpcResult(id, {
            content: [{ type: 'text', text: JSON.stringify({ error: '没有通过白名单校验的操作', dropped }) }],
            isError: true,
          })
        }
        forwarded = { ops, dropped }
      }

      const doRes = await bridgeStub(env, code).fetch('https://bridge/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: name, args: forwarded }),
      })
      const payload = (await doRes.json().catch(() => ({ error: '桥内部错误' }))) as {
        error?: unknown
      }
      const isError = doRes.status >= 400 || payload?.error != null
      return rpcResult(id, {
        content: [{ type: 'text', text: JSON.stringify(payload) }],
        ...(isError ? { isError: true } : {}),
      })
    }
    default:
      return rpcError(id, -32601, `不支持的方法：${msg.method ?? ''}`)
  }
}
