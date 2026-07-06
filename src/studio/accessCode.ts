/**
 * 生成访问码（付费/邀请凭证）本地存取。
 * 无账号体系下，访问码即账户：随每个生成请求带 X-Pineline-Access，
 * 服务端校验并（T3 起）扣积分。画布浏览/导入导出不需要码。
 */
const KEY = 'pineline-access-v1'

export function getAccessCode(): string {
  try {
    return localStorage.getItem(KEY)?.trim() ?? ''
  } catch {
    return ''
  }
}

export function setAccessCode(code: string): void {
  try {
    const v = code.trim()
    if (v) localStorage.setItem(KEY, v)
    else localStorage.removeItem(KEY)
  } catch {
    /* 隐私模式等：本次会话内存亦无处可存，静默 */
  }
}

export function clearAccessCode(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

/** 当前是否持管理员码（admin- 前缀）：决定是否显示交付上传等管理入口 */
export function isAdminAccess(): boolean {
  return getAccessCode().startsWith('admin-')
}

/** 生成请求遇到 403 ACCESS_REQUIRED 时派发，AccessCodeDialog 监听后弹出 */
export function requestAccessCode(): void {
  window.dispatchEvent(new CustomEvent('pineline:access-required'))
}
