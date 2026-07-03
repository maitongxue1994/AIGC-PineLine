import { callMinimaxChat, type ChatMessage } from '../minimax'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

/**
 * Agent 编排端点：多轮对话 → 回复文本 + 画布操作列表（JSON patch）。
 * 前端把操作渲染成预览卡（手动确认）或直接执行（自动模式）。
 */

type AgentOp =
  | { op: 'add_node'; ref: string; kind: 'text' | 'image'; preset?: string; title?: string; prompt?: string; position?: { x: number; y: number } }
  | { op: 'set_prompt'; id: string; prompt: string }
  | { op: 'set_params'; id: string; params: Record<string, unknown> }
  | { op: 'rename'; id: string; title: string }
  | { op: 'connect'; source: string; target: string }
  | { op: 'delete_node'; id: string }
  | { op: 'run'; ids: string[] }

type Body = {
  messages?: { role: 'user' | 'assistant'; content: string }[]
  canvas?: {
    nodes?: {
      id: string
      kind: string
      preset: string | null
      title: string
      prompt: string
      status: string
      hasImage: boolean
      versionCount: number
    }[]
    edges?: { source: string; target: string }[]
  }
  selection?: string[]
}

const VALID_OPS = new Set(['add_node', 'set_prompt', 'set_params', 'rename', 'connect', 'delete_node', 'run'])
const VALID_KINDS = new Set(['text', 'image'])
const VALID_PRESETS = new Set([
  'free', 'script', 'storyboard', 'ad-copy',
  'single', 'shot', 'scene-grid', 'char-triview', 'prop-triview',
])
const MAX_OPS = 20

const SYSTEM_PROMPT = `你是 PineLine 画布助手——一个 AIGC 影视创作管线工作台的编排 Agent。用户用自然语言描述创作需求，你帮他们在节点画布上搭建/修改/运行生成管线。

## 画布模型
- 节点 kind：text（文本生成）/ image（图片生成）。
- text 预设 preset：script(剧本) / storyboard(分镜，自动把上游剧本拆成镜头) / ad-copy(广告词) / free(自由文本)。
- image 预设 preset：single(单图) / shot(分镜图，自动使用上游分镜首镜描述) / scene-grid(场景四宫格) / char-triview(角色三视图) / prop-triview(道具三视图)。
- 连线 = 上游产出自动作为下游输入（文本喂文本、图作参考图）。节点 prompt 留空时自动用上游文本。
- 典型管线：剧本(script) → 分镜(storyboard) → 分镜图(shot)。

## 可用操作（ops）
- {"op":"add_node","ref":"n1","kind":"text","preset":"script","title":"剧本","prompt":"…","position":{"x":80,"y":80}}
- {"op":"set_prompt","id":"<已有节点id或本轮ref>","prompt":"…"}
- {"op":"set_params","id":"…","params":{"aspectRatio":"16:9","quality":"1K","batch":1,"tone":"cinematic","length":"short"}}
- {"op":"rename","id":"…","title":"…"}
- {"op":"connect","source":"…","target":"…"}
- {"op":"delete_node","id":"…"}
- {"op":"run","ids":["…"]}（按依赖顺序运行这些节点）

## 规则
1. 只输出一个 JSON 对象：{"reply":"给用户的中文回复","ops":[…]}。不要 markdown 代码围栏，不要任何解释文字。
2. 新建节点用 ref（n1、n2…）作临时引用，后续 connect/run 可用 ref 或已有节点 id。
3. 布局：链式从左到右，x 依次 +480，同列 y 相同；并行分支 y 依次 +420。新链放在已有节点下方（用画布快照里的最大 y + 400）。
4. 用户让你修改「这个/选中的节点」时用 selection 里的 id。
5. 需求不明确时 ops 留空 []，在 reply 里追问。
6. 不确定的事不要编造；删除节点等破坏性操作要保守，用户明确要求才做。
7. reply 简洁（1-3 句），说明你做了什么或要问什么。`

function stripFences(s: string): string {
  return s.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
}

/** 容错解析：直接 parse → 提取首个 {...} → 降级为纯回复（保证对话不断流） */
function parseAgentJson(raw: string): { reply: string; ops: unknown[] } {
  const cleaned = stripFences(raw)
  const attempts: string[] = [cleaned]
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first >= 0 && last > first) attempts.push(cleaned.slice(first, last + 1))
  for (const text of attempts) {
    try {
      const obj = JSON.parse(text) as { reply?: unknown; ops?: unknown }
      if (typeof obj?.reply === 'string') {
        return { reply: obj.reply, ops: Array.isArray(obj.ops) ? obj.ops : [] }
      }
    } catch {
      /* 尝试下一种 */
    }
  }
  return { reply: raw.slice(0, 1200), ops: [] }
}

/** 服务端白名单校验：非法 op 丢弃，附注说明 */
function sanitizeOps(rawOps: unknown[]): { ops: AgentOp[]; dropped: number } {
  const ops: AgentOp[] = []
  let dropped = 0
  for (const raw of rawOps.slice(0, MAX_OPS)) {
    const o = raw as Record<string, unknown>
    if (!o || typeof o.op !== 'string' || !VALID_OPS.has(o.op)) {
      dropped++
      continue
    }
    switch (o.op) {
      case 'add_node': {
        if (
          typeof o.ref !== 'string' ||
          typeof o.kind !== 'string' ||
          !VALID_KINDS.has(o.kind) ||
          (o.preset != null && !VALID_PRESETS.has(String(o.preset)))
        ) {
          dropped++
          continue
        }
        ops.push({
          op: 'add_node',
          ref: o.ref.slice(0, 24),
          kind: o.kind as 'text' | 'image',
          ...(o.preset ? { preset: String(o.preset) } : {}),
          ...(typeof o.title === 'string' ? { title: o.title.slice(0, 60) } : {}),
          ...(typeof o.prompt === 'string' ? { prompt: o.prompt.slice(0, 2000) } : {}),
          ...(o.position &&
          typeof (o.position as { x?: unknown }).x === 'number' &&
          typeof (o.position as { y?: unknown }).y === 'number'
            ? { position: o.position as { x: number; y: number } }
            : {}),
        })
        break
      }
      case 'set_prompt':
        if (typeof o.id !== 'string' || typeof o.prompt !== 'string') { dropped++; continue }
        ops.push({ op: 'set_prompt', id: o.id, prompt: o.prompt.slice(0, 2000) })
        break
      case 'set_params':
        if (typeof o.id !== 'string' || !o.params || typeof o.params !== 'object') { dropped++; continue }
        ops.push({ op: 'set_params', id: o.id, params: o.params as Record<string, unknown> })
        break
      case 'rename':
        if (typeof o.id !== 'string' || typeof o.title !== 'string') { dropped++; continue }
        ops.push({ op: 'rename', id: o.id, title: o.title.slice(0, 60) })
        break
      case 'connect':
        if (typeof o.source !== 'string' || typeof o.target !== 'string') { dropped++; continue }
        ops.push({ op: 'connect', source: o.source, target: o.target })
        break
      case 'delete_node':
        if (typeof o.id !== 'string') { dropped++; continue }
        ops.push({ op: 'delete_node', id: o.id })
        break
      case 'run':
        if (!Array.isArray(o.ids) || !o.ids.every((x) => typeof x === 'string')) { dropped++; continue }
        ops.push({ op: 'run', ids: o.ids.slice(0, MAX_OPS) as string[] })
        break
    }
  }
  return { ops, dropped }
}

export default function agentChat(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const history = (body.messages ?? []).slice(-12)
    if (!history.length || history[history.length - 1].role !== 'user') {
      return jsonError('messages 不能为空且最后一条须为 user')
    }
    if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)

    // 画布快照摘要（prompt 截断，不含图片数据）
    const nodes = (body.canvas?.nodes ?? []).slice(0, 60).map((n) => ({
      ...n,
      prompt: (n.prompt ?? '').slice(0, 120),
      title: (n.title ?? '').slice(0, 40),
    }))
    const edges = (body.canvas?.edges ?? []).slice(0, 120)
    const selection = (body.selection ?? []).slice(0, 10)

    const contextMsg =
      `当前画布快照：\n节点：${JSON.stringify(nodes)}\n连线：${JSON.stringify(edges)}\n` +
      `选中节点：${JSON.stringify(selection)}`

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: contextMsg },
      { role: 'assistant', content: '{"reply":"已了解当前画布状态。","ops":[]}' },
      ...history.map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) })),
    ]

    const raw = await callMinimaxChat(messages, env.MINIMAX_API_KEY, {
      temperature: 0.3,
      maxTokens: 3000,
    })
    const parsed = parseAgentJson(raw)
    const { ops, dropped } = sanitizeOps(parsed.ops)
    const reply =
      dropped > 0 ? `${parsed.reply}\n（有 ${dropped} 个无效操作已被忽略）` : parsed.reply

    return jsonOk({ reply, ops })
  })
}
