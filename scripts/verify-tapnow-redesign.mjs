import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const landing = read('src/pages/Landing.tsx')
const hero = read('src/sections/Hero.tsx')
const heroCanvas = read('src/components/HeroCanvas.tsx')
const modelMarquee = read('src/sections/ModelMarquee.tsx')
const canvasShowcase = read('src/sections/CanvasShowcase.tsx')

for (const file of [
  'src/sections/TrustBar.tsx',
  'src/sections/AgentWorkspace.tsx',
  'src/sections/ProfessionalControls.tsx',
  'src/sections/CommunityRecipes.tsx',
]) {
  assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), `${file} should exist`)
  assert.match(landing, new RegExp(file.split('/').pop().replace('.tsx', '')), `${file} should be wired into Landing`)
}

assert.match(hero, /你的影视/, 'hero should use a film-specific agentic canvas headline')
assert.match(hero, /智能体创意画布/, 'hero should use the TapNow-inspired agentic canvas positioning')
assert.match(hero, /统一调度剧本、图像、音频与视频模型/, 'hero should describe multi-modal orchestration')
assert.match(heroCanvas, /Describe your scene or pick nodes as context/, 'hero canvas should include an agent prompt composer')
assert.match(heroCanvas, /Reference frame/, 'hero canvas should include reference-frame media nodes')
assert.match(modelMarquee, /强大引擎支持/, 'model section should mirror TapNow engine framing')
assert.match(canvasShowcase, /克隆配方/, 'canvas showcase should emphasize reusable recipes')

console.log('TapNow-aligned landing checks passed')
