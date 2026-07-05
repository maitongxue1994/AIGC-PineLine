/**
 * 管理员模式（隐藏开关，仿 App.tsx 的 ?agentation=1 先例）：
 * dev 恒开；线上 URL 带 ?admin=1 开启并写 localStorage 持久，?admin=0 关闭并清除，
 * 平时按 localStorage 记忆。生成日志 tab 等后台运维视图只对管理员展示。
 */
const KEY = 'pineline-admin'

function detect(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const q = new URLSearchParams(window.location.search).get('admin')
    if (q === '1') {
      localStorage.setItem(KEY, '1')
      return true
    }
    if (q === '0') {
      localStorage.removeItem(KEY)
      return false
    }
    return import.meta.env.DEV || localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export const IS_ADMIN = detect()
