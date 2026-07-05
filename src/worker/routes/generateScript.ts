import { callMinimaxText } from '../minimax'
import { callArkText, isArkModel } from '../ark'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { buildScriptSystemPrompt, type ScriptLength, type ScriptPreset, type ScriptTone } from '../prompts'

type Body = {
  brief?: string
  tone?: ScriptTone
  length?: ScriptLength
  /** 文本预设：script=剧本（默认）/ ad-copy=广告词 / free=自由文本 / image-prompt=镜头描述→生图提示词 */
  preset?: ScriptPreset
  /** 文本模型：缺省 MiniMax；doubao-seed-* 走方舟（ARK_API_KEY） */
  model?: string
}

export default function generateScript(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const brief = body.brief?.trim()
    if (!brief) return jsonError('brief 不能为空')

    const tone = body.tone ?? 'cinematic'
    const length = body.length ?? 'short'
    const preset = body.preset ?? 'script'
    const system = buildScriptSystemPrompt(preset, tone, length)

    if (isArkModel(body.model)) {
      const script = await callArkText(body.model!, system, brief, env.ARK_API_KEY ?? '')
      return jsonOk({ script })
    }
    if (!env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)
    // MiniMax- 前缀模型（如 MiniMax-M3）透传，其余落默认 M2.7
    const script = await callMinimaxText(system, brief, env.MINIMAX_API_KEY, {
      model: body.model,
    })
    return jsonOk({ script })
  }, '/api/generate/script')
}
