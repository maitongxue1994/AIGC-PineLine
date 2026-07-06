/**
 * Seedance 2.0 请求体组装校验（零依赖，Node 原生 TS 剥离）。
 * 直接调用真实的 buildSeedanceBody，断言全能参考/首尾帧两种场景的 content role 与顶层参数。
 * 对齐官方文档 volcengine.com/docs/82379/1520757（多模态参考生视频）。
 * 运行：node scripts/verify-seedance-body.mjs
 */
import assert from 'node:assert/strict'
import { buildSeedanceBody } from '../src/worker/video/seedanceBody.ts'

let pass = 0
const check = (name, fn) => {
  fn()
  pass++
  console.log('  ✓', name)
}

// ---- 1. 全能参考（多模态参考生视频）：3 图 + 2 视频 + 1 音频 ----
const omni = buildSeedanceBody({
  provider: 'seedance',
  prompt: '一只猫对着镜头打哈欠',
  omniRefs: ['data:image/png;base64,AAA', 'data:image/png;base64,BBB', 'data:image/png;base64,CCC'],
  omniVideos: ['data:video/mp4;base64,VVV', 'data:video/mp4;base64,WWW'],
  omniAudios: ['data:audio/mpeg;base64,MMM'],
  ratio: 'auto',
  resolution: '4k',
  duration: 12,
})
check('全能参考：3 张图 role=reference_image / type=image_url', () => {
  const imgs = omni.content.filter((c) => c.type === 'image_url')
  assert.equal(imgs.length, 3)
  assert.ok(imgs.every((c) => c.role === 'reference_image'))
})
check('全能参考：2 段视频 role=reference_video / type=video_url', () => {
  const vids = omni.content.filter((c) => c.type === 'video_url')
  assert.equal(vids.length, 2)
  assert.ok(vids.every((c) => c.role === 'reference_video'))
})
check('全能参考：1 段音频 role=reference_audio / type=audio_url', () => {
  const auds = omni.content.filter((c) => c.type === 'audio_url')
  assert.equal(auds.length, 1)
  assert.equal(auds[0].role, 'reference_audio')
})
check('全能参考：无 first_frame/last_frame（与首尾帧互斥）', () => {
  assert.ok(!omni.content.some((c) => c.role === 'first_frame' || c.role === 'last_frame'))
})
check('ratio auto → adaptive', () => assert.equal(omni.ratio, 'adaptive'))
check('resolution 4k 透传', () => assert.equal(omni.resolution, '4k'))
check('duration 12 透传', () => assert.equal(omni.duration, 12))
check('generate_audio 默认 true', () => assert.equal(omni.generate_audio, true))
check('watermark 默认 false', () => assert.equal(omni.watermark, false))

// ---- 2. 上限裁剪：图 ≤9 / 视频 ≤3 / 音频 ≤3 ----
const capped = buildSeedanceBody({
  provider: 'seedance',
  prompt: 'x',
  omniRefs: Array.from({ length: 11 }, (_, i) => `data:image/png;base64,${i}`),
  omniVideos: Array.from({ length: 5 }, (_, i) => `data:video/mp4;base64,${i}`),
  omniAudios: Array.from({ length: 5 }, (_, i) => `data:audio/mpeg;base64,${i}`),
})
check('参考图裁到 9', () => assert.equal(capped.content.filter((c) => c.type === 'image_url').length, 9))
check('参考视频裁到 3', () => assert.equal(capped.content.filter((c) => c.type === 'video_url').length, 3))
check('参考音频裁到 3', () => assert.equal(capped.content.filter((c) => c.type === 'audio_url').length, 3))

// ---- 3. duration 边界 [4,15] clamp + -1 智能选时长透传 ----
check('duration 20 → clamp 15', () => assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x', duration: 20 }).duration, 15))
check('duration 2 → clamp 4', () => assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x', duration: 2 }).duration, 4))
check('duration -1 透传（模型自主选时长）', () => assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x', duration: -1 }).duration, -1))
check('duration 缺省 → 5', () => assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x' }).duration, 5))

// ---- 4. 首尾帧回归（不受多模态改动影响）----
const ff = buildSeedanceBody({
  provider: 'seedance',
  prompt: 'x',
  firstFrame: 'data:image/png;base64,F',
  lastFrame: 'data:image/png;base64,L',
})
check('首尾帧：2 张图 role first_frame/last_frame', () => {
  const imgs = ff.content.filter((c) => c.type === 'image_url')
  assert.equal(imgs.length, 2)
  assert.equal(imgs[0].role, 'first_frame')
  assert.equal(imgs[1].role, 'last_frame')
})
const single = buildSeedanceBody({ provider: 'seedance', prompt: 'x', firstFrame: 'data:image/png;base64,F' })
check('单首帧：role first_frame', () => {
  const imgs = single.content.filter((c) => c.type === 'image_url')
  assert.equal(imgs.length, 1)
  assert.equal(imgs[0].role, 'first_frame')
})

// ---- 5. 7 个比例透传 ----
for (const r of ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9']) {
  check(`ratio ${r} 透传`, () => assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x', ratio: r }).ratio, r))
}

// ---- 6. 默认 model / resolution ----
check('缺省 model → doubao-seedance-2-0-260128', () =>
  assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x' }).model, 'doubao-seedance-2-0-260128'))
check('缺省 resolution → 720p', () =>
  assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x' }).resolution, '720p'))

// ---- 7. generate_audio 开关（官方默认 true，可显式关闭出无声视频） ----
check('generate_audio 缺省 → true', () =>
  assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x' }).generate_audio, true))
check('generateAudio: false → generate_audio false 透传', () =>
  assert.equal(
    buildSeedanceBody({ provider: 'seedance', prompt: 'x', generateAudio: false }).generate_audio,
    false,
  ))

// ---- 8. 全能参考无提示词（官方允许：至少 1 图或 1 视频即可，无需文本） ----
const omniOnly = buildSeedanceBody({
  provider: 'seedance',
  prompt: '',
  omniRefs: ['data:image/png;base64,AAA'],
})
check('全能参考无提示词：content 无 text 项', () =>
  assert.ok(!omniOnly.content.some((c) => c.type === 'text')))
check('全能参考无提示词：参考图仍完整入 content', () =>
  assert.equal(omniOnly.content.filter((c) => c.type === 'image_url').length, 1))

// ---- 9. 水印合规：默认不烧，forceWatermark 时供应商侧烧「AI 生成」标 ----
check('watermark 缺省 → false（管理员自用不烧）', () =>
  assert.equal(buildSeedanceBody({ provider: 'seedance', prompt: 'x' }).watermark, false))
check('forceWatermark: true → watermark true（非管理员合规兜底）', () =>
  assert.equal(
    buildSeedanceBody({ provider: 'seedance', prompt: 'x', forceWatermark: true }).watermark,
    true,
  ))

console.log(`\n✅ Seedance 请求体校验全部通过：${pass} 项`)
