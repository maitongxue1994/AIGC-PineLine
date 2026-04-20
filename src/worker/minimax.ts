const MINIMAX_ENDPOINT = 'https://api.minimax.io/v1/text/chatcompletion_v2'
const MODEL = 'MiniMax-M2.7'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type MiniMaxResponse = {
  choices?: Array<{ message?: { content?: string } }>
  base_resp?: { status_code?: number; status_msg?: string }
}

export async function callMinimaxText(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]

  const res = await fetch(MINIMAX_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

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
