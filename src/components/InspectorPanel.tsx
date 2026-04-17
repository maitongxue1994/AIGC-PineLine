import { useState } from 'react'
import { Sparkles, Play, RotateCcw, Wand2, Image as ImageIcon, Info } from 'lucide-react'

export default function InspectorPanel({ nodeId }: { nodeId: string | null }) {
  const [prompt, setPrompt] = useState(
    '雨夜的屋顶，林夜独自伫立霓虹边缘，雨水沿风衣滑落。机位从远景缓慢推进至中景，背景出现迁徙般亮起的无人机群，光斑如萤火。色调：青蓝与霓虹橙的强对比，电影感 2.39:1 画幅。',
  )
  const [motion, setMotion] = useState('cinematic-push-in')
  const [style, setStyle] = useState('noir-rain')
  const [duration, setDuration] = useState(4)
  const [fps, setFps] = useState(24)

  return (
    <aside className="hidden w-[320px] shrink-0 border-l border-white/[0.06] bg-bg-1/50 md:block">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-2">Inspector</div>
          <div className="font-display text-sm font-semibold text-white">
            {nodeId ? nodeLabel(nodeId) : '未选中'}
          </div>
        </div>
        <button className="rounded-md p-1 text-ink-2 hover:bg-white/5 hover:text-white">
          <Info size={14} />
        </button>
      </div>

      <div className="max-h-[calc(100vh-88px-6rem)] overflow-y-auto px-4 py-4">
        <Field label="Prompt">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-ink-2">
            <span>{prompt.length} / 1000</span>
            <button className="flex items-center gap-1 text-brand hover:text-white">
              <Wand2 size={11} /> AI 优化
            </button>
          </div>
        </Field>

        <Field label="Reference">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-video rounded border border-white/10"
                style={{
                  background: [
                    'linear-gradient(135deg,#0c0a14,#ff3d7f)',
                    'linear-gradient(135deg,#061127,#22d3ee)',
                    'linear-gradient(135deg,#2a0a14,#ff6a3d)',
                  ][i],
                }}
              />
            ))}
            <button className="flex aspect-video items-center justify-center rounded border border-dashed border-white/15 text-ink-2 hover:border-white/30 hover:text-white">
              <ImageIcon size={14} />
            </button>
          </div>
        </Field>

        <Field label="Model">
          <Select
            value="sora-turbo"
            options={[
              ['sora-turbo', 'Sora Turbo · Cinematic'],
              ['kling-2', 'Kling 2.0 · Long motion'],
              ['runway-4', 'Runway Gen-4'],
              ['veo-3', 'Veo 3 · Physics'],
              ['minimax', 'MiniMax · 中文首选'],
            ]}
          />
        </Field>

        <Field label="Motion">
          <Select
            value={motion}
            onChange={setMotion}
            options={[
              ['cinematic-push-in', 'Push-in · 推镜'],
              ['dolly-track', 'Dolly · 移轨'],
              ['handheld', 'Handheld · 手持'],
              ['drone', 'Drone · 航拍'],
              ['orbit', 'Orbit · 环绕'],
            ]}
          />
        </Field>

        <Field label="Style">
          <Select
            value={style}
            onChange={setStyle}
            options={[
              ['noir-rain', 'Noir Rain · 雨夜黑色'],
              ['neo-tokyo', 'Neo Tokyo · 霓虹'],
              ['anime', 'Anime · 动画'],
              ['doc', 'Documentary · 写实'],
              ['wes', 'Wes Anderson · 对称'],
            ]}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Duration (s)">
            <NumberInput value={duration} onChange={setDuration} min={1} max={16} />
          </Field>
          <Field label="FPS">
            <Select
              value={String(fps)}
              onChange={(v) => setFps(Number(v))}
              options={[
                ['24', '24'],
                ['30', '30'],
                ['60', '60'],
              ]}
            />
          </Field>
        </div>

        <Field label="Advanced">
          <ToggleRow label="保持角色一致性" on />
          <ToggleRow label="保持风格一致性" on />
          <ToggleRow label="物理仿真 (Veo)" />
          <ToggleRow label="水印 · C2PA" on />
        </Field>
      </div>

      {/* bottom action */}
      <div className="absolute bottom-24 right-0 w-[320px] border-t border-white/[0.06] bg-bg-1/90 p-3 backdrop-blur">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="text-ink-2">预估算力</span>
          <span className="text-white">≈ 1.2 Credits · 42s</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex-1 !py-2 !text-xs">
            <RotateCcw size={12} /> 重置
          </button>
          <button className="btn-primary flex-[1.4] !py-2 !text-xs">
            <Sparkles size={12} /> 生成镜头
          </button>
        </div>
        <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 py-1.5 text-[11px] text-ink-1 hover:text-white">
          <Play size={11} /> 仅预览 · 低清
        </button>
      </div>
    </aside>
  )
}

function nodeLabel(id: string) {
  if (id.startsWith('shot')) return 'Shot · 01 Wide'
  if (id.startsWith('board')) return 'Storyboard · SC01'
  if (id.startsWith('script')) return 'Script · SC01'
  if (id.startsWith('model')) return 'Model · Sora Turbo'
  if (id.startsWith('actor')) return 'Actor · 林夜'
  return 'Node'
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-2">{label}</div>
      {children}
    </div>
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange?: (v: string) => void
  options: [string, string][]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full appearance-none rounded-md border border-white/[0.07] bg-bg-2/60 px-2.5 py-2 text-[12px] text-ink-0 outline-none transition focus:border-white/25"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v} className="bg-bg-1">
          {l}
        </option>
      ))}
    </select>
  )
}

function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/[0.07] bg-bg-2/60 px-2.5 py-1.5">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-[#FF6A3D]"
      />
      <span className="w-6 text-right text-[12px] text-white">{value}</span>
    </div>
  )
}

function ToggleRow({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-md border border-white/[0.06] bg-bg-2/40 px-3 py-2 text-[12px]">
      <span className="text-ink-1">{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
          on ? 'bg-brand-gradient' : 'bg-white/10'
        }`}
      >
        <span
          className={`absolute h-3.5 w-3.5 rounded-full bg-white transition ${on ? 'left-[18px]' : 'left-1'}`}
        />
      </span>
    </div>
  )
}
