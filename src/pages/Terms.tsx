import { motion } from 'framer-motion'
import { CONTACT } from '../siteConfig'

/** 服务条款（个人服务者版，非正式法律文本，上线前建议律师过一遍） */
export default function Terms() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 pt-28 pb-24"
    >
      <section className="container-x mx-auto max-w-3xl">
        <h1 className="section-title">服务条款</h1>
        <p className="mt-3 text-sm text-ink-2">最后更新：2026 年 7 月</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-1">
          <Block title="1. 服务性质">
            PineLine 提供两类服务：(a) 在线创作工具（画布式 AIGC 视频创作，按积分计量）；
            (b) 受托内容创作服务（按需为客户制作视频成片）。使用本站即表示您同意本条款。
          </Block>
          <Block title="2. AI 生成内容与标识">
            本站生成的图片/视频均为人工智能生成合成内容。依据《人工智能生成合成内容标识办法》，
            交付与发布时须带显式标识（「AI 生成」角标）与隐式标识（元数据/说明）。您不得删除、
            篡改或隐匿标识，或将本站产物用于误导性用途。
          </Block>
          <Block title="3. 知识产权与授权">
            受托创作交付的成片，在您结清费用后，其可转让的权利归您所有；您对提供给我们的素材
            （文字、图片、真人形象等）保证拥有合法权利或授权。AI 生成内容的著作权认定在中国法下
            属个案判断，我们不对其权利的绝对性作出保证。
          </Block>
          <Block title="4. 内容合规与责任">
            您不得使用本站生成违法、侵权、虚假或违背公序良俗的内容。生成结果由第三方模型产出，
            我们不对其准确性、适用性负责；涉专业领域（医疗、法律、食品安全等）内容请自行审校，
            终审责任由您承担。
          </Block>
          <Block title="5. 积分与退款">
            积分为预付费用量凭证，用于抵扣模型生成成本，一经用于生成不可退还；未使用的积分退款
            政策以购买时的说明为准。
          </Block>
          <Block title="6. 免责与变更">
            服务按「现状」提供，不保证不中断或无差错。我们可能不时更新本条款，重大变更会在本页公示。
          </Block>
          <Block title="7. 联系">
            如有疑问请联系 {CONTACT.email}。
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
