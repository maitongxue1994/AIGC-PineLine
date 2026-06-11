import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Play,
  Download,
  Share2,
  MoreHorizontal,
  Upload,
  LayoutGrid,
  Plus,
  Sparkles,
  X,
} from 'lucide-react'
import Logo from '../components/Logo'
import StudioCanvas from '../studio/StudioCanvas'
import { useStudioStore } from '../studio/store'
import { TEMPLATES } from '../studio/templates'
import type { NodeKind, ScriptParams } from '../studio/types'

export default function Studio() {
  // 画布优先（v3 M2）：左栏只剩「资产」单入口；右侧无 Inspector；
  // 节点的所有编辑（参数/输出/重命名/运行）都在节点上完成
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-full flex-col overflow-hidden bg-bg-0 text-ink-0"
    >
      {/* top bar（relative z-30：让「更多」下拉菜单浮在画布之上，否则被 react-flow pane 盖住点不动） */}
      <header className="relative z-30 flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] bg-bg-1/70 px-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-ink-1 transition hover:bg-white/5 hover:text-white">
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">返回</span>
          </Link>
          <div className="mx-2 h-5 w-px bg-white/10" />
          <Logo size={20} />
          <div className="mx-2 h-5 w-px bg-white/10" />
          <ProjectName />
        </div>

        <ProjectActions />
      </header>

      <div className="flex min-h-0 flex-1">
        {/* 左栏：唯一「资产」入口（v3 M2，原 8 工具收敛） */}
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] bg-bg-1/50 py-3">
          <button
            title="资产库（画布全部产出，点击开/合）"
            onClick={() => setDrawerOpen((v) => !v)}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-0.5 rounded-xl text-[9px] transition ${
              drawerOpen
                ? 'bg-white/[0.08] text-white'
                : 'text-ink-2 hover:bg-white/[0.04] hover:text-white'
            }`}
          >
            <LayoutGrid size={16} />
            资产
          </button>
        </aside>

        {/* 满屏画布 + 浮动层 */}
        <section className="relative min-w-0 flex-1 overflow-hidden">
          <StudioCanvas />

          {/* 资产抽屉（按需浮出） */}
          {drawerOpen && (
            <div className="absolute bottom-0 left-0 top-0 z-20">
              <AssetDrawer />
            </div>
          )}

          {/* 空画布模板引导卡（仅新工程初始态；✕ 可关；⊞ 模板可唤起） */}
          <EmptyCanvasGuide />

          {/* 底部中央 Composer：一句话起一条管线 */}
          <Composer />
        </section>
      </div>
    </motion.main>
  )
}

/** 顶栏工程名：真实数据，可编辑，随 localStorage 持久化、随导出 JSON 携带 */
function ProjectName() {
  const projectName = useStudioStore((s) => s.projectName)
  const setProjectName = useStudioStore((s) => s.setProjectName)
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1 text-sm">
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        onBlur={(e) => {
          if (!e.target.value.trim()) setProjectName('未命名工程')
        }}
        title="点击编辑工程名"
        className="w-[150px] rounded-md border border-transparent bg-transparent px-1.5 py-0.5 font-medium text-white outline-none transition hover:border-white/10 focus:border-white/30"
      />
      <span className="chip !py-0 !text-[10px]">auto-saved</span>
    </div>
  )
}

/** 空画布引导卡：3 个模板配方，一键铺出预连节点链（应用=清空并替换画布） */
function EmptyCanvasGuide() {
  const guideOpen = useStudioStore((s) => s.guideOpen)
  const setGuideOpen = useStudioStore((s) => s.setGuideOpen)
  const applyTemplate = useStudioStore((s) => s.applyTemplate)
  const hasNodes = useStudioStore((s) => s.nodes.length > 0)
  if (!guideOpen) return null

  const handlePick = (id: (typeof TEMPLATES)[number]['id']) => {
    if (
      hasNodes &&
      !window.confirm('应用模板会清空当前画布（可先「导出」备份，⌘/Ctrl+Z 可撤销）。继续？')
    )
      return
    applyTemplate(id)
  }

  return (
    <div className="absolute inset-0 z-10">
      {/* 蒙层：压暗背后节点避免视觉重叠，点击即关闭 */}
      <div
        className="absolute inset-0 bg-bg-0/80 backdrop-blur-[2px]"
        onClick={() => setGuideOpen(false)}
      />
      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-4">
        <div className="pointer-events-auto relative flex flex-col items-center gap-4">
        <button
          onClick={() => setGuideOpen(false)}
          title="关闭引导，使用空白画布"
          className="absolute -right-2 -top-9 rounded-lg border border-white/[0.08] bg-bg-2/90 p-1.5 text-ink-2 backdrop-blur transition hover:text-white"
        >
          <X size={13} />
        </button>
        <p className="text-[13px] text-ink-2">从一个模板开始，或在下方输入一句话创意 ↓</p>
        <div className="flex gap-3.5">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => handlePick(t.id)}
              className="w-[150px] rounded-2xl border border-white/[0.08] bg-bg-2/95 p-4 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-white/30"
            >
              <span className="text-xl">{t.emoji}</span>
              <span className="mt-2 block text-[13px] font-semibold text-white">{t.title}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-ink-2">{t.desc}</span>
            </button>
          ))}
          </div>
          <span className="text-xs text-ink-3">▽</span>
        </div>
      </div>
    </div>
  )
}

function Composer() {
  const [brief, setBrief] = useState('')
  const createPipelineFromBrief = useStudioStore((s) => s.createPipelineFromBrief)
  const runPipeline = useStudioStore((s) => s.runPipeline)
  const pipelineRunning = useStudioStore((s) => s.pipelineRunning)

  const handleCreate = (run: boolean) => {
    const text = brief.trim()
    if (!text) return
    const ids = createPipelineFromBrief(text)
    setBrief('')
    if (run) void runPipeline(ids)
  }

  return (
    <div className="absolute bottom-4 left-1/2 z-20 w-[min(620px,calc(100%-32px))] -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-bg-1/95 p-2 pl-4 shadow-2xl backdrop-blur">
        <Sparkles size={15} className="shrink-0 text-brand" />
        <input
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              handleCreate(e.metaKey || e.ctrlKey)
            }
          }}
          placeholder="一句话描述你的创意，例如：雨夜屋顶，少年与无人机群对视…"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink-0 outline-none placeholder:text-ink-3"
        />
        <button
          onClick={() => handleCreate(false)}
          disabled={!brief.trim()}
          title="创建 剧本→分镜→分镜图 节点链（Enter）"
          className="btn-ghost shrink-0 !px-3 !py-1.5 !text-xs disabled:cursor-not-allowed disabled:opacity-40"
        >
          创建管线
        </button>
        <button
          onClick={() => handleCreate(true)}
          disabled={!brief.trim() || pipelineRunning}
          title="创建并立即按依赖运行（⌘/Ctrl+Enter）"
          className="btn-primary shrink-0 !px-3 !py-1.5 !text-xs disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play size={11} fill="#fff" />
          创建并运行
        </button>
      </div>
      <div className="mt-1 text-center text-[10px] text-ink-3">
        将创建预连好的 剧本 → 分镜 → 分镜图 链 · P3 将升级为多轮 Agent
      </div>
    </div>
  )
}

function ProjectActions() {
  const runPipeline = useStudioStore((s) => s.runPipeline)
  const pipelineRunning = useStudioStore((s) => s.pipelineRunning)
  const exportProject = useStudioStore((s) => s.exportProject)
  const importProject = useStudioStore((s) => s.importProject)

  const [toast, setToast] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flash = (msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    },
    [],
  )

  const handleExport = () => {
    const blob = new Blob([exportProject()], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const name = useStudioStore.getState().projectName.trim() || 'pineline'
    a.download = `${name}-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    flash('工程已导出为 JSON')
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(exportProject())
      flash('工程已复制到剪贴板')
    } catch {
      flash('复制失败：浏览器拒绝了剪贴板访问')
    }
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // 重置以便能重复选同一文件
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importProject(String(reader.result ?? ''))
        flash('工程已导入')
      } catch (err) {
        flash(err instanceof Error ? err.message : '导入失败')
      }
    }
    reader.onerror = () => flash('读取文件失败')
    reader.readAsText(file)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="btn-ghost !py-1.5 !text-xs"
        title="复制工程 JSON 到剪贴板，便于分享给协作者"
      >
        <Share2 size={12} /> 分享
      </button>

      <button
        onClick={() => runPipeline()}
        disabled={pipelineRunning}
        className="btn-primary !py-1.5 !text-xs disabled:cursor-not-allowed disabled:opacity-70"
        title="按依赖顺序运行画布上的全部节点"
      >
        {pipelineRunning ? (
          <>
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-white" /> 运行中…
          </>
        ) : (
          <>
            <Play size={12} fill="#fff" /> 运行管线
          </>
        )}
      </button>

      <button onClick={handleExport} className="btn-ghost !p-1.5" title="导出工程为 JSON 文件">
        <Download size={13} />
      </button>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="btn-ghost !p-1.5"
          title="更多"
        >
          <MoreHorizontal size={13} />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-lg border border-white/10 bg-bg-2/95 py-1 text-xs shadow-xl backdrop-blur">
              {/* 「新建空工程」已与画布左上角「↺ 清空画布」合并（评审反馈：藏在这里太隐蔽） */}
              <button
                onClick={() => {
                  setMenuOpen(false)
                  fileRef.current?.click()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-ink-1 transition hover:bg-white/5 hover:text-white"
              >
                <Upload size={13} /> 导入工程…
              </button>
            </div>
          </>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleImportFile}
      />

      {toast && (
        <div className="pointer-events-none fixed left-1/2 top-16 z-[60] -translate-x-1/2 rounded-md border border-white/10 bg-bg-2/95 px-4 py-2 text-xs text-white shadow-xl backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  )
}

/** 各工具对应的"新建节点"动作；audio 尚无节点类型 */
function useAdders(): Record<string, (() => string) | undefined> {
  const addScriptNode = useStudioStore((s) => s.addScriptNode)
  const addImageNode = useStudioStore((s) => s.addImageNode)
  const addStoryboardNode = useStudioStore((s) => s.addStoryboardNode)
  const addSceneNode = useStudioStore((s) => s.addSceneNode)
  const addCharacterNode = useStudioStore((s) => s.addCharacterNode)
  const addPropNode = useStudioStore((s) => s.addPropNode)
  const addShotNode = useStudioStore((s) => s.addShotNode)
  return {
    script: addScriptNode,
    storyboard: addStoryboardNode,
    scene: addSceneNode,
    shot: addShotNode,
    character: addCharacterNode,
    prop: addPropNode,
    image: addImageNode,
  }
}

/** 统一资产抽屉（v3 M2）：原 8 个面板按类型收敛为 tab，内容全部来自画布真实节点 */
const DRAWER_TABS = ['全部', '剧本', '分镜', '图像', '角色', '素材'] as const
type DrawerTab = (typeof DRAWER_TABS)[number]

function AssetDrawer() {
  const [tab, setTab] = useState<DrawerTab>('全部')
  const adders = useAdders()
  // 各 tab 的「+」新建动作；全部/素材没有单一对应节点类型
  const ADD_BY_TAB: Partial<Record<DrawerTab, (() => string) | undefined>> = {
    剧本: adders.script,
    分镜: adders.storyboard,
    图像: adders.image,
    角色: adders.character,
  }
  const onAdd = ADD_BY_TAB[tab]

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-white/[0.06] bg-bg-1/90 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="font-display text-sm font-semibold text-white">资产库</div>
        {onAdd && (
          <button
            onClick={() => onAdd()}
            title="在画布上新建该类型节点"
            className="rounded-md p-1 text-ink-2 hover:bg-white/5 hover:text-white"
          >
            <Plus size={13} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1 border-b border-white/[0.06] px-3 py-2">
        {DRAWER_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-2.5 py-1 text-[11px] transition ${
              tab === t
                ? 'bg-white/10 text-white'
                : 'text-ink-2 hover:bg-white/[0.04] hover:text-ink-1'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === '全部' && (
          <NodeImageLibrary
            kinds={['image', 'asset', 'scene', 'character', 'prop', 'shot']}
            emptyText="画布上所有节点的产出图会汇总到这里。从模板或底部 Composer 开始创作吧。"
          />
        )}
        {tab === '剧本' && <ScriptPanel />}
        {tab === '分镜' && <BoardPanel />}
        {tab === '图像' && (
          <NodeImageLibrary
            kinds={['image', 'scene', 'prop', 'shot']}
            emptyText="还没有生成图。新建「图像」节点，或运行场景/道具/分镜图节点。"
            addLabel="新建图像节点"
            addKind="image"
          />
        )}
        {tab === '角色' && <ActorLibrary />}
        {tab === '素材' && (
          <NodeImageLibrary
            kinds={['asset']}
            emptyText="把图片直接拖进画布，会生成「上传素材」节点并汇总到这里，连到下游作参考图。"
          />
        )}
      </div>
    </aside>
  )
}

function PanelStatus({ status }: { status: string }) {
  const MAP: Record<string, [string, string]> = {
    running: ['生成中', 'text-brand'],
    done: ['完成', 'text-[#B6FF5F]'],
    error: ['失败', 'text-red-400'],
    idle: ['待运行', 'text-ink-3'],
  }
  const [label, cls] = MAP[status] ?? MAP.idle
  return <span className={`shrink-0 text-[10px] ${cls}`}>{label}</span>
}

function PanelEmpty({
  text,
  actionLabel,
  onAdd,
}: {
  text: string
  actionLabel?: string
  onAdd?: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center text-[11px] text-ink-3">
      <p className="leading-relaxed">{text}</p>
      {onAdd && actionLabel && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-md border border-dashed border-white/15 px-3 py-2 text-xs text-ink-1 transition hover:border-white/30 hover:text-white"
        >
          <Plus size={12} /> {actionLabel}
        </button>
      )}
    </div>
  )
}

function ScriptPanel() {
  const nodes = useStudioStore((s) => s.nodes)
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId)
  const focusNode = useStudioStore((s) => s.focusNode)
  const adders = useAdders()
  const scripts = nodes.filter((n) => n.data.kind === 'script')

  if (!scripts.length)
    return (
      <PanelEmpty
        text="画布上还没有剧本节点。填一句创意简述，AI 帮你写出完整剧本。"
        actionLabel="新建剧本节点"
        onAdd={adders.script}
      />
    )

  return (
    <div className="p-2">
      {scripts.map((n) => {
        const p = n.data.params as ScriptParams
        return (
          <button
            key={n.id}
            onClick={() => focusNode(n.id)}
            className={`mb-1 w-full rounded-lg border p-3 text-left transition ${
              n.id === selectedNodeId
                ? 'border-white/15 bg-white/[0.04]'
                : 'border-transparent hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium text-white">{n.data.title}</span>
              <PanelStatus status={n.data.status} />
            </div>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-2">
              {n.data.output || p.brief || '（空白，点击选中后在节点上填写）'}
            </p>
          </button>
        )
      })}
    </div>
  )
}

function BoardPanel() {
  const nodes = useStudioStore((s) => s.nodes)
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId)
  const focusNode = useStudioStore((s) => s.focusNode)
  const adders = useAdders()
  const boards = nodes.filter((n) => n.data.kind === 'storyboard')

  if (!boards.length)
    return (
      <PanelEmpty
        text="还没有分镜节点。从剧本节点拖一条线出来选「分镜」，AI 把剧本拆成镜头序列。"
        actionLabel="新建分镜节点"
        onAdd={adders.storyboard}
      />
    )

  return (
    <div className="p-2">
      {boards.map((n) => {
        const shots = n.data.shots ?? []
        return (
          <button
            key={n.id}
            onClick={() => focusNode(n.id)}
            className={`mb-1 w-full rounded-lg border p-3 text-left transition ${
              n.id === selectedNodeId
                ? 'border-white/15 bg-white/[0.04]'
                : 'border-transparent hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium text-white">{n.data.title}</span>
              <PanelStatus status={n.data.status} />
            </div>
            {shots.length > 0 ? (
              <div className="mt-1.5 space-y-0.5">
                {shots.slice(0, 4).map((s, i) => (
                  <div key={s.id} className="truncate text-[11px] text-ink-2">
                    <span className="text-ink-3">#{i + 1}</span> {s.title}
                  </div>
                ))}
                {shots.length > 4 && (
                  <div className="text-[10px] text-ink-3">… 共 {shots.length} 个镜头</div>
                )}
              </div>
            ) : (
              <p className="mt-1 text-[11px] text-ink-3">尚未拆分镜头，运行节点后在此列出</p>
            )}
          </button>
        )
      })}
    </div>
  )
}

/** 把指定类型节点的图片产出汇总成网格；点击缩略图选中对应画布节点 */
function NodeImageLibrary({
  kinds,
  emptyText,
  addLabel,
  addKind,
}: {
  kinds: NodeKind[]
  emptyText: string
  addLabel?: string
  addKind?: string
}) {
  const nodes = useStudioStore((s) => s.nodes)
  const focusNode = useStudioStore((s) => s.focusNode)
  const adders = useAdders()
  const owned = nodes.filter((n) => kinds.includes(n.data.kind))

  const items = owned.flatMap((n) => {
    const imgs = [n.data.output, ...(n.data.outputs ?? [])].filter(
      (x): x is string => !!x && x.startsWith('data:image'),
    )
    return [...new Set(imgs)].map((src, i) => ({
      key: `${n.id}-${i}`,
      nodeId: n.id,
      title: n.data.title,
      src,
    }))
  })

  if (!owned.length)
    return (
      <PanelEmpty
        text={emptyText}
        actionLabel={addLabel}
        onAdd={addKind ? adders[addKind] : undefined}
      />
    )

  if (!items.length)
    return (
      <PanelEmpty
        text={`已有 ${owned.length} 个节点，还没有产出图。点节点 ▶ 或顶栏「运行管线」，产出会汇总到这里。`}
      />
    )

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => focusNode(it.nodeId)}
          title={it.title}
          className="group overflow-hidden rounded-md border border-white/[0.07] text-left transition hover:border-white/25"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={it.src}
              alt={it.title}
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          </div>
          <div className="truncate px-2 py-1 text-[10px] text-ink-1">{it.title}</div>
        </button>
      ))}
    </div>
  )
}

function ActorLibrary() {
  const nodes = useStudioStore((s) => s.nodes)
  const focusNode = useStudioStore((s) => s.focusNode)
  const adders = useAdders()
  const actors = nodes.filter((n) => n.data.kind === 'character')

  if (!actors.length)
    return (
      <PanelEmpty
        text="还没有角色节点。填一句角色描述，生成前/侧/背三视图，保持全片角色一致。"
        actionLabel="新建角色节点"
        onAdd={adders.character}
      />
    )

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {actors.map((n) => {
        const img = [n.data.output, ...(n.data.outputs ?? [])].find(
          (x): x is string => !!x && x.startsWith('data:image'),
        )
        return (
          <button
            key={n.id}
            onClick={() => focusNode(n.id)}
            className="overflow-hidden rounded-md border border-white/[0.07] text-left transition hover:border-white/25"
          >
            {img ? (
              <img src={img} alt={n.data.title} className="aspect-[3/4] w-full object-cover" />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-[#1a0f0a] to-[#2a0a14] text-[10px] text-ink-3">
                未生成
              </div>
            )}
            <div className="truncate px-2 py-1.5 text-xs text-white">{n.data.title}</div>
          </button>
        )
      })}
      <button
        onClick={() => adders.character?.()}
        className="col-span-2 flex items-center justify-center gap-2 rounded-md border border-dashed border-white/15 py-3 text-xs text-ink-2 transition hover:border-white/30 hover:text-white"
      >
        <Plus size={12} /> 新建角色节点
      </button>
    </div>
  )
}
