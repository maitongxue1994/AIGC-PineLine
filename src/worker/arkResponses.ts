import { arkBase, type ArkChatMessage } from './ark'
import { fetchWithTimeout, pushGenLog, upstreamRequestId } from './utils'

/**
 * 方舟 Responses API + 内置 web_search 插件（豆包联网通道）。
 * 官方确认：chat completions 无内置联网，web_search 只挂在 Responses API 上
 * （需控制台开通「联网内容插件」，每月 2 万次免费额度）。
 * 模型不支持 / 插件未开通等失败 → 返回 null，调用方回落普通 chat 通道。
 */

export type SearchCitation = { title: string; url: string }

type ResponsesOutput = Array<{
  type?: string
  content?: Array<{
    type?: string
    text?: string
    annotations?: Array<{ url?: string; title?: string }>
  }>
  summary?: Array<{ text?: string }>
}>

export async function callArkResponsesSearch(
  model: string,
  messages: ArkChatMessage[],
  apiKey: string,
  opts: { maxTokens?: number; baseUrl?: string } = {},
): Promise<{ content: string; reasoning?: string; citations: SearchCitation[] } | null> {
  // chat messages → Responses input（assistant 用 output_text，图片转 input_image）
  const input = messages.map((m) => ({
    role: m.role,
    content:
      typeof m.content === 'string'
        ? [{ type: m.role === 'assistant' ? 'output_text' : 'input_text', text: m.content }]
        : m.content.map((p) =>
            p.type === 'text'
              ? { type: m.role === 'assistant' ? 'output_text' : 'input_text', text: p.text }
              : { type: 'input_image', image_url: p.image_url.url },
          ),
  }))

  const started = Date.now()
  let res: Response
  try {
    res = await fetchWithTimeout(
      `${arkBase(opts.baseUrl)}/api/v3/responses`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          stream: false,
          input,
          tools: [{ type: 'web_search', limit: 5 }],
          max_tool_calls: 3,
          ...(opts.maxTokens ? { max_output_tokens: opts.maxTokens } : {}),
        }),
      },
      150_000,
    )
  } catch (err) {
    pushGenLog({
      ts: started,
      path: 'upstream:ark-responses',
      ok: false,
      status: 0,
      ms: Date.now() - started,
      error: `方舟 Responses 请求异常：${err instanceof Error ? err.message : String(err)}`.slice(0, 300),
      model,
    })
    return null
  }

  const requestId = upstreamRequestId(res)
  const json = (await res.json().catch(() => null)) as {
    output?: ResponsesOutput
    error?: { message?: string }
  } | null

  if (!res.ok || !Array.isArray(json?.output)) {
    // 4xx 常见于：模型不支持 Responses / 插件未开通——留痕后交给调用方降级
    pushGenLog({
      ts: started,
      path: 'upstream:ark-responses',
      ok: false,
      status: res.status,
      ms: Date.now() - started,
      error: `方舟 Responses HTTP ${res.status}: ${json?.error?.message ?? ''}`.slice(0, 300),
      ...(requestId ? { requestId } : {}),
      model,
    })
    return null
  }

  const texts: string[] = []
  const citations: SearchCitation[] = []
  let reasoning: string | undefined
  for (const item of json.output) {
    if (item.type === 'message' && Array.isArray(item.content)) {
      for (const part of item.content) {
        if (part.type === 'output_text' && part.text) {
          texts.push(part.text)
          for (const a of part.annotations ?? []) {
            if (a.url && citations.length < 8 && !citations.some((c) => c.url === a.url)) {
              citations.push({ title: (a.title ?? a.url).slice(0, 120), url: a.url })
            }
          }
        }
      }
    } else if (item.type === 'reasoning' && !reasoning) {
      reasoning = item.summary?.map((s) => s.text).filter(Boolean).join('\n') || undefined
    }
  }
  if (!texts.length) return null
  pushGenLog({
    ts: started,
    path: 'upstream:ark-responses',
    ok: true,
    status: res.status,
    ms: Date.now() - started,
    ...(requestId ? { requestId } : {}),
    model,
    note: `web_search citations=${citations.length}`,
  })
  return {
    content: texts.join('\n'),
    ...(reasoning ? { reasoning } : {}),
    citations,
  }
}
