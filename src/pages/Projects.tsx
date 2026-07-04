import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Clock,
  FolderPlus,
  LayoutGrid,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Rows3,
  Search,
  Trash2,
} from 'lucide-react'
import { listProjects, putProject, removeProject, type ProjectRecord } from '../studio/assetdb'
import { useStudioStore } from '../studio/store'
import { SHADOWS, TOKENS } from '../studio/designTokens'

/** 组件外的重命名落库（含时间戳），避开组件内非纯调用 */
async function renameProjectRecord(p: ProjectRecord, name: string): Promise<void> {
  await putProject({ ...p, name, updatedAt: Date.now() })
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 60_000) return '刚刚'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} 天前`
  return new Date(ts).toLocaleDateString('zh-CN')
}

/**
 * 项目管理页（参照 TapNow projects 页的粗糙实现）：
 * 个人/团队 tab（团队规划中）+ 搜索 + 网格缩略图卡片（名称/编辑时间/⋯菜单）+ 新建项目。
 * 打开项目 = 载入档案替换画布 → /studio；画布在 Studio 内 2s 防抖自动落档。
 */
export default function Projects() {
  const navigate = useNavigate()
  const loadProject = useStudioStore((s) => s.loadProject)
  const createProject = useStudioStore((s) => s.createProject)
  const detachProject = useStudioStore((s) => s.detachProject)
  const snapshotCurrentProject = useStudioStore((s) => s.snapshotCurrentProject)
  const currentProjectId = useStudioStore((s) => s.currentProjectId)

  const restoreCurrentProject = useStudioStore((s) => s.restoreCurrentProject)
  const [projects, setProjects] = useState<ProjectRecord[] | null>(null)
  const [keyword, setKeyword] = useState('')
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [renaming, setRenaming] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    // 先从档案恢复完整画布（刷新后 localStorage 是剥离版），再落档并刷新列表——
    // 顺序颠倒会用无图画布污染完整档案
    void restoreCurrentProject()
      .then(() => snapshotCurrentProject())
      .then(() => listProjects().then(setProjects))
  }, [restoreCurrentProject, snapshotCurrentProject])

  const filtered = useMemo(() => {
    const list = projects ?? []
    const kw = keyword.trim().toLowerCase()
    return kw ? list.filter((p) => p.name.toLowerCase().includes(kw)) : list
  }, [projects, keyword])

  const openProject = async (id: string) => {
    if (busy) return
    setBusy(true)
    try {
      // loadProject 内部已兜底返回 false，这里再兜一层：任何异常都不能让
      // busy 卡在 true（否则项目页所有点击被拦，表现为「项目打不开」）
      const ok = await loadProject(id)
      if (ok) navigate('/studio')
      else window.alert('项目载入失败：档案可能已损坏，请查看控制台日志')
    } finally {
      setBusy(false)
    }
  }

  const handleCreate = async () => {
    if (busy) return
    setBusy(true)
    try {
      await createProject()
      navigate('/studio')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (p: ProjectRecord) => {
    if (!window.confirm(`删除项目「${p.name}」？此操作不可恢复。`)) return
    await removeProject(p.id)
    detachProject(p.id)
    setProjects((prev) => (prev ?? []).filter((x) => x.id !== p.id))
  }

  const handleRename = async (p: ProjectRecord, name: string) => {
    const trimmed = name.trim() || p.name
    await renameProjectRecord(p, trimmed)
    if (p.id === currentProjectId) useStudioStore.getState().setProjectName(trimmed)
    setProjects((prev) =>
      (prev ?? []).map((x) => (x.id === p.id ? { ...x, name: trimmed } : x)),
    )
    setRenaming(null)
  }

  return (
    <main className="min-h-screen w-full" style={{ background: TOKENS.canvasBg }}>
      {/* 顶栏 */}
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-6 pb-2 pt-6">
        <Link
          to="/"
          title="返回首页"
          className="block h-[34px] w-[34px] shrink-0 rounded-[10px] transition hover:scale-105"
          style={{ background: TOKENS.brandGradient }}
        />
        <h1 className="text-[20px] font-semibold" style={{ color: TOKENS.textTitle }}>
          项目
        </h1>
        <span className="flex-1" />
        <button
          onClick={() => void handleCreate()}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold transition hover:opacity-90"
          style={{ background: '#F5F5F7', color: '#0B0B0C' }}
        >
          <Plus size={15} strokeWidth={2.2} /> 新建项目
        </button>
      </div>

      {/* 工具行：tab + 搜索 + 视图切换 */}
      <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 py-3">
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <button
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold"
            style={{ background: 'rgba(255,255,255,0.12)', color: TOKENS.textTitle }}
          >
            个人
          </button>
          <button
            disabled
            title="团队空间（规划中）"
            className="cursor-not-allowed rounded-full px-4 py-1.5 text-[13px] opacity-45"
            style={{ color: TOKENS.textMuted }}
          >
            团队
          </button>
        </div>
        <span className="flex-1" />
        <div
          className="flex items-center gap-2 rounded-full border border-white/[0.08] px-3.5 py-2"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <Search size={14} style={{ color: TOKENS.textMuted }} />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索项目"
            className="w-[160px] bg-transparent text-[13px] outline-none"
            style={{ color: TOKENS.textBody }}
          />
        </div>
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <button
            title="网格视图"
            className="rounded-full p-1.5"
            style={{ background: 'rgba(255,255,255,0.12)', color: TOKENS.textTitle }}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            disabled
            title="列表视图（规划中）"
            className="cursor-not-allowed rounded-full p-1.5 opacity-45"
            style={{ color: TOKENS.textMuted }}
          >
            <Rows3 size={14} />
          </button>
        </div>
      </div>

      {/* 项目网格 */}
      <div className="mx-auto max-w-[1200px] px-6 pb-16">
        {projects === null ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 size={22} className="animate-spin" style={{ color: TOKENS.textMuted }} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex h-[300px] flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-white/[0.1]"
            style={{ color: TOKENS.textFaint }}
          >
            <FolderPlus size={28} strokeWidth={1.5} />
            <span className="text-[14px]">
              {keyword ? '没有匹配的项目' : '还没有项目，点右上角「新建项目」开始'}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <div key={p.id} className="group relative">
                <button
                  onClick={() => void openProject(p.id)}
                  className="w-full overflow-hidden rounded-[16px] border border-white/[0.07] text-left transition hover:border-white/25"
                  style={{ background: 'rgba(255,255,255,0.03)', boxShadow: SHADOWS.toolbar }}
                >
                  <div className="aspect-video w-full overflow-hidden">
                    {p.thumb ? (
                      <img src={p.thumb} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(124,92,255,0.25), rgba(240,106,197,0.18) 55%, rgba(34,211,238,0.2))',
                        }}
                      />
                    )}
                  </div>
                  <div className="px-3.5 py-3">
                    {renaming === p.id ? (
                      <input
                        autoFocus
                        defaultValue={p.name}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') void handleRename(p, e.currentTarget.value)
                          if (e.key === 'Escape') setRenaming(null)
                        }}
                        onBlur={(e) => void handleRename(p, e.target.value)}
                        className="w-full rounded-md border border-white/30 bg-transparent px-1 text-[14px] font-semibold outline-none"
                        style={{ color: TOKENS.textTitle }}
                      />
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="truncate text-[14px] font-semibold"
                          style={{ color: TOKENS.textTitle }}
                        >
                          {p.name}
                        </span>
                        {p.id === currentProjectId && (
                          <span
                            className="shrink-0 rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{ background: 'rgba(63,155,245,0.18)', color: '#8FC2F8' }}
                          >
                            当前
                          </span>
                        )}
                      </div>
                    )}
                    <div
                      className="mt-1 flex items-center gap-1 text-[11px]"
                      style={{ color: TOKENS.textFaint }}
                    >
                      <Clock size={10} /> 编辑于 {timeAgo(p.updatedAt)}
                    </div>
                  </div>
                </button>

                {/* 悬停 ⋯ 菜单 */}
                <button
                  onClick={() => setMenuFor(menuFor === p.id ? null : p.id)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition group-hover:opacity-100"
                  style={{ background: 'rgba(10,10,12,0.72)', color: '#E6E6EA' }}
                >
                  <MoreHorizontal size={15} />
                </button>
                {menuFor === p.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuFor(null)} />
                    <div
                      className="absolute right-2 top-11 z-50 w-[150px] rounded-[12px] border border-white/[0.08] p-1.5"
                      style={{ background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
                    >
                      <button
                        onClick={() => {
                          setMenuFor(null)
                          setRenaming(p.id)
                        }}
                        className="flex w-full items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-[13px] transition hover:bg-white/[0.06]"
                        style={{ color: TOKENS.textBody }}
                      >
                        <Pencil size={13} /> 重命名
                      </button>
                      <button
                        onClick={() => {
                          setMenuFor(null)
                          void handleDelete(p)
                        }}
                        className="flex w-full items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-[13px] text-red-300 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={13} /> 删除
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
