import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Loader2, UsersRound, X } from 'lucide-react'
import { generateScript } from '../api'
import { useStudioStore } from '../store'
import { resolveApiModel, TEXT_MODELS } from '../nodeCatalog'
import { SHADOWS, TOKENS } from '../designTokens'
import type { ImagePreset } from '../types'

/**
 * 实体提取对话框（资产一致性入口）：
 * 剧本/分镜文本 → extract-entities 预设提取角色/场景/道具 → 勾选后批量建
 * 三视图/宫格节点并连线（可选立即生成）。生成的实体节点会在派生分镜图时
 * 按名字自动挂载为参考图。
 */

type Entity = { name: string; description: string }
type Extracted = { characters: Entity[]; scenes: Entity[]; props: Entity[] }

const GROUPS: { key: keyof Extracted; label: string; preset: ImagePreset }[] = [
  { key: 'characters', label: '角色', preset: 'char-triview' },
  { key: 'scenes', label: '场景', preset: 'scene-grid' },
  { key: 'props', label: '道具', preset: 'prop-triview' },
]

/** 容错解析（同 agentChat/parseModelJson 的提取-降级链）：剥 think/围栏 → 截取 {...} */
function parseEntities(raw: string): Extracted {
  const cleaned = raw
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
  const attempts: string[] = [cleaned]
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first >= 0 && last > first) attempts.push(cleaned.slice(first, last + 1))
  for (const text of attempts) {
    try {
      const obj = JSON.parse(text) as Partial<Record<keyof Extracted, Array<Partial<Entity>>>>
      const norm = (list?: Array<Partial<Entity>>): Entity[] =>
        (Array.isArray(list) ? list : [])
          .map((e) => ({
            name: String(e?.name ?? '').trim().slice(0, 24),
            description: String(e?.description ?? '').trim().slice(0, 200),
          }))
          .filter((e) => e.name)
      const out = { characters: norm(obj.characters), scenes: norm(obj.scenes), props: norm(obj.props) }
      if (out.characters.length + out.scenes.length + out.props.length > 0) return out
    } catch {
      /* 尝试下一种切法 */
    }
  }
  throw new Error('实体提取结果解析失败，请重试')
}

export default function EntityExtractDialog({
  sourceNodeId,
  text,
  onClose,
}: {
  sourceNodeId: string
  /** 剧本正文或分镜文本 */
  text: string
  onClose: () => void
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Extracted | null>(null)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [runNow, setRunNow] = useState(false)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    let alive = true
    const src = useStudioStore.getState().nodes.find((n) => n.id === sourceNodeId)
    generateScript({
      brief: text.slice(0, 12000),
      tone: src?.data.params.tone,
      preset: 'extract-entities',
      model: resolveApiModel(TEXT_MODELS, src?.data.params.textModel),
    })
      .then((res) => {
        if (!alive) return
        const parsed = parseEntities(res.script)
        setData(parsed)
        // 默认全选
        const all = new Set<string>()
        for (const g of GROUPS) parsed[g.key].forEach((_, i) => all.add(`${g.key}:${i}`))
        setChecked(all)
        setLoading(false)
      })
      .catch((err) => {
        if (!alive) return
        setError(err instanceof Error ? err.message : String(err))
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [sourceNodeId, text])

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const handleCreate = () => {
    if (!data || creating) return
    setCreating(true)
    const store = useStudioStore.getState()
    const src = store.nodes.find((n) => n.id === sourceNodeId)
    const baseX = (src?.position.x ?? 0) - 460
    const baseY = src?.position.y ?? 0
    let slot = 0
    const ids: string[] = []
    for (const g of GROUPS) {
      data[g.key].forEach((e, i) => {
        if (!checked.has(`${g.key}:${i}`)) return
        const id = store.addNode(
          'image',
          g.preset,
          { x: baseX, y: baseY + slot * 620 },
          { title: e.name, prompt: e.description },
        )
        store.onConnect({ source: sourceNodeId, sourceHandle: null, target: id, targetHandle: null })
        ids.push(id)
        slot++
      })
    }
    store.requestFitView()
    window.dispatchEvent(
      new CustomEvent('pineline:flash', {
        detail: ids.length
          ? `✓ 已创建 ${ids.length} 个资产节点${runNow ? '，开始生成' : '，生成后派生分镜图时会按名字自动挂载参考'}`
          : '未勾选任何实体',
      }),
    )
    if (runNow && ids.length) void store.runPipeline(ids)
    onClose()
  }

  const pickedCount = checked.size

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="提取角色 / 场景 / 道具"
        className="flex max-h-[80vh] w-[440px] flex-col rounded-[26px] border border-white/[0.08] p-[22px]"
        style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[18px] font-semibold" style={{ color: TOKENS.textTitle }}>
            <UsersRound size={18} />
            提取角色 / 场景 / 道具
          </span>
          <button onClick={onClose} className="rounded p-1 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
            <X size={16} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-[13px]" style={{ color: TOKENS.textMuted }}>
            <Loader2 size={15} className="animate-spin" /> 正在分析文本，提取一致性实体…
          </div>
        ) : error ? (
          <div className="py-12 text-center text-[13px]" style={{ color: '#E5959A' }}>
            {error}
          </div>
        ) : data ? (
          <>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
              {GROUPS.map((g) =>
                data[g.key].length ? (
                  <div key={g.key}>
                    <div className="mb-1.5 text-[12px] font-semibold" style={{ color: TOKENS.textMuted }}>
                      {g.label}（{data[g.key].length}）
                    </div>
                    <div className="space-y-1">
                      {data[g.key].map((e, i) => {
                        const key = `${g.key}:${i}`
                        return (
                          <label
                            key={key}
                            className="flex cursor-pointer items-start gap-2.5 rounded-[10px] px-2 py-1.5 transition hover:bg-white/[0.04]"
                          >
                            <input
                              type="checkbox"
                              checked={checked.has(key)}
                              onChange={() => toggle(key)}
                              className="mt-1 h-3.5 w-3.5 accent-white"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-semibold" style={{ color: TOKENS.textBody }}>
                                {e.name}
                              </span>
                              <span className="block text-[11.5px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                                {e.description}
                              </span>
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ) : null,
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-white/[0.07] pt-3">
              <label className="flex cursor-pointer items-center gap-1.5 text-[12px]" style={{ color: TOKENS.textMuted }}>
                <input
                  type="checkbox"
                  checked={runNow}
                  onChange={() => setRunNow((v) => !v)}
                  className="h-3.5 w-3.5 accent-white"
                />
                创建后立即生成参考图
              </label>
              <span className="flex-1" />
              <button
                disabled={!pickedCount || creating}
                onClick={handleCreate}
                className="rounded-[12px] px-[20px] py-2.5 text-[14px] font-bold transition hover:bg-white disabled:opacity-50"
                style={{ background: '#F5F5F7', color: '#0B0B0C' }}
              >
                创建 {pickedCount} 个资产节点
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
