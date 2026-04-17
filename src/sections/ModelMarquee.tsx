const MODELS = [
  'Sora · Turbo',
  'Kling · 2.0',
  'Runway · Gen-4',
  'Luma · Dream Machine',
  'MiniMax · Hailuo',
  'Pika · 2.1',
  'Veo · 3',
  'HunyuanVideo',
  'Vidu · Q1',
  'Wan · 2.2',
  'CogVideoX',
  'LTX-Video',
]

export default function ModelMarquee() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x">
        <div className="mb-6 text-center">
          <div className="eyebrow">12+ 视频大模型 · 统一编排</div>
          <p className="mt-2 text-sm text-ink-2">
            管线内置多家顶级视频模型，按镜头类型自动路由，画质与成本同步最优。
          </p>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          {[...MODELS, ...MODELS].map((m, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              <span className="whitespace-nowrap font-display text-sm font-medium text-ink-0">
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
