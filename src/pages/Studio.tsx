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
  Layers,
  Package,
  Plus,
  Search,
  Sparkles,
  Settings2,
  History,
} from 'lucide-react'
import Logo from '../components/Logo'
import InspectorPanel from '../components/InspectorPanel'
import StudioCanvas from '../studio/StudioCanvas'
import { useStudioStore } from '../studio/store'

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
  const [activeTool, setActiveTool] = useState('storyboard')
  const addScriptNode = useStudioStore((s) => s.addScriptNode)
  const addImageNode = useStudioStore((s) => s.addImageNode)
  const addStoryboardNode = useStudioStore((s) => s.addStoryboardNode)
  const addSceneNode = useStudioStore((s) => s.addSceneNode)
  const addCharacterNode = useStudioStore((s) => s.addCharacterNode)
  const addPropNode = useStudioStore((s) => s.addPropNode)
  const addShotNode = useStudioStore((s) => s.addShotNode)

  const handleToolClick = (id: string) => {
    setActiveTool(id)
    switch (id) {
      case 'script':     addScriptNode();     break
      case 'storyboard': addStoryboardNode(); break
      case 'scene':      addSceneNode();      break
      case 'shot':       addShotNode();       break
      case 'character':  addCharacterNode();  break
      case 'prop':       addPropNode();       break
      case 'image':      addImageNode();      break
    }
  }

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

        <div className="hidden items-center gap-1 md:flex">
          <NavPill icon={<Layers size={13} />} label="画布" active />
          <NavPill icon={<Film size={13} />} label="时间线" />
          <NavPill icon={<History size={13} />} label="版本" />
        </div>

        <ProjectActions />
      </header>

      <div className="flex min-h-0 flex-1">
        {/* left tool rail */}
        <aside className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] bg-bg-1/50 py-3">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              title={t.label}
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
          <div className="mt-auto flex flex-col items-center gap-1">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-2 hover:bg-white/[0.04] hover:text-white">
              <Settings2 size={16} />
            </button>
          </div>
        </aside>

        {/* panel + canvas */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1">
            {/* secondary panel */}
            <SecondaryPanel tool={activeTool} />

            {/* canvas */}
            <section className="relative min-w-0 flex-1 overflow-hidden">
              <StudioCanvas />
            </section>

            {/* inspector */}
            <InspectorPanel />
          </div>

          {/* bottom timeline */}
          <BottomTimeline />
        </div>
      </div>
    </motion.main>
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
      <div className="hidden -space-x-2 sm:flex">
        {['#FF6A3D', '#7C5CFF', '#22D3EE'].map((c, i) => (
          <div
            key={i}
            className="h-6 w-6 rounded-full border-2 border-bg-1"
            style={{ background: c }}
          />
        ))}
      </div>

      <button
        onClick={handleShare}
        className="btn-ghost !py-1.5 !text-xs"
        title="复制工程 JSON 到剪贴板，便于分享给协作者"
      >
        <Share2 size={12} /> 分享
      </button>

      <button
        onClick={runPipeline}
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

function NavPill({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active ? 'bg-white/[0.08] text-white' : 'text-ink-1 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  )
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

  return (
    <aside className="w-[260px] shrink-0 border-r border-white/[0.06] bg-bg-1/40">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="font-display text-sm font-semibold text-white">{TITLES[tool] ?? '资产'}</div>
        <div className="flex items-center gap-1">
          <button className="rounded-md p-1 text-ink-2 hover:bg-white/5 hover:text-white">
            <Search size={13} />
          </button>
          <button className="rounded-md p-1 text-ink-2 hover:bg-white/5 hover:text-white">
            <Plus size={13} />
          </button>
        </div>
      </div>

      {tool === 'script' && <ScriptPanel />}
      {tool === 'storyboard' && <BoardPanel />}
      {tool === 'shot' && <ShotLibrary />}
      {tool === 'character' && <ActorLibrary />}
      {(tool === 'scene' || tool === 'prop' || tool === 'image' || tool === 'audio') && (
        <AssetLibrary />
      )}
    </aside>
  )
}

function ScriptPanel() {
  return (
    <div className="p-4">
      <div className="rounded-lg border border-white/[0.07] bg-bg-2/60 p-3 text-xs text-ink-1">
        <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-ink-2">
          <span>Chapter 2 · 雨夜屋顶</span>
          <span className="text-brand">● 解析中</span>
        </div>
        <p className="leading-relaxed">
          <span className="text-ink-0">INT./EXT. 屋顶 — 夜 — 雨</span>
          <br />
          <br />
          林夜独自站在霓虹边缘，雨水沿风衣滑落。远处无人机群点亮——
          <span className="bg-[#FF6A3D]/15 text-white">像一群迁徙的萤火。</span>
          <br />
          <br />
          <span className="text-brand-violet">林夜（旁白）：</span>
          <br />
          "这座城市关掉了声音，我却还在听。"
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-2">
        <span>3 scenes · 12 beats</span>
        <button className="flex items-center gap-1 text-brand hover:text-white">
          <Sparkles size={11} />
          AI 拆分分镜
        </button>
      </div>
    </div>
  )
}

function BoardPanel() {
  const SCENES = [
    { id: 1, name: 'SC01 · 屋顶全景', shots: 3, time: '0:14' },
    { id: 2, name: 'SC02 · 雨中独白', shots: 4, time: '0:22' },
    { id: 3, name: 'SC03 · 无人机亮起', shots: 2, time: '0:10' },
    { id: 4, name: 'SC04 · 转身离开', shots: 3, time: '0:16' },
  ]
  return (
    <div className="p-2">
      {SCENES.map((s, i) => (
        <div
          key={s.id}
          className={`group mb-1 cursor-pointer rounded-lg border p-3 transition ${
            i === 0 ? 'border-white/15 bg-white/[0.04]' : 'border-transparent hover:bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">{s.name}</span>
            <span className="text-[10px] text-ink-2">{s.time}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-2">
            <span>{s.shots} shots</span>
            <span className="h-1 w-1 rounded-full bg-ink-3" />
            <span className="text-brand">ready</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ShotLibrary() {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {['wide', 'medium', 'close', 'OTS', 'POV', 'top', 'tracking', 'dolly'].map((t, i) => (
        <div
          key={t}
          className="aspect-[4/3] cursor-pointer rounded-md border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-2 text-[10px] uppercase tracking-widest text-ink-2 transition hover:border-white/20 hover:text-white"
        >
          <div className="mb-2 h-10 rounded bg-gradient-to-br from-[#1a1a28] to-[#0a0a10]" />
          {t}
        </div>
      ))}
    </div>
  )
}

function ActorLibrary() {
  const A = [
    { n: '林夜', c: 'from-[#2a0a14] to-[#ff6a3d]' },
    { n: 'Aria', c: 'from-[#071029] to-[#22d3ee]' },
    { n: '苏白', c: 'from-[#1a0f0a] to-[#ff3d7f]' },
    { n: '老K', c: 'from-[#161616] to-[#7c5cff]' },
  ]
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {A.map((a) => (
        <div key={a.n} className="cursor-pointer overflow-hidden rounded-md border border-white/[0.07]">
          <div className={`aspect-[3/4] bg-gradient-to-br ${a.c}`} />
          <div className="px-2 py-1.5 text-xs text-white">{a.n}</div>
        </div>
      ))}
      <button className="col-span-2 flex items-center justify-center gap-2 rounded-md border border-dashed border-white/15 py-3 text-xs text-ink-2 hover:border-white/30 hover:text-white">
        <Plus size={12} /> 训练数字演员
      </button>
    </div>
  )
}

function AssetLibrary() {
  return (
    <div className="grid grid-cols-3 gap-1.5 p-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square cursor-pointer overflow-hidden rounded-md border border-white/[0.07]"
        >
          <div
            className="h-full w-full"
            style={{
              background: [
                'linear-gradient(135deg,#1a0a14,#ff3d7f)',
                'linear-gradient(135deg,#071029,#22d3ee)',
                'linear-gradient(135deg,#2a0f3a,#7c5cff)',
                'linear-gradient(135deg,#1a0f0a,#ff6a3d)',
                'linear-gradient(135deg,#0a1f0a,#b6ff5f)',
                'linear-gradient(135deg,#0a0a14,#5a5a66)',
              ][i % 6],
            }}
          />
        </div>
      ))}
    </div>
  )
}

function BottomTimeline() {
  return (
    <div className="h-24 shrink-0 border-t border-white/[0.06] bg-bg-1/70">
      <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-1.5 text-[11px] text-ink-2">
        <div className="flex items-center gap-3">
          <span className="text-white">时间线</span>
          <span>00:00:00 / 00:01:02</span>
          <span className="chip !py-0 !text-[10px]">24 fps · 4K</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-ink-1 hover:text-white">
            <Play size={11} /> 播放
          </button>
          <button className="flex items-center gap-1 text-brand hover:text-white">
            <Sparkles size={11} /> AI 自动节奏
          </button>
        </div>
      </div>

      <div className="relative h-[calc(100%-28px)] px-4 pt-2">
        {/* ruler */}
        <div className="absolute inset-x-4 top-2 flex items-center justify-between text-[9px] text-ink-3">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span>{`0:${String(i * 6).padStart(2, '0')}`}</span>
              <span className="h-1.5 w-px bg-white/10" />
            </div>
          ))}
        </div>

        {/* tracks */}
        <div className="mt-5 space-y-1">
          <Track color="#FF6A3D" label="V1" blocks={[[2, 18], [22, 40], [44, 60]]} />
          <Track color="#7C5CFF" label="V2" blocks={[[4, 16], [48, 56]]} />
          <Track color="#22D3EE" label="A1" blocks={[[0, 60]]} />
        </div>

        {/* playhead */}
        <div className="absolute left-[32%] top-2 h-[calc(100%-8px)] w-px bg-white/70">
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white/70" />
        </div>
      </div>
    </div>
  )
}

function Track({ color, label, blocks }: { color: string; label: string; blocks: [number, number][] }) {
  return (
    <div className="flex h-5 items-center gap-2">
      <span className="w-6 text-[10px] uppercase tracking-widest text-ink-2">{label}</span>
      <div className="relative h-4 flex-1 rounded-sm bg-white/[0.03]">
        {blocks.map(([l, r], i) => (
          <div
            key={i}
            className="absolute top-0 h-4 rounded-sm"
            style={{
              left: `${(l / 60) * 100}%`,
              width: `${((r - l) / 60) * 100}%`,
              background: `linear-gradient(180deg, ${color}cc, ${color}55)`,
              border: `1px solid ${color}aa`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
