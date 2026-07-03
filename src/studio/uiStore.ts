import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type RailPanel = 'add' | 'library' | 'templates' | 'history' | null

/** 工作空间 UI 状态（画布数据之外的壳层状态） */
type UIState = {
  /** 左栏当前展开的面板（单选） */
  activePanel: RailPanel
  setActivePanel: (p: RailPanel) => void
  minimapOn: boolean
  gridOn: boolean
  toggleMinimap: () => void
  toggleGrid: () => void
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
      gridOn: true,
      toggleMinimap: () => set((s) => ({ minimapOn: !s.minimapOn })),
      toggleGrid: () => set((s) => ({ gridOn: !s.gridOn })),
      searchOpen: false,
      setSearchOpen: (v) => set({ searchOpen: v }),
      helpOpen: false,
      setHelpOpen: (v) => set({ helpOpen: v }),
    }),
    {
      name: 'pineline-ui-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) =>
        ({ minimapOn: s.minimapOn, gridOn: s.gridOn }) as unknown as UIState,
    },
  ),
)
