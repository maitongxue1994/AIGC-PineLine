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
  jsonError,
  PineHttpError,
  type CoreEnv,
} from './utils'
import { checkRateLimit } from './rateLimit'

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
}

// Durable Object 类导出（wrangler durable_objects.bindings 引用）
export { CanvasBridge } from './bridge/CanvasBridgeDO'

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

    const handler = ROUTES[url.pathname]

    if (handler) {
      if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
      }
      try {
        assertOrigin(req, env)
        // 生成/编排类端点过访问门（ACCESS_REQUIRED → 前端弹输码/购买层）+ 限流
        if (GATED_ROUTES.has(url.pathname)) {
          const code = assertAccess(req, env)
          checkRateLimit(code, url.pathname, env as unknown as Record<string, string | undefined>, Date.now())
        }
        assertBodySize(req)
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
      return handler(req, env)
    }

    if (isApiPath(url.pathname)) {
      return jsonError('未知 API 路径', 404)
    }

    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
