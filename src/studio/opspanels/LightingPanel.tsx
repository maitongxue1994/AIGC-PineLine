import { useState } from 'react'
import { RotateCcw, Sun, Thermometer } from 'lucide-react'
import { useStudioStore } from '../store'
import { estimateCost, IMAGE_MODELS } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import type { PineNodeData } from '../types'
import OpsPanelShell, { EditModelPicker, SliderRow, Toggle } from './OpsPanelShell'

type LightDir = 'left' | 'top' | 'right' | 'front' | 'bottom' | 'back'

const DIRS: { key: LightDir; label: string; en: string; pos: { x: number; y: number } }[] = [
  { key: 'left', label: '左侧', en: 'from the left side', pos: { x: 12, y: 50 } },
  { key: 'top', label: '顶部', en: 'from above (top light)', pos: { x: 50, y: 10 } },
  { key: 'right', label: '右侧', en: 'from the right side', pos: { x: 88, y: 50 } },
  { key: 'front', label: '前方', en: 'from the front', pos: { x: 50, y: 62 } },
  { key: 'bottom', label: '底部', en: 'from below (under light)', pos: { x: 50, y: 90 } },
  { key: 'back', label: '后方', en: 'from behind (backlight)', pos: { x: 50, y: 34 } },
]

/**
 * 打光面板（设计稿 §05）：3D 光球（拖光源手柄吸附六向）+ 亮度/色温 + 主光源六向 + 轮廓光。
 */
export default function LightingPanel({
  id,
  data,
  onClose,
}: {
  id: string
  data: PineNodeData
  onClose: () => void
}) {
  const runImageEdit = useStudioStore((s) => s.runImageEdit)
  const [editModel, setEditModel] = useState(data.params.imageModel ?? IMAGE_MODELS[0].id)
  const [dir, setDir] = useState<LightDir>('left')
  const [brightness, setBrightness] = useState(50)
  const [temp, setTemp] = useState(5600)
  const [rim, setRim] = useState(false)

  const running = data.status === 'running'
  const cost = estimateCost('image', 'single', data.params)
  const cur = DIRS.find((d) => d.key === dir)!

  // 拖拽光球：落点吸附到最近的方向
  const snapToDir = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    let best: LightDir = 'left'
    let bd = Infinity
    for (const d of DIRS) {
      const dd = (d.pos.x - px) ** 2 + (d.pos.y - py) ** 2
      if (dd < bd) {
        bd = dd
        best = d.key
      }
    }
    setDir(best)
  }

  const buildPrompt = () => {
    const mood = brightness < 35 ? 'dim, moody exposure' : brightness > 70 ? 'bright, high-key exposure' : 'balanced exposure'
    const warmth = temp <= 3500 ? 'warm tungsten' : temp >= 6500 ? 'cool blueish daylight' : 'neutral daylight'
    return `Relight the exact same scene and subject from the reference image. Keep subject identity, composition, camera angle and materials identical — change ONLY the lighting. Key light ${cur.en}, overall brightness ${brightness}% (${mood}), color temperature ${temp}K (${warmth})${rim ? ', add a subtle rim light to separate the subject from the background' : ''}. Photorealistic, natural shadows.（保持主体与构图完全一致，仅改变打光）`
  }

  return (
    <OpsPanelShell
      title="打光"
      hint="拖动光球或选择主光源方向"
      cost={cost}
      running={running}
      headerExtra={<EditModelPicker value={editModel} onChange={setEditModel} />}
      onSubmit={() => {
        void runImageEdit(id, buildPrompt(), { label: '打光', model: editModel })
        onClose()
      }}
      onClose={onClose}
    >
      <div className="flex gap-5">
        {/* 左：光球 */}
        <div className="flex w-[210px] shrink-0 flex-col items-center gap-2">
          <div
            className="relative h-[190px] w-[190px] cursor-crosshair rounded-full border border-white/[0.06]"
            style={{ background: 'radial-gradient(circle at 50% 45%, #2E2E33, #18181B 70%)' }}
            onPointerDown={snapToDir}
          >
            <span
              className="absolute h-4 w-4 rounded-full transition-all"
              style={{
                left: `calc(${cur.pos.x}% - 8px)`,
                top: `calc(${cur.pos.y}% - 8px)`,
                background: '#111',
                border: '2px solid #D6D6DB',
                boxShadow: '0 0 12px rgba(255,255,255,0.4)',
              }}
            />
            <span
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[12px]"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#B8B8BF' }}
            >
              主光源 · {cur.label}
            </span>
          </div>
          <button
            onClick={() => {
              setDir('left')
              setBrightness(50)
              setTemp(5600)
              setRim(false)
            }}
            className="flex items-center gap-1 self-start text-[13px] transition hover:text-white"
            style={{ color: TOKENS.textMuted }}
          >
            <RotateCcw size={13} /> 重置
          </button>
        </div>

        {/* 右：参数 */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex items-center gap-2">
            <Sun size={15} style={{ color: TOKENS.textMuted }} />
            <SliderRow
              label="亮度"
              min={0}
              max={100}
              value={brightness}
              format={(v) => `${v}%`}
              onChange={setBrightness}
              trackStyle={{ background: 'linear-gradient(90deg, #6E6E76, #E8E8EC)' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Thermometer size={15} style={{ color: TOKENS.textMuted }} />
            <SliderRow
              label="色温"
              min={2500}
              max={7500}
              step={100}
              value={temp}
              format={(v) => `${v}K`}
              onChange={setTemp}
              trackStyle={{ background: 'linear-gradient(90deg, #E8963C, #F5F0E8 55%, #9DB8D6)' }}
            />
          </div>

          <div className="h-px bg-white/[0.07]" />

          <div className="grid grid-cols-3 gap-2">
            {DIRS.map((d) => (
              <button
                key={d.key}
                onClick={() => setDir(d.key)}
                className="rounded-[10px] py-[9px] text-[14px] transition"
                style={{
                  background: dir === d.key ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.05)',
                  color: dir === d.key ? TOKENS.textTitle : TOKENS.textMuted,
                  fontWeight: dir === d.key ? 600 : 400,
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[14px]" style={{ color: TOKENS.textBody }}>
              轮廓光
            </span>
            <Toggle on={rim} onChange={setRim} />
          </div>
        </div>
      </div>
    </OpsPanelShell>
  )
}
