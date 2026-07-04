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
import {
  assertAuth,
  assertBodySize,
  assertOrigin,
  jsonError,
  PineHttpError,
  type CoreEnv,
} from './utils'

export interface Env extends CoreEnv {
  ASSETS: Fetcher
  MINIMAX_API_KEY: string
  GEMINI_API_KEY: string
  /** 视频生成可选密钥：缺失时对应 provider 返回接入指引（docs/视频生成接入指南.md） */
  ARK_API_KEY?: string
  ARK_BASE_URL?: string
  DASHSCOPE_API_KEY?: string
  KLING_API_KEY?: string
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

function isApiPath(p: string): boolean {
  return p.startsWith('/api/')
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    const handler = ROUTES[url.pathname]

    if (handler) {
      if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
      }
      try {
        assertOrigin(req, env)
        assertAuth(req, env)
        assertBodySize(req)
      } catch (err) {
        if (err instanceof PineHttpError) {
          return jsonError(err.message, err.status)
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
