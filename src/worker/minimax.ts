import { fetchWithTimeout, pushGenLog, upstreamRequestId } from './utils'

const MINIMAX_ENDPOINT = 'https://api.minimaxi.com/v1/text/chatcompletion_v2'
const MODEL = 'MiniMax-M2.7'

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type MiniMaxResponse = {
  choices?: Array<{ message?: { content?: string; reasoning_content?: string } }>
  base_resp?: { status_code?: number; status_msg?: string }
}

/** 多轮对话通道（Agent 编排等）；callMinimaxText 是其 system+user 两条消息的薄封装 */
export async function callMinimaxChat(
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  return (await callMinimaxChatFull(messages, apiKey, opts)).content
}

/** 同 callMinimaxChat，额外带出 M2.7 推理模型的思考过程（Agent 面板「思考过程」展示） */
export async function callMinimaxChatFull(
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<{ content: string; reasoning?: string }> {
  const started = Date.now()
  const res = await fetchWithTimeout(
    MINIMAX_ENDPOINT,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: opts.temperature ?? 0.7,
        // M2.7 推理模型：思考 token 也占预算，2048 会把长剧本/分镜 JSON 砍尾
        max_tokens: opts.maxTokens ?? 4096,
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
      model: MODEL,
      note: (messages[messages.length - 1]?.content ?? '').slice(0, 80),
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
  const content = message?.content
  if (!content) fail('MiniMax 未返回内容')
  return {
    content,
    ...(message?.reasoning_content ? { reasoning: message.reasoning_content } : {}),
  }
}

export function callMinimaxText(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number } = {},
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
