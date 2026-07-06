/**
 * 视频提示词组装（纯函数、零依赖；Seedance 2.0 官方提示词指南 82379/2222480）。
 *
 * 官方进阶公式：精准主体 + 动作细节 + 场景环境 + 光影色调 + 镜头运镜 + 视觉风格 + 画质 + 约束条件；
 * 台词用 {}、音乐用（）、音效用 <>、字幕文字用【】；中文提示词建议 ≤500 字。
 *
 * 组装顺序：画面描述（用户输入优先，空则上游分镜）→ 音色设定 → 约束条件。
 * 幂等设计：各注入段带识别标记（「旁白音色：」等），已包含时不重复追加——
 * 组装结果回填节点提示词后再次运行不会翻倍。
 */

export type PurityOpts = {
  /** 注入官方去字幕约束词（无参数可关，官方 FAQ 确认只能靠提示词压概率） */
  noSubtitles?: boolean
  /** 无背景音乐 */
  noBgm?: boolean
  /** 无音效 */
  noSfx?: boolean
}

/** 参考素材绑定（Seedance @图片N）：按 content 数组顺序，N 从 1 起 */
export type RefBinding = { kind: string; name: string }

export type VideoPromptInput = {
  /** 用户手输提示词（非空时作为画面描述主体，行为护栏：原语义不变） */
  userPrompt?: string
  /** 上游分镜/分镜图推导出的画面描述（用户输入为空时的回退主体） */
  shotText?: string
  /** 旁白音色串（官方公式：性别+年龄区间+声音属性+语速+情绪基线） */
  voiceNarration?: string
  /** 角色音色表（每行「角色名：音色描述」） */
  voiceCast?: string
  /**
   * 参考素材绑定（角色/场景/道具），按 reference_image 顺序排列。
   * 注入 Seedance 官方主体定义「将<图片N>中的[X]定义为<主体N>」，绑定素材与画面主体。
   */
  refBindings?: RefBinding[]
  purity?: PurityOpts
  /** generate_audio 关闭时不注入音色/音频类约束（默认 true） */
  audioOn?: boolean
}

/** Seedance 官方建议：中文提示词 ≤500 字（超长易被模型忽略细节） */
const SOFT_LIMIT = 500

function assemble(base: string, input: VideoPromptInput): string {
  const segs: string[] = []
  // Seedance 官方主体定义放最前：将<图片N>中的[素材]定义为<主体N>（@图片N = content 里第 N 张 reference_image）
  const binds = input.refBindings ?? []
  if (binds.length && !base.includes('定义为<主体')) {
    const defs = binds
      .map((b, i) => `将<图片${i + 1}>中的${b.kind}[${b.name}]定义为<主体${i + 1}>`)
      .join('；')
    segs.push(`${defs}。以下画面中提到对应${binds.map((_, i) => `<主体${i + 1}>`).join('、')}时，保持其形象与参考素材完全一致。`)
  }
  if (base) segs.push(base)

  const audioOn = input.audioOn !== false
  if (audioOn) {
    const narration = input.voiceNarration?.trim()
    if (narration && !base.includes('旁白音色：')) {
      segs.push(`旁白音色：一个${narration}的声音，全程旁白保持该音色一致，不要更换声音。`)
    }
    const cast = input.voiceCast?.trim()
    if (cast && !base.includes('角色音色：')) {
      const lines = cast
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .join('；')
      if (lines) segs.push(`角色音色：${lines}。各角色台词全程保持对应音色一致。`)
    }
  }

  const p = input.purity ?? {}
  const constraints: string[] = []
  if (p.noSubtitles && !base.includes('保持无字幕')) {
    // 官方 FAQ 原话约束词组合（横屏概率更低由 UI 提示，不在此处强改比例）。
    // 注：此处「不要生成水印」是防模型在**画面内容里**乱画随机水印/字样；与交付时按
    // 《标识办法》**叠加**的合规「AI 生成」角标不冲突——一个防画面污染，一个是合规标识。
    constraints.push('保持无字幕，避免生成任何文字或字幕，不要生成Logo，不要生成水印')
  }
  if (audioOn && !base.includes('无背景音乐') && !base.includes('无音效')) {
    if (p.noBgm && p.noSfx) constraints.push('无背景音乐，无音效，仅保留人声')
    else if (p.noBgm) constraints.push('无背景音乐')
    else if (p.noSfx) constraints.push('无音效')
  }
  if (constraints.length) segs.push(`${constraints.join('；')}。`)

  return segs.join('\n')
}

export function buildVideoPrompt(input: VideoPromptInput): string {
  const user = input.userPrompt?.trim() ?? ''
  const shot = input.shotText?.trim() ?? ''
  const base = user || shot
  let out = assemble(base, input)
  // 软上限：仅当画面描述来自上游推导（非用户手输）时截其长度，注入段完整保留
  if (!user && shot && out.length > SOFT_LIMIT) {
    const overhead = out.length - shot.length
    const budget = Math.max(80, SOFT_LIMIT - overhead)
    if (shot.length > budget) out = assemble(`${shot.slice(0, budget)}…`, input)
  }
  return out
}

/**
 * generate_audio 解析：显式关闭 > 纯净模式整体静音（勾掉 BGM+音效且无音色/台词诉求，
 * 走官方 generate_audio=false 而非浪费音频轨）> 默认开。
 */
export function resolveGenerateAudio(
  videoAudio: boolean | undefined,
  purity?: PurityOpts,
  hasVoice?: boolean,
): boolean {
  if (videoAudio === false) return false
  if (purity?.noBgm && purity?.noSfx && !hasVoice) return false
  return videoAudio ?? true
}
