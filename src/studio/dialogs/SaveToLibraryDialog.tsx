import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRight, Folder, FolderPlus, Star } from 'lucide-react'
import {
  addFolder,
  ASSET_TYPE_OPTIONS,
  inferAssetType,
  listFolders,
  saveAsset,
  type AssetType,
} from '../assetdb'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 「保存到素材库」模态（设计稿 §06，400px 居中）：
 * 个人/团队分段 · 文件夹树选择 · 取消/白色保存主按钮。
 */
export default function SaveToLibraryDialog({
  dataUrl,
  defaultName,
  sourceNodeId,
  onClose,
}: {
  dataUrl: string
  defaultName: string
  sourceNodeId?: string
  onClose: () => void
}) {
  const [folders, setFolders] = useState(listFolders())
  const [picked, setPicked] = useState(folders[0]?.id ?? 'others')
  // 资产类型（驱动一致性自动挂载）：未手选时跟随所选文件夹推断
  const [pickedType, setPickedType] = useState<AssetType | null>(null)
  const [saving, setSaving] = useState(false)
  const effectiveType = pickedType ?? inferAssetType({ folderId: picked })

  const handleSave = async () => {
    setSaving(true)
    await saveAsset({
      folderId: picked,
      name: defaultName,
      dataUrl,
      favorite: false,
      type: effectiveType,
      ...(sourceNodeId ? { sourceNodeId } : {}),
    })
    window.dispatchEvent(new CustomEvent('pineline:library-changed'))
    window.dispatchEvent(
      new CustomEvent('pineline:flash', { detail: '已保存到素材库（刷新后仍可用）' }),
    )
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="保存到素材库"
        className="w-[400px] rounded-[26px] border border-white/[0.08] p-[26px]"
        style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[18px] font-semibold" style={{ color: TOKENS.textTitle }}>
            <Star size={19} />
            保存到素材库
          </span>
          <button
            onClick={() => {
              const name = window.prompt('新文件夹名称')?.trim()
              if (name) setFolders(addFolder(name))
            }}
            className="flex items-center gap-1 text-[14px] transition hover:text-white"
            style={{ color: TOKENS.textBody }}
          >
            <FolderPlus size={14} /> 新建文件夹
          </button>
        </div>

        {/* 个人/团队 分段 */}
        <div className="mb-3 flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <button className="flex-1 rounded-full py-[9px] text-[14px] font-semibold" style={{ background: 'rgba(255,255,255,0.12)', color: TOKENS.textTitle }}>
            个人
          </button>
          <button disabled title="团队（规划中）" className="flex-1 cursor-not-allowed py-[9px] text-[14px] opacity-50" style={{ color: TOKENS.textMuted }}>
            团队
          </button>
        </div>

        {/* 预览 + 文件夹树 */}
        <div className="mb-4 flex gap-3">
          <img
            src={dataUrl}
            alt={defaultName}
            className="h-24 w-24 shrink-0 rounded-[12px] border border-white/[0.1] object-cover"
          />
          <div className="max-h-48 min-w-0 flex-1 overflow-y-auto">
            {folders.map((f) => (
              <button
                key={f.id}
                onClick={() => setPicked(f.id)}
                className="flex w-full items-center gap-2.5 rounded-[12px] px-2.5 py-3 text-left transition hover:bg-white/[0.05]"
                style={{ background: picked === f.id ? 'rgba(255,255,255,0.07)' : undefined }}
              >
                <ChevronRight size={12} style={{ color: TOKENS.textMuted }} />
                <Folder size={17} style={{ color: TOKENS.textMuted }} />
                <span className="min-w-0 flex-1 truncate text-[15px]" style={{ color: TOKENS.textBody }}>
                  {f.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 资产类型（默认随文件夹推断；派生分镜图/视频时按类型自动挂参考） */}
        <div className="mb-4">
          <div className="mb-1.5 text-[12px]" style={{ color: TOKENS.textFaint }}>
            资产类型（用于管线自动挂载参考）
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ASSET_TYPE_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => setPickedType(t.id)}
                className="rounded-full px-3 py-1.5 text-[13px] transition"
                style={{
                  background:
                    effectiveType === t.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                  color: effectiveType === t.id ? TOKENS.textTitle : TOKENS.textMuted,
                  boxShadow:
                    effectiveType === t.id ? '0 0 0 1.5px rgba(255,255,255,0.5)' : undefined,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="rounded-[12px] px-[22px] py-2.5 text-[14px] font-semibold transition hover:bg-white/[0.12]"
            style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
          >
            取消
          </button>
          <button
            disabled={saving}
            onClick={handleSave}
            className="rounded-[12px] px-[22px] py-2.5 text-[14px] font-bold transition hover:bg-white disabled:opacity-60"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            {saving ? '保存中…' : '保存'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
