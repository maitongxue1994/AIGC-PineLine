import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Q = [
  {
    q: 'PineLine 和单点的视频生成工具有什么不同？',
    a: '单点工具只负责一次生成。PineLine 是一条可视化管线：剧本 → 分镜 → 分镜图 → 镜头视频在一张画布上连线贯通，上游产出自动喂下游，可一键跑通整条链，并自动记录每一步的提示词与版本。',
  },
  {
    q: '为什么生成能力要用积分/邀请码？',
    a: '视频生成会产生真实的模型调用成本。用积分预付费、按实际用量扣费，能保证服务稳定、避免被滥用。画布浏览、工程导入导出不需要积分，只有点击生成时才消耗。',
  },
  {
    q: '生成的内容能用于商业项目吗？如何标识？',
    a: '可以。我们只走模型服务商的付费商用通道。依据《人工智能生成合成内容标识办法》，下载的图片会自动烧「AI 生成」角标，视频交付需按手册叠加角标；每次交付可附带含提示词、模型、时间线的创作过程报告，便于合规送审与确权。',
  },
  {
    q: '我的画布和素材存在哪里？会不会丢？',
    a: '默认存在你浏览器本地（IndexedDB），项目档案完整保留媒体，刷新和重开项目会自动恢复。不会上传到我们的服务器；清除浏览器数据或更换设备会导致本地数据丢失，重要成片请及时下载。',
  },
  {
    q: '角色一致性怎么做？',
    a: '从剧本一键提取角色、场景、道具，生成三视图/宫格参考节点；派生分镜图时按名字自动挂载对应参考图，让同一角色跨镜头保持一致。含人物的画面建议用 Seedream 生成（Seedance 视频不接受疑似真人人脸的参考图）。',
  },
  {
    q: '企业批量制作怎么合作？',
    a: '出版社、杂志社、教育机构等批量视频需求可走定制服务：按月产能包交付，含 AI 标识与存证报告。在定价页「企业定制服务」预约咨询即可。',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title mt-3">关于 PineLine，你可能想问</h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          {Q.map((item, i) => {
            const isOpen = open === i
            return (
              <button
                key={item.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="block w-full px-6 py-5 text-left"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="font-medium text-white">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-ink-2 transition ${isOpen ? 'rotate-180 text-white' : ''}`}
                  />
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden text-sm leading-relaxed text-ink-1">{item.a}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
