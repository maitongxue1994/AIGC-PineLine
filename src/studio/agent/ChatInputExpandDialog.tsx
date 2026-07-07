import { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Send, X } from 'lucide-react'
import { SHADOWS, TOKENS } from '../designTokens'
import { CopyButton, SyncTextarea } from '../nodes/composerKit'
import { imagesFromClipboard } from './imageAttach'

/**
 * AI 助手输入框「扩展编辑」（body Portal 模态，z-[80]）：
 * 底部输入栏空间有限，长需求（完整剧本设定 / 复杂分镜描述）在大窗里从容编辑；
 * 半受控 SyncTextarea（IME/光标安全，见 composerKit），实时写回 draft。
 * Enter 换行、⌘/Ctrl+Enter 发送；Esc / 关闭 / 点击遮罩收起；粘贴图片沿用附图队列。
 */
export default function ChatInputExpandDialog({
  value,
  sending,
  attachedCount,
  onChange,
  onSend,
  onClose,
  onPasteFiles,
}: {
  value: string
  sending: boolean
  /** 已附图片数（在大窗里也让用户知道会一并发送） */
  attachedCount: number
  onChange: (v: string) => void
  /** 发送（内部会清空 draft）；返回 accepted——仅在真发出后才收起本弹层，被拦截则留在大窗 */
  onSend: () => Promise<boolean>
  onClose: () => void
  onPasteFiles: (files: File[]) => void
}) {
  // 挂载即聚焦并把光标移到末尾（callback ref 在 commit 期执行，render 保持纯净）
  const focusRef = useCallback((el: HTMLTextAreaElement | null) => {
    if (el) {
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }, [])

  const canSend = !!value.trim() && !sending
  const submit = () => {
    if (!canSend) return
    // 只有真发出去（accepted）才收起大窗；被拦截（如 M2.7 带图）留在大窗，草稿已还原可继续改
    void onSend().then((accepted) => {
      if (accepted) onClose()
    })
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
        className="pl-pop-in flex max-h-[80vh] w-[760px] max-w-[94vw] flex-col rounded-[20px] border border-white/[0.08]"
        style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
          <span className="text-[15px] font-semibold" style={{ color: TOKENS.textTitle }}>
            扩展编辑
          </span>
          <span className="flex-1" />
          <button
            title="收起 (Esc)"
            onClick={onClose}
            className="rounded-full p-1.5 transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textMuted }}
          >
            <X size={15} />
          </button>
        </div>

        <SyncTextarea
          ref={focusRef}
          value={value}
          onValueChange={onChange}
          onKeyDown={(e) => {
            // 大窗里 Enter 换行；⌘/Ctrl+Enter 才发送。始终吞掉冒泡避免触发画布快捷键
            // ——正因吞掉了冒泡，Esc 关闭需在此就地处理（否则到不了外层遮罩的 onKeyDown）
            e.stopPropagation()
            if (e.key === 'Escape') {
              onClose()
              return
            }
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !e.nativeEvent.isComposing) {
              e.preventDefault()
              submit()
            }
          }}
          onPaste={(e) => {
            const files = imagesFromClipboard(e)
            if (files.length) {
              e.preventDefault()
              onPasteFiles(files)
            }
          }}
          placeholder="在这里从容描述你的创意或需求，支持多段落。⌘/Ctrl + Enter 发送，Enter 换行…"
          className="min-h-[360px] flex-1 resize-none bg-transparent px-5 py-4 text-[15px] leading-[1.8] outline-none"
          style={{ color: TOKENS.textBody }}
        />

        <div className="flex items-center gap-3 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[12px]" style={{ color: TOKENS.textFaint }}>
            {attachedCount > 0 ? `已附 ${attachedCount} 张图片，将一并发送` : '⌘/Ctrl + Enter 发送'}
          </span>
          <span className="flex-1" />
          <span className="text-[12px] tabular-nums" style={{ color: TOKENS.textFaint }}>
            {value.length} 字
          </span>
          <CopyButton
            text={value}
            label="复制全文"
            iconSize={13}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition hover:bg-white/[0.08]"
            style={{ color: TOKENS.textBody }}
          />
          <button
            disabled={!canSend}
            onClick={submit}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            <Send size={13} stroke="#0B0B0C" /> 发送
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
