import { create } from 'zustand'
import { activeContent, isImageContent, isVideoContent } from '../types'
import { canvasSnapshot, executeOps } from '../agent/executeOps'
import { putMemory } from '../assetdb'
import { useStudioStore } from '../store'
import type { AgentOp } from '../agent/types'

/**
 * 画布桥浏览器侧：连接 CanvasBridge DO（WebSocket），接收外部 Agent 的
 * MCP 工具调用并在本地执行（复用 executeOps/canvasSnapshot 整条链），结果回传。
 * 画布真源始终在浏览器——桥只做转发，页面关闭即外部不可控。
 */

type BridgeStatus = 'off' | 'connecting' | 'on'

type BridgeState = {
  status: BridgeStatus
  /** 当前会话码（MCP URL 的路径段；对话框关闭/断开即失效） */
  code: string | null
  connect: () => void
  disconnect: () => void
}

let ws: WebSocket | null = null
let retryTimer: number | undefined
let heartbeat: number | undefined
let retryDelay = 1000

const genCode = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => (b % 36).toString(36))
    .join('')

async function handleCall(tool: string, args: Record<string, unknown>): Promise<unknown> {
  const s = useStudioStore.getState()
  switch (tool) {
    case 'get_canvas':
      return canvasSnapshot()
    case 'apply_ops': {
      // 服务端（桥）已过 agentOps 白名单，这里按可信 ops 执行
      const ops = (Array.isArray(args.ops) ? args.ops : []) as AgentOp[]
      if (!ops.length) return { error: '空操作列表' }
      // 破坏性操作防护：与助手面板一致，clear_canvas 必须经用户确认
      if (ops.some((o) => o.op === 'clear_canvas') && s.nodes.length > 0) {
        const okToClear = window.confirm('外部 Agent 请求清空当前画布（清空后 ⌘Z 可撤销）。确定继续？')
        if (!okToClear) return { error: '用户拒绝了清空画布，整批操作未执行' }
      }
      const summary = await executeOps(ops)
      const dropped = typeof args.dropped === 'number' ? args.dropped : 0
      return { summary, ...(dropped > 0 ? { droppedByWhitelist: dropped } : {}) }
    }
    case 'run_pipeline': {
      const ids = (Array.isArray(args.ids) ? args.ids : []).filter(
        (x): x is string => typeof x === 'string',
      )
      const valid = ids.filter((nid) => s.nodes.some((n) => n.id === nid))
      if (!valid.length) return { error: '目标节点均不存在' }
      if (s.pipelineRunning) return { error: '已有管线在运行，请等当前管线完成' }
      void s.runPipeline(valid)
      return { started: valid.length, note: '已按依赖顺序启动，用 get_canvas 轮询节点 status' }
    }
    case 'read_node_text': {
      const node = s.nodes.find((n) => n.id === args.id)
      if (!node) return { error: `节点 ${String(args.id ?? '')} 不存在` }
      const content = activeContent(node.data)
      if (isImageContent(content) || isVideoContent(content)) {
        return {
          kind: node.data.kind,
          title: node.data.title,
          status: node.data.status,
          versions: node.data.versions.length,
          note: '媒体节点：base64 内容不经桥传输',
        }
      }
      return {
        title: node.data.title,
        status: node.data.status,
        prompt: node.data.prompt.slice(0, 2000),
        text: (content ?? '').slice(0, 8000),
      }
    }
    case 'remember': {
      const content = String(args.content ?? '').trim()
      if (!content) return { error: 'content 不能为空' }
      await putMemory({ content, source: 'agent' })
      return { saved: true }
    }
    default:
      return { error: `未知工具 ${tool}` }
  }
}

export const useBridgeStore = create<BridgeState>()((set, get) => {
  const cleanup = () => {
    window.clearTimeout(retryTimer)
    window.clearInterval(heartbeat)
    const cur = ws
    ws = null
    try {
      cur?.close(1000, 'bye')
    } catch {
      /* 已断开 */
    }
  }

  const open = (code: string) => {
    set({ status: 'connecting' })
    const proto = location.protocol === 'https:' ? 'wss' : 'ws'
    const socket = new WebSocket(`${proto}://${location.host}/api/bridge/ws?session=${code}`)
    ws = socket
    socket.onopen = () => {
      if (ws !== socket) return
      retryDelay = 1000
      set({ status: 'on' })
      window.clearInterval(heartbeat)
      // 心跳防空闲断连（DO 忽略无 id 消息）
      heartbeat = window.setInterval(() => {
        try {
          socket.send(JSON.stringify({ type: 'ping' }))
        } catch {
          /* 断连由 onclose 处理 */
        }
      }, 30_000)
    }
    socket.onmessage = (e) => {
      let msg: { id?: string; tool?: string; args?: Record<string, unknown> }
      try {
        msg = JSON.parse(String(e.data)) as typeof msg
      } catch {
        return
      }
      if (!msg.id || !msg.tool) return
      void handleCall(msg.tool, msg.args ?? {})
        .catch((err) => ({ error: err instanceof Error ? err.message : String(err) }))
        .then((result) => {
          try {
            socket.send(JSON.stringify({ id: msg.id, result }))
          } catch {
            /* 回传时已断开 */
          }
        })
    }
    socket.onclose = () => {
      if (ws !== socket) return
      window.clearInterval(heartbeat)
      ws = null
      const { status, code: cur } = get()
      // 非用户主动断开 → 指数退避自动重连（1s→15s）
      if (status !== 'off' && cur) {
        set({ status: 'connecting' })
        retryDelay = Math.min(retryDelay * 2, 15_000)
        retryTimer = window.setTimeout(() => open(cur), retryDelay)
      }
    }
  }

  return {
    status: 'off',
    code: null,
    connect: () => {
      if (get().status !== 'off') return
      cleanup()
      const code = genCode()
      retryDelay = 1000
      set({ code })
      open(code)
    },
    disconnect: () => {
      set({ status: 'off', code: null })
      cleanup()
    },
  }
})
