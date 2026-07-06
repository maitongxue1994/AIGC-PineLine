import { fetchWithTimeout, pushGenLog } from './utils'

/**
 * Tavily 搜索（MiniMax 联网通道）：MiniMax chatcompletion_v2 无内置搜索（官方确认，
 * tools 仅 function），由模型 function calling 调用本函数实现联网。
 * 需 Worker secret TAVILY_API_KEY（tavily.com 注册，有免费额度）。
 */

const TAVILY_ENDPOINT = 'https://api.tavily.com/search'

export type TavilyResult = { title: string; url: string; content: string }

/** 声明给 MiniMax 的 web_search 工具（OpenAI function 格式） */
export const WEB_SEARCH_TOOL = {
  type: 'function',
  function: {
    name: 'web_search',
    description:
      '联网搜索最新公开信息。当用户问题涉及时效性内容（新闻/价格/产品版本/文档）或你不确定的事实时调用。',
    parameters: {
      type: 'object',
      properties: { query: { type: 'string', description: '搜索关键词（简洁、具体）' } },
      required: ['query'],
    },
  },
} as const

export async function tavilySearch(
  query: string,
  apiKey: string,
): Promise<{ answer?: string; results: TavilyResult[] }> {
  const started = Date.now()
  const res = await fetchWithTimeout(
    TAVILY_ENDPOINT,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        query,
        max_results: 5,
        include_answer: true,
        search_depth: 'basic',
      }),
    },
    20_000,
  )
  const json = (await res.json().catch(() => null)) as {
    answer?: string
    results?: Array<{ title?: string; url?: string; content?: string }>
    detail?: { error?: string }
  } | null
  if (!res.ok || !Array.isArray(json?.results)) {
    const msg = `Tavily 搜索失败（HTTP ${res.status}）：${json?.detail?.error ?? '未知错误'}`
    pushGenLog({
      ts: started,
      path: 'upstream:tavily',
      ok: false,
      status: res.status,
      ms: Date.now() - started,
      error: msg.slice(0, 300),
      note: query.slice(0, 80),
    })
    throw new Error(msg)
  }
  pushGenLog({
    ts: started,
    path: 'upstream:tavily',
    ok: true,
    status: res.status,
    ms: Date.now() - started,
    note: query.slice(0, 80),
  })
  return {
    ...(json.answer ? { answer: json.answer } : {}),
    results: json.results.slice(0, 5).map((r) => ({
      title: (r.title ?? '').slice(0, 120),
      url: r.url ?? '',
      content: (r.content ?? '').slice(0, 500),
    })),
  }
}
