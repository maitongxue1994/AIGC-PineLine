import { fetchWithTimeout, pushGenLog, upstreamRequestId } from './utils'

const MINIMAX_ENDPOINT = 'https://api.minimaxi.com/v1/text/chatcompletion_v2'
/** OpenAI 兼容端点：M3 图片理解文档挂在此端点（chatcompletion_v2 未确认支持 M3 传图） */
const MINIMAX_OPENAI_ENDPOINT = 'https://api.minimaxi.com/v1/chat/completions'
const MODEL = 'MiniMax-M2.7'
/** 当前唯一带视觉的 M 系模型 */
const VISION_MODEL = 'MiniMax-M3'

export type ChatContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

export type ToolCall = {
  id: string
  type: 'function'
  function: { name: string; arguments: string }
}

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | ChatContentPart[]
  /** function calling：assistant 消息的工具调用 */
  tool_calls?: ToolCall[]
  /** role=tool 时的回执 id */
  tool_call_id?: string
  /** 推理过程——官方要求带 thinking 的响应原样保留在历史（Interleaved Thinking） */
  reasoning_content?: string
}

export type ChatResult = {
  content: string
  reasoning?: string
  toolCalls?: ToolCall[]
  /** 原样可回填历史的 assistant 消息（工具循环用） */
  message: ChatMessage
}

type MiniMaxResponse = {
  choices?: Array<{
    message?: { content?: string; reasoning_content?: string; tool_calls?: ToolCall[] }
  }>
  base_resp?: { status_code?: number; status_msg?: string }
  error?: { message?: string }
}

/** 日志预览：多模态 content 取首个 text part */
function msgPreview(messages: ChatMessage[]): string {
  const c = messages[messages.length - 1]?.content
  if (typeof c === 'string') return c.slice(0, 80)
  return (c?.find((p) => p.type === 'text') as { text?: string } | undefined)?.text?.slice(0, 80) ?? '[多模态消息]'
}

/** 多轮对话通道（Agent 编排等）；callMinimaxText 是其 system+user 两条消息的薄封装 */
export async function callMinimaxChat(
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; model?: string } = {},
): Promise<string> {
  return (await callMinimaxChatFull(messages, apiKey, opts)).content
}

async function doMinimaxChat(
  endpoint: string,
  model: string,
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; tools?: unknown[] } = {},
): Promise<ChatResult> {
  const started = Date.now()
  const res = await fetchWithTimeout(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: opts.temperature ?? 0.7,
        // M2.7 推理模型：思考 token 也占预算，2048 会把长剧本/分镜 JSON 砍尾
        max_tokens: opts.maxTokens ?? 4096,
        // chatcompletion_v2 与 OpenAI 兼容端点均只支持 function 类工具（官方确认，无内置搜索）
        ...(opts.tools?.length ? { tools: opts.tools, tool_choice: 'auto' } : {}),
      }),
    },
    // M2.7 为推理模型：电影级长剧本（思考+生成）实测可超 60s，给足 150s
    150_000,
  )

  const requestId = upstreamRequestId(res)
  const fail: (message: string) => never = (message) => {
    pushGenLog({
      ts: started,
      path: 'upstream:minimax-text',
      ok: false,
      status: res.status,
      ms: Date.now() - started,
      error: message.slice(0, 300),
      ...(requestId ? { requestId } : {}),
      model,
      note: msgPreview(messages),
    })
    throw new Error(message)
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    fail(`MiniMax HTTP ${res.status}: ${text.slice(0, 300)}`)
  }

  const json = (await res.json()) as MiniMaxResponse
  if (json.base_resp && json.base_resp.status_code && json.base_resp.status_code !== 0) {
    fail(`MiniMax ${json.base_resp.status_code}: ${json.base_resp.status_msg ?? ''}`)
  }

  const message = json.choices?.[0]?.message
  // 工具调用轮 content 可为空
  if (!message || (!message.content && !message.tool_calls?.length)) fail('MiniMax 未返回内容')
  return {
    content: message.content ?? '',
    ...(message.reasoning_content ? { reasoning: message.reasoning_content } : {}),
    ...(message.tool_calls?.length ? { toolCalls: message.tool_calls } : {}),
    message: {
      role: 'assistant',
      content: message.content ?? '',
      ...(message.reasoning_content ? { reasoning_content: message.reasoning_content } : {}),
      ...(message.tool_calls?.length ? { tool_calls: message.tool_calls } : {}),
    },
  }
}

/** 同 callMinimaxChat，额外带出推理模型的思考过程与工具调用。
 * opts.model 可指定官方模型名（如 'MiniMax-M3'），缺省 M2.7。 */
export function callMinimaxChatFull(
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; model?: string; tools?: unknown[] } = {},
): Promise<ChatResult> {
  const model = opts.model && opts.model.startsWith('MiniMax-') ? opts.model : MODEL
  return doMinimaxChat(MINIMAX_ENDPOINT, model, messages, apiKey, opts)
}

/** OpenAI 兼容端点（多模态）：消息含图片时走此通道，模型固定 M3 系（M2.7 无视觉） */
export function callMinimaxVisionChat(
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; model?: string; tools?: unknown[] } = {},
): Promise<ChatResult> {
  const model = opts.model && opts.model.startsWith('MiniMax-') ? opts.model : VISION_MODEL
  return doMinimaxChat(MINIMAX_OPENAI_ENDPOINT, model, messages, apiKey, opts)
}

export function callMinimaxText(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number; model?: string } = {},
): Promise<string> {
  return callMinimaxChat(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    apiKey,
    opts,
  )
}
