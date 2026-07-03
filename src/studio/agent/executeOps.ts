import { useStudioStore } from '../store'
import type { NodeParams, NodePreset } from '../types'
import type { AgentOp } from './types'

/**
 * Agent 操作执行器：ref → 真实节点 id 映射后逐条调 store actions。
 * 调用方在执行前先 commit 一次撤销历史（store 的 150ms 合并窗口使整批 ⌘Z 一步可撤）。
 */
export async function executeOps(ops: AgentOp[]): Promise<string> {
  const store = useStudioStore.getState()
  const refMap = new Map<string, string>()
  const resolve = (idOrRef: string) => refMap.get(idOrRef) ?? idOrRef

  let ok = 0
  let skipped = 0
  const runTargets: string[] = []

  // 新链默认放在现有内容下方
  const baseY = store.nodes.reduce((m, n) => Math.max(m, n.position.y), 0) + 400
  let autoX = 80

  for (const op of ops) {
    try {
      const s = useStudioStore.getState()
      switch (op.op) {
        case 'add_node': {
          const pos = op.position ?? { x: autoX, y: baseY }
          autoX += 480
          const id = s.addNode(op.kind, (op.preset as NodePreset) ?? (op.kind === 'text' ? 'free' : 'single'), pos, {
            ...(op.title ? { title: op.title } : {}),
            ...(op.prompt ? { prompt: op.prompt } : {}),
          })
          refMap.set(op.ref, id)
          ok++
          break
        }
        case 'set_prompt': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { skipped++; break }
          s.setPrompt(id, op.prompt)
          ok++
          break
        }
        case 'set_params': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { skipped++; break }
          s.updateNodeParams(id, op.params as Partial<NodeParams>)
          ok++
          break
        }
        case 'rename': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { skipped++; break }
          s.updateNodeTitle(id, op.title)
          ok++
          break
        }
        case 'connect': {
          const source = resolve(op.source)
          const target = resolve(op.target)
          if (
            source === target ||
            !s.nodes.some((n) => n.id === source) ||
            !s.nodes.some((n) => n.id === target)
          ) { skipped++; break }
          s.onConnect({ source, sourceHandle: null, target, targetHandle: null })
          ok++
          break
        }
        case 'delete_node': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { skipped++; break }
          s.deleteNode(id)
          ok++
          break
        }
        case 'run':
          runTargets.push(...op.ids.map(resolve))
          ok++
          break
        case 'clear_canvas':
          // 确认已在 agentStore 执行前完成；commit 合并窗内整批 ⌘Z 一步可撤
          s.resetProject()
          ok++
          break
      }
    } catch {
      skipped++
    }
  }

  const state = useStudioStore.getState()
  if (ops.some((o) => o.op === 'add_node')) state.requestFitView()
  if (runTargets.length) {
    const valid = runTargets.filter((id) => state.nodes.some((n) => n.id === id))
    if (valid.length) void state.runPipeline(valid)
  }

  return skipped > 0 ? `已执行 ${ok} 项，跳过 ${skipped} 项无效操作` : `已执行 ${ok} 项操作`
}

/** 发送给 Agent 的画布快照摘要（不含图片数据） */
export function canvasSnapshot() {
  const s = useStudioStore.getState()
  return {
    nodes: s.nodes.map((n) => ({
      id: n.id,
      kind: n.data.kind,
      preset: n.data.preset,
      title: n.data.title,
      prompt: n.data.prompt.slice(0, 120),
      status: n.data.status,
      hasImage: n.data.versions.some((v) => v.content?.startsWith('data:image')),
      versionCount: n.data.versions.length,
    })),
    edges: s.edges.map((e) => ({ source: e.source, target: e.target })),
  }
}
