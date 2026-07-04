import { callMinimaxChatFull, type ChatMessage } from '../minimax'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { sanitizeOps } from '../agentOps'

/**
 * Agent 编排端点：多轮对话 → 回复文本 + 画布操作列表（JSON patch）+ 思考过程。
 * 前端把操作渲染成预览卡（手动确认）或直接执行（自动模式）。
 */

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

const SYSTEM_PROMPT = `你是 PineLine 画布助手——一个 AIGC 影视创作管线工作台的编排 Agent。用户用自然语言描述创作需求，你帮他们在节点画布上搭建/修改/运行生成管线。

## 画布模型
- 节点 kind：text（文本生成）/ image（图片生成）/ video（视频生成，无 preset）。
- text 预设 preset：script(剧本) / storyboard(分镜，自动把上游剧本拆成镜头) / ad-copy(广告词) / free(自由文本)。
- image 预设 preset：single(单图) / shot(分镜图，读上游分镜的第 shotIndex 个镜头描述生图) / scene-grid(场景四宫格) / char-triview(角色三视图) / prop-triview(道具三视图)。
- video 节点：连线上游图片自动作首帧参考；params 可设 videoDuration(4-15 秒)、videoResolution(480p/720p/1080p)、videoRatio(16:9 等)。
- 连线 = 上游产出自动作为下游输入（文本喂文本、图作参考图、图作视频首帧）。节点 prompt 留空时自动用上游文本。

## 完整典型管线（用户要「完整管线/短片管线」时按此搭建）
剧本(script) → 分镜(storyboard) → N 个分镜图(image/shot) → N 个视频(video)：
- 每个分镜图节点必须用 params.shotIndex 绑定镜头下标（0 开始）：第 1 个分镜图 {"shotIndex":0}，第 2 个 {"shotIndex":1}……未指定镜头数时默认建 3 个分镜图。
- 每个分镜图节点各连一个 video 节点（分镜图 → 视频），形成完整生成链。
- 全部建好后用一条 run 按依赖顺序运行整条链。

## 可用操作（ops）
- {"op":"add_node","ref":"n1","kind":"text","preset":"script","title":"剧本","prompt":"…","position":{"x":80,"y":80}}
- {"op":"add_node","ref":"n3","kind":"image","preset":"shot","title":"分镜图 1","params":{"shotIndex":0},"position":{"x":1040,"y":80}}
- {"op":"add_node","ref":"n6","kind":"video","title":"镜头视频 1","params":{"videoDuration":5},"position":{"x":1520,"y":80}}
- {"op":"set_prompt","id":"<已有节点id或本轮ref>","prompt":"…"}
- {"op":"set_params","id":"…","params":{"aspectRatio":"16:9","quality":"1K","batch":1,"tone":"cinematic","length":"short","shotIndex":0,"videoDuration":5,"videoResolution":"720p"}}
- {"op":"rename","id":"…","title":"…"}
- {"op":"connect","source":"…","target":"…"}
- {"op":"delete_node","id":"…"}
- {"op":"run","ids":["…"]}（按依赖顺序运行这些节点）
- {"op":"clear_canvas"}（清空画布；前端执行前会向用户二次确认）

## 规则
1. 只输出一个 JSON 对象：{"reply":"给用户的中文回复","ops":[…]}。不要 markdown 代码围栏，不要任何解释文字。
2. 新建节点用 ref（n1、n2…）作临时引用，后续 connect/run 可用 ref 或已有节点 id。
3. 布局：链式从左到右，x 依次 +480，同列 y 相同；并行分支（如多个分镜图各自的行）y 依次 +420。新链放在已有节点下方（用画布快照里的最大 y + 400）。
4. 用户让你修改「这个/选中的节点」时用 selection 里的 id。
5. 需求不明确时 ops 留空 []，在 reply 里追问。
6. 不确定的事不要编造；删除节点等破坏性操作要保守，用户明确要求才做。
7. 用户要求「新建/重新生成一条管线」且画布快照非空时，ops 第一条必须是 {"op":"clear_canvas"}（避免新旧节点叠在一起），并在 reply 里说明会先清空画布；用户只是追加节点/修改现有管线时不要 clear_canvas。
8. reply 简洁（1-3 句），说明你做了什么或要问什么。`

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

    const { content: raw, reasoning } = await callMinimaxChatFull(messages, env.MINIMAX_API_KEY, {
      temperature: 0.3,
      // 完整管线的 ops JSON 更长（剧本+分镜+N分镜图+N视频），3000 会截断
      maxTokens: 4096,
    })
    const parsed = parseAgentJson(raw)
    const { ops, dropped } = sanitizeOps(parsed.ops)
    const reply =
      dropped > 0 ? `${parsed.reply}\n（有 ${dropped} 个无效操作已被忽略）` : parsed.reply

    return jsonOk({
      reply,
      ops,
      // M2.7 推理模型的思考过程，前端折叠展示
      ...(reasoning ? { thinking: reasoning.slice(0, 4000) } : {}),
    })
  })
}
