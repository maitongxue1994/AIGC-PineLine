import { motion } from 'framer-motion'
import { CONTACT } from '../siteConfig'

/** 隐私政策（本地优先存储版本，上线前建议律师过一遍） */
export default function Privacy() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 pt-28 pb-24"
    >
      <section className="container-x mx-auto max-w-3xl">
        <h1 className="section-title">隐私政策</h1>
        <p className="mt-3 text-sm text-ink-2">最后更新：2026 年 7 月</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-1">
          <Block title="1. 数据本地存储">
            您的画布、工程、素材库与生成历史默认存储在您浏览器本地（localStorage 与 IndexedDB），
            不会上传到我们的服务器。清除浏览器数据或更换设备将导致本地数据丢失。
          </Block>
          <Block title="2. 生成请求与第三方模型">
            当您发起生成时，提示词与所需参考素材会发送到我们的服务端并转发给第三方模型服务商
            （火山方舟 / MiniMax / Google 等）以完成生成。这些内容受各服务商的隐私与数据政策约束。
          </Block>
          <Block title="3. 日志">
            为排障与对账，我们会记录生成请求的时间、路径、模型、耗时、成败与供应商 request-id
            （不含完整媒体内容），保留有限期限。
          </Block>
          <Block title="4. 无账号体系">
            当前不设注册登录账号；访问码仅用于校验生成权限与计量积分，不关联您的真实身份信息。
          </Block>
          <Block title="5. Cookie 与分析">
            本站不使用第三方广告追踪 Cookie。
          </Block>
          <Block title="6. 联系">
            隐私相关问题请联系 {CONTACT.email}。
          </Block>
        </div>
      </section>
    </motion.main>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  )
}
