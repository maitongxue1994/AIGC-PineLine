const TRUSTED_CONTEXTS = [
  '广告公司',
  '导演工作室',
  '短剧厂牌',
  '品牌内容部',
  'MCN 制作团队',
  '动画与游戏预演',
  '商业摄影团队',
  '后期剪辑团队',
]

export default function TrustBar() {
  return (
    <section className="relative py-10 md:py-12">
      <div className="container-x">
        <div className="flex flex-col gap-5 border-y border-white/[0.06] py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="eyebrow">Built For Production Teams</div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-1">
              参考 TapNow 的创意画布范式，PineLine 聚焦影视团队的专业生产场景。
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 md:max-w-2xl">
            {TRUSTED_CONTEXTS.map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-center text-xs font-medium text-ink-1"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
