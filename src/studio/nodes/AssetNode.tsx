import { memo, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import { ImagePlus } from 'lucide-react'
import { activeContent, type PineNode } from '../types'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar from './NodeToolbarBar'
import PreviewLightbox from '../components/PreviewLightbox'
import SaveToLibraryDialog from '../dialogs/SaveToLibraryDialog'
import { useStudioStore } from '../store'

const CARD_W = 260

/** 上传素材节点：内容即本体，不调模型；只有右侧输出端口。 */
function AssetNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const [preview, setPreview] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const setActiveVersion = useStudioStore((s) => s.setActiveVersion)
  const output = activeContent(data)

  return (
    <NodeShell
      id={id}
      data={data}
      selected={selected}
      width={CARD_W}
      typeIcon={<ImagePlus />}
      hasTarget={false}
      onSaveToLibrary={output ? () => setSaveOpen(true) : undefined}
      toolbar={
        <NodeToolbarBar
          id={id}
          kind="asset"
          hasImage={!!output}
          output={output}
          filename={`${data.title}.png`}
          onPreview={() => setPreview(true)}
          onSaveToLibrary={output ? () => setSaveOpen(true) : undefined}
        />
      }
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
          className="flex h-[180px] flex-col items-center justify-center gap-2 px-5 text-center text-[11px] leading-relaxed"
          style={{ background: '#1A1A1C', color: TOKENS.textFaint }}
        >
          <ImagePlus size={20} strokeWidth={1.8} style={{ color: TOKENS.textDisabled }} />
          刷新后图片不保留：请重新拖入，
          <br />
          或提前收藏到素材库长期留存
        </div>
      )}

      {preview && (
        <PreviewLightbox
          versions={data.versions}
          index={data.activeVersion}
          title={data.title}
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

export default memo(AssetNodeInner)
