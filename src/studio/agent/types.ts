/** Agent 前后端共享契约（与 src/worker/routes/agentChat.ts 保持一致） */

export type AgentOp =
  | {
      op: 'add_node'
      ref: string
      kind: 'text' | 'image' | 'video'
      preset?: string
      title?: string
      prompt?: string
      /** 初始参数（服务端白名单过滤：shotIndex/videoDuration 等） */
      params?: Record<string, unknown>
      position?: { x: number; y: number }
    }
  | { op: 'set_prompt'; id: string; prompt: string }
  | { op: 'set_params'; id: string; params: Record<string, unknown> }
  | { op: 'rename'; id: string; title: string }
  | { op: 'connect'; source: string; target: string }
  | { op: 'delete_node'; id: string }
  | { op: 'run'; ids: string[] }
  /** 清空画布再新建管线：前端执行前必弹确认（无论手动/自动模式） */
  | { op: 'clear_canvas' }

export type AgentChatRequest = {
  messages: { role: 'user' | 'assistant'; content: string }[]
  canvas: {
    nodes: {
      id: string
      kind: string
      preset: string | null
      title: string
      prompt: string
      status: string
      hasImage: boolean
      versionCount: number
    }[]
    edges: { source: string; target: string }[]
  }
  selection: string[]
}

export type AgentChatResponse = {
  reply: string
  ops: AgentOp[]
  /** MiniMax M2.7 推理模型的思考过程（可选，面板折叠展示） */
  thinking?: string
}

export type AgentMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  ops?: AgentOp[]
  /** 操作卡状态：待确认 / 已执行 / 已放弃 */
  opsState?: 'pending' | 'executed' | 'dismissed'
  /** 执行结果摘要 */
  result?: string
  /** ops 生成时归属的项目 id（跨项目防护：切换项目后拒绝执行旧 ops） */
  projectId?: string | null
  /** 推理模型的思考过程（折叠展示） */
  thinking?: string
  createdAt: number
}

export type AgentSession = {
  id: string
  title: string
  messages: AgentMessage[]
  createdAt: number
}

/** 操作的人话描述（预览卡/执行摘要共用） */
export function describeOp(op: AgentOp): string {
  switch (op.op) {
    case 'add_node': {
      const kindLabel = op.kind === 'text' ? '文本' : op.kind === 'video' ? '视频' : '图片'
      const shotIdx = op.params?.shotIndex
      const extra = op.preset ? `（${op.preset}${typeof shotIdx === 'number' ? ` · 镜头${shotIdx + 1}` : ''}）` : ''
      return `新建${kindLabel}节点「${op.title ?? op.ref}」${extra}`
    }
    case 'set_prompt':
      return `修改提示词：${op.prompt.slice(0, 40)}${op.prompt.length > 40 ? '…' : ''}`
    case 'set_params':
      return `调整参数 ${Object.keys(op.params).join('/')}`
    case 'rename':
      return `重命名为「${op.title}」`
    case 'connect':
      return `连接 ${op.source} → ${op.target}`
    case 'delete_node':
      return `删除节点 ${op.id}`
    case 'run':
      return `运行 ${op.ids.length} 个节点`
    case 'clear_canvas':
      return '⚠ 清空当前画布（执行前会再次确认，⌘Z 可撤销）'
  }
}
