import { useLayoutEffect, useRef, useState } from 'react'
import { ClipboardPaste, FilePlus2, Redo2, Undo2, Upload } from 'lucide-react'
import { useStudioStore } from './store'
import { flashUploadSkipped, readFilesAsDataUrls } from './mediaUpload'
import { SHADOWS, TOKENS } from './designTokens'

/**
 * 画布右键菜单（TapNow 同款）：上传 / 添加节点 / 撤销 / 重做 / 粘贴。
 * 「添加节点」转交 NodePaletteMenu（由调用方处理）。
 */
export default function CanvasContextMenu({
  x,
  y,
  flowPos,
  onAddNode,
  onClose,
}: {
  x: number
  y: number
  flowPos: { x: number; y: number }
  onAddNode: () => void
  onClose: () => void
}) {
  const undo = useStudioStore((s) => s.undo)
  const redo = useStudioStore((s) => s.redo)
  const canUndo = useStudioStore((s) => s.past.length > 0)
  const canRedo = useStudioStore((s) => s.future.length > 0)
  const pasteClipboard = useStudioStore((s) => s.pasteClipboard)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)

  const ref = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const margin = 8
    setPos({
      left: Math.max(margin, Math.min(x, window.innerWidth - el.offsetWidth - margin)),
      top: Math.max(margin, Math.min(y, window.innerHeight - el.offsetHeight - margin)),
    })
  }, [x, y])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    onClose()
    const { items, skipped } = await readFilesAsDataUrls(files, { accept: 'image/', max: 4, maxMB: 8 })
    items.forEach(({ dataUrl }, i) =>
      addAssetNode(dataUrl, { x: flowPos.x + i * 48, y: flowPos.y + i * 48 }),
    )
    flashUploadSkipped(skipped)
  }

  const item =
    'flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition enabled:hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault()
          onClose()
        }}
      />
      <div
        ref={ref}
        className="fixed z-50 w-[200px] rounded-[16px] border border-white/[0.08] p-2"
        style={{ ...pos, background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => fileRef.current?.click()} className={item} style={{ color: TOKENS.textBody }}>
          <Upload size={15} /> 上传
        </button>
        <button onClick={onAddNode} className={item} style={{ color: TOKENS.textBody }}>
          <FilePlus2 size={15} /> 添加节点
        </button>
        <div className="mx-2 my-1 h-px bg-white/[0.07]" />
        <button disabled={!canUndo} onClick={() => { undo(); onClose() }} className={item} style={{ color: TOKENS.textBody }}>
          <Undo2 size={15} /> 撤销
          <span className="ml-auto text-[12px]" style={{ color: TOKENS.textFaint }}>⌘Z</span>
        </button>
        <button disabled={!canRedo} onClick={() => { redo(); onClose() }} className={item} style={{ color: TOKENS.textBody }}>
          <Redo2 size={15} /> 重做
          <span className="ml-auto text-[12px]" style={{ color: TOKENS.textFaint }}>⇧⌘Z</span>
        </button>
        <button
          onClick={() => {
            pasteClipboard(flowPos)
            onClose()
          }}
          className={item}
          style={{ color: TOKENS.textBody }}
        >
          <ClipboardPaste size={15} /> 粘贴
          <span className="ml-auto text-[12px]" style={{ color: TOKENS.textFaint }}>⌘V</span>
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
    </>
  )
}
