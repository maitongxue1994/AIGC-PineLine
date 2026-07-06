import { listGenLog } from './assetdb'
import type { PineNode } from './types'

/**
 * 创作过程存证报告（Markdown）：提示词、模型、供应商 request-id、迭代时间线。
 * 双重价值：① AI 生成内容的司法确权证据（体现人类独创性投入）；② to B 交付的信任资产。
 * 局限：genlog 全局按时间存（LRU 500），非严格按项目——报告取最近 N 条并注明。
 */

const fmtTime = (ts: number) => {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

const shortPath = (path: string) => path.replace('/api/generate/', '').replace('upstream:', '↑')

export async function buildProvenanceReport(projectName: string, nodes: PineNode[]): Promise<string> {
  const log = await listGenLog().catch(() => [])
  const now = new Date()
  const lines: string[] = []

  lines.push(`# 创作过程存证报告`)
  lines.push('')
  lines.push(`- 作品/项目：${projectName || '未命名项目'}`)
  lines.push(`- 生成工具：PineLine（节点画布式 AIGC 视频创作管线）`)
  lines.push(`- 报告生成时间：${fmtTime(now.getTime())}`)
  lines.push(`- 说明：本作品含人工智能生成/合成内容，已按《人工智能生成合成内容标识办法》标识。`)
  lines.push('')

  // 节点与提示词
  lines.push(`## 一、创作节点与提示词`)
  lines.push('')
  const genNodes = nodes.filter((n) => n.data.kind !== 'asset')
  if (!genNodes.length) {
    lines.push('（当前画布无生成节点）')
  } else {
    for (const n of genNodes) {
      const d = n.data
      const kindLabel = d.kind === 'text' ? '文本' : d.kind === 'image' ? '图片' : '视频'
      const model =
        d.params.videoModel ?? d.params.imageModel ?? d.params.textModel ?? '默认'
      lines.push(`### ${d.title}（${kindLabel}${d.preset ? ` · ${d.preset}` : ''}）`)
      if (d.prompt?.trim()) lines.push(`- 提示词：${d.prompt.trim().slice(0, 500)}`)
      lines.push(`- 模型：${model}`)
      lines.push(`- 产出版本数：${d.versions.length}（体现多轮迭代与人工选择）`)
      lines.push('')
    }
  }

  // 生成请求时间线（供应商 request-id 是对账/存证锚点）
  lines.push(`## 二、生成请求时间线`)
  lines.push('')
  lines.push(`> 取自本机生成日志（最近 ${Math.min(log.length, 100)} 条，全局按时间记录，可能含其他项目）`)
  lines.push('')
  if (!log.length) {
    lines.push('（暂无生成日志记录）')
  } else {
    lines.push('| 时间 | 类型 | 模型 | 状态 | 供应商 request-id |')
    lines.push('|---|---|---|---|---|')
    for (const r of log.slice(0, 100)) {
      lines.push(
        `| ${fmtTime(r.createdAt)} | ${shortPath(r.path)} | ${r.model ?? '-'} | ${r.ok ? '成功' : '失败'} | ${r.requestId ?? '-'} |`,
      )
    }
  }
  lines.push('')
  lines.push(`---`)
  lines.push(`本报告由 PineLine 自动生成，记录创作过程中的提示词设计、模型选择与迭代，`)
  lines.push(`可作为人工智能生成内容独创性投入的存证材料。`)

  return lines.join('\n')
}
