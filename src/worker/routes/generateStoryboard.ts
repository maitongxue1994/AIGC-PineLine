import { callMinimaxText } from '../minimax'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'

type Body = {
  screenplay?: string
  splitter?: string
}

type ShotItem = { id: string; title: string; description: string }

const SYSTEM_PROMPT = [
  '你是一位专业的分镜师。请把用户给到的剧本文本拆分成可直接用于生图的分镜序列。',
  '输出严格为 JSON 数组，每项包含 id（短 slug，如 sc01-shot03）、title（一句话镜头标题）、description（一段可直接喂给图像生成模型的详细镜头描述，需涵盖景别、主体、环境、光线、氛围，不超过 80 字）。',
  '不要输出 Markdown、不要输出说明、不要在 JSON 外写任何字符。',
].join('\n')

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
  const trimmed = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '')
  const start = trimmed.indexOf('[')
  const end = trimmed.lastIndexOf(']')
  if (start < 0 || end < 0) throw new Error('模型未返回 JSON 数组')
  const slice = trimmed.slice(start, end + 1)
  const parsed = JSON.parse(slice) as Array<Partial<ShotItem>>
  return parsed.map((x, i) => ({
    id: x.id?.toString().trim() || `shot-${String(i + 1).padStart(2, '0')}`,
    title: x.title?.toString().trim() || `分镜 ${i + 1}`,
    description: x.description?.toString().trim() || '',
  }))
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

    if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)
    const raw = await callMinimaxText(SYSTEM_PROMPT, screenplay, env.MINIMAX_API_KEY)
    const shots = parseModelJson(raw)
    return jsonOk({ shots })
  })
}
