import type {
  BatchCount,
  ImagePreset,
  ImageQuality,
  NodeKind,
  NodeParams,
  NodePreset,
  PinColor,
  PineNode,
  VideoProviderId,
  VideoResolution,
} from './types'

/**
 * 节点目录：kind/preset 的唯一元数据源。
 * 添加节点面板、右键菜单、⊕ 引用生成菜单、搜索筛选、Agent 校验白名单全部消费这里。
 */

export const KIND_ACCENTS: Record<NodeKind, string> = {
  text: '#FF6A3D',
  image: '#7C5CFF',
  asset: '#22D3EE',
  video: '#F06AC5',
}

export const KIND_LABELS: Record<NodeKind, string> = {
  text: '文本',
  image: '图片',
  asset: '素材',
  video: '视频',
}

export type PresetMeta = {
  preset: NodePreset
  kind: NodeKind
  label: string
  /** 节点上方外置标签展示名（对齐设计稿 Image generation 式命名） */
  typeLabel: string
  defaultTitle: string
  promptPlaceholder: string
  defaultParams: NodeParams
  /** 提示词硬性字数上限；不设 = 不限（剧本/分镜要支持粘贴长文） */
  maxChars?: number
}

/** 视频节点提示词硬上限（对齐 MiniMax prompt≤2000；Seedance 官方建议中文 ≤500 字为软提示） */
export const VIDEO_PROMPT_MAX_CHARS = 2000

export const TEXT_PRESETS: PresetMeta[] = [
  {
    preset: 'script',
    kind: 'text',
    label: '剧本',
    typeLabel: 'Script generation',
    defaultTitle: '新剧本',
    promptPlaceholder: '一句话描述故事梗概，如：雨夜的城市屋顶，一个撑伞的年轻人等着什么…',
    defaultParams: { tone: 'cinematic', length: 'short' },
  },
  {
    preset: 'storyboard',
    kind: 'text',
    label: '分镜',
    typeLabel: 'Storyboard',
    defaultTitle: '新分镜',
    promptPlaceholder: '粘贴剧本，或连线上游「剧本」节点后留空自动使用',
    defaultParams: { splitMode: 'auto', splitter: '' },
  },
  {
    preset: 'ad-copy',
    kind: 'text',
    label: '广告词',
    typeLabel: 'Ad copy',
    defaultTitle: '新广告词',
    promptPlaceholder: '描述产品与卖点，生成广告词/品牌文案',
    defaultParams: { tone: 'commercial', length: 'short' },
    maxChars: 1000,
  },
  {
    preset: 'free',
    kind: 'text',
    label: '自由文本',
    typeLabel: 'Text generation',
    defaultTitle: '新文本',
    promptPlaceholder: '描述任何你想要生成的文字内容',
    defaultParams: { length: 'medium' },
    maxChars: 5000,
  },
]

export const IMAGE_PRESETS: PresetMeta[] = [
  {
    preset: 'single',
    kind: 'image',
    label: '单图',
    typeLabel: 'Image generation',
    defaultTitle: '新图片',
    promptPlaceholder: '描述任何你想要生成的画面',
    defaultParams: { aspectRatio: '16:9', quality: '1K', batch: 1 },
    maxChars: 2000,
  },
  {
    preset: 'shot',
    kind: 'image',
    label: '分镜图',
    typeLabel: 'Shot image',
    defaultTitle: '新分镜图',
    promptPlaceholder: '描述镜头画面，或连线上游「分镜」节点后留空自动使用首镜',
    defaultParams: { aspectRatio: '16:9', quality: '1K', batch: 1 },
    maxChars: 2000,
  },
  {
    preset: 'scene-grid',
    kind: 'image',
    label: '场景四宫格',
    typeLabel: 'Scene grid',
    defaultTitle: '新场景',
    promptPlaceholder: '描述场景，一次生成全景/侧视/特写/俯瞰四张',
    defaultParams: { aspectRatio: '16:9', quality: '1K' },
    maxChars: 2000,
  },
  {
    preset: 'char-triview',
    kind: 'image',
    label: '角色三视图',
    typeLabel: 'Character sheet',
    defaultTitle: '新角色',
    promptPlaceholder: '描述角色外形与服装，生成前/侧/背三视图',
    defaultParams: { quality: '1K' },
    maxChars: 2000,
  },
  {
    preset: 'prop-triview',
    kind: 'image',
    label: '道具三视图',
    typeLabel: 'Prop sheet',
    defaultTitle: '新道具',
    promptPlaceholder: '描述道具/产品，生成正面/侧角/俯视三视图',
    defaultParams: { quality: '1K' },
    maxChars: 2000,
  },
]

export const ALL_PRESETS: PresetMeta[] = [...TEXT_PRESETS, ...IMAGE_PRESETS]

export function presetMeta(preset: NodePreset | null): PresetMeta | null {
  if (!preset) return null
  return ALL_PRESETS.find((p) => p.preset === preset) ?? null
}

/** asset 节点的外置类型标签 */
export const ASSET_TYPE_LABEL = 'Asset'

// ---------------- 多图预设的视角 prompt 组与版本标签 ----------------

export const GRID_VIEW_LABELS: Record<
  Extract<ImagePreset, 'scene-grid' | 'char-triview' | 'prop-triview'>,
  string[]
> = {
  'scene-grid': ['全景', '侧视', '特写', '俯瞰'],
  'char-triview': ['前视', '侧视', '背视'],
  'prop-triview': ['正面', '侧角', '俯视'],
}

export function gridPrompts(preset: ImagePreset, desc: string): string[] | null {
  switch (preset) {
    case 'scene-grid':
      return [
        `${desc}，wide establishing shot, cinematic lighting`,
        `${desc}，medium shot looking in from the side, soft shadows`,
        `${desc}，close-up detail with shallow depth of field`,
        `${desc}，bird's-eye overhead view at night`,
      ]
    case 'char-triview':
      return [
        `${desc}，full-body front view, neutral pose, plain light-grey background, character reference sheet`,
        `${desc}，full-body side profile view, neutral pose, plain light-grey background, character reference sheet`,
        `${desc}，full-body back view, neutral pose, plain light-grey background, character reference sheet`,
      ]
    case 'prop-triview':
      return [
        `${desc}，studio product photo, front view, plain white background, soft shadow`,
        `${desc}，studio product photo, three-quarter angle view, plain white background, soft shadow`,
        `${desc}，studio product photo, top-down view, plain white background, soft shadow`,
      ]
    default:
      return null
  }
}

// ---------------- 添加节点菜单目录（含禁用占位） ----------------

export type AddMenuItem = {
  key: string
  label: string
  subtitle?: string
  kind?: NodeKind
  preset?: NodePreset
  disabled?: boolean
  badge?: string
}

export type AddMenuGroup = { title: string; items: AddMenuItem[] }

export const ADD_MENU: AddMenuGroup[] = [
  {
    title: '添加节点',
    items: [
      { key: 'text', label: '文本', subtitle: '脚本、广告词、品牌文案', kind: 'text', preset: 'script' },
      { key: 'image', label: '图片', kind: 'image', preset: 'single' },
      { key: 'video', label: '视频', disabled: true, badge: '规划中' },
      { key: 'audio', label: '音频', disabled: true, badge: '规划中' },
      { key: 'world', label: '3D 世界', disabled: true, badge: 'Beta 规划中' },
    ],
  },
  {
    title: '辅助工具',
    items: [
      { key: 'playlist', label: '播放列表', disabled: true, badge: '规划中' },
      { key: 'editor', label: '图片编辑器', disabled: true, badge: '规划中' },
    ],
  },
  {
    title: '添加资源',
    items: [{ key: 'upload', label: '上传' }],
  },
]

// ---------------- Pin 六色 ----------------

export const PIN_COLORS: Record<PinColor, string> = {
  red: '#F0566A',
  orange: '#F5923E',
  yellow: '#F2C744',
  green: '#4BBF6B',
  blue: '#3F9BF5',
  purple: '#9B6DF2',
}

// ---------------- 文本/图像模型目录（多供应商；ark 系共用 ARK_API_KEY） ----------------

export type ChatModelInfo = {
  id: string
  name: string
  /** minimax=默认通道；ark=方舟（豆包/Seedream，需 ARK_API_KEY）；gemini=默认图像通道 */
  provider: 'minimax' | 'ark' | 'gemini'
  /** 传给 Worker 的真实模型 ID（默认通道可为空） */
  apiModel?: string
  desc?: string
}

export const TEXT_MODELS: ChatModelInfo[] = [
  { id: 'minimax-m2.7', name: 'MiniMax M2.7', provider: 'minimax', desc: '默认 · 推理型' },
  // M3 官方模型名 'MiniMax-M3'（chatcompletion_v2 同端点，2026-07 经官方文档核实）
  { id: 'minimax-m3', name: 'MiniMax M3', provider: 'minimax', apiModel: 'MiniMax-M3', desc: '旗舰 · 1M 上下文' },
  { id: 'doubao-seed-2.0-pro', name: 'Doubao Seed 2.0 Pro', provider: 'ark', apiModel: 'doubao-seed-2-0-pro-260215', desc: '豆包旗舰' },
  { id: 'doubao-seed-2.0-lite', name: 'Doubao Seed 2.0 Lite', provider: 'ark', apiModel: 'doubao-seed-2-0-lite-260428', desc: '轻快省' },
  { id: 'doubao-seed-evolving', name: 'Doubao Seed Evolving', provider: 'ark', apiModel: 'doubao-seed-evolving', desc: '自进化' },
]

export const IMAGE_MODELS: ChatModelInfo[] = [
  { id: 'gemini-3.1-flash', name: 'Gemini 3.1 Flash', provider: 'gemini', desc: '默认 · Nano Banana 2' },
  { id: 'seedream-5.0', name: 'Seedream 5.0', provider: 'ark', apiModel: 'doubao-seedream-5-0-260128', desc: '字节 · 2K/4K' },
]

/** 由节点 params 里的模型选择解析出要传给 Worker 的 model 字段（默认通道返回 undefined） */
export function resolveApiModel(list: ChatModelInfo[], id?: string): string | undefined {
  return list.find((m) => m.id === id)?.apiModel
}

// ---------------- 视频模型（真实 provider 映射；调研依据 docs/模型API调研-2026-07.md） ----------------

export type VideoModelInfo = {
  id: string
  name: string
  /** Worker 端 provider 注册表 id */
  provider: VideoProviderId
  /** 各家真实 API Model ID */
  apiModel: string
  badge?: { text: string; kind: 'new' | 'hot' | 'discount' }
  quality: string
  durationRange: string
  audio?: boolean
  /** 支持尾帧参考（首尾帧模式） */
  lastFrame?: boolean
  /** 支持全能参考（多模态参考生视频）——仅 Seedance 2.0 系列 */
  omniReference?: boolean
  /** 支持的清晰度档位（参数弹层据此联动禁用不支持项） */
  resolutions: VideoResolution[]
  /** 时长范围（秒），驱动生成时长滑块 */
  durationMin: number
  durationMax: number
}

// resolutions/durationMin/Max 依据 docs/模型API调研-2026-07.md 官方口径：
// Seedance 2.0 标准版独占 4k；Fast/Mini 无 1080p/4k；全能参考仅 2.0 系列。
export const VIDEO_MODELS: VideoModelInfo[] = [
  { id: 'seedance-2.0', name: 'Seedance 2.0', provider: 'seedance', apiModel: 'doubao-seedance-2-0-260128', badge: { text: 'NEW', kind: 'new' }, quality: '4K', durationRange: '4-15S', audio: true, lastFrame: true, omniReference: true, resolutions: ['480p', '720p', '1080p', '4k'], durationMin: 4, durationMax: 15 },
  { id: 'seedance-2.0-fast', name: 'Seedance 2.0 Fast', provider: 'seedance', apiModel: 'doubao-seedance-2-0-fast-260128', quality: '720P', durationRange: '4-15S', audio: true, lastFrame: true, omniReference: true, resolutions: ['480p', '720p'], durationMin: 4, durationMax: 15 },
  { id: 'seedance-2.0-mini', name: 'Seedance 2.0 Mini', provider: 'seedance', apiModel: 'doubao-seedance-2-0-mini-260615', quality: '720P', durationRange: '4-15S', audio: true, lastFrame: true, omniReference: true, resolutions: ['480p', '720p'], durationMin: 4, durationMax: 15 },
  { id: 'hailuo-2.3', name: 'Hailuo 2.3', provider: 'minimax', apiModel: 'MiniMax-Hailuo-2.3', badge: { text: '热门', kind: 'hot' }, quality: '1080P', durationRange: '6-10S', resolutions: ['480p', '720p', '1080p'], durationMin: 6, durationMax: 10 },
  { id: 'hailuo-02', name: 'Hailuo-02 首尾帧', provider: 'minimax', apiModel: 'MiniMax-Hailuo-02', quality: '1080P', durationRange: '6-10S', lastFrame: true, resolutions: ['480p', '720p', '1080p'], durationMin: 6, durationMax: 10 },
  { id: 'wan-2.7', name: 'Wan 2.7', provider: 'wan', apiModel: 'wan2.7-i2v-2026-04-25', quality: '1080P', durationRange: '2-15S', audio: true, lastFrame: true, resolutions: ['480p', '720p', '1080p'], durationMin: 2, durationMax: 15 },
  { id: 'kling-v2-6', name: 'Kling 2.6', provider: 'kling', apiModel: 'kling-v2-6', quality: '1080P', durationRange: '3-10S', audio: true, lastFrame: true, resolutions: ['720p', '1080p'], durationMin: 3, durationMax: 10 },
  { id: 'veo-3.1-fast', name: 'VEO 3.1 Fast', provider: 'veo', apiModel: 'veo-3.1-fast-generate-preview', quality: '1080P', durationRange: '4-8S', audio: true, lastFrame: true, resolutions: ['720p', '1080p', '4k'], durationMin: 4, durationMax: 8 },
]

/** Seedance 2.0 为主模型（用户指定）；未配 ARK_API_KEY 时选择器与错误信息给接入指引 */
export const DEFAULT_VIDEO_MODEL = 'seedance-2.0'

// ---------------- 假积分定价（本地模拟，无真实计费） ----------------

const IMAGE_COST: Record<ImageQuality, number> = { '1K': 6, '2K': 9, '4K': 15 }
const TEXT_COST = 2
/** 视频估价：720p 基准每秒 20 积分（设计稿 5s→100 / 10s→200），分辨率越高越贵 */
const VIDEO_PER_SEC = 20
const VIDEO_RES_MULT: Record<VideoResolution, number> = { '480p': 0.5, '720p': 1, '1080p': 2, '4k': 4 }

/** 估算一次运行的积分消耗（设计稿：积分随时长/分辨率/倍数即时换算） */
export function estimateCost(
  kind: NodeKind,
  preset: NodePreset | null,
  params: NodeParams,
): number {
  if (kind === 'asset') return 0
  if (kind === 'text') return TEXT_COST
  if (kind === 'video') {
    const dur = Math.max(0, params.videoDuration ?? 5)
    const resMult = VIDEO_RES_MULT[params.videoResolution ?? '720p'] ?? 1
    return Math.round(VIDEO_PER_SEC * dur * resMult) * (params.videoMultiplier ?? 1)
  }
  const per = IMAGE_COST[params.quality ?? '1K']
  const gridCount =
    preset === 'scene-grid' ? 4 : preset === 'char-triview' || preset === 'prop-triview' ? 3 : 0
  if (gridCount) return per * gridCount
  const batch: BatchCount = params.batch ?? 1
  return per * batch
}

/** 新账户初始积分（纯前端模拟；帮助面板注明「积分为本地模拟」） */
export const INITIAL_CREDITS = 1000

// ---------------- 节点构造 ----------------

/** 构造一个新节点（store.addNode / templates / Agent 建链共用） */
export function buildNode(
  kind: NodeKind,
  preset: NodePreset | null,
  position: { x: number; y: number },
  init?: { title?: string; prompt?: string; params?: NodeParams },
): PineNode {
  const meta = presetMeta(preset)
  const id = `${kind}-${crypto.randomUUID()}`
  const kindDefaults: NodeParams =
    kind === 'video'
      ? {
          videoMode: 'frames',
          videoRatio: 'auto',
          videoDuration: 5, // Seedance 2.0 官方默认
          videoResolution: '720p',
          videoMultiplier: 1,
          videoModel: DEFAULT_VIDEO_MODEL,
        }
      : {}
  return {
    id,
    type: kind,
    position,
    data: {
      kind,
      preset,
      title:
        init?.title ??
        meta?.defaultTitle ??
        (kind === 'video' ? '新视频' : '上传素材'),
      prompt: init?.prompt ?? '',
      params: { ...kindDefaults, ...(meta?.defaultParams ?? {}), ...(init?.params ?? {}) },
      versions: [],
      activeVersion: 0,
      status: 'idle',
    },
  }
}
