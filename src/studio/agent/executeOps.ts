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
  // 失败原因留痕（上限 6 条）：此前只累计数字，Agent 与用户都不知道哪里失败了
  const errors: string[] = []
  const fail = (reason: string) => {
    skipped++
    if (errors.length < 6) errors.push(reason)
  }
  let runOps = 0
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
          // video 节点无 preset；text/image 缺省回落 free/single
          const preset =
            op.kind === 'video'
              ? null
              : ((op.preset as NodePreset) ?? (op.kind === 'text' ? 'free' : 'single'))
          const id = s.addNode(op.kind, preset, pos, {
            ...(op.title ? { title: op.title } : {}),
            ...(op.prompt ? { prompt: op.prompt } : {}),
            ...(op.params ? { params: op.params as Partial<NodeParams> as NodeParams } : {}),
          })
          refMap.set(op.ref, id)
          ok++
          break
        }
        case 'set_prompt': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { fail(`set_prompt: 节点 ${op.id} 不存在`); break }
          s.setPrompt(id, op.prompt)
          ok++
          break
        }
        case 'set_params': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { fail(`set_params: 节点 ${op.id} 不存在`); break }
          s.updateNodeParams(id, op.params as Partial<NodeParams>)
          ok++
          break
        }
        case 'rename': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { fail(`rename: 节点 ${op.id} 不存在`); break }
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
          ) { fail(`connect: ${op.source} → ${op.target} 端点无效`); break }
          s.onConnect({ source, sourceHandle: null, target, targetHandle: null })
          ok++
          break
        }
        case 'delete_node': {
          const id = resolve(op.id)
          if (!s.nodes.some((n) => n.id === id)) { fail(`delete_node: 节点 ${op.id} 不存在`); break }
          s.deleteNode(id)
          ok++
          break
        }
        case 'run':
          // 计数推迟到循环后：目标全部无效时不能谎报「已执行」
          runOps++
          runTargets.push(...op.ids.map(resolve))
          break
        case 'clear_canvas':
          // 确认已在 agentStore 执行前完成；commit 合并窗内整批 ⌘Z 一步可撤
          s.resetProject()
          ok++
          break
        case 'derive_shot_images': {
          const id = resolve(op.id)
          const sb = s.nodes.find((n) => n.id === id)
          if (!sb || sb.data.preset !== 'storyboard') {
            fail(`derive_shot_images: ${op.id} 不是分镜节点`)
            break
          }
          const shots = sb.data.shots ?? []
          if (!shots.length) {
            fail('derive_shot_images: 分镜节点还没有镜头，请先运行分镜')
            break
          }
          // 缺省 = 全部未派生镜头；已派生的剔除（防重复叠加）
          const derivedSet = new Set<number>()
          for (const e of s.edges) {
            if (e.source !== id) continue
            const t = s.nodes.find((n) => n.id === e.target)
            if (t?.data.kind === 'image' && t.data.preset === 'shot' && t.data.params.shotIndex != null)
              derivedSet.add(t.data.params.shotIndex)
          }
          const indices = (op.indices ?? shots.map((_, i) => i)).filter(
            (i) => i < shots.length && !derivedSet.has(i),
          )
          if (!indices.length) {
            fail('derive_shot_images: 所选镜头均已派生')
            break
          }
          await s.deriveShotImageNodes(id, indices)
          ok++
          break
        }
        case 'derive_shot_videos': {
          const id = resolve(op.id)
          const sb = s.nodes.find((n) => n.id === id)
          if (!sb || sb.data.preset !== 'storyboard') {
            fail(`derive_shot_videos: ${op.id} 不是分镜节点`)
            break
          }
          const made = await s.deriveShotVideoNodes(id, { run: op.run })
          if (!made.length) {
            fail('derive_shot_videos: 没有可挂视频的分镜图，请先派生并生成分镜图')
            break
          }
          ok++
          break
        }
      }
    } catch (err) {
      fail(`${op.op}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const state = useStudioStore.getState()
  if (ops.some((o) => o.op === 'add_node')) state.requestFitView()
  if (runOps > 0) {
    const valid = runTargets.filter((id) => state.nodes.some((n) => n.id === id))
    if (!valid.length) {
      skipped += runOps
      errors.push('run: 目标节点均不存在，管线未启动')
    } else if (state.pipelineRunning) {
      skipped += runOps
      errors.push('run: 已有管线在运行，本次 run 被忽略，请等当前管线完成')
    } else {
      void state.runPipeline(valid)
      ok += runOps
      if (valid.length < runTargets.length) {
        errors.push(`run: ${runTargets.length - valid.length} 个目标节点不存在，已跳过`)
      }
    }
  }

  const summary =
    skipped > 0 ? `已执行 ${ok} 项，跳过 ${skipped} 项无效操作` : `已执行 ${ok} 项操作`
  return errors.length ? `${summary}（${errors.join('；')}）` : summary
}

/** 快照里携带的参数键：模型与关键生成参数（LLM 编辑节点的依据），媒体类字段一律不带 */
const SNAPSHOT_PARAM_KEYS = [
  'textModel',
  'imageModel',
  'videoModel',
  'shotIndex',
  'aspectRatio',
  'quality',
  'batch',
  'videoMode',
  'videoDuration',
  'videoResolution',
] as const

/** 发送给 Agent 的画布快照摘要（不含图片数据） */
export function canvasSnapshot() {
  const s = useStudioStore.getState()
  return {
    nodes: s.nodes.map((n) => {
      const params: Record<string, unknown> = {}
      for (const k of SNAPSHOT_PARAM_KEYS) {
        const v = n.data.params[k]
        if (v != null) params[k] = v
      }
      return {
        id: n.id,
        kind: n.data.kind,
        preset: n.data.preset,
        title: n.data.title,
        prompt: n.data.prompt.slice(0, 120),
        status: n.data.status,
        hasImage: n.data.versions.some((v) => v.content?.startsWith('data:image')),
        versionCount: n.data.versions.length,
        ...(Object.keys(params).length ? { params } : {}),
      }
    }),
    edges: s.edges.map((e) => ({ source: e.source, target: e.target })),
  }
}
