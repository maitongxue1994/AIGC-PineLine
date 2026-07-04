import { useEffect, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { FileText, Film } from 'lucide-react'
import { listHistory, type HistoryEntry } from '../assetdb'
import { useStudioStore } from '../store'
import { useUIStore } from '../uiStore'
import { SHADOWS, TOKENS } from '../designTokens'

/** 生成历史面板：图片/视频/文本 tab，按日期分组；点击回源节点或重新入画布 */
export default function HistoryPanel() {
  const focusNode = useStudioStore((s) => s.focusNode)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const addVideoNode = useStudioStore((s) => s.addVideoNode)
  const addNode = useStudioStore((s) => s.addNode)
  const updateActiveContent = useStudioStore((s) => s.updateActiveContent)
  const setActivePanel = useUIStore((s) => s.setActivePanel)
  const { screenToFlowPosition } = useReactFlow()

  const [rows, setRows] = useState<HistoryEntry[]>([])
  const [tab, setTab] = useState<'image' | 'video' | 'text'>('image')

  useEffect(() => {
    void listHistory().then(setRows)
  }, [])

  const centerPos = () =>
    screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  const items = rows.filter((r) => r.kind === tab)
  const counts = {
    image: rows.filter((r) => r.kind === 'image').length,
    video: rows.filter((r) => r.kind === 'video').length,
    text: rows.filter((r) => r.kind === 'text').length,
  }

  // 按日期分组
  const groups = new Map<string, HistoryEntry[]>()
  for (const r of items) {
    const d = new Date(r.createdAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(r)
  }

  const handlePick = (r: HistoryEntry) => {
    const exists = useStudioStore.getState().nodes.some((n) => n.id === r.nodeId)
    if (exists) {
      focusNode(r.nodeId)
    } else if (r.kind === 'image') {
      // 源节点已删：以素材节点重新入画布
      addAssetNode(r.content, centerPos())
    } else if (r.kind === 'video') {
      addVideoNode(r.content, centerPos())
    } else {
      const id = addNode('text', 'free', centerPos(), { title: '历史文本', prompt: r.prompt })
      updateActiveContent(id, r.content)
    }
    setActivePanel(null)
  }

  return (
    <div
      className="flex max-h-[70vh] w-[320px] flex-col rounded-[20px] border border-white/[0.07]"
      style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel }}
    >
      <div className="flex items-center gap-4 border-b border-white/[0.07] px-4 pb-2.5 pt-4">
        {(
          [
            ['image', `图片 (${counts.image})`],
            ['video', `视频 (${counts.video})`],
            ['text', `文本 (${counts.text})`],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="pb-1 text-[14px] font-semibold transition"
            style={{
              color: tab === k ? TOKENS.textTitle : TOKENS.textMuted,
              borderBottom: tab === k ? '2px solid #F5F5F7' : '2px solid transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {items.length === 0 && (
          <div className="py-10 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
            还没有生成记录
          </div>
        )}
        {[...groups.entries()].map(([date, list]) => (
          <div key={date} className="mb-3">
            <div className="mb-1.5 px-1 text-[13px] font-semibold" style={{ color: TOKENS.textBody }}>
              {date}
            </div>
            {tab === 'image' ? (
              <div className="grid grid-cols-3 gap-1.5">
                {list.map((r) => (
                  <button
                    key={r.id}
                    title={`${r.prompt || '（无提示词）'}\n点击回到源节点 / 重新入画布`}
                    onClick={() => handlePick(r)}
                    className="relative aspect-square overflow-hidden rounded-[8px] border border-white/[0.08] transition hover:border-white/30"
                  >
                    <img src={r.content} alt="" className="h-full w-full object-cover" />
                    {r.label && (
                      <span className="absolute inset-x-0 bottom-0 bg-black/65 text-center text-[9px] leading-4 text-white/90">
                        {r.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : tab === 'video' ? (
              <div className="grid grid-cols-2 gap-1.5">
                {list.map((r) => (
                  <button
                    key={r.id}
                    title={`${r.prompt || '（无提示词）'}\n点击回到源节点 / 重新入画布`}
                    onClick={() => handlePick(r)}
                    className="relative aspect-video overflow-hidden rounded-[8px] border border-white/[0.08] transition hover:border-white/30"
                  >
                    {r.poster ? (
                      <img src={r.poster} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-white/[0.05]">
                        <Film size={16} style={{ color: TOKENS.textMuted }} />
                      </span>
                    )}
                    <span className="absolute bottom-1 left-1 rounded bg-black/65 px-1 text-[9px] leading-4 text-white/90">
                      视频
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {list.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handlePick(r)}
                    className="flex w-full items-start gap-2.5 rounded-[10px] bg-white/[0.04] p-2.5 text-left transition hover:bg-white/[0.07]"
                  >
                    <FileText size={14} className="mt-0.5 shrink-0" style={{ color: TOKENS.textMuted }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px]" style={{ color: TOKENS.textBody }}>
                        {r.prompt || '（无提示词）'}
                      </span>
                      <span className="line-clamp-2 text-[11px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                        {r.content}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
