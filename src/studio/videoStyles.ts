/**
 * 视频风格库（Seedance 2.0 官方指南 §5：必须显式写风格约束词，否则 2D/3D 会漂成真人写实）。
 * 每个风格的 keywords 直接拼进视频提示词的「视觉风格」位；挂在分镜节点上，派生的所有
 * 镜头视频节点共用同一风格串，保证整条片子风格统一。AI 助手可通过风格入口切换/扩写。
 */
export type VideoStyle = {
  id: string
  name: string
  /** 选择器副标题 */
  desc: string
  /** 拼入提示词的关键词串（逗号分隔） */
  keywords: string
}

export const VIDEO_STYLES: VideoStyle[] = [
  {
    id: 'realistic',
    name: '真人写实 / 电影感',
    desc: '实拍质感、电影级光影',
    keywords: '真人写实风格，高清电影纪实质感，色彩自然，光影柔和，浅景深，8k 材质细节，极度逼真',
  },
  {
    id: '3d-animation',
    name: '3D 动画',
    desc: '皮克斯/迪士尼 3D 卡通',
    keywords: '皮克斯迪士尼 3D 动画风格，3D 卡通渲染，光滑材质，柔和体积光，大眼萌系角色，明快色彩',
  },
  {
    id: 'cg-render',
    name: 'CG 渲染 / 国风',
    desc: '3D 国风/科幻 CG',
    keywords: '3D 国风漫画 CG 风格，精细 CG 渲染，写实光影材质，电影级质感，赛博科幻氛围',
  },
  {
    id: '2d-anime',
    name: '2D 动画',
    desc: '日漫/吉卜力手绘',
    keywords: '2D 日漫动画风格，宫崎骏吉卜力画风，手绘赛璐璐质感，日系清新色调，扁平柔和光影',
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    desc: '霓虹未来都市',
    keywords: '赛博朋克风格，冷蓝紫霓虹色调，霓虹闪烁的未来都市，雨夜反光湿地，全息投影，高对比光影',
  },
  {
    id: 'ink-wash',
    name: '水墨国风',
    desc: '写意水墨留白',
    keywords: '水墨国风写意，水墨晕染笔触，大面积留白，淡雅墨色，国风古韵，柔和flowing动态',
  },
  {
    id: 'clay',
    name: '黏土定格',
    desc: '手工黏土定格动画',
    keywords: '黏土定格动画风格，手工黏土质感，微缩场景，定格摆拍的轻微抖动感，暖色柔光',
  },
]

export function styleKeywords(id: string | undefined): string | undefined {
  if (!id) return undefined
  return VIDEO_STYLES.find((s) => s.id === id)?.keywords
}

/** 供 agentOps / nodeCatalog 白名单校验 */
export const VIDEO_STYLE_IDS = VIDEO_STYLES.map((s) => s.id)
