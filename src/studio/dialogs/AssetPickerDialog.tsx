import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search, X } from 'lucide-react'
import {
  listAssets,
  listFolders,
  listHistory,
  type HistoryEntry,
  type LibraryAsset,
} from '../assetdb'
import { SHADOWS, TOKENS } from '../designTokens'

export type PickedMedia = {
  dataUrl: string
  name: string
  kind: 'image' | 'video'
}

type MediaKind = 'image' | 'video'

const mediaKindOf = (dataUrl: string): MediaKind =>
  dataUrl.startsWith('data:video') ? 'video' : 'image'

/** 视频 dataURL 无 poster 时用 <video> 显示首帧（不可交互，纯缩略） */
function MediaThumb({ dataUrl, poster, name }: { dataUrl: string; poster?: string; name: string }) {
  if (mediaKindOf(dataUrl) === 'video') {
    return poster ? (
      <img src={poster} alt={name} className="h-full w-full object-cover" />
    ) : (
      <video src={dataUrl} muted playsInline preload="metadata" className="pointer-events-none h-full w-full object-cover" />
    )
  }
  return <img src={dataUrl} alt={name} className="h-full w-full object-cover" />
}

/**
 * 素材选择器（设计稿「选择风格图片」形制）：素材库 / 生成历史 双 tab，
 * 搜索 + 分类筛选 + 网格；确认后回填给调用方（参考图/全能参考等）。
 * kinds 过滤媒体类型（视频参考场景传 ['video']）。
 */
export default function AssetPickerDialog({
  title = '选择素材',
  kinds = ['image'],
  initialTab = 'library',
  onPick,
  onClose,
}: {
  title?: string
  /** 允许选择的媒体类型（按 dataURL mime / 历史 kind 过滤） */
  kinds?: MediaKind[]
  initialTab?: 'library' | 'history'
  onPick: (picked: PickedMedia) => void
  onClose: () => void
}) {
  const [tab, setTab] = useState<'library' | 'history'>(initialTab)
  const [assets, setAssets] = useState<LibraryAsset[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [q, setQ] = useState('')
  const [folder, setFolder] = useState<string | 'all' | 'fav'>('all')
  const folders = listFolders()

  useEffect(() => {
    void listAssets().then(setAssets)
    void listHistory().then(setHistory)
  }, [])

  const kw = q.trim().toLowerCase()
  const filteredAssets = assets.filter(
    (a) =>
      kinds.includes(mediaKindOf(a.dataUrl)) &&
      (folder === 'all' || (folder === 'fav' ? a.favorite : a.folderId === folder)) &&
      (!kw || a.name.toLowerCase().includes(kw)),
  )
  const filteredHistory = history.filter(
    (h) =>
      kinds.includes(h.kind as MediaKind) &&
      h.content.startsWith('data:') &&
      (!kw || h.prompt.toLowerCase().includes(kw) || (h.label ?? '').toLowerCase().includes(kw)),
  )

  const tabBtn = (id: 'library' | 'history', label: string) => (
    <button
      key={id}
      onClick={() => setTab(id)}
      className="rounded-full px-3.5 py-1.5 text-[13px] font-medium transition"
      style={{
        background: tab === id ? 'rgba(255,255,255,0.14)' : 'transparent',
        color: tab === id ? TOKENS.textTitle : TOKENS.textMuted,
      }}
    >
      {label}
    </button>
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
          className="mb-3 flex w-fit items-center gap-1 rounded-full border border-white/[0.07] p-1"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          {tabBtn('library', '素材库')}
          {tabBtn('history', '生成历史')}
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
            placeholder={tab === 'library' ? '搜索素材' : '搜索生成历史（按提示词）'}
            className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
            style={{ color: TOKENS.textBody }}
          />
        </div>

        {tab === 'library' && (
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
        )}

        <div className="min-h-0 flex-1 overflow-y-auto">
          {tab === 'library' ? (
            filteredAssets.length === 0 ? (
              <div className="py-12 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
                素材库为空：可在节点工具栏「保存到素材库」，或在左侧素材库面板上传
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {filteredAssets.map((a) => (
                  <button
                    key={a.id}
                    title={a.name}
                    onClick={() =>
                      onPick({ dataUrl: a.dataUrl, name: a.name, kind: mediaKindOf(a.dataUrl) })
                    }
                    className="aspect-square overflow-hidden rounded-[10px] border border-white/[0.08] transition hover:border-white/40"
                  >
                    <MediaThumb dataUrl={a.dataUrl} name={a.name} />
                  </button>
                ))}
              </div>
            )
          ) : filteredHistory.length === 0 ? (
            <div className="py-12 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
              暂无匹配的生成历史（成功生成的图片/视频会自动入历史）
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {filteredHistory.map((h) => (
                <button
                  key={h.id}
                  title={h.prompt || h.label || '生成历史'}
                  onClick={() =>
                    onPick({
                      dataUrl: h.content,
                      name: (h.label || h.prompt || '生成历史').slice(0, 40),
                      kind: h.kind as MediaKind,
                    })
                  }
                  className="relative aspect-square overflow-hidden rounded-[10px] border border-white/[0.08] transition hover:border-white/40"
                >
                  <MediaThumb dataUrl={h.content} poster={h.poster} name={h.prompt} />
                  {h.kind === 'video' && (
                    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-[9px] text-white">
                      视频
                    </span>
                  )}
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
