import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { FileText, Loader2 } from 'lucide-react'
import { useStudioStore } from '../store'
import { activeContent, type PineNode } from '../types'
import { presetMeta } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import NodeShell from './NodeShell'
import NodeToolbarBar from './NodeToolbarBar'
import PromptComposer from './PromptComposer'

const CARD_W = 340

/**
 * 文本内容节点（TapNow 式内容卡）：卡片即正文；
 * 分镜预设展示结构化镜头列表；提示词/参数在下方吸附输入栏。
 */
function TextNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const updateActiveContent = useStudioStore((s) => s.updateActiveContent)

  const meta = presetMeta(data.preset)
  const output = activeContent(data)
  const running = data.status === 'running'
  const shots = data.preset === 'storyboard' ? data.shots ?? [] : []

  // 文本下载走 text/plain data URL
  const downloadHref = output
    ? `data:text/plain;charset=utf-8,${encodeURIComponent(output)}`
    : null

  return (
    <NodeShell
      id={id}
      data={data}
      selected={selected}
      width={CARD_W}
      typeIcon={<FileText />}
      toolbar={
        <NodeToolbarBar
          id={id}
          kind="text"
          hasImage={false}
          output={downloadHref}
          filename={`${data.title}.txt`}
        />
      }
      composer={<PromptComposer id={id} data={data} />}
    >
      <div className="min-h-[120px]" style={{ background: '#131316' }}>
        {running ? (
          <div className="flex h-[120px] items-center justify-center">
            <Loader2 size={20} className="animate-spin" style={{ color: TOKENS.textMuted }} />
          </div>
        ) : shots.length > 0 ? (
          <div className="nowheel max-h-[280px] space-y-2 overflow-y-auto p-4">
            {shots.map((s, i) => (
              <div key={s.id} className="rounded-[8px] bg-white/[0.04] p-2.5">
                <div className="text-[12px] font-semibold" style={{ color: TOKENS.textBody }}>
                  #{i + 1} {s.title}
                </div>
                <div className="mt-0.5 text-[11px] leading-relaxed" style={{ color: TOKENS.textSecondary }}>
                  {s.description}
                </div>
              </div>
            ))}
          </div>
        ) : output != null ? (
          <textarea
            value={output}
            onChange={(e) => updateActiveContent(id, e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="nodrag nowheel block h-[240px] w-full resize-none bg-transparent p-4 text-[13px] leading-relaxed outline-none"
            style={{ color: TOKENS.textBody }}
          />
        ) : (
          <div
            className="flex h-[120px] items-center justify-center px-6 text-center text-[12px] leading-relaxed"
            style={{ color: TOKENS.textFaint }}
          >
            {meta ? `${meta.label} · 选中后在下方输入提示词并运行` : '未生成'}
          </div>
        )}
      </div>
    </NodeShell>
  )
}

export default memo(TextNodeInner)
