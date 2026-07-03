/**
 * 蒙版重绘的画布工具：
 * - makeOverlay：原图 + 蒙版高亮（半透明强调蓝）→ 第二参考图，喂给模型指认区域
 * - compositeByMask：生成结果只在蒙版内生效，蒙版外逐像素等于原图（质量保底），
 *   蒙版边缘做羽化（blur）软过渡。
 */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = src
  })
}

/** 原图 + 蒙版蓝色高亮叠加（rgba(63,155,245,0.42)），供模型识别改动区域 */
export async function makeOverlay(
  originalUrl: string,
  mask: HTMLCanvasElement,
): Promise<string> {
  const img = await loadImage(originalUrl)
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const g = c.getContext('2d')!
  g.drawImage(img, 0, 0)

  // 蒙版染成强调蓝后叠加
  const tint = document.createElement('canvas')
  tint.width = c.width
  tint.height = c.height
  const tg = tint.getContext('2d')!
  tg.drawImage(mask, 0, 0, c.width, c.height)
  tg.globalCompositeOperation = 'source-in'
  tg.fillStyle = 'rgba(63,155,245,0.42)'
  tg.fillRect(0, 0, c.width, c.height)

  g.drawImage(tint, 0, 0)
  return c.toDataURL('image/png')
}

/** 客户端合成保底：final = 原图 + (生成图 ∩ 羽化蒙版)。蒙版外像素机制性保留原图。 */
export async function compositeByMask(
  originalUrl: string,
  generatedUrl: string,
  mask: HTMLCanvasElement,
  featherPx = 4,
): Promise<string> {
  const [orig, gen] = await Promise.all([loadImage(originalUrl), loadImage(generatedUrl)])
  const w = orig.naturalWidth
  const h = orig.naturalHeight

  // 生成图裁剪进蒙版（羽化边缘）
  const cut = document.createElement('canvas')
  cut.width = w
  cut.height = h
  const cg = cut.getContext('2d')!
  cg.drawImage(gen, 0, 0, w, h)
  cg.globalCompositeOperation = 'destination-in'
  cg.filter = `blur(${featherPx}px)`
  cg.drawImage(mask, 0, 0, w, h)
  cg.filter = 'none'

  const out = document.createElement('canvas')
  out.width = w
  out.height = h
  const og = out.getContext('2d')!
  og.drawImage(orig, 0, 0)
  og.drawImage(cut, 0, 0)
  return out.toDataURL('image/png')
}

/** 蒙版是否为空（无任何绘制） */
export function isMaskEmpty(mask: HTMLCanvasElement): boolean {
  const g = mask.getContext('2d')!
  const data = g.getImageData(0, 0, mask.width, mask.height).data
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) return false
  }
  return true
}
