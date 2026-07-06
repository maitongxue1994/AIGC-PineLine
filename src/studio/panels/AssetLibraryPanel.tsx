import { useCallback, useEffect, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import {
  ChevronDown,
  ChevronRight,
  FolderPlus,
  Plus,
  Search,
  Star,
  Trash2,
  UserRound,
} from 'lucide-react'
import {
  addFolder,
  inferAssetType,
  isPersistent,
  listAssets,
  listFolders,
  removeAsset,
  saveAsset,
  updateAsset,
  type LibraryAsset,
  type LibraryFolder,
} from '../assetdb'
import { flashUploadSkipped, readFilesAsDataUrls } from '../mediaUpload'
import { useStudioStore } from '../store'
import { useUIStore } from '../uiStore'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 素材库面板（TapNow 同款信息架构）：
 * 个人/团队 tab · 搜索 · ⭐收藏 · 文件夹树（角色/场景/道具/风格/Others）· AI 角色入口。
 * 图片存 IndexedDB，刷新后仍在——承接原 角色/场景/道具 节点的资产组织职能。
 */
export default function AssetLibraryPanel() {
  const addNode = useStudioStore((s) => s.addNode)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const setActivePanel = useUIStore((s) => s.setActivePanel)
  const { screenToFlowPosition } = useReactFlow()

  const [folders, setFolders] = useState<LibraryFolder[]>(listFolders())
  const [assets, setAssets] = useState<LibraryAsset[]>([])
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const [favOnly, setFavOnly] = useState(false)
  const [q, setQ] = useState('')

  const reload = useCallback(() => {
    void listAssets().then(setAssets)
  }, [])

  useEffect(() => {
    reload()
    window.addEventListener('pineline:library-changed', reload)
    return () => window.removeEventListener('pineline:library-changed', reload)
  }, [reload])

  const centerPos = () =>
    screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  const filtered = assets.filter(
    (a) =>
      (!favOnly || a.favorite) &&
      (!q.trim() || a.name.toLowerCase().includes(q.trim().toLowerCase())),
  )
  const byFolder = (fid: string) => filtered.filter((a) => a.folderId === fid)

  const handleUpload = (folderId: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = async () => {
      const { items, skipped } = await readFilesAsDataUrls(input.files, {
        accept: 'image/',
        max: 8,
        maxMB: 8,
      })
      for (const { file, dataUrl } of items) {
        await saveAsset({
          folderId,
          name: file.name.replace(/\.[^.]+$/, ''),
          dataUrl,
          favorite: false,
          // 上传进哪个文件夹即得哪类资产类型（角色/场景/道具/风格）
          type: inferAssetType({ folderId }),
        })
      }
      if (items.length) reload()
      flashUploadSkipped(skipped)
    }
    input.click()
  }

  return (
    <div
      className="flex max-h-[70vh] w-[300px] flex-col rounded-[20px] border border-white/[0.07]"
      style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel }}
    >
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <span className="text-[16px] font-semibold" style={{ color: TOKENS.textTitle }}>
          素材库
        </span>
        <div className="flex items-center gap-1.5">
          <button
            title="AI 角色：新建角色三视图节点"
            onClick={() => {
              addNode('image', 'char-triview', centerPos())
              setActivePanel(null)
            }}
            className="flex items-center gap-1 rounded-full bg-white/[0.07] px-2.5 py-1.5 text-[12px] transition hover:bg-white/[0.12]"
            style={{ color: TOKENS.textBody }}
          >
            <UserRound size={13} /> AI 角色
          </button>
          <button
            title="新建文件夹"
            onClick={() => {
              const name = window.prompt('新文件夹名称')?.trim()
              if (name) setFolders(addFolder(name))
            }}
            className="rounded-full bg-white/[0.07] p-1.5 transition hover:bg-white/[0.12]"
            style={{ color: TOKENS.textBody }}
          >
            <FolderPlus size={14} />
          </button>
        </div>
      </div>

      {/* 个人/团队 分段 */}
      <div className="mx-4 flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <button className="flex-1 rounded-full py-1.5 text-[13px] font-semibold" style={{ background: 'rgba(255,255,255,0.12)', color: TOKENS.textTitle }}>
          个人
        </button>
        <button disabled title="团队（规划中）" className="flex-1 cursor-not-allowed py-1.5 text-[13px] opacity-50" style={{ color: TOKENS.textMuted }}>
          团队
        </button>
      </div>

      {/* 搜索 + 收藏 */}
      <div className="flex items-center gap-2 px-4 py-2.5">
        <div
          className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <Search size={13} style={{ color: TOKENS.textMuted }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索"
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: TOKENS.textBody }}
          />
        </div>
        <button
          title="只看收藏"
          onClick={() => setFavOnly((v) => !v)}
          className="rounded-full p-2 transition hover:bg-white/[0.08]"
          style={{ color: favOnly ? '#F2C744' : TOKENS.textMuted }}
        >
          <Star size={15} fill={favOnly ? '#F2C744' : 'none'} />
        </button>
      </div>

      {!isPersistent() && (
        <div className="mx-4 mb-1 rounded-[8px] bg-yellow-500/10 px-2.5 py-1.5 text-[11px] leading-relaxed text-yellow-300/90">
          当前环境素材不持久（隐私模式？），仅本次会话有效
        </div>
      )}

      {/* 文件夹树 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-3">
        <div className="px-1.5 pb-1 pt-1.5 text-[12px]" style={{ color: TOKENS.textFaint }}>
          文件夹
        </div>
        {folders.map((f) => {
          const items = byFolder(f.id)
          const open = openFolder === f.id
          return (
            <div key={f.id}>
              <div
                className="group flex w-full items-center gap-2 rounded-[12px] px-2.5 py-3 transition hover:bg-white/[0.05]"
                style={{ background: open ? 'rgba(255,255,255,0.05)' : undefined }}
              >
                <button
                  onClick={() => setOpenFolder(open ? null : f.id)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  {open ? (
                    <ChevronDown size={12} style={{ color: TOKENS.textMuted }} />
                  ) : (
                    <ChevronRight size={12} style={{ color: TOKENS.textMuted }} />
                  )}
                  <span className="truncate text-[15px]" style={{ color: TOKENS.textBody }}>
                    {f.name}
                  </span>
                  <span className="text-[11px]" style={{ color: TOKENS.textFaint }}>
                    {items.length || ''}
                  </span>
                </button>
                <button
                  title="上传到此文件夹"
                  onClick={() => handleUpload(f.id)}
                  className="rounded p-1 opacity-0 transition hover:bg-white/[0.08] group-hover:opacity-100"
                  style={{ color: TOKENS.textMuted }}
                >
                  <Plus size={13} />
                </button>
              </div>

              {open && (
                <div className="grid grid-cols-3 gap-1.5 px-2 pb-2 pt-1">
                  {items.length === 0 && (
                    <div className="col-span-3 py-3 text-center text-[12px]" style={{ color: TOKENS.textFaint }}>
                      该文件夹暂无素材
                    </div>
                  )}
                  {items.map((a) => (
                    <div key={a.id} className="group/item relative">
                      <button
                        title={`${a.name}（点击加入画布）`}
                        onClick={() => {
                          addAssetNode(a.dataUrl, centerPos())
                          setActivePanel(null)
                        }}
                        className="block aspect-square w-full overflow-hidden rounded-[8px] border border-white/[0.08] transition hover:border-white/30"
                      >
                        <img src={a.dataUrl} alt={a.name} className="h-full w-full object-cover" />
                      </button>
                      <div className="absolute right-1 top-1 flex gap-0.5 opacity-0 transition group-hover/item:opacity-100">
                        <button
                          title={a.favorite ? '取消收藏' : '收藏'}
                          onClick={async () => {
                            await updateAsset(a.id, { favorite: !a.favorite })
                            reload()
                          }}
                          className="rounded bg-black/60 p-1 text-white backdrop-blur"
                        >
                          <Star size={10} fill={a.favorite ? '#F2C744' : 'none'} style={a.favorite ? { color: '#F2C744' } : undefined} />
                        </button>
                        <button
                          title="删除素材"
                          onClick={async () => {
                            if (window.confirm(`删除素材「${a.name}」？`)) {
                              await removeAsset(a.id)
                              reload()
                            }
                          }}
                          className="rounded bg-black/60 p-1 text-red-300 backdrop-blur"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
