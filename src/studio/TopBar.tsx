import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, MoreHorizontal, RotateCcw, Share2, Sparkles, Upload, Zap } from 'lucide-react'
import { useStudioStore } from './store'
import { TOKENS } from './designTokens'

/**
 * 悬浮透明顶栏（设计稿 §07）：
 * 左=品牌 logo + 工程名 + 保存状态；右=积分胶囊（本地模拟）+ 社区 + 分享 + ⋯。
 */
export default function TopBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4">
      <div className="pointer-events-auto flex items-center gap-3">
        <Link
          to="/"
          title="返回首页"
          className="block h-[34px] w-[34px] shrink-0 rounded-[10px] transition hover:scale-105"
          style={{ background: TOKENS.brandGradient }}
        />
        <div>
          <ProjectName />
          <SaveStatus />
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <CreditsPill />
        <Link
          to="/showcase"
          className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3.5 py-2 text-[14px] font-semibold transition hover:bg-white/[0.12]"
          style={{ color: TOKENS.textBody }}
        >
          <Sparkles size={15} />
          社区
        </Link>
        <ShareButton />
        <MoreMenu />
      </div>
    </div>
  )
}

function ProjectName() {
  const projectName = useStudioStore((s) => s.projectName)
  const setProjectName = useStudioStore((s) => s.setProjectName)
  return (
    <input
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      onBlur={(e) => {
        if (!e.target.value.trim()) setProjectName('未命名工程')
      }}
      title="点击编辑工程名"
      className="block w-[180px] rounded-md border border-transparent bg-transparent px-1 text-[15px] font-semibold outline-none transition hover:border-white/10 focus:border-white/30"
      style={{ color: TOKENS.textTitle }}
    />
  )
}

/** 保存状态指示：画布变更后短暂显示「保存中…」，随后回到「已自动保存到本地」 */
function SaveStatus() {
  const [saving, setSaving] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const unsub = useStudioStore.subscribe(() => {
      setSaving(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setSaving(false), 900)
    })
    return () => {
      unsub()
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className="px-1 text-[12px]" style={{ color: TOKENS.textFaint }}>
      {saving ? '保存中…' : '已自动保存到本地'}
    </div>
  )
}

/** 假积分胶囊（本地模拟；点击可重置） */
function CreditsPill() {
  const credits = useStudioStore((s) => s.credits)
  const resetCredits = useStudioStore((s) => s.resetCredits)
  return (
    <button
      title="积分为本地模拟，仅作演示；点击重置为 1000"
      onClick={() => {
        if (window.confirm('积分为本地模拟。重置为 1000？')) resetCredits()
      }}
      className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3.5 py-2 text-[14px] font-semibold transition hover:bg-white/[0.12]"
      style={{ color: TOKENS.textBody }}
    >
      <Zap size={15} style={{ color: TOKENS.textMuted }} />
      {credits}
    </button>
  )
}

function ShareButton() {
  const exportProject = useStudioStore((s) => s.exportProject)
  const [done, setDone] = useState(false)
  return (
    <button
      title="复制工程 JSON 到剪贴板"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(exportProject())
          setDone(true)
          setTimeout(() => setDone(false), 1500)
        } catch {
          window.dispatchEvent(
            new CustomEvent('pineline:flash', { detail: '复制失败：浏览器拒绝了剪贴板访问' }),
          )
        }
      }}
      className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/[0.07] transition hover:bg-white/[0.12]"
      style={{ color: done ? '#4BBF6B' : TOKENS.textBody }}
    >
      <Share2 size={15} />
    </button>
  )
}

function MoreMenu() {
  const exportProject = useStudioStore((s) => s.exportProject)
  const importProject = useStudioStore((s) => s.importProject)
  const resetProject = useStudioStore((s) => s.resetProject)
  const runPipeline = useStudioStore((s) => s.runPipeline)
  const pipelineRunning = useStudioStore((s) => s.pipelineRunning)
  const [open, setOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const flash = (msg: string) =>
    window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

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

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
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

  const item =
    'flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition hover:bg-white/[0.06]'

  return (
    <div className="relative">
      <button
        title="更多"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/[0.07] transition hover:bg-white/[0.12]"
        style={{ color: TOKENS.textBody }}
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full z-50 mt-2 w-52 rounded-[16px] border border-white/[0.08] p-2"
            style={{ background: TOKENS.chipBg, boxShadow: '0 24px 64px rgba(0,0,0,0.65)' }}
          >
            <button
              disabled={pipelineRunning}
              onClick={() => {
                setOpen(false)
                void runPipeline()
              }}
              className={`${item} disabled:cursor-not-allowed disabled:opacity-50`}
              style={{ color: TOKENS.textBody }}
            >
              <Sparkles size={15} /> {pipelineRunning ? '管线运行中…' : '运行整条管线'}
            </button>
            <button onClick={() => { setOpen(false); handleExport() }} className={item} style={{ color: TOKENS.textBody }}>
              <Download size={15} /> 导出工程 JSON
            </button>
            <button
              onClick={() => {
                setOpen(false)
                fileRef.current?.click()
              }}
              className={item}
              style={{ color: TOKENS.textBody }}
            >
              <Upload size={15} /> 导入工程…
            </button>
            <div className="mx-2 my-1 h-px bg-white/[0.07]" />
            <button
              onClick={() => {
                setOpen(false)
                if (
                  window.confirm(
                    '清空画布（=新建空工程）。建议先「导出」备份；清空后可用 ⌘/Ctrl+Z 撤销。确定继续？',
                  )
                ) {
                  resetProject()
                  flash('已清空画布（⌘/Ctrl+Z 可撤销）')
                }
              }}
              className={`${item} text-red-300 hover:bg-red-500/10`}
            >
              <RotateCcw size={15} /> 清空画布
            </button>
          </div>
        </>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleImportFile}
      />
    </div>
  )
}
