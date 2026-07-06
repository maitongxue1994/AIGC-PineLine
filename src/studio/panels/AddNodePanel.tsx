import { useRef } from 'react'
import { useReactFlow } from '@xyflow/react'
import {
  Box,
  FileText,
  Image as ImageIcon,
  ListVideo,
  Music,
  SlidersHorizontal,
  Upload,
  Video,
} from 'lucide-react'
import { useStudioStore } from '../store'
import { useUIStore } from '../uiStore'
import { flashUploadSkipped, readFilesAsDataUrls } from '../mediaUpload'
import { SHADOWS, TOKENS } from '../designTokens'
import type { NodeKind, NodePreset } from '../types'

type Item = {
  key: string
  label: string
  subtitle?: string
  icon: React.ReactNode
  kind?: NodeKind
  preset?: NodePreset
  disabled?: boolean
  badge?: string
  upload?: boolean
}

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: '添加节点',
    items: [
      { key: 'text', label: '文本', subtitle: '脚本、广告词、品牌文案', icon: <FileText size={17} />, kind: 'text', preset: 'script' },
      { key: 'image', label: '图片', icon: <ImageIcon size={17} />, kind: 'image', preset: 'single' },
      { key: 'video', label: '视频', subtitle: '上传/剪辑/截帧；生成接入规划中', icon: <Video size={17} />, kind: 'video' },
      { key: 'audio', label: '音频', icon: <Music size={17} />, disabled: true, badge: '规划中' },
      { key: 'world', label: '3D 世界', icon: <Box size={17} />, disabled: true, badge: 'Beta' },
    ],
  },
  {
    title: '辅助工具',
    items: [
      { key: 'playlist', label: '播放列表', icon: <ListVideo size={17} />, disabled: true, badge: 'Beta' },
      { key: 'editor', label: '图片编辑器', icon: <SlidersHorizontal size={17} />, disabled: true, badge: '规划中' },
    ],
  },
  {
    title: '添加资源',
    items: [{ key: 'upload', label: '上传', icon: <Upload size={17} />, upload: true }],
  },
]

/** 左栏「添加节点」面板（TapNow 同款分组目录） */
export default function AddNodePanel() {
  const addNode = useStudioStore((s) => s.addNode)
  const addAssetNode = useStudioStore((s) => s.addAssetNode)
  const setActivePanel = useUIStore((s) => s.setActivePanel)
  const { screenToFlowPosition } = useReactFlow()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const centerPos = () =>
    screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    setActivePanel(null)
    const { items, skipped } = await readFilesAsDataUrls(files, { accept: 'image/', max: 4, maxMB: 8 })
    items.forEach(({ dataUrl }, i) => {
      const c = centerPos()
      addAssetNode(dataUrl, { x: c.x + i * 48, y: c.y + i * 48 })
    })
    flashUploadSkipped(skipped)
  }

  return (
    <div
      className="w-[260px] rounded-[20px] border border-white/[0.07] p-2.5"
      style={{ background: TOKENS.panelBg, boxShadow: SHADOWS.panel }}
    >
      {GROUPS.map((g) => (
        <div key={g.title}>
          <div className="px-2.5 pb-1 pt-2 text-[12px]" style={{ color: TOKENS.textFaint }}>
            {g.title}
          </div>
          {g.items.map((it) => (
            <button
              key={it.key}
              disabled={it.disabled}
              onClick={() => {
                if (it.upload) {
                  fileRef.current?.click()
                  return
                }
                if (it.kind) {
                  addNode(it.kind, it.preset ?? null, centerPos())
                  setActivePanel(null)
                }
              }}
              className="flex w-full items-center gap-3 rounded-[12px] px-2.5 py-2.5 text-left transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.06]"
                style={{ color: TOKENS.textBody }}
              >
                {it.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px]" style={{ color: TOKENS.textBody }}>
                  {it.label}
                </span>
                {it.subtitle && (
                  <span className="block truncate text-[12px]" style={{ color: TOKENS.textFaint }}>
                    {it.subtitle}
                  </span>
                )}
              </span>
              {it.badge && (
                <span className="shrink-0 text-[11px]" style={{ color: TOKENS.textDisabled }}>
                  {it.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
    </div>
  )
}
