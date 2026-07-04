import { useStudioStore } from '../store'
import { activeContent, type PineNodeData } from '../types'

/**
 * 视频节点拉出下游视频节点时：把当前视频自动填进新节点的 Seedance 2.0
 * 全能参考（参考视频位）。异步校验官方时长约束（单段 2~15s），超限则静默跳过
 * ——新节点已建好，用户仍可手动上传。
 */
export function attachSourceVideoAsOmniRef(sourceData: PineNodeData, newId: string) {
  if (sourceData.kind !== 'video') return
  const src = activeContent(sourceData)
  if (!src || !src.startsWith('data:video')) return
  const el = document.createElement('video')
  el.preload = 'metadata'
  el.onloadedmetadata = () => {
    if (el.duration < 1.9 || el.duration > 15.1) return
    const s = useStudioStore.getState()
    if (!s.nodes.some((n) => n.id === newId)) return
    s.updateNodeParams(newId, { videoMode: 'omni', omniVideos: [src] })
    window.dispatchEvent(
      new CustomEvent('pineline:flash', {
        detail: '已把上游视频填入全能参考（参考视频位）',
      }),
    )
  }
  el.src = src
}
