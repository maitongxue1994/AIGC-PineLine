/**
 * 生成系统提示词集中地（Worker 侧）。
 *
 * 节点体系的「每类节点一套系统提示词」在此收口：
 * - 文本类（script / ad-copy / free / image-prompt）：buildScriptSystemPrompt
 * - 分镜（storyboard → 结构化 shots JSON）：STORYBOARD_SYSTEM_PROMPT
 * - 视频提示词组装在前端 src/studio/videoPrompt.ts（需要读画布上游语境，Worker 无画布）
 * - 图像类走 gridPrompts 模板 + 用户提示词直发（src/studio/nodeCatalog.ts）
 */

export type ScriptTone = 'cinematic' | 'commercial' | 'drama' | 'documentary'
export type ScriptLength = 'short' | 'medium' | 'long'
export type ScriptPreset = 'script' | 'ad-copy' | 'free' | 'image-prompt'

export const TONE_LABEL: Record<ScriptTone, string> = {
  cinematic: '电影级 · 注重人物内心、氛围、视听化动作描写',
  commercial: '商业广告 · 高记忆点、情绪钩子、节奏紧凑',
  drama: '短剧 · 冲突驱动、人物关系、对白抓人',
  documentary: '纪录片 · 真实质感、观察视角、克制叙事',
}

export const LENGTH_SCENES: Record<ScriptLength, number> = {
  short: 1,
  medium: 3,
  long: 5,
}

export function buildScriptSystemPrompt(
  preset: ScriptPreset,
  tone: ScriptTone,
  length: ScriptLength,
): string {
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

/** 分镜师系统提示词：剧本 → 结构化 shots JSON（生图可直接消费的镜头描述） */
export const STORYBOARD_SYSTEM_PROMPT = [
  '你是一位专业的分镜师。请把用户给到的剧本文本拆分成可直接用于生图的分镜序列。',
  '输出严格为 JSON 数组，每项包含 id（短 slug，如 sc01-shot03）、title（一句话镜头标题）、description（一段可直接喂给图像生成模型的详细镜头描述，需涵盖景别、主体、环境、光线、氛围，不超过 80 字）。',
  '不要输出 Markdown、不要输出说明、不要在 JSON 外写任何字符。',
].join('\n')
