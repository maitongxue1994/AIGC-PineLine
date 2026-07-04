import { useRef, useState } from 'react'
import { NodeToolbar, Position, useReactFlow } from '@xyflow/react'
import {
  ArrowLeftRight,
  Camera,
  Copy,
  Download,
  Eraser,
  Expand,
  Film,
  FolderPlus,
  MoreHorizontal,
  Pin,
  Scissors,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import { useStudioStore } from '../../store'
import { PIN_COLORS } from '../../nodeCatalog'
import { SHADOWS, TOKENS } from '../../designTokens'
import { downloadDataUrl } from '../shared'
import { TBtn, ToolbarDivider } from '../NodeToolbarBar'
import SaveToLibraryDialog from '../../dialogs/SaveToLibraryDialog'
import { useDismissable } from '../../hooks/useDismissable'
import type { PinColor, PineNodeData } from '../../types'

function flash(msg: string) {
  window.dispatchEvent(new CustomEvent('pineline:flash', { detail: msg }))
}

/** video 元素当前/首/尾帧 → PNG dataURL（离屏 canvas） */
async function captureFrame(
  src: string,
  el: HTMLVideoElement | null,
  which: 'current' | 'first' | 'last',
): Promise<string> {
  const grab = (v: HTMLVideoElement) => {
    const c = document.createElement('canvas')
    c.width = v.videoWidth || 1280
    c.height = v.videoHeight || 720
    c.getContext('2d')!.drawImage(v, 0, 0, c.width, c.height)
    return c.toDataURL('image/png')
  }
  if (which === 'current' && el && el.readyState >= 2) return grab(el)

  // 首/尾帧：离屏 video seek 后取帧
  return new Promise((resolve, reject) => {
    const v = document.createElement('video')
    v.muted = true
    v.playsInline = true
    v.src = src
    v.onerror = () => reject(new Error('视频解码失败'))
    v.onloadedmetadata = () => {
      v.currentTime = which === 'last' ? Math.max(0, v.duration - 0.05) : 0.01
    }
    v.onseeked = () => {
      try {
        resolve(grab(v))
      } catch (e) {
        reject(e as Error)
      }
    }
  })
}

/**
 * 视频浮动工具栏（video-node-tools §2）：
 * 剪辑 · 增强 · 替换 · 移除 · 截帧(下拉) · 更多(解析/合规验证) ｜ Pin ｜ 保存/下载/全屏。
 */
export default function VideoToolbarBar({
  id,
  data,
  videoElRef,
  hasVideo,
  output,
  onPreview,
  onTrim,
  onEnhance,
  onReplace,
}: {
  id: string
  data: PineNodeData
  videoElRef: React.RefObject<HTMLVideoElement | null>
  hasVideo: boolean
  output: string | null
  onPreview: () => void
  onTrim: () => void
  onEnhance: () => void
  onReplace: () => void
}) {
  const setPin = useStudioStore((s) => s.setPin)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const addNode = useStudioStore((s) => s.addNode)
  const onConnect = useStudioStore((s) => s.onConnect)
  const updateActiveContent = useStudioStore((s) => s.updateActiveContent)
  const duplicateNode = useStudioStore((s) => s.duplicateNode)
  const deleteNode = useStudioStore((s) => s.deleteNode)
  const { getNode } = useReactFlow()

  const [menu, setMenu] = useState<'frame' | 'more' | 'pin' | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  useDismissable(menu !== null, () => setMenu(null), () => [rootRef.current])
  const [saveOpen, setSaveOpen] = useState(false)
  const pin = data.pin ?? null

  const removeVersion = () => {
    const node = useStudioStore.getState().nodes.find((n) => n.id === id)
    if (!node || !node.data.versions.length) return
    const versions = node.data.versions.filter((_, i) => i !== node.data.activeVersion)
    useStudioStore.setState((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                versions,
                activeVersion: Math.max(0, Math.min(node.data.activeVersion, versions.length - 1)),
                status: versions.length ? n.data.status : 'idle',
              },
            }
          : n,
      ),
    }))
    flash('已移除当前版本')
  }

  const doCapture = async (which: 'current' | 'first' | 'last') => {
    setMenu(null)
    if (!output) return
    try {
      const img = await captureFrame(output, videoElRef.current, which)
      const node = getNode(id)
      const pos = node
        ? { x: node.position.x + 560, y: node.position.y + 80 }
        : { x: 0, y: 0 }
      const newId = addNode('image', 'single', pos, { title: '视频截帧' })
      updateActiveContent(newId, img)
      onConnect({ source: id, sourceHandle: null, target: newId, targetHandle: null })
      flash('✓ 截帧成功')
    } catch {
      flash('截帧失败：视频尚未就绪')
    }
  }

  const menuRow =
    'flex w-full items-center gap-3 rounded-[9px] px-3.5 py-[11px] text-left text-[15px] transition hover:bg-white/[0.06]'

  return (
    // 下拉一律绝对定位向下展开：容器向上生长会把菜单顶出视口（与 NodeToolbarBar 同修）
    <NodeToolbar position={Position.Top} offset={12} className="relative">
      <div ref={rootRef} className="contents">
      <div
        className="flex items-center gap-0.5 rounded-full border border-white/[0.07] px-2.5 py-2"
        style={{ background: TOKENS.toolbarBg, boxShadow: SHADOWS.toolbar }}
      >
        <TBtn tip="剪辑" disabled={!hasVideo} onClick={onTrim}>
          <Scissors size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn tip="增强" disabled={!hasVideo} onClick={onEnhance}>
          <span className="rounded-[4px] border-[1.6px] border-current px-[3px] text-[9px] font-bold leading-[13px]">
            HD
          </span>
        </TBtn>
        <TBtn tip="替换（上传视频替换当前版本）" onClick={onReplace}>
          <ArrowLeftRight size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn tip="移除当前版本" disabled={!hasVideo} onClick={removeVersion}>
          <Eraser size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn
          tip="截帧"
          disabled={!hasVideo}
          active={menu === 'frame'}
          onClick={() => setMenu(menu === 'frame' ? null : 'frame')}
        >
          <Camera size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn
          tip="更多"
          dot
          active={menu === 'more'}
          onClick={() => setMenu(menu === 'more' ? null : 'more')}
        >
          <MoreHorizontal size={18} strokeWidth={1.8} />
        </TBtn>

        <ToolbarDivider />

        <TBtn tip="Pin 标记" active={menu === 'pin'} onClick={() => setMenu(menu === 'pin' ? null : 'pin')}>
          <Pin size={18} strokeWidth={1.8} style={pin ? { color: PIN_COLORS[pin] } : undefined} />
        </TBtn>

        <ToolbarDivider />

        <TBtn tip="保存到素材库" disabled={!hasVideo} onClick={() => setSaveOpen(true)}>
          <FolderPlus size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn
          tip="下载"
          disabled={!output}
          onClick={() => output && downloadDataUrl(output, `${data.title}.mp4`)}
        >
          <Download size={18} strokeWidth={1.8} />
        </TBtn>
        <TBtn tip="全屏查看" disabled={!hasVideo} onClick={onPreview}>
          <Expand size={18} strokeWidth={1.8} />
        </TBtn>
      </div>

      {/* 截帧下拉（220px） */}
      {menu === 'frame' && (
        <div
          className="absolute left-1/2 top-full z-40 mt-2 w-[220px] -translate-x-1/2 rounded-[14px] border border-white/[0.08] p-2"
          style={{ background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
        >
          {(
            [
              ['current', '截取当前帧'],
              ['first', '截取首帧'],
              ['last', '截取尾帧'],
            ] as const
          ).map(([k, label]) => (
            <button key={k} onClick={() => void doCapture(k)} className={menuRow} style={{ color: TOKENS.textBody }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* 更多菜单（260px）：解析（占位）/ 合规验证（本地模拟） */}
      {menu === 'more' && (
        <div
          className="absolute left-1/2 top-full z-40 mt-2 w-[260px] -translate-x-1/2 rounded-[14px] border border-white/[0.08] p-2"
          style={{ background: TOKENS.chipBg, boxShadow: SHADOWS.menu }}
        >
          <div className={`${menuRow} cursor-not-allowed opacity-45 hover:bg-transparent`} style={{ color: TOKENS.textBody }}>
            <Film size={17} /> 解析
            <span className="ml-auto text-[11px]" style={{ color: TOKENS.textDisabled }}>
              规划中
            </span>
          </div>
          <button
            onClick={() => {
              setMenu(null)
              updateNodeParams(id, { compliance: true })
              flash('✓ 角色已合规，可用于 Seedance 2.0 视频生成')
            }}
            className={menuRow}
            style={{ color: TOKENS.textBody }}
          >
            <ShieldCheck size={17} /> Seedance 2.0 合规验证
          </button>
          <div className="my-1.5 border-t border-white/[0.07]" />
          <button
            onClick={() => {
              setMenu(null)
              duplicateNode(id)
            }}
            className={menuRow}
            style={{ color: TOKENS.textBody }}
          >
            <Copy size={17} /> 复制节点
            <span className="ml-auto font-mono text-[12px]" style={{ color: TOKENS.textFaint }}>
              ⌘D
            </span>
          </button>
          <button
            onClick={() => {
              setMenu(null)
              deleteNode(id)
            }}
            className={`${menuRow} text-red-300 hover:bg-red-500/10`}
          >
            <Trash2 size={17} /> 删除节点
            <span className="ml-auto font-mono text-[12px] text-red-300/60">⌫</span>
          </button>
        </div>
      )}

      {/* Pin 色板浮条 */}
      {menu === 'pin' && (
        <div
          className="absolute left-1/2 top-full z-40 mt-2 flex -translate-x-1/2 items-center gap-3.5 rounded-full border border-white/[0.07] px-5 py-3"
          style={{ background: TOKENS.toolbarBg, boxShadow: SHADOWS.toolbar }}
        >
          <button
            onClick={() => {
              setPin(id, null)
              setMenu(null)
            }}
            className="text-[14px] transition hover:text-white"
            style={{ color: TOKENS.textBody }}
          >
            无
          </button>
          {(Object.keys(PIN_COLORS) as PinColor[]).map((c) => (
            <button
              key={c}
              title={c}
              onClick={() => {
                setPin(id, c)
                setMenu(null)
              }}
              className="h-[26px] w-[26px] rounded-full transition-transform hover:scale-[1.15]"
              style={{
                background: PIN_COLORS[c],
                boxShadow: pin === c ? '0 0 0 2px rgba(255,255,255,0.7)' : undefined,
              }}
            />
          ))}
        </div>
      )}

      </div>

      {saveOpen && output && (
        <SaveToLibraryDialog
          dataUrl={output}
          defaultName={data.title}
          sourceNodeId={id}
          onClose={() => setSaveOpen(false)}
        />
      )}

    </NodeToolbar>
  )
}
