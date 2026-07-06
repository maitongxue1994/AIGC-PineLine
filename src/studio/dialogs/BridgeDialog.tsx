import { createPortal } from 'react-dom'
import { Cable, X } from 'lucide-react'
import { useBridgeStore } from '../bridge/bridgeStore'
import { CopyButton } from '../nodes/composerKit'
import { SHADOWS, TOKENS } from '../designTokens'

/**
 * 「外部 Agent」对话框：开关画布桥，展示会话码 / MCP 端点 / 接入命令。
 * Claude Code、Codex、Cursor 等外部 agent 经 MCP 桥实时操控本画布
 * （get_canvas / apply_ops / run_pipeline / read_node_text / remember）。
 */
export default function BridgeDialog({ onClose }: { onClose: () => void }) {
  const status = useBridgeStore((s) => s.status)
  const code = useBridgeStore((s) => s.code)
  const connect = useBridgeStore((s) => s.connect)
  const disconnect = useBridgeStore((s) => s.disconnect)

  const mcpUrl = code ? `${location.origin}/mcp/${code}` : null
  const claudeCmd = mcpUrl ? `claude mcp add --transport http pineline ${mcpUrl}` : null

  const statusMeta =
    status === 'on'
      ? { color: '#4BBF6B', label: '桥已连接：外部 Agent 可操控本画布' }
      : status === 'connecting'
        ? { color: '#E8A33D', label: '连接中…' }
        : { color: 'rgba(255,255,255,0.3)', label: '未开启' }

  const rowCls =
    'flex items-center gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.04] px-3 py-2.5'

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="外部 Agent"
        className="w-[480px] rounded-[26px] border border-white/[0.08] p-[24px]"
        style={{ background: TOKENS.popoverBg, boxShadow: SHADOWS.modal }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[18px] font-semibold" style={{ color: TOKENS.textTitle }}>
            <Cable size={18} />
            外部 Agent（MCP 桥）
          </span>
          <button onClick={onClose} className="rounded p-1 transition hover:bg-white/[0.06]" style={{ color: TOKENS.textMuted }}>
            <X size={16} />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-2 text-[13px]" style={{ color: TOKENS.textBody }}>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: statusMeta.color }} />
          {statusMeta.label}
        </div>

        {status === 'off' ? (
          <>
            <p className="mb-4 text-[13px] leading-relaxed" style={{ color: TOKENS.textMuted }}>
              开启后，Claude Code / Codex / Cursor 等 AI 助手可通过 MCP 实时读取并操控本画布：
              搭管线、改提示词、派生分镜图、一键成片、写入记忆。画布数据仍在本机浏览器，
              桥只做转发——关闭本页面即外部不可控。
            </p>
            <button
              onClick={connect}
              className="w-full rounded-[12px] py-2.5 text-[14px] font-bold transition hover:bg-white"
              style={{ background: '#F5F5F7', color: '#0B0B0C' }}
            >
              开启桥接
            </button>
          </>
        ) : (
          <div className="space-y-2.5">
            <div>
              <div className="mb-1 text-[12px]" style={{ color: TOKENS.textFaint }}>
                MCP 端点（Streamable HTTP）
              </div>
              <div className={rowCls}>
                <code className="min-w-0 flex-1 truncate text-[12.5px]" style={{ color: TOKENS.textBody }}>
                  {mcpUrl}
                </code>
                <CopyButton
                  text={mcpUrl ?? ''}
                  title="复制 MCP 端点"
                  className="shrink-0 rounded p-1 transition hover:bg-white/[0.1]"
                  style={{ color: TOKENS.textMuted }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 text-[12px]" style={{ color: TOKENS.textFaint }}>
                Claude Code 一键接入
              </div>
              <div className={rowCls}>
                <code className="min-w-0 flex-1 truncate text-[12.5px]" style={{ color: TOKENS.textBody }}>
                  {claudeCmd}
                </code>
                <CopyButton
                  text={claudeCmd ?? ''}
                  title="复制接入命令"
                  className="shrink-0 rounded p-1 transition hover:bg-white/[0.1]"
                  style={{ color: TOKENS.textMuted }}
                />
              </div>
            </div>
            <p className="text-[11.5px] leading-relaxed" style={{ color: TOKENS.textFaint }}>
              会话码即凭证，断开后立即失效，请勿写入持久配置分享。保持本页面打开；
              外部工具文档见 /assets/skills/pineline/SKILL.md
            </p>
            <button
              onClick={disconnect}
              className="w-full rounded-[12px] py-2.5 text-[14px] font-semibold transition hover:bg-white/[0.12]"
              style={{ background: 'rgba(255,255,255,0.07)', color: TOKENS.textBody }}
            >
              断开并作废会话码
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
