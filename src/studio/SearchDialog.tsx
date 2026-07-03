import { useMemo, useRef, useState } from 'react'
import { FileText, Image as ImageIcon, ImagePlus, Search } from 'lucide-react'
import { useStudioStore } from './store'
import { useUIStore } from './uiStore'
import { activeContent, isImageContent, type NodeKind } from './types'
import { presetMeta } from './nodeCatalog'
import { SHADOWS, TOKENS } from './designTokens'

const TABS: { key: NodeKind | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'image', label: '图片' },
  { key: 'text', label: '文本' },
  { key: 'asset', label: '素材' },
]

/** ⌘F 搜索节点：居中命令面板，匹配标题/提示词/文本产出，点击跳转聚焦（带入视口） */
export default function SearchDialog() {
  const open = useUIStore((s) => s.searchOpen)
  const setOpen = useUIStore((s) => s.setSearchOpen)
  // 关闭即卸载，重开时状态天然重置
  if (!open) return null
  return <SearchPanel onClose={() => setOpen(false)} />
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const nodes = useStudioStore((s) => s.nodes)
  const focusNode = useStudioStore((s) => s.focusNode)
  const [q, setQ] = useState('')
  const [tab, setTab] = useState<NodeKind | 'all'>('all')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const results = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return nodes
      .filter((n) => tab === 'all' || n.data.kind === tab)
      .map((n) => {
        const text = activeContent(n.data)
        const thumb = n.data.versions.find((v) => isImageContent(v.content))?.content ?? null
        const excerpt = n.data.prompt || (text && !isImageContent(text) ? text : '') || ''
        return { id: n.id, kind: n.data.kind, title: n.data.title, preset: n.data.preset, thumb, excerpt }
      })
      .filter(
        (r) =>
          !kw ||
          r.title.toLowerCase().includes(kw) ||
          r.excerpt.toLowerCase().includes(kw),
      )
      .slice(0, 30)
  }, [nodes, q, tab])

  return (
    <div
      className="absolute inset-0 z-40 flex items-start justify-center bg-black/40 pt-[16vh]"
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-[92vw] overflow-hidden rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.menu }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
          <Search size={17} style={{ color: TOKENS.textMuted }} />
          <input
            ref={inputRef}
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation()
              if (e.key === 'Escape') onClose()
              if (e.key === 'Enter' && results[0]) {
                focusNode(results[0].id)
                onClose()
              }
            }}
            placeholder="搜索节点…"
            className="min-w-0 flex-1 bg-transparent text-[16px] outline-none"
            style={{ color: TOKENS.textBody }}
          />
        </div>

        <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition"
              style={{
                background: tab === t.key ? 'rgba(255,255,255,0.1)' : undefined,
                color: tab === t.key ? TOKENS.textTitle : TOKENS.textMuted,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-h-[46vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
              暂无可搜索节点
            </div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  focusNode(r.id)
                  onClose()
                }}
                className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition hover:bg-white/[0.05]"
              >
                <span className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-white/[0.05]">
                  {r.thumb ? (
                    <img src={r.thumb} alt="" className="h-full w-full object-cover" />
                  ) : r.kind === 'text' ? (
                    <FileText size={16} style={{ color: TOKENS.textMuted }} />
                  ) : r.kind === 'asset' ? (
                    <ImagePlus size={16} style={{ color: TOKENS.textMuted }} />
                  ) : (
                    <ImageIcon size={16} style={{ color: TOKENS.textMuted }} />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold" style={{ color: TOKENS.textBody }}>
                    {r.title}
                    <span className="ml-2 text-[11px] font-normal" style={{ color: TOKENS.textFaint }}>
                      {presetMeta(r.preset)?.label ?? (r.kind === 'asset' ? '素材' : '')}
                    </span>
                  </span>
                  <span className="block truncate text-[12px]" style={{ color: TOKENS.textMuted }}>
                    {r.excerpt || '无提示词'}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
