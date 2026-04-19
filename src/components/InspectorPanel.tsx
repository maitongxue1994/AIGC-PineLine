import { Sparkles, Play, RotateCcw, Info, Trash2 } from 'lucide-react'
import { useStudioStore } from '../studio/store'
import type { ImageParams, ScriptParams } from '../studio/types'

export default function InspectorPanel() {
  const nodes = useStudioStore((s) => s.nodes)
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const updateNodeTitle = useStudioStore((s) => s.updateNodeTitle)
  const deleteNode = useStudioStore((s) => s.deleteNode)
  const runNode = useStudioStore((s) => s.runNode)

  const node = nodes.find((n) => n.id === selectedNodeId)

  return (
    <aside className="hidden w-[320px] shrink-0 border-l border-white/[0.06] bg-bg-1/50 md:flex md:flex-col">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-ink-2">Inspector</div>
          {node ? (
            <input
              value={node.data.title}
              onChange={(e) => updateNodeTitle(node.id, e.target.value)}
              className="w-full bg-transparent font-display text-sm font-semibold text-white outline-none"
            />
          ) : (
            <div className="font-display text-sm font-semibold text-ink-3">未选中节点</div>
          )}
        </div>
        <button
          className="rounded-md p-1 text-ink-2 hover:bg-white/5 hover:text-white"
          title="帮助"
        >
          <Info size={14} />
        </button>
      </div>

      {!node && (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-[12px] text-ink-3">
          选中画布上的节点以编辑参数，或在左侧工具栏添加新节点。
        </div>
      )}

      {node?.data.kind === 'script' && (
        <ScriptInspector
          nodeId={node.id}
          params={node.data.params as ScriptParams}
          status={node.data.status}
          onChange={(patch) => updateNodeParams(node.id, patch)}
          onRun={() => runNode(node.id)}
          onDelete={() => deleteNode(node.id)}
        />
      )}

      {node?.data.kind === 'image' && (
        <ImageInspector
          nodeId={node.id}
          params={node.data.params as ImageParams}
          status={node.data.status}
          onChange={(patch) => updateNodeParams(node.id, patch)}
          onRun={() => runNode(node.id)}
          onDelete={() => deleteNode(node.id)}
        />
      )}
    </aside>
  )
}

function ScriptInspector({
  params,
  status,
  onChange,
  onRun,
  onDelete,
}: {
  nodeId: string
  params: ScriptParams
  status: string
  onChange: (patch: Partial<ScriptParams>) => void
  onRun: () => void
  onDelete: () => void
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Field label="Brief · 创意简述">
          <textarea
            value={params.brief}
            onChange={(e) => onChange({ brief: e.target.value })}
            rows={6}
            placeholder="用一两句话描述场景、人物、氛围…"
            className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
          <div className="mt-1.5 text-[10px] text-ink-2">{params.brief.length} / 1000</div>
        </Field>

        <Field label="Tone · 风格">
          <Select
            value={params.tone}
            onChange={(v) => onChange({ tone: v as ScriptParams['tone'] })}
            options={[
              ['cinematic', '电影级 · 视听化'],
              ['commercial', '商业广告 · 强记忆点'],
              ['drama', '短剧 · 冲突驱动'],
              ['documentary', '纪录片 · 真实感'],
            ]}
          />
        </Field>

        <Field label="Length · 长度">
          <Select
            value={params.length}
            onChange={(v) => onChange({ length: v as ScriptParams['length'] })}
            options={[
              ['short', '短 · 1 段落'],
              ['medium', '中 · 3 段落'],
              ['long', '长 · 5 段落'],
            ]}
          />
        </Field>

        <Field label="Model">
          <div className="rounded-md border border-white/[0.07] bg-bg-2/40 px-3 py-2.5 text-[12px] text-ink-0">
            <div className="font-medium">MiniMax-M2.7</div>
            <div className="mt-0.5 text-[10px] text-ink-2">官方 Coding Plan · 中文首选</div>
          </div>
        </Field>
      </div>

      <BottomActions
        status={status}
        label="生成脚本"
        onRun={onRun}
        onDelete={onDelete}
      />
    </>
  )
}

function ImageInspector({
  params,
  status,
  onChange,
  onRun,
  onDelete,
}: {
  nodeId: string
  params: ImageParams
  status: string
  onChange: (patch: Partial<ImageParams>) => void
  onRun: () => void
  onDelete: () => void
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Field label="Prompt · 图像描述">
          <textarea
            value={params.prompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            rows={6}
            placeholder="留空则自动使用上游节点的输出…"
            className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
          <div className="mt-1.5 text-[10px] text-ink-2">{params.prompt.length} / 2000</div>
        </Field>

        <Field label="Aspect Ratio · 画幅">
          <Select
            value={params.aspectRatio}
            onChange={(v) => onChange({ aspectRatio: v as ImageParams['aspectRatio'] })}
            options={[
              ['16:9', '16:9 · 横幅'],
              ['9:16', '9:16 · 竖幅'],
              ['1:1', '1:1 · 方图'],
              ['4:3', '4:3 · 复古电视'],
              ['3:4', '3:4 · 杂志竖'],
            ]}
          />
        </Field>

        <Field label="Model">
          <div className="rounded-md border border-white/[0.07] bg-bg-2/40 px-3 py-2.5 text-[12px] text-ink-0">
            <div className="font-medium">Gemini 3.1 Flash Image</div>
            <div className="mt-0.5 text-[10px] text-ink-2">Nano Banana Pro · 高一致性</div>
          </div>
        </Field>
      </div>

      <BottomActions
        status={status}
        label="生成图片"
        onRun={onRun}
        onDelete={onDelete}
      />
    </>
  )
}

function BottomActions({
  status,
  label,
  onRun,
  onDelete,
}: {
  status: string
  label: string
  onRun: () => void
  onDelete: () => void
}) {
  return (
    <div className="shrink-0 border-t border-white/[0.06] bg-bg-1/90 p-3">
      <div className="mb-2 flex items-center justify-between text-[11px]">
        <span className="text-ink-2">状态</span>
        <span
          className={
            status === 'running'
              ? 'text-brand'
              : status === 'done'
              ? 'text-[#B6FF5F]'
              : status === 'error'
              ? 'text-red-400'
              : 'text-ink-2'
          }
        >
          {
            { idle: '待运行', running: '运行中', done: '已完成', error: '出错' }[
              status
            ] ?? status
          }
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="btn-ghost !py-2 !text-xs"
          title="删除节点"
        >
          <Trash2 size={12} />
        </button>
        <button
          onClick={onRun}
          disabled={status === 'running'}
          className="btn-primary flex-1 !py-2 !text-xs disabled:opacity-50"
        >
          {status === 'running' ? (
            <>
              <RotateCcw size={12} className="animate-spin" /> 运行中…
            </>
          ) : (
            <>
              <Sparkles size={12} /> {label}
            </>
          )}
        </button>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-ink-3">
        <Play size={9} /> 上游节点输出会自动作为本节点 prompt
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-2">
        {label}
      </div>
      {children}
    </div>
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: [string, string][]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-md border border-white/[0.07] bg-bg-2/60 px-2.5 py-2 text-[12px] text-ink-0 outline-none transition focus:border-white/25"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v} className="bg-bg-1">
          {l}
        </option>
      ))}
    </select>
  )
}
