import generateScript from './routes/generateScript'
import generateImage from './routes/generateImage'
import generateStoryboard from './routes/generateStoryboard'
import generateImageGrid from './routes/generateImageGrid'
import agentChat from './routes/agentChat'
import videoCreate from './routes/videoCreate'
import videoStatus from './routes/videoStatus'
import videoFile from './routes/videoFile'
import videoTasks from './routes/videoTasks'
import debugLogs from './routes/debugLogs'
import { handleBridgeWs, handleMcp } from './routes/mcp'
import {
  assertAccess,
  assertBodySize,
  assertOrigin,
  isAdminCode,
  jsonError,
  jsonOk,
  PineHttpError,
  readJson,
  type CoreEnv,
} from './utils'
import { checkRateLimit } from './rateLimit'
import { chargeFor } from './pricing'

export interface Env extends CoreEnv {
  ASSETS: Fetcher
  MINIMAX_API_KEY: string
  GEMINI_API_KEY: string
  /** 视频生成可选密钥：缺失时对应 provider 返回接入指引（docs/视频生成接入指南.md） */
  ARK_API_KEY?: string
  ARK_BASE_URL?: string
  DASHSCOPE_API_KEY?: string
  KLING_API_KEY?: string
  /** 聊天联网搜索（MiniMax 通道，tavily.com）：缺失时联网开关返回 501 指引 */
  TAVILY_API_KEY?: string
  /** 视频分辨率封顶放开（设为 '4k' 则不再对非管理员回落 1080p）；限流覆写 PINELINE_RATE_* */
  PINELINE_MAX_RES?: string
  PINELINE_RATE_VIDEO?: string
  PINELINE_RATE_IMAGE?: string
  PINELINE_RATE_TEXT?: string
  /** 画布桥 DO（外部 Agent MCP ↔ 浏览器 WebSocket 中继） */
  CANVAS_BRIDGE: DurableObjectNamespace
  /** 积分账本 DO（每访问码一实例，预扣制计费） */
  CREDIT_LEDGER: DurableObjectNamespace
}

// Durable Object 类导出（wrangler durable_objects.bindings 引用）
export { CanvasBridge } from './bridge/CanvasBridgeDO'
export { CreditLedger } from './creditLedgerDO'

function ledgerStub(env: Env, code: string) {
  return env.CREDIT_LEDGER.get(env.CREDIT_LEDGER.idFromName(code))
}

const ROUTES: Record<string, (req: Request, env: Env) => Promise<Response>> = {
  '/api/generate/script': generateScript,
  '/api/generate/image': generateImage,
  '/api/generate/storyboard': generateStoryboard,
  '/api/generate/image-grid': generateImageGrid,
  '/api/generate/video': videoCreate,
  '/api/generate/video-status': videoStatus,
  '/api/generate/video-file': videoFile,
  '/api/generate/video-tasks': videoTasks,
  '/api/agent/chat': agentChat,
  // 生成日志自查（内存环形缓冲，best-effort；持久日志在 Cloudflare Workers Logs）
  '/api/debug/logs': debugLogs,
}

/**
 * 上锁路由：会烧真实模型费的生成/编排端点 + 调试日志。
 * 需过 assertAccess（访问码）。画布浏览/项目/素材全在浏览器本地，无端点、天然不设门。
 */
const GATED_ROUTES = new Set([
  '/api/generate/script',
  '/api/generate/image',
  '/api/generate/storyboard',
  '/api/generate/image-grid',
  '/api/generate/video',
  '/api/agent/chat',
  '/api/debug/logs',
])
// 只读/取件类端点（不直接触发上游生成付费）：轮询状态、取件代理、云端任务列表、就绪态
// 保持仅 Origin 防护，避免正常轮询被访问门拦住

function isApiPath(p: string): boolean {
  return p.startsWith('/api/')
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)

    // MCP 桥（外部 agent 直连）：无浏览器 Origin，不做 assertOrigin/assertAuth——会话码即凭证
    if (url.pathname.startsWith('/mcp/')) {
      if (req.method !== 'POST') {
        return jsonError('MCP 端点仅支持 POST（Streamable HTTP 单响应模式）', 405)
      }
      try {
        assertBodySize(req)
      } catch (err) {
        if (err instanceof PineHttpError) return jsonError(err.message, err.status)
        throw err
      }
      return handleMcp(req, env, url)
    }
    // 浏览器侧桥接入（WebSocket Upgrade，同源页面发起）
    if (url.pathname === '/api/bridge/ws') {
      return handleBridgeWs(req, env, url)
    }

    // 积分账户：余额与流水（需访问码；admin 码不记账返回 admin 标记）
    if (url.pathname === '/api/account' && req.method === 'POST') {
      try {
        assertOrigin(req, env)
        const code = assertAccess(req, env)
        if (isAdminCode(code)) return jsonOk({ balance: null, admin: true, ledger: [] })
        const r = await ledgerStub(env, code).fetch('https://ledger/account', {
          method: 'POST',
          body: '{}',
        })
        return new Response(r.body, {
          status: r.status,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (err) {
        if (err instanceof PineHttpError) {
          const code = err.message === 'ACCESS_REQUIRED' ? 'ACCESS_REQUIRED' : undefined
          return jsonError(code ? '请先输入访问码' : err.message, err.status, code)
        }
        throw err
      }
    }

    // 管理员充值：给客户码充/扣积分（收款确认后手动调用；Paddle webhook 亦走此逻辑）
    if (url.pathname === '/api/admin/credit' && req.method === 'POST') {
      try {
        assertOrigin(req, env)
        const caller = assertAccess(req, env)
        if (!isAdminCode(caller)) return jsonError('仅管理员可操作', 403)
        const body = await readJson<{ code?: string; amount?: number; note?: string }>(req)
        if (!body.code?.trim() || !Number.isFinite(body.amount)) {
          return jsonError('缺少 code 或 amount')
        }
        const r = await ledgerStub(env, body.code.trim()).fetch('https://ledger/credit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: body.amount, note: body.note ?? 'admin-credit' }),
        })
        return new Response(r.body, {
          status: r.status,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (err) {
        if (err instanceof PineHttpError) return jsonError(err.message, err.status)
        throw err
      }
    }

    const handler = ROUTES[url.pathname]

    if (handler) {
      if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
      }
      let accessCode = ''
      let charged = 0
      try {
        assertOrigin(req, env)
        assertBodySize(req)
        // 生成/编排类端点：访问门（ACCESS_REQUIRED → 前端弹输码层）→ 限流 → 预扣积分
        if (GATED_ROUTES.has(url.pathname)) {
          accessCode = assertAccess(req, env)
          checkRateLimit(accessCode, url.pathname, env as unknown as Record<string, string | undefined>, Date.now())
          // 预扣制：按请求参数估费先扣（admin 码免）；HTTP 层失败自动退款（下方）
          if (!isAdminCode(accessCode)) {
            const body = (await req.clone().json().catch(() => ({}))) as Record<string, unknown>
            const cost = chargeFor(url.pathname, body)
            if (cost > 0) {
              const r = await ledgerStub(env, accessCode).fetch('https://ledger/debit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cost, note: url.pathname }),
              })
              if (r.status === 402) {
                const p = (await r.json().catch(() => ({}))) as { error?: string }
                return jsonError(p.error ?? '积分不足，请充值', 402, 'CREDITS_REQUIRED')
              }
              if (!r.ok) return jsonError('计费服务暂不可用，请稍后再试', 503)
              charged = cost
            }
          }
        }
      } catch (err) {
        if (err instanceof PineHttpError) {
          // 403 ACCESS_REQUIRED 透出 code，前端据此弹访问码弹层
          const code = err.status === 403 && err.message === 'ACCESS_REQUIRED' ? 'ACCESS_REQUIRED' : undefined
          const msg =
            code
              ? '当前为邀请制试用：请输入访问码，或前往定价页购买积分套餐'
              : err.message
          return jsonError(msg, err.status, code)
        }
        throw err
      }
      const res = await handler(req, env)
      // HTTP 层失败（参数错/上游拒单等）自动退款；异步任务后续失败不退（上游失败不计费、概率低）
      if (charged > 0 && !res.ok) {
        await ledgerStub(env, accessCode)
          .fetch('https://ledger/credit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: charged, note: `refund:${url.pathname}` }),
          })
          .catch(() => {
            /* 退款失败留待管理员对账补偿（ledger 有扣费记录） */
          })
      }
      return res
    }

    if (isApiPath(url.pathname)) {
      return jsonError('未知 API 路径', 404)
    }

    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
