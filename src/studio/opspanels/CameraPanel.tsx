import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useStudioStore } from '../store'
import { estimateCost } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import type { PineNodeData } from '../types'
import OpsPanelShell from './OpsPanelShell'

const COLUMNS: { key: string; label: string; options: string[] }[] = [
  { key: 'body', label: '机身', options: ['Sony Venice', 'RED Komodo', 'ARRI Alexa 35', 'Canon C700'] },
  { key: 'lens', label: '镜头', options: ['Zeiss Ultra Prime', 'Cooke S4', 'Canon K35', 'Panavision Primo'] },
  { key: 'focal', label: '焦距', options: ['14mm', '24mm', '35mm', '50mm', '85mm', '135mm'] },
  { key: 'aperture', label: '光圈', options: ['ƒ/1.4', 'ƒ/2', 'ƒ/2.8', 'ƒ/4', 'ƒ/5.6', 'ƒ/8'] },
]

/**
 * 摄影机控制面板（设计稿 §05）：机身/镜头/焦距/光圈 四列轮盘；
 * 「保存」把组合存为节点摄影机预设（回填输入栏胶囊，注入后续生成）；提交立即重打光影再生成。
 */
export default function CameraPanel({
  id,
  data,
  onClose,
}: {
  id: string
  data: PineNodeData
  onClose: () => void
}) {
  const runImageEdit = useStudioStore((s) => s.runImageEdit)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const [idx, setIdx] = useState<number[]>([0, 0, 1, 3])

  const running = data.status === 'running'
  const cost = estimateCost('image', 'single', data.params)

  const picked = COLUMNS.map((c, i) => c.options[idx[i]])
  const summary = `${picked[0]} · ${picked[2]} ${picked[3]}`
  const promptPart = `Shot on ${picked[0]} with ${picked[1]} lens at ${picked[2]}, aperture ${picked[3]}${
    idx[3] <= 1 ? ' (shallow depth of field, creamy bokeh)' : idx[3] >= 4 ? ' (deep focus, everything sharp)' : ''
  }`

  const step = (col: number, dir: 1 | -1) => {
    setIdx((cur) =>
      cur.map((v, i) =>
        i === col ? (v + dir + COLUMNS[i].options.length) % COLUMNS[i].options.length : v,
      ),
    )
  }

  return (
    <OpsPanelShell
      title="摄影机控制"
      cost={cost}
      running={running}
      onSubmit={() => {
        void runImageEdit(
          id,
          `Re-render the exact same subject and composition from the reference image with a different cinema camera setup. Keep subject identity and framing identical. ${promptPart}. Photorealistic, cinematic color science.（保持主体与构图一致，仅改变镜头光学特性）`,
          { label: '摄影机' },
        )
        onClose()
      }}
      onClose={onClose}
      headerExtra={
        <button
          title="保存为该节点的摄影机预设（注入后续生成提示词）"
          onClick={() => {
            updateNodeParams(id, { camera: promptPart })
            window.dispatchEvent(
              new CustomEvent('pineline:flash', { detail: `已保存摄影机预设：${summary}` }),
            )
            onClose()
          }}
          className="rounded-full px-[18px] py-[7px] text-[13px] transition hover:bg-white/[0.14]"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#B8B8BF' }}
        >
          保存
        </button>
      }
    >
      <div className="flex">
        {COLUMNS.map((col, i) => {
          const n = col.options.length
          const cur = idx[i]
          const prev = col.options[(cur - 1 + n) % n]
          const next = col.options[(cur + 1) % n]
          return (
            <div
              key={col.key}
              className="flex min-w-0 flex-1 flex-col items-center gap-1.5 px-2 py-4"
              style={{ borderRight: i < COLUMNS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : undefined }}
            >
              <div className="text-[12px]" style={{ color: TOKENS.textFaint }}>
                {col.label}
              </div>
              <button onClick={() => step(i, -1)} className="rounded p-0.5 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
                <ChevronUp size={14} />
              </button>
              <div className="truncate text-[12px] opacity-40" style={{ color: TOKENS.textFaint }}>
                {prev}
              </div>
              <div
                className="flex h-[66px] w-full max-w-[110px] items-center justify-center rounded-[12px] px-1 text-center"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)' }}
              >
                <span
                  className="text-[13px] font-semibold leading-tight"
                  style={{ color: TOKENS.textTitle, fontSize: col.key === 'focal' ? 20 : undefined }}
                >
                  {col.options[cur]}
                </span>
              </div>
              <div className="truncate text-[12px] opacity-40" style={{ color: TOKENS.textFaint }}>
                {next}
              </div>
              <button onClick={() => step(i, 1)} className="rounded p-0.5 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
                <ChevronDown size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </OpsPanelShell>
  )
}
