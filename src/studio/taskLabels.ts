/**
 * 视频云端任务的本地标签映射（taskId → 节点标签）。
 * 供应商任务列表只有 model + cgt-id，无法辨认对应哪个节点/镜头；下单成功时
 * 把「节点标题 · 提示词摘要」记到本地，云端任务找回时翻译出来（#13）。
 * localStorage 小文本、LRU 裁剪；跨设备/清档会丢（属兜底非强依赖）。
 */
const KEY = 'pineline-task-labels-v1'
const MAX = 300

type Rec = { label: string; ts: number }

function load(): Record<string, Rec> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Record<string, Rec>
  } catch {
    return {}
  }
}

export function rememberTaskLabel(taskId: string, label: string, ts: number): void {
  if (!taskId || !label) return
  const m = load()
  m[taskId] = { label: label.slice(0, 120), ts }
  const ids = Object.keys(m)
  if (ids.length > MAX) {
    ids
      .sort((a, b) => m[a].ts - m[b].ts)
      .slice(0, ids.length - MAX)
      .forEach((k) => delete m[k])
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(m))
  } catch {
    /* 配额满：标签是兜底信息，丢弃不影响主流程 */
  }
}

export function getTaskLabel(taskId: string): string | undefined {
  return load()[taskId]?.label
}
