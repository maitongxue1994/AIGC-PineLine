import { fetchWithTimeout } from './utils'

const MINIMAX_ENDPOINT = 'https://api.minimaxi.com/v1/text/chatcompletion_v2'
const MODEL = 'MiniMax-M2.7'

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type MiniMaxResponse = {
  choices?: Array<{ message?: { content?: string } }>
  base_resp?: { status_code?: number; status_msg?: string }
}

/** 多轮对话通道（Agent 编排等）；callMinimaxText 是其 system+user 两条消息的薄封装 */
export async function callMinimaxChat(
  messages: ChatMessage[],
  apiKey: string,
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
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
        max_tokens: opts.maxTokens ?? 2048,
      }),
    },
    // M2.7 为推理模型：电影级长剧本（思考+生成）实测可超 60s，给足 150s
    150_000,
  )

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`MiniMax HTTP ${res.status}: ${text.slice(0, 300)}`)
  }

  const json = (await res.json()) as MiniMaxResponse
  if (json.base_resp && json.base_resp.status_code && json.base_resp.status_code !== 0) {
    throw new Error(`MiniMax ${json.base_resp.status_code}: ${json.base_resp.status_msg ?? ''}`)
  }

  const content = json.choices?.[0]?.message?.content
  if (!content) throw new Error('MiniMax 未返回内容')
  return content
}

export function callMinimaxText(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
): Promise<string> {
  return callMinimaxChat(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    apiKey,
  )
}
