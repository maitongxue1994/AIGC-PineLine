import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { KeyRound, X } from 'lucide-react'
import { getAccessCode, setAccessCode } from '../accessCode'
import { CONTACT } from '../../siteConfig'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 访问码弹层：无账号体系下，访问码 = 付费/邀请凭证。
 * 生成请求命中 403 ACCESS_REQUIRED 时由 pineline:access-required 事件唤起；
 * 也可从设置手动打开。画布浏览/导入导出不需要码——只有生成能力受限。
 */
export default function AccessCodeDialog() {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')

  useEffect(() => {
    const onRequired = () => {
      setCode(getAccessCode())
      setOpen(true)
    }
    window.addEventListener('pineline:access-required', onRequired)
    return () => window.removeEventListener('pineline:access-required', onRequired)
  }, [])

  if (!open) return null

  const save = () => {
    setAccessCode(code)
    setOpen(false)
    window.dispatchEvent(
      new CustomEvent('pineline:flash', {
        detail: code.trim() ? '访问码已保存，请重新点击生成' : '已清除访问码',
      }),
    )
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="访问码"
        className="w-[420px] rounded-[24px] border border-white/[0.08] p-[24px]"
        style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[17px] font-semibold" style={{ color: TOKENS.textTitle }}>
            <KeyRound size={17} />
            输入访问码
          </span>
          <button onClick={() => setOpen(false)} className="rounded p-1 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
            <X size={16} />
          </button>
        </div>

        <p className="mb-3 text-[13px] leading-relaxed" style={{ color: TOKENS.textMuted }}>
          PineLine 的生成能力对充值/受邀用户开放；画布浏览、工程导入导出不受限。
          购买积分套餐或获取试用码后，在此输入即可生成。
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
          }}
          autoFocus
          placeholder="粘贴你的访问码"
          className="mb-3 w-full rounded-[12px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-[14px] outline-none transition focus:border-white/25"
          style={{ color: TOKENS.textBody }}
        />

        <div className="flex items-center gap-2">
          <Link
            to="/pricing"
            onClick={() => setOpen(false)}
            className="rounded-[12px] px-3.5 py-2.5 text-[13px] font-semibold transition hover:bg-white/[0.12]"
            style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
          >
            查看套餐
          </Link>
          <span className="flex-1" />
          <button
            onClick={save}
            className="rounded-[12px] px-[22px] py-2.5 text-[14px] font-bold transition hover:bg-white"
            style={{ background: '#F5F5F7', color: '#0B0B0C' }}
          >
            保存并重试
          </button>
        </div>

        <p className="mt-3 text-[11.5px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
          需要试用或企业定制？联系 {CONTACT.email}
        </p>
      </div>
    </div>,
    document.body,
  )
}
