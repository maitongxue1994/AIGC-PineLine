import { useEffect } from 'react'

/**
 * 弹层通用关闭：点击外部（pointerdown 捕获阶段）或按 Esc（捕获阶段，
 * 不受输入框 stopPropagation 影响）。
 *
 * inside() 返回视为「内部」的元素集合——务必把触发按钮所在容器一并传入，
 * 否则「pointerdown 先关闭 → click 又触发 toggle 重新打开」会造成关不上的抖动。
 */
export function useDismissable(
  active: boolean,
  onClose: () => void,
  inside: () => (HTMLElement | null | undefined)[],
) {
  useEffect(() => {
    if (!active) return
    const onPointer = (e: PointerEvent) => {
      const t = e.target
      if (!(t instanceof Node)) return
      if (inside().some((el) => el?.contains(t))) return
      onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', onPointer, true)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onPointer, true)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [active, onClose, inside])
}
