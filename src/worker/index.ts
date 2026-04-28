import generateScript from './routes/generateScript'
import generateImage from './routes/generateImage'
import generateStoryboard from './routes/generateStoryboard'
import generateImageGrid from './routes/generateImageGrid'
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
}

const ROUTES: Record<string, (req: Request, env: Env) => Promise<Response>> = {
  '/api/generate/script': generateScript,
  '/api/generate/image': generateImage,
  '/api/generate/storyboard': generateStoryboard,
  '/api/generate/image-grid': generateImageGrid,
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
