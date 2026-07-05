/**
 * 聊天图片附件压缩：canvas 等比缩放 + JPEG 质量递降。
 * full：长边 ≤1280、目标 ≤320KB（喂多模态模型足够，控请求体积）；
 * thumb：96px 缩略图（消息气泡回显 + 持久化，原图不进 localStorage）。
 */

const FULL_EDGE = 1280
const THUMB_EDGE = 96
const FULL_TARGET_BYTES = 320 * 1024

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('读取文件失败'))
    reader.readAsDataURL(file)
  })
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片解码失败'))
    img.src = url
  })
}

/** data URL 的近似字节数（base64 段 × 3/4） */
const dataUrlBytes = (u: string) => Math.ceil((u.length - (u.indexOf(',') + 1)) * 0.75)

function drawScaled(img: HTMLImageElement, maxEdge: number, quality: number): string {
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.max(1, Math.round(img.naturalWidth * scale))
  const h = Math.max(1, Math.round(img.naturalHeight * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  // 透明 PNG 转 JPEG 时垫深色底（面板深色主题下比白底自然）
  ctx.fillStyle = '#1a1a1d'
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, w, h)
  return canvas.toDataURL('image/jpeg', quality)
}

export type AttachedImage = { full: string; thumb: string }

export async function compressImageFile(file: File): Promise<AttachedImage> {
  if (!file.type.startsWith('image/')) throw new Error('仅支持图片文件')
  const raw = await readAsDataUrl(file)
  const img = await loadImage(raw)
  let quality = 0.85
  let full = drawScaled(img, FULL_EDGE, quality)
  while (dataUrlBytes(full) > FULL_TARGET_BYTES && quality > 0.45) {
    quality -= 0.1
    full = drawScaled(img, FULL_EDGE, quality)
  }
  const thumb = drawScaled(img, THUMB_EDGE, 0.7)
  return { full, thumb }
}

/** 从粘贴事件提取图片文件 */
export function imagesFromClipboard(e: ClipboardEvent | React.ClipboardEvent): File[] {
  const items = e.clipboardData?.items
  if (!items) return []
  const files: File[] = []
  for (const item of items) {
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      const f = item.getAsFile()
      if (f) files.push(f)
    }
  }
  return files
}
