import { getGenLogs, jsonOk } from '../utils'

/**
 * POST /api/debug/logs —— 拉取当前 Worker 实例的生成日志环形缓冲（最近 300 条）。
 *
 * 用途：生成失败/超时后无凭据可查的兜底自查通道——条目含 path/status/耗时/错误/
 * requestId（上游请求凭据，可拿去方舟/Google 工单定位扣费记录）。
 *
 * 注意：不走 runRoute（避免把日志查询本身写进缓冲挤占生成记录）。
 */

/**
 * 实例标识（区分 isolate，各自持有一份内存缓冲）：**必须在请求内惰性生成**——
 * Workers 禁止在全局作用域生成随机数，模块顶层 randomUUID 会让脚本启动校验
 * 失败、整次部署被拒（2026-07-05 实测：上一版因此卡住 CF 自动部署 10 小时）。
 */
let isolateId: string | null = null

export default function debugLogs(): Promise<Response> {
  isolateId ??= crypto.randomUUID()
  return Promise.resolve(
    jsonOk({
      entries: getGenLogs(),
      isolateId,
      now: Date.now(),
      hint:
        'Workers 多实例：此处仅当前实例的内存日志（best-effort，冷启动即清空，多实例间不共享）。' +
        '完整持久日志请到 Cloudflare 仪表盘 → Workers Logs 检索 tag=pineline-api。',
    }),
  )
}
