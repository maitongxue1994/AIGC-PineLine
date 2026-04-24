import generateScript from './routes/generateScript'
import generateImage from './routes/generateImage'
import generateStoryboard from './routes/generateStoryboard'
import generateImageGrid from './routes/generateImageGrid'

export interface Env {
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

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    const handler = ROUTES[url.pathname]
    if (handler) {
      if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
      return handler(req, env)
    }
    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
