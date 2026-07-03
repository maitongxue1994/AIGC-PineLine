import { useEffect } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { motion } from 'framer-motion'
import { useStudioStore } from '../studio/store'
import StudioCanvas from '../studio/StudioCanvas'
import TopBar from '../studio/TopBar'
import LeftRail from '../studio/LeftRail'
import BottomControls from '../studio/BottomControls'
import EmptyViewportHint from '../studio/EmptyViewportHint'
import SearchDialog from '../studio/SearchDialog'
import AgentPanel, { AgentLauncher } from '../studio/agent/AgentPanel'
import { TOKENS } from '../studio/designTokens'

/**
 * Studio 工作空间（TapNow 式布局）：
 * 满屏画布 + 悬浮透明顶栏 + 左侧胶囊导航 + 左下控制区 + 搜索命令面板。
 * ReactFlowProvider 上提到页面级：左栏面板/搜索/控制条都要调画布视口 API。
 */
export default function Studio() {
  const restoreCurrentProject = useStudioStore((s) => s.restoreCurrentProject)
  // localStorage 恢复的画布不含 data: 媒体；从项目档案（IndexedDB 完整版）找回图片/视频
  useEffect(() => {
    void restoreCurrentProject()
  }, [restoreCurrentProject])

  return (
    <ReactFlowProvider>
      <motion.main
        initial={false}
        exit={{ opacity: 0 }}
        className="relative h-screen w-full overflow-hidden text-ink-0"
        style={{ background: TOKENS.canvasBg }}
      >
        <StudioCanvas />
        <TopBar />
        <LeftRail />
        <BottomControls />
        <EmptyViewportHint />
        <SearchDialog />
        <AgentLauncher />
        <AgentPanel />
      </motion.main>
    </ReactFlowProvider>
  )
}
