import { memo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { Image as ImageIcon, ImageOff, Loader2 } from 'lucide-react'
import { activeContent, type PineNode } from '../types'
import { presetMeta } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar from './NodeToolbarBar'
import PromptComposer from './PromptComposer'
import PreviewLightbox from '../components/PreviewLightbox'
import SaveToLibraryDialog from '../dialogs/SaveToLibraryDialog'
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
 * 图片内容节点（设计稿 §02）：内容即卡片，无内部装饰；
 * 提示词与参数在下方吸附的生成输入栏；多版本以层叠+徽章呈现。
 */
function ImageNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const [preview, setPreview] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const setActiveVersion = useStudioStore((s) => s.setActiveVersion)

  const meta = presetMeta(data.preset)
  const output = activeContent(data)
  const active = data.versions[data.activeVersion]
  const running = data.status === 'running'
  const ph = placeholderHeight(data.params.aspectRatio)

  const openPanel = () => {
    window.dispatchEvent(
      new CustomEvent('pineline:flash', { detail: '高级操作面板即将上线' }),
    )
  }

  return (
    <NodeShell
      id={id}
      data={data}
      selected={selected}
      width={CARD_W}
      typeIcon={<ImageIcon />}
      onSaveToLibrary={output ? () => setSaveOpen(true) : undefined}
      toolbar={
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
      }
      composer={<PromptComposer id={id} data={data} />}
    >
      {output ? (
        <img
          src={output}
          alt={data.title}
          draggable={false}
          onDoubleClick={(e) => { e.stopPropagation(); setPreview(true) }}
          className="block w-full select-none"
          style={{ background: '#1A1A1C' }}
        />
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
    </NodeShell>
  )
}

export default memo(ImageNodeInner)
