import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'
import type { ShotItem } from '../types'

/**
 * 分镜脚本整体编辑器（body Portal 模态，z-[80]）：把逐镜小框汇成一整块可编辑全文，
 * 支持增删镜头、整体调顺序。格式约定「#n 标题 换行 描述」、镜头间空行分隔；
 * 非实时——本地 draft 编辑，点「保存」才解析回 shots（避免逐字重建镜头抖动）。
 */
export default function StoryboardEditorDialog({
  title,
  shots,
  onSave,
  onClose,
}: {
  title: string
  shots: ShotItem[]
  onSave: (text: string) => void
  onClose: () => void
}) {
  const initial = shots
    .map((sh, i) => `#${i + 1} ${sh.title}\n${sh.description}`)
    .join('\n\n')
  const [draft, setDraft] = useState(initial)
  const dirty = draft !== initial
  // 估算镜头数（空行分段），实时提示
  const shotCount = draft.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).length

  const save = () => {
    onSave(draft)
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-6"
      onClick={onClose}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Escape') onClose()
        // ⌘/Ctrl+Enter 保存
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          save()
        }
      }}
    >
      <div
        className="pl-pop-in flex max-h-[84vh] w-[760px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            {title}
          </span>
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            整体编辑 · 共 {shotCount} 个镜头
          </span>
          <span className="flex-1" />
          <button
            title="关闭 (Esc)"
            onClick={onClose}
            className="rounded-full p-1.5 transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            <X size={15} />
          </button>
        </div>

        {/* 本地受控（不经 store 回流，IME 安全）：保存时一次性解析 */}
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={'#1 镜头标题\n镜头描述（景别/主体/环境/光线/氛围）\n\n#2 下一个镜头标题\n……'}
          className="min-h-[360px] flex-1 resize-none bg-transparent px-5 py-4 font-mono text-[14px] leading-[1.9] outline-none"
          style={{ color: TOKENS.textBody }}
        />

        <div className="flex items-center gap-3 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[12px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
            格式：每个镜头「#序号 标题」一行，下面写描述；镜头之间空一行。可自由增删、调整顺序。
          </span>
          <span className="flex-1" />
          <button
            onClick={onClose}
            className="rounded-full px-4 py-1.5 text-[13px] transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            取消
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            title="保存并应用 (⌘/Ctrl + Enter)"
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            保存并应用
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
