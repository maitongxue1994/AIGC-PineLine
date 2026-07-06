import { memo, useState } from 'react'
import { NodeToolbar, Position, type NodeProps } from '@xyflow/react'
import { Image as ImageIcon, ImageOff, Loader2 } from 'lucide-react'
import { activeContent, type PineNode } from '../types'
import { presetMeta } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar, { type OpsPanelKind } from './NodeToolbarBar'
import PromptComposer from './PromptComposer'
import PreviewLightbox from '../components/PreviewLightbox'
import SaveToLibraryDialog from '../dialogs/SaveToLibraryDialog'
import ImageCropDialog from '../dialogs/ImageCropDialog'
import MultiAnglePanel from '../opspanels/MultiAnglePanel'
import LightingPanel from '../opspanels/LightingPanel'
import CameraPanel from '../opspanels/CameraPanel'
import { useInpaint } from '../opspanels/InpaintPanel'
import { useStudioStore } from '../store'

const CARD_W = 340

/** 比例 → 占位高度（内容卡片宽 340） */
function placeholderHeight(aspect?: string): number {
  if (!aspect) return 191
  const [w, h] = aspect.split(':').map(Number)
  if (!w || !h) return 191
  return Math.round((CARD_W * h) / w)
}

/**
 * 图片内容节点（设计稿 §02）：内容即卡片；
 * 工具栏可唤起 多角度/重绘(蒙版)/打光/摄影机 高级操作面板（结果入版本栈可回退）。
 */
function ImageNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const [preview, setPreview] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [cropOpen, setCropOpen] = useState(false)
  const [opsPanel, setOpsPanel] = useState<Exclude<OpsPanelKind, 'inpaint' | 'crop'> | null>(null)
  const [maskMode, setMaskMode] = useState(false)
  const setActiveVersion = useStudioStore((s) => s.setActiveVersion)
  const addImageVersion = useStudioStore((s) => s.addImageVersion)

  const meta = presetMeta(data.preset)
  const output = activeContent(data)
  const active = data.versions[data.activeVersion]
  const running = data.status === 'running'
  const ph = placeholderHeight(data.params.aspectRatio)

  const inpaint = useInpaint(id, data, output, maskMode, () => setMaskMode(false))

  const openPanel = (panel: OpsPanelKind) => {
    if (panel === 'inpaint') {
      setOpsPanel(null)
      setMaskMode(true)
    } else if (panel === 'crop') {
      setMaskMode(false)
      setOpsPanel(null)
      setCropOpen(true)
    } else {
      setMaskMode(false)
      setOpsPanel((cur) => (cur === panel ? null : panel))
    }
  }

  const opsPanelEl =
    opsPanel === 'angle' ? (
      <MultiAnglePanel id={id} data={data} onClose={() => setOpsPanel(null)} />
    ) : opsPanel === 'light' ? (
      <LightingPanel id={id} data={data} onClose={() => setOpsPanel(null)} />
    ) : opsPanel === 'camera' ? (
      <CameraPanel id={id} data={data} onClose={() => setOpsPanel(null)} />
    ) : null

  return (
    <NodeShell
      id={id}
      data={data}
      selected={selected}
      width={CARD_W}
      typeIcon={<ImageIcon />}
      onSaveToLibrary={output ? () => setSaveOpen(true) : undefined}
      toolbar={
        maskMode ? (
          inpaint.toolbar
        ) : (
          <NodeToolbarBar
            id={id}
            kind="image"
            hasImage={!!output}
            output={output}
            filename={`${data.title}.png`}
            onOpenPanel={openPanel}
            onPreview={() => setPreview(true)}
            onSaveToLibrary={output ? () => setSaveOpen(true) : undefined}
          />
        )
      }
      composer={
        maskMode ? (
          inpaint.bar
        ) : opsPanelEl ? (
          <NodeToolbar position={Position.Bottom} offset={14} className="nodrag">
            {opsPanelEl}
          </NodeToolbar>
        ) : (
          <PromptComposer id={id} data={data} />
        )
      }
    >
      {output ? (
        <>
          <img
            src={output}
            alt={data.title}
            draggable={false}
            onDoubleClick={(e) => {
              if (maskMode) return
              e.stopPropagation()
              setPreview(true)
            }}
            className="block w-full select-none"
            style={{ background: '#1A1A1C' }}
          />
          {maskMode && inpaint.overlay}
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-2 text-[12px]"
          style={{ height: ph, background: '#1A1A1C', color: TOKENS.textDisabled }}
        >
          {running ? (
            <Loader2 size={22} className="animate-spin" style={{ color: TOKENS.textMuted }} />
          ) : active?.error ? (
            <>
              <ImageOff size={22} strokeWidth={1.8} className="text-red-400/70" />
              <span className="max-w-[85%] text-center leading-relaxed text-red-300/80">
                {active.error}
              </span>
            </>
          ) : (
            <>
              <ImageIcon size={22} strokeWidth={1.8} />
              <span style={{ color: TOKENS.textFaint }}>
                {meta ? `${meta.label} · 选中后在下方输入提示词` : '未生成'}
              </span>
            </>
          )}
        </div>
      )}

      {maskMode && inpaint.banner}

      {preview && (
        <PreviewLightbox
          versions={data.versions}
          index={data.activeVersion}
          title={data.title}
          prompt={data.prompt}
          quality={data.params.quality}
          onIndexChange={(i) => setActiveVersion(id, i)}
          onClose={() => setPreview(false)}
        />
      )}

      {saveOpen && output && (
        <SaveToLibraryDialog
          dataUrl={output}
          defaultName={data.title}
          sourceNodeId={id}
          onClose={() => setSaveOpen(false)}
        />
      )}
      {cropOpen && output && (
        <ImageCropDialog
          src={output}
          onApply={(dataUrl) => addImageVersion(id, dataUrl, '裁剪')}
          onClose={() => setCropOpen(false)}
        />
      )}
    </NodeShell>
  )
}

export default memo(ImageNodeInner)
