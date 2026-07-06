import { callMinimaxChatFull, callMinimaxVisionChat, type ChatMessage, type ChatResult } from '../minimax'
import { callArkChat, type ArkChatMessage } from '../ark'
import { callArkResponsesSearch, type SearchCitation } from '../arkResponses'
import { tavilySearch, WEB_SEARCH_TOOL } from '../tavily'
import type { Env } from '../index'
import { jsonError, jsonOk, readJson, runRoute } from '../utils'
import { sanitizeOps } from '../agentOps'
import { PRODUCT_PROFILE } from '../prompts'

/**
 * Agent 编排端点：多轮对话 → 回复文本 + 画布操作列表（JSON patch）+ 思考过程。
 * 前端把操作渲染成预览卡（手动确认）或直接执行（自动模式）。
 * 附图消息走多模态通道：MiniMax 切 OpenAI 兼容端点 + M3（M2.7 无视觉），豆包原生 parts。
 */

type Body = {
  messages?: { role: 'user' | 'assistant'; content: string; images?: string[] }[]
  /** 聊天模型（前端 TEXT_MODELS 的 id）：缺省/minimax-m2.7 走 MiniMax，doubao-* 走方舟 */
  model?: string
  /** 联网搜索开关 */
  webSearch?: boolean
  /** 用户长期记忆条目（前端 IndexedDB memory 库） */
  memory?: string[]
  canvas?: {
    nodes?: {
      id: string
      kind: string
      preset: string | null
      title: string
      prompt: string
      status: string
      hasImage: boolean
      versionCount: number
      /** 节点参数摘要（模型/shotIndex/比例/时长等，前端已挑非空键） */
      params?: Record<string, unknown>
    }[]
    edges?: { source: string; target: string }[]
  }
  selection?: string[]
}

/**
 * 前端模型 id → 方舟真实模型 id（对齐 src/studio/nodeCatalog.ts TEXT_MODELS 的 apiModel；
 * Worker 不 import 前端文件，映射以字面量维护）。未命中一律回落 MiniMax 通道。
 */
const ARK_CHAT_MODELS: Record<string, string> = {
  'doubao-seed-2.0-pro': 'doubao-seed-2-0-pro-260215',
  'doubao-seed-2.0-lite': 'doubao-seed-2-0-lite-260428',
  'doubao-seed-evolving': 'doubao-seed-evolving',
}

/** MiniMax 通道的非默认模型（缺省走 M2.7） */
const MINIMAX_CHAT_MODELS: Record<string, string> = {
  'minimax-m3': 'MiniMax-M3',
}

const SYSTEM_PROMPT = `你是 PineLine 画布助手——一个 AIGC 影视创作管线工作台的编排 Agent。用户用自然语言描述创作需求，你帮他们在节点画布上搭建/修改/运行生成管线。

## 画布模型
- 节点 kind：text（文本生成）/ image（图片生成）/ video（视频生成，无 preset）。
- text 预设 preset：script(剧本) / storyboard(分镜，自动把上游剧本拆成镜头) / ad-copy(广告词) / free(自由文本)。
- image 预设 preset：single(单图) / shot(分镜图，读上游分镜的第 shotIndex 个镜头描述生图) / scene-grid(场景四宫格) / char-triview(角色三视图) / prop-triview(道具三视图)。
- video 节点：连线上游图片自动作首帧参考；params 可设 videoDuration(4-15 秒)、videoResolution(480p/720p/1080p)、videoRatio(16:9 等)。
- 连线 = 上游产出自动作为下游输入（文本喂文本、图作参考图、图作视频首帧）。节点 prompt 留空时自动用上游文本。

## 完整典型管线（用户要「完整管线/短片管线」时按此搭建）
剧本(script) → 分镜(storyboard) → N 个分镜图(image/shot) → N 个视频(video)。
- **派生 op 会自动等上游产出**：derive_shot_images 内部先跑剧本+分镜再派生，故能「一句话自动执行到分镜图/成片」，不用用户手动点、也不用为分镜单独排 run。
- **用户说「自动执行/自动生成到所有分镜图」（如从零搭建，先不生成视频）时**，就出这几条：
  {"op":"add_node","ref":"n1","kind":"text","preset":"script","prompt":"<剧本创意/主题>"}
  {"op":"add_node","ref":"n2","kind":"text","preset":"storyboard"}
  {"op":"connect","source":"n1","target":"n2"}
  {"op":"derive_shot_images","id":"n2","generate":true}   ← 一条搞定：等剧本+分镜跑完→派生全部分镜图→自动批量生图；**不要再单独排 run**。
  （generate:true = 直接出图；不加 = 只派生+填提示词，等用户确认。）
- **用户要「一直做到成片/生成视频」时**，再加一条：{"op":"derive_shot_videos","id":"n2","run":true}（等分镜图出图后派生镜头视频并整批生成）。
- 分镜已生成（快照有 shots）时可直接 {"op":"derive_shot_images","id":"<分镜id>","generate":true}。
- 含人物时给分镜图/角色三视图设 imageModel:"seedream-5.0"（Seedance 2.0 不接受疑似真人人脸的 Nano Banana 图）。
- 手工建分镜图时每个节点必须用 params.shotIndex 绑定镜头下标（0 开始）。

## 可用操作（ops）
- {"op":"add_node","ref":"n1","kind":"text","preset":"script","title":"剧本","prompt":"…","position":{"x":80,"y":80}}
- {"op":"add_node","ref":"n3","kind":"image","preset":"shot","title":"分镜图 1","params":{"shotIndex":0},"position":{"x":1040,"y":80}}
- {"op":"add_node","ref":"n6","kind":"video","title":"镜头视频 1","params":{"videoDuration":5},"position":{"x":1520,"y":80}}
- {"op":"set_prompt","id":"<已有节点id或本轮ref>","prompt":"…"}
- {"op":"set_params","id":"…","params":{…}}：修改节点参数（对已有节点 id 或本轮 ref 均可）。可用键：
  - 文本节点：tone(cinematic/commercial/drama/documentary)、length(short/medium/long)；分镜节点另有 voiceNarration(旁白音色串：性别+年龄+声音属性+语速+情绪基线)、voiceCast(角色音色表，每行「角色名：音色描述」)——用户提出配音/旁白/音色要求时设置，派生视频时自动注入保证音色一致；**videoStyle(视频视觉风格，挂分镜节点则全片统一)：realistic(真人写实/电影感) / 3d-animation(3D动画) / cg-render(CG国风) / 2d-anime(2D日漫) / cyberpunk(赛博朋克) / ink-wash(水墨国风) / clay(黏土定格)——用户提出风格诉求（如「做成赛博朋克」「二次元动画风」「真人写实」）时，对分镜节点设 videoStyle，派生的每个镜头视频都会注入该风格词，防止风格漂移**；图片节点：aspectRatio("16:9" 等)、quality(1K/2K/4K)、batch(1-4)、shotIndex；视频节点：videoDuration(4-15)、videoResolution(480p/720p/1080p)、videoRatio、videoMode、videoAudio、videoNoSubtitles/videoNoBgm/videoNoSfx(纯净模式：去字幕/去背景音乐/去音效，用户嫌弃乱码字幕或配乐时开)。
  - 模型键（用户要求换模型时用，值必须原样取自枚举）：
    - textModel：minimax-m2.7(MiniMax M2.7，默认) / minimax-m3(MiniMax M3) / doubao-seed-2.0-pro(豆包 Seed 2.0 Pro) / doubao-seed-2.0-lite(豆包 Seed 2.0 Lite) / doubao-seed-evolving(豆包自进化)
    - imageModel：gemini-3.1-flash(Nano Banana 2，默认) / seedream-5.0(Seedream 5.0，含人物/真人时用它)
    - videoModel：seedance-2.0(Seedance 2.0，默认) / seedance-2.0-fast(Seedance 2.0 Fast) / seedance-2.0-mini(Seedance 2.0 Mini) / hailuo-2.3(海螺 2.3) / hailuo-02(海螺-02 首尾帧) / wan-2.7(通义万相 2.7) / kling-v2-6(可灵 2.6) / veo-3.1-fast(VEO 3.1 Fast)
- {"op":"rename","id":"…","title":"…"}
- {"op":"connect","source":"…","target":"…"}
- {"op":"delete_node","id":"…"}
- {"op":"run","ids":["…"]}（按依赖顺序运行这些节点）
- {"op":"clear_canvas"}（清空画布；前端执行前会向用户二次确认）
- {"op":"derive_shot_images","id":"<分镜节点id>","indices":[0,1],"generate":true}（分镜→批量派生分镜图；自动等上游剧本+分镜跑完；generate:true 直接批量生图，省略则只派生等确认；indices 省略 = 全部镜头）
- {"op":"derive_shot_videos","id":"<分镜节点id>","run":false}（分镜图→批量挂镜头视频并预填提示词；run:true 立即生成，涉及积分消耗请先确认用户意图）
- {"op":"add_reference","imageIndex":0,"kind":"char","name":"主讲人"}（把用户本轮上传的第 imageIndex 张图落成命名实体参考节点。imageIndex 从 0 起，对应用户这条消息里图片的顺序；kind：char=角色/scene=场景/prop=道具）
- {"op":"remember","content":"…"}（写入用户长期记忆：仅当用户表达了跨对话仍然有效的稳定信息——品牌/产品背景、风格与比例偏好、旁白音色、称呼习惯等；一次性指令不要记。记忆会出现在后续每轮的「用户长期记忆」里）

## 用户上传参考图（关键）
- 用户上传图片并说明它是某个**角色/场景/道具**（如「这张图作为主讲人」「用这个场景」「参考这个产品」）时，**必须**为每张图出一条 add_reference，把它落地到画布——否则你只是嘴上说「会绑定参考」但画布上什么都没有（用户实测痛点）。
- **name 要用剧本里会用到的称呼**：先想好剧本里这个角色/场景/道具叫什么，add_reference 的 name 与剧本、分镜文本里的称呼保持一致——这样派生分镜图时系统会按名字自动把这张参考图挂到用到它的镜头上（你无需手动 connect 到分镜图）。
- 典型：用户传 1 张军人三视图说「作为主讲人搭科普短片，自动到分镜图」→ 先 {"op":"add_reference","imageIndex":0,"kind":"char","name":"主讲人"}，再 add script（剧本里主讲人就叫「主讲人」）+ add storyboard + connect + {"op":"derive_shot_images","id":"n2","generate":true}。分镜图会自动引用这张主讲人参考图。

## 修改已有节点（含换模型）
- 画布快照的每个节点带 params（当前模型/参数配置，缺省键 = 用默认模型/默认值）。
- 用户要求修改现有节点的模型/参数/提示词时，直接用 set_params/set_prompt 作用于快照里的节点 id，不要新建节点。
- 批量改模型示例——用户说「把所有分镜图的模型换成 Seedream 5.0」，对快照中每个 preset 为 shot 的图片节点各出一条：
  {"op":"set_params","id":"<该节点id>","params":{"imageModel":"seedream-5.0"}}

## 规则
1. 只输出一个 JSON 对象：{"reply":"给用户的中文回复","ops":[…]}。不要 markdown 代码围栏，不要任何解释文字。
2. 新建节点用 ref（n1、n2…）作临时引用，后续 connect/run 可用 ref 或已有节点 id。
3. 布局：链式从左到右，x 依次 +480，同列 y 相同；并行分支（如多个分镜图各自的行）y 依次 +420。新链放在已有节点下方（用画布快照里的最大 y + 400）。
4. 用户让你修改「这个/选中的节点」时用 selection 里的 id。
5. 需求不明确时 ops 留空 []，在 reply 里追问。
6. 不确定的事不要编造；删除节点等破坏性操作要保守，用户明确要求才做。
7. 用户要求「新建/重新生成一条管线」且画布快照非空时，ops 第一条必须是 {"op":"clear_canvas"}（避免新旧节点叠在一起），并在 reply 里说明会先清空画布；用户只是追加节点/修改现有管线时不要 clear_canvas。
8. reply 简洁（1-3 句），说明你做了什么或要问什么。

${PRODUCT_PROFILE}`

function stripFences(s: string): string {
  return s.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
}

/** 容错解析：直接 parse → 提取首个 {...} → 降级为纯回复（保证对话不断流） */
function parseAgentJson(raw: string): { reply: string; ops: unknown[] } {
  const cleaned = stripFences(raw)
  const attempts: string[] = [cleaned]
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first >= 0 && last > first) attempts.push(cleaned.slice(first, last + 1))
  for (const text of attempts) {
    try {
      const obj = JSON.parse(text) as { reply?: unknown; ops?: unknown }
      if (typeof obj?.reply === 'string') {
        return { reply: obj.reply, ops: Array.isArray(obj.ops) ? obj.ops : [] }
      }
    } catch {
      /* 尝试下一种 */
    }
  }
  return { reply: raw.slice(0, 1200), ops: [] }
}

export default function agentChat(req: Request, env: Env): Promise<Response> {
  return runRoute(async () => {
    const body = await readJson<Body>(req)
    const history = (body.messages ?? []).slice(-12)
    if (!history.length || history[history.length - 1].role !== 'user') {
      return jsonError('messages 不能为空且最后一条须为 user')
    }
    const arkModel = body.model ? ARK_CHAT_MODELS[body.model] : undefined
    if (arkModel && !env.ARK_API_KEY) {
      return jsonError(
        '豆包聊天模型未接入：请配置 Worker secret ARK_API_KEY（与 Seedance 同一密钥，详见 docs/视频生成接入指南.md），或切回 MiniMax M2.7',
        501,
      )
    }
    if (!arkModel && !env.MINIMAX_API_KEY) return jsonError('服务端未配置 MINIMAX_API_KEY', 500)

    // 附图校验：仅 data:image/、单条 ≤4 张、总量 ≤8MB（body 上限 10MB 留文本余量）
    let imgCount = 0
    let imgBytes = 0
    for (const m of history) {
      if (!m.images?.length) continue
      if (m.images.length > 4) return jsonError('单条消息最多附 4 张图片')
      for (const u of m.images) {
        if (typeof u !== 'string' || !u.startsWith('data:image/')) {
          return jsonError('图片需为 data:image/ 开头的 dataURL')
        }
        imgBytes += Math.ceil((u.length - (u.indexOf(',') + 1)) * 0.75)
        imgCount++
      }
    }
    if (imgBytes > 8 * 1024 * 1024) return jsonError('图片总量超过 8MB，请减少或压缩后重试')
    const hasImages = imgCount > 0
    if (hasImages && !arkModel && body.model !== 'minimax-m3') {
      return jsonError('MiniMax M2.7 不支持图片理解：请切换 MiniMax M3 或豆包模型', 400)
    }

    const wantSearch = body.webSearch === true
    if (wantSearch && !arkModel && !env.TAVILY_API_KEY) {
      return jsonError(
        '联网搜索未接入：MiniMax 通道需配置 Worker secret TAVILY_API_KEY（tavily.com 免费注册），或切换豆包模型走方舟官方联网插件',
        501,
      )
    }

    // 画布快照摘要（prompt 截断，不含图片数据；params 前端已挑模型/关键参数非空键）
    const nodes = (body.canvas?.nodes ?? []).slice(0, 60).map((n) => ({
      ...n,
      prompt: (n.prompt ?? '').slice(0, 120),
      title: (n.title ?? '').slice(0, 40),
    }))
    const edges = (body.canvas?.edges ?? []).slice(0, 120)
    const selection = (body.selection ?? []).slice(0, 10)

    // 用户长期记忆：条数/单条/总量三重截断后拼进上下文
    const memLines: string[] = []
    let memTotal = 0
    for (const m of (body.memory ?? []).slice(0, 30)) {
      const item = String(m).slice(0, 500)
      if (!item.trim()) continue
      if (memTotal + item.length > 4000) break
      memTotal += item.length
      memLines.push(`- ${item}`)
    }

    // 节点每行一条紧凑 JSON（带 params），LLM 能看到各节点当前模型/参数
    const nodeLines = nodes.length ? nodes.map((n) => JSON.stringify(n)).join('\n') : '（空画布）'
    const contextMsg =
      `当前画布快照：\n节点（每行一个）：\n${nodeLines}\n连线：${JSON.stringify(edges)}\n` +
      `选中节点：${JSON.stringify(selection)}` +
      (memLines.length
        ? `\n\n用户长期记忆（跨对话保留的偏好与设定，创作时主动运用）：\n${memLines.join('\n')}`
        : '')

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: contextMsg },
      { role: 'assistant', content: '{"reply":"已了解当前画布状态。","ops":[]}' },
      ...history.map((m): ChatMessage => {
        const text = String(m.content).slice(0, 4000)
        if (m.images?.length) {
          return {
            role: m.role,
            content: [
              { type: 'text', text },
              ...m.images.map((url) => ({ type: 'image_url' as const, image_url: { url } })),
            ],
          }
        }
        return { role: m.role, content: text }
      }),
    ]

    // 完整管线的 ops JSON 更长（剧本+分镜+N分镜图+N视频），3000 会截断
    const chatOpts = { temperature: 0.3, maxTokens: 4096 }
    let raw = ''
    let reasoning: string | undefined
    let citations: SearchCitation[] | undefined
    let searchNote: string | undefined

    if (arkModel) {
      // 豆包通道：联网走 Responses API 内置 web_search（chat completions 无内置联网），
      // 失败（插件未开通/模型不支持）降级普通 chat 并附说明。
      // ark 通道不含 tool 角色消息，形状与 ArkChatMessage 兼容
      const arkMessages = messages as unknown as ArkChatMessage[]
      let answered = false
      if (wantSearch) {
        const sr = await callArkResponsesSearch(arkModel, arkMessages, env.ARK_API_KEY!, {
          maxTokens: chatOpts.maxTokens,
        })
        if (sr) {
          raw = sr.content
          reasoning = sr.reasoning
          if (sr.citations.length) citations = sr.citations.slice(0, 5)
          answered = true
        } else {
          searchNote = '方舟联网搜索暂不可用（插件未开通或模型不支持 Responses API），本次回答未联网'
        }
      }
      if (!answered) {
        const r = await callArkChat(arkModel, arkMessages, env.ARK_API_KEY!, chatOpts)
        raw = r.content
        reasoning = r.reasoning
      }
    } else {
      // MiniMax 通道：附图走 OpenAI 兼容端点 + M3；联网走 Tavily function calling 循环
      const mmOpts = hasImages
        ? { ...chatOpts, model: 'MiniMax-M3' }
        : { ...chatOpts, model: body.model ? MINIMAX_CHAT_MODELS[body.model] : undefined }
      const callMM = (msgs: ChatMessage[], tools?: unknown[]) =>
        hasImages
          ? callMinimaxVisionChat(msgs, env.MINIMAX_API_KEY, { ...mmOpts, tools })
          : callMinimaxChatFull(msgs, env.MINIMAX_API_KEY, { ...mmOpts, tools })
      if (wantSearch) {
        // ≤3 轮工具调用；最后一轮不带 tools，逼模型直接产出最终 JSON 回复
        const loopMsgs = [...messages]
        const cites: SearchCitation[] = []
        let result: ChatResult | null = null
        for (let round = 0; round < 4; round++) {
          const r = await callMM(loopMsgs, round < 3 ? [WEB_SEARCH_TOOL] : undefined)
          if (!r.toolCalls?.length) {
            result = r
            break
          }
          // 官方要求：含 thinking 的 assistant 消息原样回填历史（Interleaved Thinking）
          loopMsgs.push(r.message)
          for (const tc of r.toolCalls) {
            let toolContent: string
            try {
              const args = JSON.parse(tc.function.arguments || '{}') as { query?: unknown }
              const query = String(args.query ?? '').slice(0, 200)
              const sr = await tavilySearch(query, env.TAVILY_API_KEY!)
              for (const item of sr.results) {
                if (item.url && cites.length < 8 && !cites.some((c) => c.url === item.url)) {
                  cites.push({ title: item.title || item.url, url: item.url })
                }
              }
              toolContent = JSON.stringify(sr).slice(0, 8000)
            } catch (err) {
              toolContent = JSON.stringify({
                error: `搜索失败：${err instanceof Error ? err.message : String(err)}`,
              })
            }
            loopMsgs.push({ role: 'tool', tool_call_id: tc.id, content: toolContent })
          }
        }
        if (!result) return jsonError('MiniMax 联网回答失败，请重试', 502)
        raw = result.content
        reasoning = result.reasoning
        if (cites.length) citations = cites.slice(0, 5)
      } else {
        const r = await callMM(messages)
        raw = r.content
        reasoning = r.reasoning
      }
    }

    const parsed = parseAgentJson(raw)
    const { ops, dropped } = sanitizeOps(parsed.ops)
    let reply =
      dropped > 0 ? `${parsed.reply}\n（有 ${dropped} 个无效操作已被忽略）` : parsed.reply
    if (searchNote) reply += `\n\n（${searchNote}）`

    return jsonOk({
      reply,
      ops,
      ...(citations?.length ? { citations } : {}),
      // M2.7 推理模型的思考过程，前端折叠展示
      ...(reasoning ? { thinking: reasoning.slice(0, 4000) } : {}),
    })
  }, '/api/agent/chat')
}
