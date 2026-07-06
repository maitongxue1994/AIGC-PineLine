/**
 * Agent ops 白名单校验（零依赖，Node 原生 TS 剥离）。
 * 直接调用真实的 sanitizeOps，断言完整管线协议：video kind / add_node params 白名单 /
 * MAX_OPS 48 截断 / set_params 白名单收紧。
 * 运行：node scripts/verify-agent-ops.mjs
 */
import assert from 'node:assert/strict'
import { sanitizeOps } from '../src/worker/agentOps.ts'

let pass = 0
const check = (name, fn) => {
  fn()
  pass++
  console.log('  ✓', name)
}

// ---- 1. video kind 放行（无 preset），params 白名单透传 ----
const video = sanitizeOps([
  { op: 'add_node', ref: 'n1', kind: 'video', title: '镜头视频 1', params: { videoDuration: 5, videoResolution: '720p' } },
])
check('add_node kind=video 放行', () => assert.equal(video.ops.length, 1))
check('video 节点 params 透传（videoDuration/videoResolution）', () => {
  assert.deepEqual(video.ops[0].params, { videoDuration: 5, videoResolution: '720p' })
})
check('video 节点 preset 被剥离', () => {
  const r = sanitizeOps([{ op: 'add_node', ref: 'n1', kind: 'video', preset: 'whatever' }])
  assert.equal(r.ops.length, 1)
  assert.equal(r.ops[0].preset, undefined)
})

// ---- 2. 分镜图 shotIndex 绑定 ----
const shot = sanitizeOps([
  { op: 'add_node', ref: 'n3', kind: 'image', preset: 'shot', params: { shotIndex: 2 } },
])
check('image/shot 节点 shotIndex 透传', () => assert.deepEqual(shot.ops[0].params, { shotIndex: 2 }))

// ---- 3. params 白名单：未知键与非标量值全部剔除 ----
const evil = sanitizeOps([
  { op: 'add_node', ref: 'n1', kind: 'image', preset: 'single', params: { shotIndex: 0, __proto__x: 'x', evil: 'rm', nested: { a: 1 }, arr: [1] } },
])
check('params 未知键/对象/数组被剔除', () => assert.deepEqual(evil.ops[0].params, { shotIndex: 0 }))
check('params 全非法 → 无 params 字段', () => {
  const r = sanitizeOps([{ op: 'add_node', ref: 'n1', kind: 'text', preset: 'free', params: { evil: 1 } }])
  assert.equal(r.ops[0].params, undefined)
})

// ---- 4. set_params 同走白名单 ----
check('set_params 白名单过滤', () => {
  const r = sanitizeOps([{ op: 'set_params', id: 'a', params: { videoDuration: 8, hack: true } }])
  assert.deepEqual(r.ops[0].params, { videoDuration: 8 })
})
check('set_params 全非法键 → 整条丢弃', () => {
  const r = sanitizeOps([{ op: 'set_params', id: 'a', params: { hack: true } }])
  assert.equal(r.ops.length, 0)
  assert.equal(r.dropped, 1)
})

// ---- 4b. 模型键：键白名单放行 + 值白名单校验 ----
check('set_params textModel/imageModel 合法值透传', () => {
  const r = sanitizeOps([
    { op: 'set_params', id: 'a', params: { textModel: 'doubao-seed-2.0-lite', imageModel: 'seedream-5.0' } },
  ])
  assert.deepEqual(r.ops[0].params, {
    textModel: 'doubao-seed-2.0-lite',
    imageModel: 'seedream-5.0',
  })
})
check('模型键非法值只丢该键，不整条丢 op', () => {
  const r = sanitizeOps([
    { op: 'set_params', id: 'a', params: { imageModel: 'gpt-image-99', aspectRatio: '16:9' } },
  ])
  assert.deepEqual(r.ops[0].params, { aspectRatio: '16:9' })
})
check('videoModel 值白名单（非法值剔除，合法值透传）', () => {
  const bad = sanitizeOps([{ op: 'set_params', id: 'a', params: { videoModel: 'sora-99' } }])
  assert.equal(bad.ops.length, 0)
  const good = sanitizeOps([{ op: 'set_params', id: 'a', params: { videoModel: 'seedance-2.0-fast' } }])
  assert.deepEqual(good.ops[0].params, { videoModel: 'seedance-2.0-fast' })
})
check('add_node 初始 params 同样校验模型值', () => {
  const r = sanitizeOps([
    { op: 'add_node', ref: 'n1', kind: 'image', preset: 'shot', params: { shotIndex: 1, imageModel: 'seedream-5.0', textModel: 'bad-model' } },
  ])
  assert.deepEqual(r.ops[0].params, { shotIndex: 1, imageModel: 'seedream-5.0' })
})

// ---- 5. 非法 kind / preset 拒绝 ----
check('kind=asset 拒绝', () => {
  const r = sanitizeOps([{ op: 'add_node', ref: 'n1', kind: 'asset' }])
  assert.equal(r.ops.length, 0)
  assert.equal(r.dropped, 1)
})
check('text 节点非法 preset 拒绝', () => {
  const r = sanitizeOps([{ op: 'add_node', ref: 'n1', kind: 'text', preset: 'hacker' }])
  assert.equal(r.dropped, 1)
})

// ---- 6. MAX_OPS 48：完整管线不再被 20 条截断 ----
const pipeline = []
pipeline.push({ op: 'clear_canvas' })
pipeline.push({ op: 'add_node', ref: 's', kind: 'text', preset: 'script', prompt: 'x' })
pipeline.push({ op: 'add_node', ref: 'b', kind: 'text', preset: 'storyboard' })
pipeline.push({ op: 'connect', source: 's', target: 'b' })
for (let i = 0; i < 6; i++) {
  pipeline.push({ op: 'add_node', ref: `img${i}`, kind: 'image', preset: 'shot', params: { shotIndex: i } })
  pipeline.push({ op: 'connect', source: 'b', target: `img${i}` })
  pipeline.push({ op: 'add_node', ref: `v${i}`, kind: 'video' })
  pipeline.push({ op: 'connect', source: `img${i}`, target: `v${i}` })
}
pipeline.push({ op: 'run', ids: ['s'] })
check(`完整管线 ${pipeline.length} 条 ops 全部保留（旧上限 20 会截断）`, () => {
  const r = sanitizeOps(pipeline)
  assert.equal(r.ops.length, pipeline.length)
  assert.equal(r.dropped, 0)
})
check('超过 48 条截断', () => {
  const many = Array.from({ length: 60 }, (_, i) => ({ op: 'add_node', ref: `n${i}`, kind: 'text', preset: 'free' }))
  const r = sanitizeOps(many)
  assert.equal(r.ops.length, 48)
})

// ---- 7. 纯净模式 + 音色设定参数键透传 ----
check('视频纯净模式键透传（videoNoSubtitles/videoNoBgm/videoNoSfx）', () => {
  const r = sanitizeOps([
    { op: 'set_params', id: 'v1', params: { videoNoSubtitles: true, videoNoBgm: true, videoNoSfx: false } },
  ])
  assert.deepEqual(r.ops[0].params, { videoNoSubtitles: true, videoNoBgm: true, videoNoSfx: false })
})
check('分镜音色设定键透传（voiceNarration/voiceCast）', () => {
  const r = sanitizeOps([
    { op: 'set_params', id: 'sb', params: { voiceNarration: '中年男性，低沉温润', voiceCast: '张三：青年男声' } },
  ])
  assert.deepEqual(r.ops[0].params, { voiceNarration: '中年男性，低沉温润', voiceCast: '张三：青年男声' })
})

// ---- 8. 分镜派生自动化 ops ----
check('derive_shot_images 透传（indices 过滤非法值）', () => {
  const r = sanitizeOps([
    { op: 'derive_shot_images', id: 'sb1', indices: [0, 2, -1, 1.5, 'x'] },
  ])
  assert.deepEqual(r.ops[0], { op: 'derive_shot_images', id: 'sb1', indices: [0, 2] })
})
check('derive_shot_images 省略 indices（全部未派生）', () => {
  const r = sanitizeOps([{ op: 'derive_shot_images', id: 'sb1' }])
  assert.deepEqual(r.ops[0], { op: 'derive_shot_images', id: 'sb1' })
})
check('derive_shot_videos 透传（run 仅接受 true）', () => {
  const r = sanitizeOps([
    { op: 'derive_shot_videos', id: 'sb1', run: true },
    { op: 'derive_shot_videos', id: 'sb2', run: 'yes' },
  ])
  assert.deepEqual(r.ops[0], { op: 'derive_shot_videos', id: 'sb1', run: true })
  assert.deepEqual(r.ops[1], { op: 'derive_shot_videos', id: 'sb2' })
})
check('derive op 缺 id 拒绝', () => {
  const r = sanitizeOps([{ op: 'derive_shot_images' }, { op: 'derive_shot_videos' }])
  assert.equal(r.dropped, 2)
})

// ---- 9. remember 记忆写入 ----
check('remember 透传（截 500 字）', () => {
  const r = sanitizeOps([{ op: 'remember', content: `偏好电影感${'长'.repeat(600)}` }])
  assert.equal(r.ops[0].op, 'remember')
  assert.equal(r.ops[0].content.length, 500)
})
check('remember 空内容拒绝', () => {
  const r = sanitizeOps([{ op: 'remember', content: '   ' }, { op: 'remember' }])
  assert.equal(r.dropped, 2)
})

console.log(`\n✅ Agent ops 白名单校验全部通过：${pass} 项`)
