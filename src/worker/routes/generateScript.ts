import { callMinimaxText } from '../minimax'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

type Body = {
  brief?: string
  tone?: 'cinematic' | 'commercial' | 'drama' | 'documentary'
  length?: 'short' | 'medium' | 'long'
}

const TONE_LABEL: Record<NonNullable<Body['tone']>, string> = {
  cinematic: '电影级 · 注重人物内心、氛围、视听化动作描写',
  commercial: '商业广告 · 高记忆点、情绪钩子、节奏紧凑',
  drama: '短剧 · 冲突驱动、人物关系、对白抓人',
  documentary: '纪录片 · 真实质感、观察视角、克制叙事',
}

const LENGTH_SCENES: Record<NonNullable<Body['length']>, number> = {
  short: 1,
  medium: 3,
  long: 5,
}

function buildSystemPrompt(tone: NonNullable<Body['tone']>, length: NonNullable<Body['length']>) {
  const scenes = LENGTH_SCENES[length]
  const toneDesc = TONE_LABEL[tone]
  return [
    '你是一位专业影视编剧。请把用户的创意简述改写为完整的剧本（screenplay），交给后续分镜师进一步拆分。',
    `风格：${toneDesc}。请写 ${scenes} 个场次。`,
    '使用通用剧本格式，每个场次包含：',
    '1) 场号 + 内/外景（INT./EXT.）+ 地点 + 日/夜',
    '2) 场景动作描写（人物动作、环境氛围，用叙事化散文，不要写镜号/景别/运镜）',
    '3) 角色对白（角色名用大写，对白另起一行）',
    '不要写分镜表、镜号、景别、运镜指令；那是分镜师的工作。',
    '只输出剧本正文，不要寒暄、不要解释、不要 markdown 标题。',
  ].join('\n')
}

export default function generateScript(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const brief = body.brief?.trim()
    if (!brief) return jsonError('brief 不能为空')
    if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)

    const tone = body.tone ?? 'cinematic'
    const length = body.length ?? 'short'
    const script = await callMinimaxText(
      buildSystemPrompt(tone, length),
      brief,
      env.MINIMAX_API_KEY,
    )
    return jsonOk({ script })
  })
}
