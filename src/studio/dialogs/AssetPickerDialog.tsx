import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search, X } from 'lucide-react'
import { listAssets, listFolders, type LibraryAsset } from '../assetdb'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 从素材库选择图片（设计稿「选择风格图片」形制）：
 * 搜索 + 分类筛选 + 网格；确认后回填给调用方（作参考图等）。
 */
export default function AssetPickerDialog({
  title = '选择素材图片',
  onPick,
  onClose,
}: {
  title?: string
  onPick: (asset: LibraryAsset) => void
  onClose: () => void
}) {
  const [assets, setAssets] = useState<LibraryAsset[]>([])
  const [q, setQ] = useState('')
  const [folder, setFolder] = useState<string | 'all' | 'fav'>('all')
  const folders = listFolders()

  useEffect(() => {
    void listAssets().then(setAssets)
  }, [])

  const filtered = assets.filter(
    (a) =>
      (folder === 'all' || (folder === 'fav' ? a.favorite : a.folderId === folder)) &&
      (!q.trim() || a.name.toLowerCase().includes(q.trim().toLowerCase())),
  )

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex max-h-[80vh] w-[460px] flex-col rounded-[26px] border border-white/[0.08] p-[22px]"
        style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[18px] font-semibold" style={{ color: TOKENS.textTitle }}>
            {title}
          </span>
          <button onClick={onClose} className="rounded p-1 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
            <X size={16} />
          </button>
        </div>

        <div
          className="mb-3 flex items-center gap-2 rounded-full border border-white/[0.07] px-4 py-[11px]"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <Search size={15} style={{ color: TOKENS.textMuted }} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索素材"
            className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
            style={{ color: TOKENS.textBody }}
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {[
            { id: 'all' as const, name: '全部' },
            { id: 'fav' as const, name: '收藏' },
            ...folders,
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFolder(f.id)}
              className="rounded-full px-3 py-1.5 text-[13px] transition"
              style={{
                background: folder === f.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                color: folder === f.id ? TOKENS.textTitle : TOKENS.textMuted,
                boxShadow: folder === f.id ? '0 0 0 1.5px rgba(255,255,255,0.5)' : undefined,
              }}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
              素材库为空：可在节点工具栏「保存到素材库」，或在左侧素材库面板上传
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {filtered.map((a) => (
                <button
                  key={a.id}
                  title={a.name}
                  onClick={() => onPick(a)}
                  className="aspect-square overflow-hidden rounded-[10px] border border-white/[0.08] transition hover:border-white/40"
                >
                  <img src={a.dataUrl} alt={a.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
