import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BookMarked, FileUp, Plus, Trash2, X } from 'lucide-react'
import {
  listMemories,
  putMemory,
  removeMemory,
  updateMemory,
  type MemoryEntry,
} from '../assetdb'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 记忆管理对话框：查看/编辑/删除助手长期记忆，手动新增，
 * 以及导入外部记忆文件（拖入或选择 .md/.txt——如 Claude Code 的 MEMORY.md，
 * 按行拆条，实现跨 Agent 记忆互通的「用户手动导入」路径）。
 */

const SOURCE_LABEL: Record<MemoryEntry['source'], string> = {
  agent: '助手',
  user: '手动',
  import: '导入',
}

/** markdown 行 → 记忆条目：剥列表符/标题符/链接语法，过滤短行 */
function linesFromMarkdown(text: string): string[] {
  return text
    .split('\n')
    .map((l) =>
      l
        .replace(/^\s*(?:[-*+]|\d+\.)\s+/, '')
        .replace(/^#+\s+/, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .trim(),
    )
    .filter((l) => l.length >= 4 && !l.startsWith('---'))
    .slice(0, 50)
}

export default function MemoryDialog({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState<MemoryEntry[]>([])
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const reload = () => void listMemories().then(setRows)
  useEffect(reload, [])

  const flash = (msg: string) =>
    window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))

  const handleAdd = async () => {
    const content = draft.trim()
    if (!content) return
    await putMemory({ content, source: 'user' })
    setDraft('')
    reload()
  }

  const importFiles = async (files: File[]) => {
    let count = 0
    for (const f of files.slice(0, 3)) {
      if (!/\.(md|txt|markdown)$/i.test(f.name)) continue
      const text = await f.text().catch(() => '')
      for (const line of linesFromMarkdown(text)) {
        await putMemory({ content: line, source: 'import' })
        count++
      }
    }
    reload()
    flash(count ? `✓ 已导入 ${count} 条记忆（同内容自动去重）` : '未找到可导入的条目（支持 .md / .txt，按行拆条）')
  }

  const handlePickFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.txt,.markdown'
    input.multiple = true
    input.onchange = () => void importFiles(Array.from(input.files ?? []))
    input.click()
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
        aria-label="助手记忆"
        className="flex max-h-[80vh] w-[460px] flex-col rounded-[26px] border p-[22px] transition-colors"
        style={{
          background: TOKENS.popoverBg,
          boxShadow: SHADOWS.modal,
          borderColor: dragOver ? 'rgba(138,184,255,0.6)' : 'rgba(255,255,255,0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
        onDragOver={(e) => {
          if (e.dataTransfer.types.includes('Files')) {
            e.preventDefault()
            setDragOver(true)
          }
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          void importFiles(Array.from(e.dataTransfer.files))
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[18px] font-semibold" style={{ color: TOKENS.textTitle }}>
            <BookMarked size={18} />
            助手记忆
            <span className="text-[12px] font-normal" style={{ color: TOKENS.textFaint }}>
              {rows.length}/100 · 每轮对话自动携带
            </span>
          </span>
          <button onClick={onClose} className="rounded p-1 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
            <X size={16} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
          {rows.length === 0 && (
            <div className="py-10 text-center text-[12.5px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
              还没有记忆。对话中告诉助手你的偏好（如「记住：旁白都用低沉男声」），
              <br />
              或拖入 Claude Code 的 MEMORY.md / 任意 .md 文件导入
            </div>
          )}
          {rows.map((m) => (
            <div key={m.id} className="group rounded-[12px] bg-white/[0.04] px-3 py-2.5">
              {editingId === m.id ? (
                <div className="space-y-1.5">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    maxLength={500}
                    className="min-h-[56px] w-full resize-none rounded-[8px] bg-black/30 px-2 py-1.5 text-[13px] leading-relaxed outline-none"
                    style={{ color: TOKENS.textBody }}
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-full px-3 py-1 text-[12px] transition hover:bg-white/[0.08]"
                      style={{ color: TOKENS.textMuted }}
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        void updateMemory(m.id, editText).then(() => {
                          setEditingId(null)
                          reload()
                        })
                      }}
                      className="rounded-full px-3 py-1 text-[12px] font-semibold transition hover:bg-white"
                      style={{ background: '#F5F5F7', color: '#0B0B0C' }}
                    >
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <button
                    className="min-w-0 flex-1 text-left text-[13px] leading-relaxed"
                    style={{ color: TOKENS.textBody }}
                    title="点击编辑"
                    onClick={() => {
                      setEditingId(m.id)
                      setEditText(m.content)
                    }}
                  >
                    {m.content}
                  </button>
                  <span className="shrink-0 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px]" style={{ color: TOKENS.textFaint }}>
                    {SOURCE_LABEL[m.source]}
                  </span>
                  <button
                    title="删除这条记忆"
                    onClick={() => void removeMemory(m.id).then(reload)}
                    className="shrink-0 rounded p-1 opacity-0 transition hover:text-red-300 group-hover:opacity-100"
                    style={{ color: TOKENS.textFaint }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2 border-t border-white/[0.07] pt-3">
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) void handleAdd()
              }}
              maxLength={500}
              placeholder="手动添加一条记忆（偏好/设定，回车确认）"
              className="min-w-0 flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[13px] outline-none transition focus:border-white/25"
              style={{ color: TOKENS.textBody }}
            />
            <button
              disabled={!draft.trim()}
              onClick={() => void handleAdd()}
              className="rounded-full p-2 transition enabled:hover:bg-white/[0.1] disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.06)', color: TOKENS.textBody }}
            >
              <Plus size={15} />
            </button>
          </div>
          <button
            onClick={handlePickFile}
            className="flex w-full items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-white/[0.15] py-2 text-[12px] transition hover:border-white/35"
            style={{ color: TOKENS.textMuted }}
          >
            <FileUp size={13} />
            导入记忆文件（.md / .txt，可直接拖入本窗口）——支持 Claude Code MEMORY.md
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
