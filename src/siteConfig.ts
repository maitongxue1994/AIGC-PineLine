/**
 * 站点级常量（联系方式 / 域名 / 收款入口）——集中一处，上线前改这里即全站生效。
 * 所有面向用户的联系方式、外链、正式域名都从此文件取，不要散落硬编码。
 */

/** 正式域名（买好自有域名并绑定 CF Custom Domain 后替换；含协议、无尾斜杠） */
export const SITE_ORIGIN = 'https://aigcpineline0419.mys2388212.workers.dev'

export const CONTACT = {
  /** 客服/商务邮箱（国内外通用，无风险；上线前替换为真实邮箱） */
  email: 'hello@pineline.example',
  /** 国内私域联系方式展示文案（微信号等；留空则不展示微信入口） */
  wechat: '',
  /** 闲鱼/淘宝店铺链接（国内 to C 托管收款；留空则不展示） */
  marketplaceUrl: '',
} as const

/**
 * 收款/自助购买（Paddle）：上线前接入。开关控制 Pricing 页海外用户是否显示
 * 自助购买按钮；未接入时显示「联系购买」。
 */
export const PAYMENTS = {
  paddleEnabled: false,
} as const

/**
 * 定价（上线前按真实成本与市场调整这里即全站生效）。
 * 积分口径：1 积分 ≈ ¥0.1 成本对齐，毛利含在售价里（对齐 TapNow/LibTV 结构）。
 * 成本参考：Seedance 720p·5s≈100 积分、Mini≈60、Seedream/Gemini 图≈5、文本≈2。
 * 占位数字——上线前务必用真实模型成本核算后替换。
 */
export const PRICING = {
  /** 积分包（一次性充值，永不过期） */
  creditPacks: [
    { id: 'starter', name: '体验包', credits: 1000, priceCny: 29, priceUsd: 5, tag: '约 10 条短视频' },
    { id: 'creator', name: '创作包', credits: 6000, priceCny: 149, priceUsd: 22, tag: '约 60 条 · 更划算', highlight: true },
    { id: 'pro', name: '专业包', credits: 20000, priceCny: 449, priceUsd: 68, tag: '约 200 条' },
  ],
  /** 月订阅（含每月积分，适合稳定产能） */
  subscriptions: [
    { id: 'lite', name: '轻享版', credits: 3000, priceCnyM: 79, priceUsdM: 12, features: ['每月 3000 积分', '全模型可用', '标准队列'] },
    { id: 'plus', name: '进阶版', credits: 12000, priceCnyM: 279, priceUsdM: 42, features: ['每月 12000 积分', '全模型可用', '优先队列', '批量交付导出'], highlight: true },
  ],
  /** 企业定制服务（面议，to B 服务式交付） */
  service: {
    items: [
      '批量科普/产品短视频代制作（按月产能包）',
      '定制画布工作流与模型调优',
      '交付含 AI 生成标识 + 创作过程存证报告',
      '专属对接与优先排期',
    ],
  },
} as const
