import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type RailPanel = 'add' | 'library' | 'templates' | 'history' | null

/** 工作空间 UI 状态（画布数据之外的壳层状态） */
type UIState = {
  /** 左栏当前展开的面板（单选） */
  activePanel: RailPanel
  setActivePanel: (p: RailPanel) => void
  minimapOn: boolean
  /** 网格吸附（TapNow 语义：拖动节点对齐网格；点阵背景常显） */
  snapOn: boolean
  toggleMinimap: () => void
  toggleSnap: () => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  helpOpen: boolean
  setHelpOpen: (v: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist<UIState>(
    (set) => ({
      activePanel: null,
      setActivePanel: (p) => set((s) => ({ activePanel: s.activePanel === p ? null : p })),
      minimapOn: true,
      snapOn: false,
      toggleMinimap: () => set((s) => ({ minimapOn: !s.minimapOn })),
      toggleSnap: () => set((s) => ({ snapOn: !s.snapOn })),
      searchOpen: false,
      setSearchOpen: (v) => set({ searchOpen: v }),
      helpOpen: false,
      setHelpOpen: (v) => set({ helpOpen: v }),
    }),
    {
      name: 'pineline-ui-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) =>
        ({ minimapOn: s.minimapOn, snapOn: s.snapOn }) as unknown as UIState,
    },
  ),
)
