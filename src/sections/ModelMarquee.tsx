const MODELS = [
  'Veo',
  'Kling',
  'Luma',
  'Sora',
  'Midjourney',
  'GPT Image',
  'Hailuo',
  'Jimeng',
  'Vidu',
  'Flux',
  'Pixverse',
  'Gemini',
]

export default function ModelMarquee() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x">
        <div className="mb-6 text-center">
          <div className="eyebrow">强大引擎支持</div>
          <p className="mt-2 text-sm text-ink-2">
            接入图像、视频、音频与语言模型，由 Agent 按镜头任务自动选择最合适的引擎。
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
