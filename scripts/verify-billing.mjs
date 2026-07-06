/**
 * 积分计费校验（零依赖，Node 原生 TS 剥离）：
 * 断言服务端 chargeFor 与前端 estimateCost 对同一请求给出一致积分（防前后端定价漂移，
 * 否则前端显示的消耗与实际扣费不符，用户会投诉）。
 * 运行：node scripts/verify-billing.mjs
 */
import assert from 'node:assert/strict'
import { chargeFor, TEXT_CALL_CREDITS } from '../src/worker/pricing.ts'
import { estimateCost, resolveApiModel, VIDEO_MODELS, IMAGE_MODELS } from '../src/studio/nodeCatalog.ts'

let pass = 0
const check = (name, fn) => {
  fn()
  pass++
  console.log('  ✓', name)
}

// 前端按 videoModel(id) 估价；服务端按 apiModel 估价。构造一对映射验证一致。
const cases = [
  { videoModel: 'seedance-2.0', videoResolution: '720p', videoDuration: 5 },
  { videoModel: 'seedance-2.0', videoResolution: '1080p', videoDuration: 5 },
  { videoModel: 'seedance-2.0', videoResolution: '4k', videoDuration: 5 },
  { videoModel: 'seedance-2.0-fast', videoResolution: '720p', videoDuration: 5 },
  { videoModel: 'seedance-2.0-mini', videoResolution: '480p', videoDuration: 5 },
  { videoModel: 'hailuo-2.3', videoResolution: '1080p', videoDuration: 6 },
]

for (const c of cases) {
  check(`视频 ${c.videoModel} ${c.videoResolution} ${c.videoDuration}s 前后端一致`, () => {
    const front = estimateCost('video', null, c)
    const apiModel = resolveApiModel(VIDEO_MODELS, c.videoModel)
    const back = chargeFor('/api/generate/video', {
      model: apiModel,
      resolution: c.videoResolution,
      duration: c.videoDuration,
    })
    assert.equal(front, back, `${c.videoModel}: front ${front} != back ${back}`)
    assert.ok(front > 0)
  })
}

check('视频 duration=-1（智能时长）按 15s 计', () => {
  const back = chargeFor('/api/generate/video', {
    model: resolveApiModel(VIDEO_MODELS, 'seedance-2.0'),
    resolution: '720p',
    duration: -1,
  })
  assert.equal(back, 200 * 15)
})

// 图像：Gemini 分档、Seedream 统一
check('图像 Gemini 1K 前后端一致', () => {
  const front = estimateCost('image', 'single', { quality: '1K' })
  const back = chargeFor('/api/generate/image', { quality: '1K' })
  assert.equal(front, back)
})
check('图像 Seedream 统一 50', () => {
  const front = estimateCost('image', 'single', { imageModel: 'seedream-5.0', quality: '2K' })
  const apiModel = resolveApiModel(IMAGE_MODELS, 'seedream-5.0')
  const back = chargeFor('/api/generate/image', { model: apiModel, quality: '2K' })
  assert.equal(front, 50)
  assert.equal(back, 50)
})
check('图像 grid 按张数×单价', () => {
  const back = chargeFor('/api/generate/image-grid', { prompts: ['a', 'b', 'c'] })
  assert.equal(back, 100 * 3)
})

// 文本类
check('文本/编排类固定档', () => {
  assert.equal(chargeFor('/api/generate/script', {}), TEXT_CALL_CREDITS)
  assert.equal(chargeFor('/api/agent/chat', {}), TEXT_CALL_CREDITS)
  assert.equal(estimateCost('text', 'free', {}), TEXT_CALL_CREDITS)
})

// 非计费路径
check('取件/状态类不扣费', () => {
  assert.equal(chargeFor('/api/generate/video-status', {}), 0)
  assert.equal(chargeFor('/api/generate/video-file', {}), 0)
})

console.log(`\n✅ 积分计费校验全部通过：${pass} 项`)
