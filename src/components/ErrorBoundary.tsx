import React from 'react'

type Props = { children: React.ReactNode }
type State = { error: Error | null }

/**
 * 全局错误边界：React 18 下任何渲染期未捕获异常 = 卸载整棵树 = 白屏且无出口。
 * 这里兜住异常并给用户三条自救路径；项目档案存在 IndexedDB，
 * 「清除画布缓存」只清 localStorage 的画布结构，媒体与档案不受影响。
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[pineline] 渲染崩溃', error, info.componentStack)
  }

  private reload = () => {
    window.location.reload()
  }

  private goProjects = () => {
    window.location.href = '/projects'
  }

  private clearCanvasCache = () => {
    if (
      !window.confirm(
        '将清除本地画布缓存（localStorage）后重新加载。\n项目档案与生成历史保存在 IndexedDB 中，不受影响。继续？',
      )
    )
      return
    try {
      window.localStorage.removeItem('pineline-studio-v1')
    } catch {
      // 清理失败也继续重载
    }
    window.location.reload()
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] px-6 text-zinc-200">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="text-lg font-semibold">页面遇到问题，已安全停住</div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            画布渲染发生异常。你的项目档案与生成历史保存在浏览器 IndexedDB
            中，通常不会丢失。可先尝试重新加载；若反复出现，再清除画布缓存。
          </p>
          <pre className="mt-3 max-h-28 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-red-300">
            {String(this.state.error?.message ?? this.state.error)}
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={this.reload}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
            >
              重新加载
            </button>
            <button
              onClick={this.goProjects}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              回到项目列表
            </button>
            <button
              onClick={this.clearCanvasCache}
              className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
            >
              清除画布缓存并重载
            </button>
          </div>
        </div>
      </div>
    )
  }
}
