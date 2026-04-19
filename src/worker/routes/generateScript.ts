import { callMinimaxText } from '../minimax'
import type { Env } from '../index'

type Body = {
  brief?: string
  tone?: 'cinematic' | 'commercial' | 'drama' | 'documentary'
  length?: 'short' | 'medium' | 'long'
}

const TONE_LABEL: Record<NonNullable<Body['tone']>, string> = {
  cinematic: '电影级 · 强调视听语言、运镜、光影氛围',
  commercial: '商业广告 · 高记忆点、产品/情绪强化、节奏紧凑',
  drama: '短剧 · 冲突驱动、人物关系、对白抓人',
  documentary: '纪录片 · 真实质感、观察视角、克制叙事',
}

const LENGTH_PARAGRAPHS: Record<NonNullable<Body['length']>, number> = {
  short: 1,
  medium: 3,
  long: 5,
}

function buildSystemPrompt(tone: NonNullable<Body['tone']>, length: NonNullable<Body['length']>) {
  const paragraphs = LENGTH_PARAGRAPHS[length]
  const toneDesc = TONE_LABEL[tone]
  return [
    '你是一位专业影视编剧，擅长把零散创意扩展为可拍摄的分镜脚本。',
    `请按"${toneDesc}"的风格，把用户简述扩展为 ${paragraphs} 段分镜脚本。`,
    '每段需包含：① 镜号与景别（如 SC01 · 大远景）② 镜头描述与动作 ③ 关键视觉/光影 ④ 情绪/氛围。',
    '只输出脚本正文，不要寒暄、不要解释、不要 markdown 标题。',
  ].join('\n')
}

function jsonError(msg: string, status = 400): Response {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function generateScript(req: Request, env: Env): Promise<Response> {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return jsonError('请求体不是合法 JSON')
  }

  const brief = body.brief?.trim()
  if (!brief) return jsonError('brief 不能为空')

  if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)

  const tone = body.tone ?? 'cinematic'
  const length = body.length ?? 'short'

  try {
    const script = await callMinimaxText(
      buildSystemPrompt(tone, length),
      brief,
      env.MINIMAX_API_KEY,
    )
    return new Response(JSON.stringify({ script }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return jsonError(msg, 502)
  }
}
