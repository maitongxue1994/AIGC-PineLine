import { useState } from 'react'
import { useStudioStore } from '../store'

/** 节点标题：双击进入重命名（TapNow 同款），Enter 确认 / Esc 取消 */
export function NodeTitle({ id, title }: { id: string; title: string }) {
  const updateNodeTitle = useStudioStore((s) => s.updateNodeTitle)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(title)

  if (editing)
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Enter') {
            if (draft.trim()) updateNodeTitle(id, draft.trim())
            setEditing(false)
          }
          if (e.key === 'Escape') setEditing(false)
        }}
        onBlur={() => {
          if (draft.trim()) updateNodeTitle(id, draft.trim())
          setEditing(false)
        }}
        className="nodrag w-full min-w-0 rounded border border-white/30 bg-bg-2 px-1 py-0.5 text-[12px] text-white outline-none"
      />
    )

  return (
    <span
      title="双击重命名"
      onDoubleClick={(e) => {
        e.stopPropagation()
        setDraft(title)
        setEditing(true)
      }}
      className="min-w-0 truncate"
    >
      {title}
    </span>
  )
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
