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
  FilePlus2,
  FileText,
  Clapperboard,
  Film,
  Image as ImageIcon,
  Mountain,
  Users,
  Music2,
  Package,
  Plus,
  Sparkles,
} from 'lucide-react'
import Logo from '../components/Logo'
import StudioCanvas from '../studio/StudioCanvas'
import { useStudioStore } from '../studio/store'
import type { NodeKind, ScriptParams } from '../studio/types'

const TOOLS = [
  { id: 'script',     icon: FileText,     label: '剧本' },
  { id: 'storyboard', icon: Clapperboard, label: '分镜' },
  { id: 'scene',      icon: Mountain,     label: '场景' },
  { id: 'shot',       icon: Film,         label: '镜头' },
  { id: 'character',  icon: Users,        label: '角色' },
  { id: 'prop',       icon: Package,      label: '道具' },
  { id: 'image',      icon: ImageIcon,    label: '素材' },
  { id: 'audio',      icon: Music2,       label: '音画' },
]

export default function Studio() {
  // 画布优先：抽屉默认收起，点工具开/再点收起；新建节点走面板「+」、双击画布或拖线菜单
  // v3：右侧 Inspector 已移除——节点的所有编辑（参数/输出/重命名/运行）都在节点上完成
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const handleToolClick = (id: string) =>
    setActiveTool((prev) => (prev === id ? null : id))

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-full flex-col overflow-hidden bg-bg-0 text-ink-0"
    >
      {/* top bar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] bg-bg-1/70 px-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-ink-1 transition hover:bg-white/5 hover:text-white">
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">返回</span>
          </Link>
          <div className="mx-2 h-5 w-px bg-white/10" />
          <Logo size={20} />
          <div className="mx-2 h-5 w-px bg-white/10" />
          <div className="flex items-center gap-2 rounded-md px-2 py-1 text-sm">
            <span className="text-ink-2">项目</span>
            <span className="font-medium text-white">《无声之城》· Ch.2</span>
            <span className="chip !py-0 !text-[10px]">auto-saved</span>
          </div>
        </div>

        <ProjectActions />
      </header>

      <div className="flex min-h-0 flex-1">
        {/* left tool rail（点击开/合抽屉） */}
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] bg-bg-1/50 py-3">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              title={`${t.label}（点击${activeTool === t.id ? '收起' : '打开'}面板）`}
              onClick={() => handleToolClick(t.id)}
              className={`group flex h-10 w-10 flex-col items-center justify-center rounded-xl transition ${
                activeTool === t.id
                  ? 'bg-white/[0.08] text-white'
                  : 'text-ink-2 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <t.icon size={16} />
              <span className="mt-0.5 text-[9px] opacity-70">{t.label}</span>
            </button>
          ))}
        </aside>

        {/* 满屏画布 + 浮动层 */}
        <section className="relative min-w-0 flex-1 overflow-hidden">
          <StudioCanvas />

          {/* 资产抽屉（按需浮出） */}
          {activeTool && (
            <div className="absolute bottom-0 left-0 top-0 z-20">
              <SecondaryPanel tool={activeTool} />
            </div>
          )}

          {/* 底部中央 Composer：一句话起一条管线 */}
          <Composer />
        </section>
      </div>
    </motion.main>
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
  const resetProject = useStudioStore((s) => s.resetProject)

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
    a.download = `pineline-${new Date().toISOString().slice(0, 10)}.json`
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

  const handleNew = () => {
    setMenuOpen(false)
    if (window.confirm('新建空工程会清空当前画布（可先「导出」备份），确定继续？')) {
      resetProject()
      flash('已新建空工程')
    }
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
              <button
                onClick={() => {
                  setMenuOpen(false)
                  fileRef.current?.click()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-ink-1 transition hover:bg-white/5 hover:text-white"
              >
                <Upload size={13} /> 导入工程…
              </button>
              <button
                onClick={handleNew}
                className="flex w-full items-center gap-2 px-3 py-2 text-ink-1 transition hover:bg-white/5 hover:text-white"
              >
                <FilePlus2 size={13} /> 新建空工程
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

function SecondaryPanel({ tool }: { tool: string }) {
  // 注意：这里的 key 必须和左侧工具栏 TOOLS 的 id 保持一致，否则标题与内容会错位
  const TITLES: Record<string, string> = {
    script:     '剧本 Outline',
    storyboard: '分镜 Board',
    scene:      '场景库',
    shot:       '镜头库',
    character:  '数字演员',
    prop:       '道具库',
    image:      '素材库',
    audio:      '音画资产',
  }
  const adders = useAdders()
  const onAdd = adders[tool]

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-white/[0.06] bg-bg-1/90 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="font-display text-sm font-semibold text-white">{TITLES[tool] ?? '资产'}</div>
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

      <div className="min-h-0 flex-1 overflow-y-auto">
        {tool === 'script' && <ScriptPanel />}
        {tool === 'storyboard' && <BoardPanel />}
        {tool === 'shot' && (
          <NodeImageLibrary
            kinds={['shot']}
            emptyText="还没有分镜图节点。把分镜/场景/角色/道具连进「分镜图」，合成单张镜头画面。"
            addLabel="新建分镜图节点"
            addKind="shot"
          />
        )}
        {tool === 'scene' && (
          <NodeImageLibrary
            kinds={['scene']}
            emptyText="还没有场景节点。填一句场景描述，生成四宫格视角参考。"
            addLabel="新建场景节点"
            addKind="scene"
          />
        )}
        {tool === 'prop' && (
          <NodeImageLibrary
            kinds={['prop']}
            emptyText="还没有道具节点。填一句道具描述，生成三视图。"
            addLabel="新建道具节点"
            addKind="prop"
          />
        )}
        {tool === 'image' && (
          <NodeImageLibrary
            kinds={['image', 'asset']}
            emptyText="还没有图像产出。新建「通用图像」节点，或直接把图片拖进画布作为上传素材。"
            addLabel="新建图像节点"
            addKind="image"
          />
        )}
        {tool === 'character' && <ActorLibrary />}
        {tool === 'audio' && (
          <div className="px-4 py-10 text-center text-[11px] leading-relaxed text-ink-3">
            音画节点在路线图中（P2-7）：
            <br />
            配乐 / 音效 / 配音将作为画布节点接入时间线。
          </div>
        )}
      </div>
    </aside>
  )
}

function PanelStatus({ status }: { status: string }) {
  const MAP: Record<string, [string, string]> = {
    running: ['生成中', 'text-brand'],
    done: ['ready', 'text-[#B6FF5F]'],
    error: ['error', 'text-red-400'],
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
              {n.data.output || p.brief || '（空白，点击在 Inspector 中填写）'}
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
  addLabel: string
  addKind: string
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
    return <PanelEmpty text={emptyText} actionLabel={addLabel} onAdd={adders[addKind]} />

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
