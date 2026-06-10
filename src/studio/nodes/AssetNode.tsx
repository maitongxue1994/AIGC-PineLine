import { Handle, Position, type NodeProps } from '@xyflow/react'
import { FolderUp } from 'lucide-react'
import type { PineNode } from '../types'
import { ImageThumb, StatusBadge, ACCENTS } from './shared'

/** 上传素材节点：不调模型，output 即图片本体，作为下游的参考图来源 */
export default function AssetNode({ data, selected }: NodeProps<PineNode>) {
  return (
    <div
      className={`w-[260px] overflow-hidden rounded-xl border bg-[#0E0E14]/95 shadow-card backdrop-blur transition ${
        selected
          ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#22D3EE]'
          : 'border-white/10 hover:border-white/25'
      }`}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-bg-0 !bg-[#22D3EE]"
      />

      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#22D3EE]">
          <FolderUp size={12} />
          ASSET · {data.title}
        </span>
        <StatusBadge status={data.status} accent={ACCENTS.asset} />
      </div>

      <div className="p-3">
        {data.output ? (
          <ImageThumb
            src={data.output}
            filename={`${data.title || 'asset'}.png`}
            aspectClass="aspect-video"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-white/15 text-center text-[10px] leading-relaxed text-ink-3">
            刷新后图片不保留
            <br />
            请重新拖入，或通过「导出/导入工程」留存
          </div>
        )}
        <div className="mt-2 text-[10px] text-ink-3">
          从右侧端口连到下游节点，作为参考图
        </div>
      </div>
    </div>
  )
}
