import { callMinimaxText } from '../minimax'
import { callArkText, isArkModel } from '../ark'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { STORYBOARD_SYSTEM_PROMPT } from '../prompts'

type Body = {
  screenplay?: string
  splitter?: string
  /** 文本模型：缺省 MiniMax；doubao-seed-* 走方舟（ARK_API_KEY） */
  model?: string
}

type ShotItem = { id: string; title: string; description: string }

function manualSplit(text: string, splitter: string): ShotItem[] {
  return text
    .split(splitter)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((chunk, i) => {
      const firstLine = chunk.split('\n', 1)[0].slice(0, 40) || `分镜 ${i + 1}`
      return {
        id: `shot-${String(i + 1).padStart(2, '0')}`,
        title: firstLine,
        description: chunk,
      }
    })
}

function parseModelJson(raw: string): ShotItem[] {
  // M2.7 推理模型：剥 <think> 段与 markdown 围栏后再找数组
  const trimmed = raw
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
  const start = trimmed.indexOf('[')
  if (start < 0) throw new Error('模型未返回 JSON 数组，请重试')

  const attempts: string[] = []
  const end = trimmed.lastIndexOf(']')
  if (end > start) attempts.push(trimmed.slice(start, end + 1))
  // 输出触顶被截断时抢救：截到最后一个完整对象，手工补闭合
  const lastObj = trimmed.lastIndexOf('}')
  if (lastObj > start) attempts.push(`${trimmed.slice(start, lastObj + 1)}]`)

  for (const text of attempts) {
    try {
      const parsed = JSON.parse(text) as Array<Partial<ShotItem>>
      if (!Array.isArray(parsed) || !parsed.length) continue
      return parsed.map((x, i) => ({
        id: x.id?.toString().trim() || `shot-${String(i + 1).padStart(2, '0')}`,
        title: x.title?.toString().trim() || `分镜 ${i + 1}`,
        description: x.description?.toString().trim() || '',
      }))
    } catch {
      /* 尝试下一种切法 */
    }
  }
  throw new Error('分镜 JSON 解析失败，请重试')
}

export default function generateStoryboard(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const screenplay = body.screenplay?.trim()
    if (!screenplay) return jsonError('screenplay 不能为空')

    const splitter = body.splitter?.trim()
    if (splitter) {
      const shots = manualSplit(screenplay, splitter)
      if (!shots.length) return jsonError('按分隔符拆分后没有内容，请检查 splitter')
      return jsonOk({ shots })
    }

    // 长剧本拆 8-10 镜的 JSON 体量大，给足输出预算防截断
    let raw: string
    if (isArkModel(body.model)) {
      raw = await callArkText(body.model!, STORYBOARD_SYSTEM_PROMPT, screenplay, env.ARK_API_KEY ?? '', {
        maxTokens: 8192,
      })
    } else {
      if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)
      // MiniMax- 前缀模型（如 MiniMax-M3）透传，其余落默认 M2.7
      raw = await callMinimaxText(STORYBOARD_SYSTEM_PROMPT, screenplay, env.MINIMAX_API_KEY, {
        maxTokens: 8192,
        model: body.model,
      })
    }
    const shots = parseModelJson(raw)
    return jsonOk({ shots })
  }, '/api/generate/storyboard')
}
