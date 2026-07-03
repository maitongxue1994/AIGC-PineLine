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
  X,
} from 'lucide-react'
import Logo from '../components/Logo'
import StudioCanvas from '../studio/StudioCanvas'
import { useStudioStore } from '../studio/store'
import { TEMPLATES } from '../studio/templates'

/**
 * Studio 页面（M1 过渡版外壳）：顶栏 + 满屏画布 + 模板弹层。
 * M3 将按设计稿重制为悬浮顶栏 + 左侧竖栏 + 左下控制条的 TapNow 式工作空间。
 */
export default function Studio() {
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
        {/* 满屏画布 + 浮动层 */}
        <section className="relative min-w-0 flex-1 overflow-hidden">
          <StudioCanvas />
          <TemplateModal />
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
      <span className="chip !py-0 !text-[10px]">已自动保存到本地</span>
    </div>
  )
}

/** 模板弹层：画布左上角「模板」按钮经全局事件唤起（应用=清空并替换画布） */
function TemplateModal() {
  const [open, setOpen] = useState(false)
  const applyTemplate = useStudioStore((s) => s.applyTemplate)
  const hasNodes = useStudioStore((s) => s.nodes.length > 0)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('pineline:open-templates', onOpen)
    return () => window.removeEventListener('pineline:open-templates', onOpen)
  }, [])

  if (!open) return null

  const handlePick = (id: (typeof TEMPLATES)[number]['id']) => {
    if (
      hasNodes &&
      !window.confirm('应用模板会清空当前画布（可先「导出」备份，⌘/Ctrl+Z 可撤销）。继续？')
    )
      return
    applyTemplate(id)
    setOpen(false)
  }

  return (
    <div className="absolute inset-0 z-10">
      <div
        className="absolute inset-0 bg-bg-0/80 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-4">
        <div className="pointer-events-auto relative flex flex-col items-center gap-4">
          <button
            onClick={() => setOpen(false)}
            title="关闭"
            className="absolute -right-2 -top-9 rounded-lg border border-white/[0.08] bg-bg-2/90 p-1.5 text-ink-2 backdrop-blur transition hover:text-white"
          >
            <X size={13} />
          </button>
          <p className="text-[13px] text-ink-2">从一个模板开始</p>
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
        </div>
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
