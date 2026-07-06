/**
 * 统一文件上传底座：此前 FileReader→dataURL + 类型/体积校验散落在 8 处
 * （画布拖拽/右键/添加面板/素材库/参考图/视频节点/全能参考），实现雷同、
 * 限制不一。收口为一个入口，跳过原因统一透出给 flash。
 */

export type ReadItem = { file: File; dataUrl: string }

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(new Error('read'))
    reader.readAsDataURL(file)
  })
}

export async function readFilesAsDataUrls(
  input: FileList | File[] | null | undefined,
  opts: { accept?: 'image/' | 'video/' | 'audio/'; max?: number; maxMB?: number } = {},
): Promise<{ items: ReadItem[]; skipped: string[] }> {
  const all = Array.from(input ?? [])
  const skipped: string[] = []
  const matched = opts.accept ? all.filter((f) => f.type.startsWith(opts.accept!)) : all
  let picked = matched
  if (opts.max != null && matched.length > opts.max) {
    skipped.push(`一次最多 ${opts.max} 个文件，已取前 ${opts.max} 个`)
    picked = matched.slice(0, opts.max)
  }
  const limit = opts.maxMB != null ? opts.maxMB * 1024 * 1024 : Infinity
  const results = await Promise.all(
    picked.map(async (file): Promise<ReadItem | null> => {
      if (file.size > limit) {
        skipped.push(`「${file.name}」超过 ${opts.maxMB}MB，已跳过`)
        return null
      }
      try {
        return { file, dataUrl: await readFileAsDataUrl(file) }
      } catch {
        skipped.push(`读取「${file.name}」失败`)
        return null
      }
    }),
  )
  return { items: results.filter((r): r is ReadItem => !!r), skipped }
}

/** 跳过原因合并成一条 flash（无跳过则静默） */
export function flashUploadSkipped(skipped: string[]): void {
  if (skipped.length) {
    window.dispatchEvent(new CustomEvent('pineline:flash', { detail: skipped.join('；') }))
  }
}
