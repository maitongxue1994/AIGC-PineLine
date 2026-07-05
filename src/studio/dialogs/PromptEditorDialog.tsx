import { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'
import { CopyButton, SyncTextarea } from '../nodes/composerKit'

/**
 * 提示词展开编辑器（body Portal 模态，z-[80]）：
 * 输入栏空间有限，长提示词（剧本/分镜/复杂画面描述）在大窗里编辑；
 * 实时写回（onChange 直通 store），Esc / 完成 / 点击遮罩关闭。
 */
export default function PromptEditorDialog({
  title,
  value,
  placeholder,
  maxLength,
  hint,
  onChange,
  onClose,
}: {
  title: string
  value: string
  placeholder?: string
  /** 硬性字数上限；不传 = 不限 */
  maxLength?: number
  /** 软性提示（如 Seedance 官方建议中文 ≤500 字） */
  hint?: string
  onChange: (v: string) => void
  onClose: () => void
}) {
  // 挂载即聚焦并把光标移到末尾（callback ref 在 commit 期执行，render 保持纯净）
  const focusRef = useCallback((el: HTMLTextAreaElement | null) => {
    if (el) {
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }, [])

  const count = value.length
  const nearLimit = maxLength ? count >= maxLength * 0.8 : false

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
        className="pl-pop-in flex max-h-[80vh] w-[720px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            {title}
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

        {/* 半受控（SyncTextarea）：value 经 store→RF→data 异步回流，受控写法会整串重写把光标甩到末尾 */}
        <SyncTextarea
          ref={focusRef}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onValueChange={onChange}
          className="min-h-[320px] flex-1 resize-none bg-transparent px-5 py-4 text-[15px] leading-[1.8] outline-none"
          style={{ color: TOKENS.textBody }}
        />

        <div className="flex items-center gap-3 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            {hint ?? ''}
          </span>
          <span className="flex-1" />
          <span
            className="text-[12px] tabular-nums"
            style={{ color: nearLimit ? '#E8A33D' : TOKENS.textFaint }}
          >
            {maxLength ? `${count} / ${maxLength}` : `${count} 字`}
          </span>
          <CopyButton
            text={value}
            label="复制全文"
            iconSize={13}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textBody }}
          />
          <button
            onClick={onClose}
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition hover:opacity-90"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            完成
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
