import generateScript from './routes/generateScript'
import generateImage from './routes/generateImage'

export interface Env {
  ASSETS: Fetcher
  MINIMAX_API_KEY: string
  GEMINI_API_KEY: string
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)

    if (url.pathname === '/api/generate/script') {
      if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
      return generateScript(req, env)
    }
    if (url.pathname === '/api/generate/image') {
      if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
      return generateImage(req, env)
    }

    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
