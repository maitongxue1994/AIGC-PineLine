import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { ImagePlus } from 'lucide-react'
import { activeContent, type PineNode } from '../types'
import { KIND_ACCENTS } from '../nodeCatalog'
import { ImageThumb, NodeActionBar, NodeTitle, StatusBadge } from './shared'

/**
 * 上传素材节点：内容即本体（data URL），不调模型，仅作下游参考图。
 * 只有右侧输出桩。
 */
function AssetNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const accent = KIND_ACCENTS.asset
  const output = activeContent(data)

  return (
    <div
      className={`w-[260px] rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected ? 'border-white/60' : 'border-white/[0.08]'
      }`}
      style={selected ? { boxShadow: `0 0 0 3px ${accent}33` } : undefined}
    >
      <NodeActionBar
        id={id}
        status={data.status}
        output={output}
        filename={`${data.title}.png`}
        runnable={false}
      />

      <div className="flex items-center gap-2 px-3 pt-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-1">
        <ImagePlus size={12} style={{ color: accent }} className="shrink-0" />
        <NodeTitle id={id} title={data.title} />
        <span className="ml-auto" />
        <StatusBadge status={data.status} />
      </div>

      <div className="p-3">
        {output ? (
          <ImageThumb src={output} filename={`${data.title}.png`} aspectClass="aspect-square" />
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-md border border-dashed border-white/[0.12] bg-bg-2/60 p-3 text-center text-[10px] leading-relaxed text-ink-3">
            刷新后图片不保留
            <br />
            请重新拖入，或收藏到素材库长期留存
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !border-2 !border-white/40 !bg-bg-2" />
    </div>
  )
}

export default memo(AssetNodeInner)
