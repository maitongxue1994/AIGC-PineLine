/**
 * AIGC 显式标识（《人工智能生成合成内容标识办法》2025-09-01 生效）：
 * 下载/导出 AI 生成图片时烧录「AI 生成」角标；文件名统一带标便于隐式标识。
 * 视频浏览器烧录成本高（WebCodecs/ffmpeg.wasm），非管理员由供应商水印兜底（见 videoCreate
 * forceWatermark），管理员交付走剪辑环节（docs/服务交付手册.md）。
 */

const LABEL = 'AI 生成'

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片解码失败'))
    img.src = url
  })
}

/**
 * 给图片 dataURL 烧右下角「AI 生成」角标，返回新 dataURL。
 * 字高按办法建议 ≥ 画面最短边 5%；失败时原样返回（不阻断下载）。
 */
export async function markImageDataUrl(dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith('data:image')) return dataUrl
  try {
    const img = await loadImage(dataUrl)
    const w = img.naturalWidth
    const h = img.naturalHeight
    if (!w || !h) return dataUrl
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return dataUrl
    ctx.drawImage(img, 0, 0)

    const fontSize = Math.max(14, Math.round(Math.min(w, h) * 0.05))
    const pad = Math.round(fontSize * 0.4)
    ctx.font = `600 ${fontSize}px "PingFang SC", "Microsoft YaHei", system-ui, sans-serif`
    ctx.textBaseline = 'alphabetic'
    const textW = ctx.measureText(LABEL).width
    const boxW = textW + pad * 2
    const boxH = fontSize + pad * 1.4
    const x = w - boxW - pad
    const y = h - boxH - pad

    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    const r = Math.round(boxH * 0.25)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + boxW, y, x + boxW, y + boxH, r)
    ctx.arcTo(x + boxW, y + boxH, x, y + boxH, r)
    ctx.arcTo(x, y + boxH, x, y, r)
    ctx.arcTo(x, y, x + boxW, y, r)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,0.95)'
    ctx.fillText(LABEL, x + pad, y + fontSize + pad * 0.2)

    // 输出沿用 PNG（无损，避免二次压缩劣化）
    return canvas.toDataURL('image/png')
  } catch {
    return dataUrl
  }
}

/** 文件名带 AI 生成标（隐式标识兜底）：xxx.png → xxx-AI生成.png */
export function aiFileName(name: string): string {
  const dot = name.lastIndexOf('.')
  if (dot <= 0) return `${name}-${LABEL}`
  return `${name.slice(0, dot)}-${LABEL}${name.slice(dot)}`
}
