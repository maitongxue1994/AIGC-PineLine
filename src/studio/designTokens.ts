/**
 * 设计令牌（来自 docs/design/工作空间UI组件规范.html §01）。
 * JS 侧消费的值集中在这里；类名侧的扩展见 tailwind.config.js 的 studio 色板。
 */

export const TOKENS = {
  /** 画布底色 */
  canvasBg: '#0B0B0C',
  /** 画布点阵：radial-gradient 1px 点，20px 间距 */
  canvasDot: 'rgba(255,255,255,0.09)',
  canvasDotGap: 20,

  /** 面板 / 浮层 */
  surface: '#1C1C1E',
  elevated: '#29292C',
  panelBg: '#1B1B1E',
  popoverBg: '#1E1E21',
  chipBg: '#232326',
  inputBg: '#161618',
  railBg: 'rgba(22,22,24,0.95)',
  toolbarBg: 'rgba(26,26,28,0.95)',

  /** 强调 */
  accent: '#2E9BFF',
  selection: '#3F9BF5',
  selectionRing: 'rgba(63,155,245,0.18)',
  maskFill: 'rgba(63,155,245,0.42)',

  /** 连线 */
  edgeStroke: 'rgba(255,255,255,0.5)',
  edgeStrokeSelected: '#FFFFFF',
  edgeWidth: 1.5,

  /** 文字 */
  textTitle: '#F5F5F7',
  textBody: '#E8E8EC',
  textSecondary: '#98989F',
  textMuted: '#8A8A92',
  textFaint: '#6E6E76',
  textPlaceholder: '#5C5C64',
  textDisabled: '#4A4A52',

  /** 品牌 logo 渐变 */
  brandGradient:
    'conic-gradient(from 210deg, #ff5f6d, #ffc371, #47c2ff, #a78bfa, #ff5f6d)',
} as const

export const SHADOWS = {
  hover: '0 12px 40px rgba(0,0,0,0.5)',
  node: '0 16px 44px rgba(0,0,0,0.55)',
  toolbar: '0 16px 48px rgba(0,0,0,0.6)',
  panel: '0 24px 64px rgba(0,0,0,0.55)',
  menu: '0 24px 64px rgba(0,0,0,0.65)',
  modal: '0 32px 80px rgba(0,0,0,0.7)',
  tooltip: '0 8px 24px rgba(0,0,0,0.5)',
  banner: '0 12px 36px rgba(46,155,255,0.35)',
} as const
