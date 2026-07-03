import { Clock, FolderOpen, LayoutGrid, MessageCircle, Plus, Search, User } from 'lucide-react'
import { useUIStore, type RailPanel } from './uiStore'
import { SHADOWS, TOKENS } from './designTokens'
import AddNodePanel from './panels/AddNodePanel'
import TemplatePanel from './panels/TemplatePanel'
import AssetLibraryPanel from './panels/AssetLibraryPanel'
import HistoryPanel from './panels/HistoryPanel'

function RailBtn({
  title,
  active,
  disabled,
  emphasized,
  dot,
  onClick,
  children,
}: {
  title: string
  active?: boolean
  disabled?: boolean
  emphasized?: boolean
  dot?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center rounded-full transition enabled:hover:bg-[#29292C] disabled:cursor-not-allowed disabled:opacity-40"
      style={{
        background: emphasized ? '#F5F5F7' : active ? 'rgba(255,255,255,0.1)' : undefined,
        color: emphasized ? '#0B0B0C' : active ? '#F5F5F7' : '#B8B8BF',
      }}
    >
      {children}
      {dot && (
        <span
          className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full"
          style={{ background: TOKENS.accent }}
        />
      )}
    </button>
  )
}

/**
 * 左侧浮动胶囊导航（设计稿 §07）：
 * 新建节点（白底强调）· 搜索 · 素材库 · 模板 · 评论 · 生成历史 · 头像。
 */
export default function LeftRail({
  renderPanel,
}: {
  /** M4+ 注入素材库/历史等面板；返回 null 则用内置面板 */
  renderPanel?: (panel: RailPanel) => React.ReactNode | null
}) {
  const activePanel = useUIStore((s) => s.activePanel)
  const setActivePanel = useUIStore((s) => s.setActivePanel)
  const setSearchOpen = useUIStore((s) => s.setSearchOpen)

  const injected = renderPanel?.(activePanel)
  const panel =
    injected ??
    (activePanel === 'add' ? (
      <AddNodePanel />
    ) : activePanel === 'templates' ? (
      <TemplatePanel />
    ) : activePanel === 'library' ? (
      <AssetLibraryPanel />
    ) : activePanel === 'history' ? (
      <HistoryPanel />
    ) : null)

  return (
    // 面板绝对定位、不参与容器高度：打开/切换面板时 rail 图标位置绝不漂移
    <div className="pointer-events-none absolute left-4 top-1/2 z-30 -translate-y-1/2">
      <div
        className="pointer-events-auto flex flex-col items-center gap-1.5 rounded-full border border-white/[0.07] px-2 py-3"
        style={{ background: TOKENS.railBg, boxShadow: SHADOWS.toolbar }}
      >
        <RailBtn
          title="添加节点"
          emphasized
          active={activePanel === 'add'}
          onClick={() => setActivePanel('add')}
        >
          <Plus size={18} strokeWidth={2.2} />
        </RailBtn>
        <RailBtn title="搜索节点 (⌘F)" onClick={() => setSearchOpen(true)}>
          <Search size={17} />
        </RailBtn>
        <RailBtn
          title="素材库"
          active={activePanel === 'library'}
          onClick={() => setActivePanel('library')}
        >
          <FolderOpen size={17} />
        </RailBtn>
        <RailBtn
          title="模板"
          active={activePanel === 'templates'}
          onClick={() => setActivePanel('templates')}
        >
          <LayoutGrid size={17} />
        </RailBtn>
        <RailBtn title="评论（规划中）" disabled>
          <MessageCircle size={17} />
        </RailBtn>
        <RailBtn
          title="生成历史"
          active={activePanel === 'history'}
          onClick={() => setActivePanel('history')}
        >
          <Clock size={17} />
        </RailBtn>
        <div
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ border: '2px solid rgba(255,255,255,0.15)', color: TOKENS.textMuted }}
          title="本地工程（无账号体系）"
        >
          <User size={16} />
        </div>
      </div>

      {panel && (
        <div className="pointer-events-auto absolute left-full top-1/2 ml-3 -translate-y-1/2">
          {panel}
        </div>
      )}
    </div>
  )
}
