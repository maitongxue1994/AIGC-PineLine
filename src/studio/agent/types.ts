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
  /** 分镜派生自动化（支持等待上游产出后接续）：id 为 storyboard 节点；generate=派生后自动批量生图 */
  | { op: 'derive_shot_images'; id: string; indices?: number[]; generate?: boolean }
  | { op: 'derive_shot_videos'; id: string; run?: boolean }
  /** 把用户的稳定偏好/项目设定写入本地长期记忆（IndexedDB memory 库） */
  | { op: 'remember'; content: string }

export type AgentChatRequest = {
  /** images：base64 data URL（M3/豆包多模态通道消费；M2.7 不支持） */
  messages: { role: 'user' | 'assistant'; content: string; images?: string[] }[]
  /** 联网搜索开关（豆包走方舟 Responses web_search；MiniMax 走 Tavily function calling） */
  webSearch?: boolean
  /** 用户长期记忆条目（本地 IndexedDB memory 库，随每次请求注入上下文） */
  memory?: string[]
  /** 聊天模型（前端 TEXT_MODELS 的 id）：缺省/minimax 系走 MiniMax，doubao-* 走方舟 */
  model?: string
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
      /** 节点参数摘要（模型/shotIndex/比例/时长等非空键）——LLM 编辑节点的依据 */
      params?: Record<string, unknown>
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
  /** 联网搜索引用来源（气泡下方 chips） */
  citations?: { title: string; url: string }[]
  /** 联网降级说明（如方舟 Responses 不可用回落普通通道） */
  searchNote?: string
}

export type AgentMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  /** 附图缩略图（96px，仅回显；原图在模块级内存 Map，刷新后不再随历史重传） */
  images?: string[]
  /** 联网搜索引用来源 */
  citations?: { title: string; url: string }[]
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
    case 'derive_shot_images':
      return `派生分镜图${op.indices?.length ? `（镜头 ${op.indices.map((i) => i + 1).join('、')}）` : '（全部镜头）'}${op.generate ? ' 并自动批量生成' : ''}`
    case 'derive_shot_videos':
      return `一键成片：派生镜头视频${op.run ? '并立即生成' : '（预填提示词，确认后生成）'}`
    case 'remember':
      return `📌 记住：${op.content.slice(0, 40)}${op.content.length > 40 ? '…' : ''}`
  }
}
