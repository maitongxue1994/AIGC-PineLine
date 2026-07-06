import { zip, strToU8, type Zippable } from 'fflate'
import { isImageContent, isVideoContent, type PineNode } from './types'
import { aiFileName, markImageDataUrl } from './aigcMark'
import { buildProvenanceReport } from './provenanceReport'

/**
 * 批量导出交付包（to B 一次性拿走全部成片）：
 * 所有 done 节点的图片（烧 AI 角标）+ 视频（原样）+ prompts.csv + manifest.txt（AI 声明）
 * + report.md（创作过程存证）。zip STORE 模式不二次压缩媒体（视频已压缩）。
 */

/** dataURL → Uint8Array + 扩展名 */
function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; ext: string } {
  const comma = dataUrl.indexOf(',')
  const meta = dataUrl.slice(5, comma) // e.g. image/png;base64
  const mime = meta.split(';')[0]
  const ext = mime.split('/')[1]?.split('+')[0] || 'bin'
  const b64 = dataUrl.slice(comma + 1)
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return { bytes, ext }
}

/** CSV 单元格转义 */
const csvCell = (s: string) => `"${(s ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`

function sanitizeName(name: string): string {
  return (name || '未命名').replace(/[/\\:*?"<>|]/g, '_').slice(0, 60)
}

export async function exportDeliveryZip(projectName: string, nodes: PineNode[]): Promise<void> {
  const files: Zippable = {}
  const csvRows = [['节点', '类型', '模型', '版本', '文件', '提示词'].map(csvCell).join(',')]
  let mediaCount = 0
  const usedNames = new Set<string>()

  const uniqueName = (base: string) => {
    let name = base
    let i = 1
    while (usedNames.has(name)) {
      const dot = base.lastIndexOf('.')
      name = dot > 0 ? `${base.slice(0, dot)}_${i}${base.slice(dot)}` : `${base}_${i}`
      i++
    }
    usedNames.add(name)
    return name
  }

  for (const n of nodes) {
    const d = n.data
    if (d.kind === 'text' || d.kind === 'asset') continue
    const model = d.params.videoModel ?? d.params.imageModel ?? '默认'
    for (let vi = 0; vi < d.versions.length; vi++) {
      const content = d.versions[vi].content
      if (!content) continue
      const label = d.versions.length > 1 ? `_v${vi + 1}` : ''
      if (isImageContent(content)) {
        const marked = await markImageDataUrl(content)
        const { bytes, ext } = dataUrlToBytes(marked)
        const fname = uniqueName(aiFileName(`${sanitizeName(d.title)}${label}.${ext}`))
        files[fname] = [bytes, { level: 0 }]
        csvRows.push([d.title, '图片', model, String(vi + 1), fname, d.prompt].map(csvCell).join(','))
        mediaCount++
      } else if (isVideoContent(content)) {
        const { bytes, ext } = dataUrlToBytes(content)
        const fname = uniqueName(aiFileName(`${sanitizeName(d.title)}${label}.${ext}`))
        files[fname] = [bytes, { level: 0 }]
        csvRows.push([d.title, '视频', model, String(vi + 1), fname, d.prompt].map(csvCell).join(','))
        mediaCount++
      }
    }
  }

  if (!mediaCount) {
    window.dispatchEvent(
      new CustomEvent('pineline:flash', { detail: '当前项目没有可导出的图片/视频产出' }),
    )
    return
  }

  files['prompts.csv'] = strToU8('﻿' + csvRows.join('\n')) // BOM 防 Excel 中文乱码
  files['report.md'] = strToU8(await buildProvenanceReport(projectName, nodes))
  files['manifest.txt'] = strToU8(
    [
      `PineLine 交付包`,
      `项目：${projectName || '未命名项目'}`,
      `媒体文件：${mediaCount} 个`,
      `导出时间：${new Date().toLocaleString('zh-CN')}`,
      ``,
      `声明：本交付包内容含人工智能生成/合成内容。`,
      `图片已烧录「AI 生成」角标；视频交付/发布前请按《服务交付手册》叠加角标。`,
      `report.md 为创作过程存证（提示词/模型/时间线）。`,
    ].join('\n'),
  )

  const blob = await new Promise<Blob>((resolve, reject) => {
    zip(files, { level: 0 }, (err, data) => {
      if (err) reject(err)
      // data 是 Uint8Array；包一层新 ArrayBuffer 满足 BlobPart 类型
      else resolve(new Blob([new Uint8Array(data)], { type: 'application/zip' }))
    })
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sanitizeName(projectName)}-交付包.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 5000)
  window.dispatchEvent(
    new CustomEvent('pineline:flash', { detail: `✓ 已导出交付包（${mediaCount} 个媒体 + 提示词 + 存证报告）` }),
  )
}

/** 仅导出创作过程报告（不打包媒体） */
export async function exportReportOnly(projectName: string, nodes: PineNode[]): Promise<void> {
  const md = await buildProvenanceReport(projectName, nodes)
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sanitizeName(projectName)}-创作报告.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}
