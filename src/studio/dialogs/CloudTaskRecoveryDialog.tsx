import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloudDownload, Loader2, RefreshCw, X } from 'lucide-react'
import { listVideoTasks } from '../api'
import { useStudioStore } from '../store'
import { getTaskLabel } from '../taskLabels'
import { SHADOWS, TOKENS } from '../designTokens'
import type { CloudVideoTask } from '../types'

const STATUS_META: Record<string, { label: string; color: string }> = {
  succeeded: { label: '成功', color: '#4BBF6B' },
  running: { label: '运行中', color: '#3F9BF5' },
  queued: { label: '排队中', color: '#B8B8BF' },
  failed: { label: '失败', color: '#E5636B' },
  cancelled: { label: '已取消', color: '#8A8A92' },
  expired: { label: '已过期', color: '#E8A33D' },
}

const fmtTime = (ts: number) => {
  if (!ts) return '—'
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/**
 * 云端任务找回（Seedance 近 7 天）：本地任务 ID 丢失（旧版超时丢弃/清档/换设备）
 * 但供应商侧已扣费成功时，从官方 ListContentsGenerationsTasks 列表找回任务，
 * 经 video-file 代理取件落为当前视频节点的新版本。
 */
export default function CloudTaskRecoveryDialog({
  nodeId,
  onClose,
}: {
  nodeId: string
  onClose: () => void
}) {
  const recoverCloudTask = useStudioStore((s) => s.recoverCloudTask)
  // 刷新用 key 重挂载列表（React 19 规范：不在 effect 里同步 setState 重置）
  const [reloadTick, setReloadTick] = useState(0)

  const handleRecover = (t: CloudVideoTask) => {
    // 取件在 store 内异步进行（节点转 running），对话框即时关闭不阻塞
    void recoverCloudTask(nodeId, t.id)
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-6"
      onClick={onClose}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        className="pl-pop-in flex max-h-[76vh] w-[640px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <CloudDownload size={16} style={{ color: TOKENS.textMuted }} />
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            云端任务找回
          </span>
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            Seedance · 官方保留近 7 天
          </span>
          <span className="flex-1" />
          <button
            title="刷新"
            onClick={() => setReloadTick((v) => v + 1)}
            className="rounded-full p-1.5 transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            <RefreshCw size={14} />
          </button>
          <button
            title="关闭 (Esc)"
            onClick={onClose}
            className="rounded-full p-1.5 transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            <X size={15} />
          </button>
        </div>

        <TaskListBody key={reloadTick} onRecover={handleRecover} />

        <div
          className="border-t border-white/[0.07] px-5 py-2.5 text-[11px] leading-relaxed"
          style={{ color: TOKENS.textFaint }}
        >
          适用：生成超时报错但供应商已扣费的任务。取回后视频落为当前节点新版本并进入生成历史；官方视频链接 24
          小时过期，取回即长期保存在本机。
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** 任务列表体：挂载即拉取（刷新由父层 key 重挂载触发） */
function TaskListBody({ onRecover }: { onRecover: (t: CloudVideoTask) => void }) {
  const [tasks, setTasks] = useState<CloudVideoTask[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    listVideoTasks({ provider: 'seedance', pageSize: 50 })
      .then((res) => {
        if (alive) setTasks(res.tasks)
      })
      .catch((err) => {
        if (alive) setError(err instanceof Error ? err.message : String(err))
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-3">
      {!tasks && !error && (
        <div
          className="flex items-center justify-center gap-2 py-14 text-[13px]"
          style={{ color: TOKENS.textMuted }}
        >
          <Loader2 size={15} className="animate-spin" /> 正在查询供应商任务列表…
        </div>
      )}
      {error && (
        <div className="px-4 py-10 text-center text-[13px] leading-relaxed text-red-300">
          {error}
        </div>
      )}
      {tasks && tasks.length === 0 && (
        <div className="py-14 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
          近 7 天没有任务记录
        </div>
      )}
      {tasks?.map((t) => {
        const meta = STATUS_META[t.status] ?? { label: t.status, color: TOKENS.textMuted }
        const recoverable = t.status === 'succeeded' && t.hasVideo
        return (
          <div
            key={t.id}
            className="mb-1.5 flex items-center gap-3 rounded-[12px] bg-white/[0.03] px-3.5 py-3"
          >
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={{ background: `${meta.color}22`, color: meta.color }}
            >
              {meta.label}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px]" style={{ color: TOKENS.textBody }}>
                {/* 本地记下的节点标签优先（辨认哪个镜头），否则退回规格 */}
                {getTaskLabel(t.id) ||
                  [t.resolution, t.ratio, t.duration ? `${t.duration}s` : '']
                    .filter(Boolean)
                    .join(' · ') ||
                  t.model}
              </span>
              <span className="block truncate text-[11px]" style={{ color: TOKENS.textFaint }}>
                {[t.resolution, t.ratio, t.duration ? `${t.duration}s` : ''].filter(Boolean).join(' · ')} ·{' '}
                {fmtTime(t.createdAt)} · {t.id}
                {t.error ? ` · ${t.error}` : ''}
              </span>
            </span>
            {recoverable && (
              <button
                onClick={() => onRecover(t)}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition hover:opacity-90"
                style={{ background: '#F5F5F7', color: '#0B0B0C' }}
              >
                取回到节点
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
