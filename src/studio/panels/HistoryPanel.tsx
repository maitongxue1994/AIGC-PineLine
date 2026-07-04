import { useEffect, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { Cloud, FileText, Film, HardDrive, Trash2 } from 'lucide-react'
import { clearGenLog, listGenLog, listHistory, type GenLogEntry, type HistoryEntry } from '../assetdb'
import { fetchWorkerLogs, type WorkerLogEntry } from '../api'
import { useStudioStore } from '../store'
import { useUIStore } from '../uiStore'
import { SHADOWS, TOKENS } from '../designTokens'

const fmtTime = (ts: number) => {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

const shortPath = (path: string) =>
  path.replace('/api/generate/', '').replace('upstream:', '↑')

/**
 * 生成日志视图：本地记录（IndexedDB genlog，成败都留痕）+ 云端实例（Worker 环形缓冲）。
 * 超时/失败的生成请求可在此凭 request-id 找回/对账（用户实测需求）。
 */
function GenLogView() {
  const [source, setSource] = useState<'local' | 'cloud'>('local')
  const [rows, setRows] = useState<GenLogEntry[]>([])
  const [cloud, setCloud] = useState<{ entries: WorkerLogEntry[]; isolateId: string; hint: string } | null>(null)
  const [cloudErr, setCloudErr] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    void listGenLog().then(setRows)
  }, [])

  const loadCloud = () => {
    setCloudErr(null)
    fetchWorkerLogs()
      .then(setCloud)
      .catch((e) => setCloudErr(e instanceof Error ? e.message : String(e)))
  }

  const copy = (text: string) => {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(text)
      setTimeout(() => setCopied(null), 1200)
    })
  }

  const logRow = (key: string, ts: number, ok: boolean, main: string, sub?: string, rid?: string) => (
    <div key={key} className="rounded-[10px] bg-white/[0.04] p-2.5">
      <div className="flex items-center gap-2 text-[11px]">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: ok ? '#4BBF6B' : '#E5484D' }}
        />
        <span className="min-w-0 flex-1 truncate" style={{ color: TOKENS.textBody }}>
          {main}
        </span>
        <span className="shrink-0" style={{ color: TOKENS.textFaint }}>
          {fmtTime(ts)}
        </span>
      </div>
      {sub && (
        <div className="mt-1 line-clamp-2 pl-3.5 text-[10px] leading-relaxed" style={{ color: ok ? TOKENS.textFaint : '#E5959A' }}>
          {sub}
        </div>
      )}
      {rid && (
        <button
          onClick={() => copy(rid)}
          title="点击复制 request-id（可去供应商控制台对账找回）"
          className="mt-1 block max-w-full truncate pl-3.5 text-left font-mono text-[10px] transition hover:text-white"
          style={{ color: copied === rid ? '#4BBF6B' : TOKENS.textMuted }}
        >
          {copied === rid ? '✓ 已复制' : `rid: ${rid}`}
        </button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-1.5 px-3 pt-2.5">
        {(
          [
            ['local', '本地记录', HardDrive],
            ['cloud', '云端实例', Cloud],
          ] as const
        ).map(([k, label, Icon]) => (
          <button
            key={k}
            onClick={() => {
              setSource(k)
              if (k === 'cloud' && !cloud) loadCloud()
            }}
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition"
            style={{
              background: source === k ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
              color: source === k ? TOKENS.textTitle : TOKENS.textMuted,
            }}
          >
            <Icon size={11} /> {label}
          </button>
        ))}
        <span className="flex-1" />
        {source === 'local' && rows.length > 0 && (
          <button
            title="清空本地生成日志"
            onClick={() => void clearGenLog().then(() => setRows([]))}
            className="rounded p-1 transition hover:text-red-300"
            style={{ color: TOKENS.textFaint }}
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto p-3">
        {source === 'local' ? (
          rows.length === 0 ? (
            <div className="py-10 text-center text-[12px]" style={{ color: TOKENS.textFaint }}>
              暂无生成请求记录（成功与失败都会自动记录在本机）
            </div>
          ) : (
            rows.map((r) =>
              logRow(
                r.id,
                r.createdAt,
                r.ok,
                `${shortPath(r.path)}${r.model ? ` · ${r.model}` : ''} · ${(r.ms / 1000).toFixed(1)}s`,
                r.error ?? r.prompt,
                r.requestId,
              ),
            )
          )
        ) : cloudErr ? (
          <div className="py-10 text-center text-[12px]" style={{ color: '#E5959A' }}>
            云端日志拉取失败：{cloudErr}
            <button onClick={loadCloud} className="mt-2 block w-full text-[12px] underline" style={{ color: TOKENS.textMuted }}>
              重试
            </button>
          </div>
        ) : !cloud ? (
          <div className="py-10 text-center text-[12px]" style={{ color: TOKENS.textFaint }}>
            拉取中…
          </div>
        ) : (
          <>
            <div className="px-1 text-[10px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
              实例 {cloud.isolateId.slice(0, 8)} · {cloud.hint}
            </div>
            {cloud.entries.length === 0 ? (
              <div className="py-8 text-center text-[12px]" style={{ color: TOKENS.textFaint }}>
                当前实例暂无记录（Workers 多实例轮转，可稍后重试）
              </div>
            ) : (
              [...cloud.entries]
                .sort((a, b) => b.ts - a.ts)
                .map((r, i) =>
                  logRow(
                    `${r.ts}-${i}`,
                    r.ts,
                    r.ok,
                    `${shortPath(r.path)}${r.model ? ` · ${r.model}` : ''} · ${(r.ms / 1000).toFixed(1)}s`,
                    r.error ?? r.note,
                    r.requestId,
                  ),
                )
            )}
          </>
        )}
      </div>
    </div>
  )
}

/** 生成历史面板：图片/视频/文本/日志 tab，按日期分组；点击回源节点或重新入画布 */
export default function HistoryPanel() {
  const focusNode = useStudioStore((s) => s.focusNode)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const addVideoNode = useStudioStore((s) => s.addVideoNode)
  const addNode = useStudioStore((s) => s.addNode)
  const updateActiveContent = useStudioStore((s) => s.updateActiveContent)
  const setActivePanel = useUIStore((s) => s.setActivePanel)
  const { screenToFlowPosition } = useReactFlow()

  const [rows, setRows] = useState<HistoryEntry[]>([])
  const [tab, setTab] = useState<'image' | 'video' | 'text' | 'log'>('image')

  useEffect(() => {
    void listHistory().then(setRows)
  }, [])

  const centerPos = () =>
    screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  const items = tab === 'log' ? [] : rows.filter((r) => r.kind === tab)
  const counts = {
    image: rows.filter((r) => r.kind === 'image').length,
    video: rows.filter((r) => r.kind === 'video').length,
    text: rows.filter((r) => r.kind === 'text').length,
  }

  // 按日期分组
  const groups = new Map<string, HistoryEntry[]>()
  for (const r of items) {
    const d = new Date(r.createdAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(r)
  }

  const handlePick = (r: HistoryEntry) => {
    const exists = useStudioStore.getState().nodes.some((n) => n.id === r.nodeId)
    if (exists) {
      focusNode(r.nodeId)
    } else if (r.kind === 'image') {
      // 源节点已删：以素材节点重新入画布
      addAssetNode(r.content, centerPos())
    } else if (r.kind === 'video') {
      addVideoNode(r.content, centerPos())
    } else {
      const id = addNode('text', 'free', centerPos(), { title: '历史文本', prompt: r.prompt })
      updateActiveContent(id, r.content)
    }
    setActivePanel(null)
  }

  return (
    <div
      className="flex max-h-[70vh] w-[320px] flex-col rounded-[20px] border border-white/[0.07]"
      style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel }}
    >
      <div className="flex items-center gap-4 border-b border-white/[0.07] px-4 pb-2.5 pt-4">
        {(
          [
            ['image', `图片 (${counts.image})`],
            ['video', `视频 (${counts.video})`],
            ['text', `文本 (${counts.text})`],
            ['log', '日志'],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="pb-1 text-[14px] font-semibold transition"
            style={{
              color: tab === k ? TOKENS.textTitle : TOKENS.textMuted,
              borderBottom: tab === k ? '2px solid #F5F5F7' : '2px solid transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'log' ? (
        <GenLogView />
      ) : (
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {items.length === 0 && (
          <div className="py-10 text-center text-[13px]" style={{ color: TOKENS.textFaint }}>
            还没有生成记录
          </div>
        )}
        {[...groups.entries()].map(([date, list]) => (
          <div key={date} className="mb-3">
            <div className="mb-1.5 px-1 text-[13px] font-semibold" style={{ color: TOKENS.textBody }}>
              {date}
            </div>
            {tab === 'image' ? (
              <div className="grid grid-cols-3 gap-1.5">
                {list.map((r) => (
                  <button
                    key={r.id}
                    title={`${r.prompt || '（无提示词）'}\n点击回到源节点 / 重新入画布`}
                    onClick={() => handlePick(r)}
                    className="relative aspect-square overflow-hidden rounded-[8px] border border-white/[0.08] transition hover:border-white/30"
                  >
                    <img src={r.content} alt="" className="h-full w-full object-cover" />
                    {r.label && (
                      <span className="absolute inset-x-0 bottom-0 bg-black/65 text-center text-[9px] leading-4 text-white/90">
                        {r.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : tab === 'video' ? (
              <div className="grid grid-cols-2 gap-1.5">
                {list.map((r) => (
                  <button
                    key={r.id}
                    title={`${r.prompt || '（无提示词）'}\n点击回到源节点 / 重新入画布`}
                    onClick={() => handlePick(r)}
                    className="relative aspect-video overflow-hidden rounded-[8px] border border-white/[0.08] transition hover:border-white/30"
                  >
                    {r.poster ? (
                      <img src={r.poster} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-white/[0.05]">
                        <Film size={16} style={{ color: TOKENS.textMuted }} />
                      </span>
                    )}
                    <span className="absolute bottom-1 left-1 rounded bg-black/65 px-1 text-[9px] leading-4 text-white/90">
                      视频
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {list.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handlePick(r)}
                    className="flex w-full items-start gap-2.5 rounded-[10px] bg-white/[0.04] p-2.5 text-left transition hover:bg-white/[0.07]"
                  >
                    <FileText size={14} className="mt-0.5 shrink-0" style={{ color: TOKENS.textMuted }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px]" style={{ color: TOKENS.textBody }}>
                        {r.prompt || '（无提示词）'}
                      </span>
                      <span className="line-clamp-2 text-[11px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                        {r.content}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  )
}
