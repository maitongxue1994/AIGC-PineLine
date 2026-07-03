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
}

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
  },
  {
    preset: 'free',
    kind: 'text',
    label: '自由文本',
    typeLabel: 'Text generation',
    defaultTitle: '新文本',
    promptPlaceholder: '描述任何你想要生成的文字内容',
    defaultParams: { length: 'medium' },
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
  },
  {
    preset: 'shot',
    kind: 'image',
    label: '分镜图',
    typeLabel: 'Shot image',
    defaultTitle: '新分镜图',
    promptPlaceholder: '描述镜头画面，或连线上游「分镜」节点后留空自动使用首镜',
    defaultParams: { aspectRatio: '16:9', quality: '1K', batch: 1 },
  },
  {
    preset: 'scene-grid',
    kind: 'image',
    label: '场景四宫格',
    typeLabel: 'Scene grid',
    defaultTitle: '新场景',
    promptPlaceholder: '描述场景，一次生成全景/侧视/特写/俯瞰四张',
    defaultParams: { aspectRatio: '16:9', quality: '1K' },
  },
  {
    preset: 'char-triview',
    kind: 'image',
    label: '角色三视图',
    typeLabel: 'Character sheet',
    defaultTitle: '新角色',
    promptPlaceholder: '描述角色外形与服装，生成前/侧/背三视图',
    defaultParams: { quality: '1K' },
  },
  {
    preset: 'prop-triview',
    kind: 'image',
    label: '道具三视图',
    typeLabel: 'Prop sheet',
    defaultTitle: '新道具',
    promptPlaceholder: '描述道具/产品，生成正面/侧角/俯视三视图',
    defaultParams: { quality: '1K' },
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
}

export const VIDEO_MODELS: VideoModelInfo[] = [
  { id: 'seedance-2.0', name: 'Seedance 2.0', provider: 'seedance', apiModel: 'doubao-seedance-2-0-260128', badge: { text: 'NEW', kind: 'new' }, quality: '4K', durationRange: '4-15S', audio: true, lastFrame: true },
  { id: 'seedance-2.0-fast', name: 'Seedance 2.0 Fast', provider: 'seedance', apiModel: 'doubao-seedance-2-0-fast-260128', quality: '720P', durationRange: '4-15S', audio: true, lastFrame: true },
  { id: 'seedance-2.0-mini', name: 'Seedance 2.0 Mini', provider: 'seedance', apiModel: 'doubao-seedance-2-0-mini-260615', quality: '720P', durationRange: '4-15S', audio: true, lastFrame: true },
  { id: 'hailuo-2.3', name: 'Hailuo 2.3', provider: 'minimax', apiModel: 'MiniMax-Hailuo-2.3', badge: { text: '热门', kind: 'hot' }, quality: '1080P', durationRange: '6-10S' },
  { id: 'hailuo-02', name: 'Hailuo-02 首尾帧', provider: 'minimax', apiModel: 'MiniMax-Hailuo-02', quality: '1080P', durationRange: '6-10S', lastFrame: true },
  { id: 'wan-2.7', name: 'Wan 2.7', provider: 'wan', apiModel: 'wan2.7-i2v-2026-04-25', quality: '1080P', durationRange: '2-15S', audio: true, lastFrame: true },
  { id: 'kling-v2-6', name: 'Kling 2.6', provider: 'kling', apiModel: 'kling-v2-6', quality: '1080P', durationRange: '3-10S', audio: true, lastFrame: true },
  { id: 'veo-3.1-fast', name: 'VEO 3.1 Fast', provider: 'veo', apiModel: 'veo-3.1-fast-generate-preview', quality: '1080P', durationRange: '4-8S', audio: true, lastFrame: true },
]

/** Seedance 2.0 为主模型（用户指定）；未配 ARK_API_KEY 时选择器与错误信息给接入指引 */
export const DEFAULT_VIDEO_MODEL = 'seedance-2.0'

// ---------------- 假积分定价（本地模拟，无真实计费） ----------------

const IMAGE_COST: Record<ImageQuality, number> = { '1K': 6, '2K': 9, '4K': 15 }
const TEXT_COST = 2
/** 视频估价（README §5/§6 示例：10s→202、5s→100，× 倍数） */
const VIDEO_COST: Record<number, number> = { 5: 100, 10: 202 }

/** 估算一次运行的积分消耗（设计稿：积分随倍数即时换算） */
export function estimateCost(
  kind: NodeKind,
  preset: NodePreset | null,
  params: NodeParams,
): number {
  if (kind === 'asset') return 0
  if (kind === 'text') return TEXT_COST
  if (kind === 'video') {
    return (VIDEO_COST[params.videoDuration ?? 10] ?? 202) * (params.videoMultiplier ?? 1)
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
          videoDuration: 10,
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
