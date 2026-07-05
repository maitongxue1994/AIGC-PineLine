/**
 * 视频提示词组装直测（零依赖，Node 原生 TS 剥离）。
 * 断言：画面主体优先级 / 音色注入与幂等 / 纯净模式官方约束词 / 软上限截断 / generate_audio 解析。
 * 运行：node scripts/verify-video-prompt.mjs
 */
import assert from 'node:assert/strict'
import { buildVideoPrompt, resolveGenerateAudio } from '../src/studio/videoPrompt.ts'

let pass = 0
const check = (name, fn) => {
  fn()
  pass++
  console.log('  ✓', name)
}

// ---- 1. 画面主体优先级：用户输入 > 上游分镜 ----
check('用户手输优先，原样保留', () => {
  const out = buildVideoPrompt({ userPrompt: '镜头缓慢推近主角', shotText: '上游描述' })
  assert.ok(out.startsWith('镜头缓慢推近主角'))
  assert.ok(!out.includes('上游描述'))
})
check('用户为空时回退上游分镜描述', () => {
  const out = buildVideoPrompt({ userPrompt: '', shotText: '深夜书房全景：蓝光如薄冰' })
  assert.ok(out.startsWith('深夜书房全景'))
})

// ---- 2. 音色注入与幂等 ----
check('旁白音色按官方公式句式注入', () => {
  const out = buildVideoPrompt({ userPrompt: '画面', voiceNarration: '中年男性，声音低沉温润，语速偏慢，情绪平静' })
  assert.ok(out.includes('旁白音色：一个中年男性，声音低沉温润，语速偏慢，情绪平静的声音'))
  assert.ok(out.includes('保持该音色一致'))
})
check('角色音色表多行合并注入', () => {
  const out = buildVideoPrompt({ userPrompt: '画面', voiceCast: '张三：青年男声，明亮有弹性\n李四：老年女声，沙哑缓慢' })
  assert.ok(out.includes('角色音色：张三：青年男声，明亮有弹性；李四：老年女声，沙哑缓慢'))
})
check('组装结果回填后再次组装不翻倍（幂等）', () => {
  const once = buildVideoPrompt({ userPrompt: '画面', voiceNarration: '男声', purity: { noSubtitles: true } })
  const twice = buildVideoPrompt({ userPrompt: once, voiceNarration: '男声', purity: { noSubtitles: true } })
  assert.equal(twice, once)
})

// ---- 3. 纯净模式官方约束词 ----
check('无字幕注入官方 FAQ 约束词组合', () => {
  const out = buildVideoPrompt({ userPrompt: '画面', purity: { noSubtitles: true } })
  assert.ok(out.includes('保持无字幕，避免生成任何文字或字幕，不要生成Logo，不要生成水印'))
})
check('无BGM+无音效但有音色诉求 → 仅保留人声', () => {
  const out = buildVideoPrompt({ userPrompt: '画面', voiceNarration: '男声', purity: { noBgm: true, noSfx: true } })
  assert.ok(out.includes('无背景音乐，无音效，仅保留人声'))
})
check('audioOn=false 时不注入音色与音频约束，字幕约束仍生效', () => {
  const out = buildVideoPrompt({
    userPrompt: '画面',
    voiceNarration: '男声',
    purity: { noSubtitles: true, noBgm: true },
    audioOn: false,
  })
  assert.ok(!out.includes('旁白音色'))
  assert.ok(!out.includes('无背景音乐'))
  assert.ok(out.includes('保持无字幕'))
})

// ---- 4. 软上限：仅截上游推导的画面描述，注入段完整 ----
check('上游长描述截到 500 字内，音色段完整保留', () => {
  const long = '长'.repeat(800)
  const out = buildVideoPrompt({ userPrompt: '', shotText: long, voiceNarration: '男声' })
  assert.ok(out.length <= 520)
  assert.ok(out.includes('旁白音色'))
  assert.ok(out.includes('…'))
})
check('用户手输超长不截断（行为护栏）', () => {
  const long = '长'.repeat(800)
  const out = buildVideoPrompt({ userPrompt: long })
  assert.ok(out.length >= 800)
})

// ---- 5. resolveGenerateAudio ----
check('显式关闭 > 一切', () => assert.equal(resolveGenerateAudio(false, {}, true), false))
check('无BGM+无音效且无音色诉求 → 整体静音', () =>
  assert.equal(resolveGenerateAudio(undefined, { noBgm: true, noSfx: true }, false), false))
check('无BGM+无音效但有音色诉求 → 保留音频轨', () =>
  assert.equal(resolveGenerateAudio(undefined, { noBgm: true, noSfx: true }, true), true))
check('默认开', () => assert.equal(resolveGenerateAudio(undefined, {}, false), true))

console.log(`\nverify-video-prompt: ${pass} checks passed`)
