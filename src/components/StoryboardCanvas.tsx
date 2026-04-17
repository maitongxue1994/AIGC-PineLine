import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Clapperboard,
  Film,
  Image as ImageIcon,
  Users,
  Music2,
  Play,
  type LucideIcon,
} from 'lucide-react'

type NodeDef = {
  id: string
  x: number
  y: number
  w?: number
  type: 'script' | 'storyboard' | 'actor' | 'model' | 'shot' | 'audio'
  title: string
  subtitle?: string
  status?: 'idle' | 'generating' | 'ready'
  accent: string
  thumb?: string
}

const NODES: NodeDef[] = [
  { id: 'script-01', x: 60,  y: 80,  type: 'script', title: 'SCRIPT · SC01', subtitle: '雨夜屋顶 · 120 字', accent: '#FF6A3D', status: 'ready' },
  { id: 'actor-01',  x: 60,  y: 320, type: 'actor',  title: 'ACTOR · 林夜',  subtitle: 'LoRA v3 · 风衣造型',  accent: '#FF3D7F', status: 'ready' },
  { id: 'board-01',  x: 380, y: 200, w: 300, type: 'storyboard', title: 'STORYBOARD · SC01', subtitle: '3 shots · 14s', accent: '#7C5CFF', status: 'ready' },
  { id: 'model-01',  x: 760, y: 80,  type: 'model',  title: 'MODEL · Sora Turbo', subtitle: '24fps · 3840×1608', accent: '#22D3EE', status: 'idle' },
  { id: 'shot-01',   x: 760, y: 320, type: 'shot',   title: 'SHOT · 01 WIDE', subtitle: '0:00 – 0:04 · 运镜 dolly-in', accent: '#7C5CFF', status: 'generating' },
  { id: 'audio-01',  x: 1080, y: 200, type: 'audio', title: 'AUDIO · 雨声 + 低频', subtitle: '环境 + 人声 · 自动配乐', accent: '#B6FF5F', status: 'ready' },
]

const EDGES: [string, string][] = [
  ['script-01', 'board-01'],
  ['actor-01', 'board-01'],
  ['board-01', 'model-01'],
  ['board-01', 'shot-01'],
  ['model-01', 'shot-01'],
  ['shot-01', 'audio-01'],
]

export default function StoryboardCanvas({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const start = useRef({ x: 0, y: 0, ox: 0, oy: 0 })

  const onDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]')) return
    setDragging(true)
    start.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
  }
  const onMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setOffset({
      x: start.current.ox + (e.clientX - start.current.x),
      y: start.current.oy + (e.clientY - start.current.y),
    })
  }
  const onUp = () => setDragging(false)

  const nodeById = (id: string) => NODES.find((n) => n.id === id)!

  return (
    <div
      ref={ref}
      className={`relative h-full w-full overflow-hidden ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
    >
      {/* backgrounds */}
      <div className="absolute inset-0 dot-bg opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(255,106,61,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_70%,rgba(124,92,255,0.08),transparent_70%)]" />

      {/* translated world */}
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {/* edges */}
        <svg className="pointer-events-none absolute left-0 top-0 h-[2000px] w-[2400px]">
          <defs>
            <linearGradient id="edge-orange" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#FF6A3D" />
              <stop offset="100%" stopColor="#7C5CFF" />
            </linearGradient>
            <linearGradient id="edge-violet" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id="edge-cyan" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#B6FF5F" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const na = nodeById(a)
            const nb = nodeById(b)
            const ax = na.x + (na.w ?? 220)
            const ay = na.y + 52
            const bx = nb.x
            const by = nb.y + 52
            const midX = (ax + bx) / 2
            const color = i % 3 === 0 ? 'edge-orange' : i % 3 === 1 ? 'edge-violet' : 'edge-cyan'
            return (
              <g key={a + b}>
                <path
                  d={`M ${ax} ${ay} C ${midX} ${ay}, ${midX} ${by}, ${bx} ${by}`}
                  fill="none"
                  stroke={`url(#${color})`}
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                >
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.2s" repeatCount="indefinite" />
                </path>
                <circle cx={ax} cy={ay} r="3" fill="#FF6A3D" />
                <circle cx={bx} cy={by} r="3" fill="#7C5CFF" />
              </g>
            )
          })}
        </svg>

        {/* nodes */}
        {NODES.map((n) => (
          <CanvasNode
            key={n.id}
            node={n}
            selected={selected === n.id}
            onClick={() => onSelect(n.id)}
          />
        ))}
      </div>
    </div>
  )
}

function CanvasNode({
  node,
  selected,
  onClick,
}: {
  node: NodeDef
  selected: boolean
  onClick: () => void
}) {
  const w = node.w ?? 220
  const Icon = ICONS[node.type]

  return (
    <motion.div
      data-node
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`absolute cursor-pointer select-none rounded-xl border bg-[#0E0E14]/90 p-3 shadow-card backdrop-blur transition ${
        selected ? 'border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_-10px_#FF6A3D]' : 'border-white/10 hover:border-white/25'
      }`}
      style={{ left: node.x, top: node.y, width: w }}
    >
      <div
        className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em]"
        style={{ color: node.accent }}
      >
        <span className="flex items-center gap-1.5">
          <Icon size={12} />
          {node.title}
        </span>
        {node.status === 'generating' ? (
          <span className="flex items-center gap-1 text-white">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand" />
            gen
          </span>
        ) : (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: node.accent }}
          />
        )}
      </div>

      {/* thumb */}
      {node.type === 'storyboard' && <StoryboardThumbs />}
      {node.type === 'shot' && <ShotThumb status={node.status} />}
      {node.type === 'script' && <ScriptBody />}
      {node.type === 'actor' && <ActorThumb />}
      {node.type === 'model' && <ModelBody />}
      {node.type === 'audio' && <AudioBody />}

      {node.subtitle && (
        <div className="mt-2 text-[11px] text-ink-2">{node.subtitle}</div>
      )}

      {/* ports */}
      <span className="absolute -left-1.5 top-12 h-3 w-3 rounded-full border-2 border-bg-0" style={{ background: node.accent }} />
      <span className="absolute -right-1.5 top-12 h-3 w-3 rounded-full border-2 border-bg-0" style={{ background: node.accent }} />
    </motion.div>
  )
}

const ICONS: Record<NodeDef['type'], LucideIcon> = {
  script: FileText,
  storyboard: Clapperboard,
  actor: Users,
  model: Film,
  shot: ImageIcon,
  audio: Music2,
}

function ScriptBody() {
  return (
    <div className="rounded-md border border-white/[0.07] bg-bg-2/50 p-2 text-[11px] leading-relaxed text-ink-1">
      <div className="text-ink-0">INT./EXT. 屋顶 — 夜 — 雨</div>
      <div className="mt-1 line-clamp-3 text-ink-2">
        林夜独自站在霓虹边缘……无人机群点亮如迁徙的萤火。
      </div>
    </div>
  )
}

function StoryboardThumbs() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="relative aspect-video overflow-hidden rounded-md border border-white/10"
          style={{
            background: [
              'linear-gradient(135deg,#2a1a3a,#ff6a3d33,#7c5cff55)',
              'linear-gradient(135deg,#11253a,#22d3ee55,#7c5cff55)',
              'linear-gradient(135deg,#2a0a14,#ff3d7f55,#ff6a3d55)',
            ][i],
          }}
        >
          <div className="absolute left-1 top-1 rounded-sm bg-black/60 px-1 text-[8px] text-white">
            S0{i + 1}
          </div>
          <div className="absolute bottom-1 right-1 rounded-sm bg-black/60 px-1 text-[8px] text-white">
            {['wide', 'med', 'close'][i]}
          </div>
        </div>
      ))}
    </div>
  )
}

function ShotThumb({ status }: { status?: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg,#090618 0%, #2a0a3a 30%, #ff3d7f 65%, #ff6a3d 100%)',
        }}
      />
      {status === 'generating' && (
        <>
          <div className="animate-scan absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
              <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand" />
              generating · 64%
            </div>
          </div>
        </>
      )}
      <div className="absolute bottom-1 left-1 rounded-sm bg-black/50 px-1 text-[8px] text-white">
        00:04 · 24fps
      </div>
      <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-black">
        <Play size={10} fill="#000" />
      </div>
    </div>
  )
}

function ActorThumb() {
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-md border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a0a14] via-[#4a1020] to-[#ff6a3d]" />
      <div className="absolute inset-x-0 top-[18%] mx-auto h-[40%] w-[32%] rounded-full bg-gradient-to-b from-white/20 to-transparent blur-xl" />
      <div className="absolute bottom-1 left-1 rounded-sm bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
        林夜 · v3
      </div>
    </div>
  )
}

function ModelBody() {
  return (
    <div className="space-y-1 rounded-md border border-white/[0.07] bg-bg-2/50 p-2 text-[11px]">
      <Row k="Motion" v="cinematic" />
      <Row k="Style" v="noir-rain" />
      <Row k="Seed" v="0x88AF" />
      <button className="mt-2 w-full rounded-md bg-brand-gradient py-1.5 text-[10px] font-semibold text-white">
        Route & Generate
      </button>
    </div>
  )
}

function AudioBody() {
  return (
    <div className="space-y-1 rounded-md border border-white/[0.07] bg-bg-2/50 p-2 text-[11px]">
      <div className="flex items-end gap-0.5">
        {[4, 8, 6, 10, 14, 18, 12, 8, 10, 16, 20, 14, 9, 6, 4, 10, 14, 18, 20, 12].map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-sm"
            style={{
              height: `${h * 1.2}px`,
              background: 'linear-gradient(180deg, #B6FF5F, #22D3EE)',
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-ink-2">
        <span>rain · bass · synth</span>
        <span>-6 dB</span>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-2">{k}</span>
      <span className="text-ink-0">{v}</span>
    </div>
  )
}
