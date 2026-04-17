import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Q = [
  {
    q: 'PineLine 和单模型的视频生成工具有什么不同？',
    a: '单模型工具只负责一种生成能力。PineLine 是一条可视化管线——它把剧本解析、分镜、镜头设计、多模型路由、剪辑与音画合成统一成一张工作画布，并自动记录每一步的依赖与参数版本，让整个创作过程可回放、可分支。',
  },
  {
    q: '我的素材与模型微调数据是安全的吗？',
    a: '企业方案支持 VPC 私有化部署，一切素材与训练数据不会出私有网络。默认方案下，所有素材启用端到端加密传输与静态加密存储，符合主流内容合规标准，输出文件自动嵌入 C2PA 来源水印。',
  },
  {
    q: '输出的成片能直接用于商业项目吗？',
    a: '是的。Studio 与 Enterprise 方案包含完整商业授权，导出时会嵌入合规 AIGC 标注，并提供详细的模型来源与训练数据声明，便于客户侧合规送审。',
  },
  {
    q: '是否支持与 DaVinci Resolve / Premiere Pro 协作？',
    a: '支持。PineLine 的时间线可导出为 OTIO / EDL / XML，镜头分层（画面、字幕、音效、调色节点）将自动保留，让非线性剪辑软件开袋即用。',
  },
  {
    q: '需要 GPU 或本地算力吗？',
    a: '无需。所有模型推理均在 PineLine 的弹性 GPU 集群执行，你只需在浏览器中工作。Enterprise 客户可选择接入自有算力池或私有云。',
  },
  {
    q: '角色一致性的表现如何？',
    a: '上传 3–10 张角色参考，10 分钟可完成专属 LoRA 训练。我们的对齐模块会把角色特征注入不同视频模型的生成过程，保证角色跨镜头、跨模型仍然是"同一个人"。',
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
