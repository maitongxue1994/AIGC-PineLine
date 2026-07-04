import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, FolderOpen, LayoutGrid, MessageCircle, Plus, Search, User, Zap } from 'lucide-react'
import { useUIStore, type RailPanel } from './uiStore'
import { useStudioStore } from './store'
import { useAgentStore } from './agent/agentStore'
import { useDismissable } from './hooks/useDismissable'
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
 * 新建节点（白底强调）· 搜索 · 素材库 · 模板 · AI 助手 · 生成历史 · 账户。
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
  const agentOpen = useAgentStore((s) => s.open)
  const toggleAgent = useAgentStore((s) => s.toggle)
  const credits = useStudioStore((s) => s.credits)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  useDismissable(accountOpen, () => setAccountOpen(false), () => [accountRef.current])
  const rootRef = useRef<HTMLDivElement>(null)

  // 点击画布空白（rail/面板之外）自动收起面板；pointerdown 不拦截该次点击本身
  useEffect(() => {
    if (!activePanel) return
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current
      if (root && e.target instanceof Node && !root.contains(e.target)) {
        setActivePanel(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activePanel, setActivePanel])

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
    <div ref={rootRef} className="pointer-events-none absolute left-4 top-1/2 z-30 -translate-y-1/2">
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
        <RailBtn title="AI 助手：对话搭建生成管线 (⌘J)" active={agentOpen} onClick={toggleAgent}>
          <MessageCircle size={17} />
        </RailBtn>
        <RailBtn
          title="生成历史"
          active={activePanel === 'history'}
          onClick={() => setActivePanel('history')}
        >
          <Clock size={17} />
        </RailBtn>
        <div ref={accountRef} className="relative mt-1">
          <button
            title="账户与工程信息"
            onClick={() => setAccountOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#29292C]"
            style={{
              border: '2px solid rgba(255,255,255,0.15)',
              color: accountOpen ? '#F5F5F7' : TOKENS.textMuted,
            }}
          >
            <User size={16} />
          </button>
          {accountOpen && (
            <div
              className="pl-pop-in absolute bottom-0 left-full ml-3 w-[240px] rounded-[16px] border border-white/[0.08] p-3"
              style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.menu }}
            >
              <div className="px-1 pb-2 text-[14px] font-semibold" style={{ color: TOKENS.textTitle }}>
                本地工程
              </div>
              <div
                className="flex items-center justify-between rounded-[10px] bg-white/[0.04] px-3 py-2.5 text-[13px]"
                title="积分为本地模拟，仅作演示"
              >
                <span style={{ color: TOKENS.textMuted }}>积分余额（模拟）</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: TOKENS.textBody }}>
                  <Zap size={13} style={{ color: TOKENS.textMuted }} />
                  {credits}
                </span>
              </div>
              <Link
                to="/studio/projects"
                onClick={() => setAccountOpen(false)}
                className="mt-1.5 block rounded-[10px] px-3 py-2.5 text-[13px] transition hover:bg-white/[0.06]"
                style={{ color: TOKENS.textBody }}
              >
                项目管理 →
              </Link>
              <div className="px-3 pb-1 pt-2 text-[11px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
                无账号体系：画布与素材均存储在本机浏览器（IndexedDB）
              </div>
            </div>
          )}
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
