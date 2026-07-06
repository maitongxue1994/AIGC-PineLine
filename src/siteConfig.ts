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
