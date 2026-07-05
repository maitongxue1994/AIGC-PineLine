import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TOKENS } from '../designTokens'

/**
 * 助手消息的 Markdown 渲染。
 * 此前消息是纯文本 pre-wrap，模型输出的加粗/列表/表格/代码块原样显示星号，
 * 正是「偶发渲染问题」的根因。react-markdown 默认不渲染内联 HTML，天然防 XSS。
 */

/** react-markdown 组件映射会传入 hast node，剥掉再落 DOM（避免 React 未知属性告警） */
function clean<T extends { node?: unknown }>(props: T) {
  const { node, ...rest } = props
  void node
  return rest
}

const components: Components = {
  a: (p) => (
    <a
      {...clean(p)}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-white/30 underline-offset-2 transition hover:decoration-white"
      style={{ color: '#8AB8FF' }}
    />
  ),
  p: (p) => <p {...clean(p)} className="my-1.5 first:mt-0 last:mb-0" />,
  ul: (p) => <ul {...clean(p)} className="my-1.5 list-disc space-y-1 pl-5" />,
  ol: (p) => <ol {...clean(p)} className="my-1.5 list-decimal space-y-1 pl-5" />,
  li: (p) => <li {...clean(p)} className="leading-relaxed" />,
  h1: (p) => <h1 {...clean(p)} className="my-2 text-[16px] font-bold" />,
  h2: (p) => <h2 {...clean(p)} className="my-2 text-[15px] font-bold" />,
  h3: (p) => <h3 {...clean(p)} className="my-1.5 text-[14px] font-semibold" />,
  h4: (p) => <h4 {...clean(p)} className="my-1.5 text-[14px] font-semibold" />,
  pre: (p) => (
    <pre
      {...clean(p)}
      className="my-2 overflow-x-auto rounded-[10px] bg-black/40 p-3 text-[12.5px] leading-relaxed"
    />
  ),
  code: (p) => {
    const { className, ...rest } = clean(p)
    // 带 language- 类名 = 围栏代码块（外层 pre 已有底色），否则按行内代码渲染
    if (/language-/.test(className ?? '')) return <code {...rest} className={className} />
    return <code {...rest} className="rounded bg-white/[0.08] px-1 py-0.5 text-[12.5px]" />
  },
  table: (p) => (
    <div className="my-2 overflow-x-auto">
      <table {...clean(p)} className="w-full border-collapse text-[13px]" />
    </div>
  ),
  th: (p) => (
    <th
      {...clean(p)}
      className="border border-white/[0.1] bg-white/[0.05] px-2 py-1 text-left font-semibold"
    />
  ),
  td: (p) => <td {...clean(p)} className="border border-white/[0.08] px-2 py-1 align-top" />,
  blockquote: (p) => (
    <blockquote
      {...clean(p)}
      className="my-2 border-l-2 border-white/20 pl-3"
      style={{ color: TOKENS.textMuted }}
    />
  ),
  hr: (p) => <hr {...clean(p)} className="my-3 border-white/[0.1]" />,
}

export default function MarkdownMessage({ text }: { text: string }) {
  return (
    <div className="text-[14px] leading-relaxed" style={{ color: TOKENS.textBody }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  )
}
