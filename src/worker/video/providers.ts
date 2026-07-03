import { PineHttpError } from '../utils'
import type { VideoEnv, VideoProvider, VideoProviderId } from './types'
import { seedance } from './seedance'
import { minimax } from './minimax'

/**
 * Provider 注册表。Wan/Kling/Veo 为预留桩：端点结构已调研入档
 * （docs/模型API调研-2026-07.md），配好密钥后按文档补全 create/query 即可。
 */

function stub(guide: string): VideoProvider {
  return {
    create() {
      return Promise.reject(new PineHttpError(501, guide))
    },
    query() {
      return Promise.reject(new PineHttpError(501, guide))
    },
  }
}

const wan = stub(
  '通义万相未接入：请在阿里云百炼创建 API Key（bailian.console.aliyun.com → API-KEY）' +
    '并配置为 Worker secret DASHSCOPE_API_KEY。详见 docs/视频生成接入指南.md',
)

const kling = stub(
  '可灵未接入：请在可灵开放平台创建 API Key（klingai.com/dev/api-key）' +
    '并配置为 Worker secret KLING_API_KEY。详见 docs/视频生成接入指南.md',
)

const veo = stub(
  'Veo 未接入：现有 GEMINI_API_KEY 需先在 Google AI Studio 绑定结算升级付费层' +
    '（aistudio.google.com/projects，Veo 无免费层）。详见 docs/视频生成接入指南.md',
)

const REGISTRY: Record<VideoProviderId, VideoProvider> = {
  seedance,
  minimax,
  wan,
  kling,
  veo,
}

export function getVideoProvider(id: string | undefined): VideoProvider {
  const p = REGISTRY[(id ?? '') as VideoProviderId]
  if (!p) throw new PineHttpError(400, `未知视频供应商：${id ?? '(空)'}`)
  return p
}

/** 各 provider 是否已具备密钥（供前端模型选择器显示可用态） */
export function providerReadiness(env: VideoEnv): Record<VideoProviderId, boolean> {
  return {
    seedance: !!env.ARK_API_KEY?.trim(),
    minimax: !!env.MINIMAX_API_KEY?.trim(),
    wan: false,
    kling: false,
    veo: false,
  }
}
