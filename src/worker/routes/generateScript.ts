import { callMinimaxText } from '../minimax'
import { callArkText, isArkModel } from '../ark'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

type Body = {
  brief?: string
  tone?: 'cinematic' | 'commercial' | 'drama' | 'documentary'
  length?: 'short' | 'medium' | 'long'
  /** 文本预设：script=剧本（默认）/ ad-copy=广告词 / free=自由文本 / image-prompt=镜头描述→生图提示词 */
  preset?: 'script' | 'ad-copy' | 'free' | 'image-prompt'
  /** 文本模型：缺省 MiniMax；doubao-seed-* 走方舟（ARK_API_KEY） */
  model?: string
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

function buildSystemPrompt(
  preset: NonNullable<Body['preset']>,
  tone: NonNullable<Body['tone']>,
  length: NonNullable<Body['length']>,
) {
  const toneDesc = TONE_LABEL[tone]
  if (preset === 'ad-copy') {
    return [
      '你是一位资深广告文案。请基于用户提供的产品/卖点信息，产出可直接投放的广告词与品牌文案。',
      `风格：${toneDesc}。`,
      '输出结构：1) 主标语（≤15字，1-3 条备选）2) 副文案（一段）3) 社媒短文案（1-2 条，带话题标签）。',
      '只输出文案本身，不要寒暄、不要解释、不要 markdown 标题。',
    ].join('\n')
  }
  if (preset === 'free') {
    return [
      '你是一位专业中文写作助手。请按用户要求直接产出文字内容。',
      `篇幅：${length === 'short' ? '简短' : length === 'long' ? '详尽' : '适中'}。`,
      '只输出正文，不要寒暄、不要解释、不要 markdown 标题。',
    ].join('\n')
  }
  if (preset === 'image-prompt') {
    // 分镜两段式第一段：镜头描述 → 可确认/编辑的生图提示词
    return [
      '你是一位文生图提示词专家。请把用户给出的分镜镜头描述改写为一条高质量的中文生图提示词。',
      `画面风格基调：${toneDesc}。`,
      '要求：明确主体与动作、环境与时间、光线氛围、景别与构图、材质细节与整体风格；',
      '写成一段 60~120 字的连续描述，信息密度高、可直接喂给文生图模型。',
      '只输出提示词本身：不要编号、不要引号、不要解释、不要 markdown。',
    ].join('\n')
  }
  const scenes = LENGTH_SCENES[length]
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

    const tone = body.tone ?? 'cinematic'
    const length = body.length ?? 'short'
    const preset = body.preset ?? 'script'
    const system = buildSystemPrompt(preset, tone, length)

    if (isArkModel(body.model)) {
      const script = await callArkText(body.model!, system, brief, env.ARK_API_KEY ?? '')
      return jsonOk({ script })
    }
    if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)
    const script = await callMinimaxText(system, brief, env.MINIMAX_API_KEY)
    return jsonOk({ script })
  })
}
