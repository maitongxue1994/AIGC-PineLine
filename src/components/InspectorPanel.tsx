import { Sparkles, Play, RotateCcw, Info, Trash2, Download, Copy } from 'lucide-react'
import { useStudioStore } from '../studio/store'
import type {
  CharacterParams,
  ImageParams,
  PineNode,
  PropParams,
  SceneParams,
  ScriptParams,
  ShotParams,
  StoryboardParams,
} from '../studio/types'

export default function InspectorPanel() {
  const nodes = useStudioStore((s) => s.nodes)
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId)
  const updateNodeParams = useStudioStore((s) => s.updateNodeParams)
  const updateNodeTitle = useStudioStore((s) => s.updateNodeTitle)
  const updateNodeOutput = useStudioStore((s) => s.updateNodeOutput)
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
          output={node.data.output}
          onChange={(patch) => updateNodeParams(node.id, patch)}
          onOutputChange={(v) => updateNodeOutput(node.id, v)}
          onRun={() => runNode(node.id)}
          onDelete={() => deleteNode(node.id)}
        />
      )}

      {node?.data.kind === 'image' && (
        <ImageInspector
          nodeId={node.id}
          params={node.data.params as ImageParams}
          status={node.data.status}
          output={node.data.output}
          title={node.data.title}
          onChange={(patch) => updateNodeParams(node.id, patch)}
          onRun={() => runNode(node.id)}
          onDelete={() => deleteNode(node.id)}
        />
      )}

      {node && ['storyboard', 'scene', 'character', 'prop', 'shot'].includes(node.data.kind) && (
        <PipelineInspector
          node={node}
          onChangeParams={(patch) => updateNodeParams(node.id, patch)}
          onOutputChange={(v) => updateNodeOutput(node.id, v)}
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
  output,
  onChange,
  onOutputChange,
  onRun,
  onDelete,
}: {
  nodeId: string
  params: ScriptParams
  status: string
  output: string | null
  onChange: (patch: Partial<ScriptParams>) => void
  onOutputChange: (v: string) => void
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
            rows={5}
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

        <Field label="Length · 场次数量">
          <Select
            value={params.length}
            onChange={(v) => onChange({ length: v as ScriptParams['length'] })}
            options={[
              ['short', '短 · 1 个场次'],
              ['medium', '中 · 3 个场次'],
              ['long', '长 · 5 个场次'],
            ]}
          />
        </Field>

        <Field label="Model">
          <div className="rounded-md border border-white/[0.07] bg-bg-2/40 px-3 py-2.5 text-[12px] text-ink-0">
            <div className="font-medium">MiniMax-M2.7</div>
            <div className="mt-0.5 text-[10px] text-ink-2">官方 Coding Plan · 中文首选</div>
          </div>
        </Field>

        <Field
          label="Output · 剧本正文"
          trailing={
            output ? (
              <div className="flex items-center gap-2 text-[10px] text-ink-2">
                <span>{output.length} 字</span>
                <button
                  type="button"
                  onClick={() => copyText(output)}
                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-ink-2 hover:bg-white/5 hover:text-white"
                  title="复制"
                >
                  <Copy size={11} />
                </button>
                <button
                  type="button"
                  onClick={() => downloadText(output, 'screenplay.txt')}
                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-ink-2 hover:bg-white/5 hover:text-white"
                  title="下载 .txt"
                >
                  <Download size={11} />
                </button>
              </div>
            ) : null
          }
        >
          <textarea
            value={output ?? ''}
            onChange={(e) => onOutputChange(e.target.value)}
            rows={14}
            placeholder={
              status === 'running'
                ? 'MiniMax 生成中…'
                : '运行后剧本会显示在这里；可以手动修改后再传给下游节点。'
            }
            className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/40 p-2.5 font-mono text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
          />
        </Field>
      </div>

      <BottomActions
        status={status}
        label="生成剧本"
        onRun={onRun}
        onDelete={onDelete}
      />
    </>
  )
}

function ImageInspector({
  params,
  status,
  output,
  title,
  onChange,
  onRun,
  onDelete,
}: {
  nodeId: string
  params: ImageParams
  status: string
  output: string | null
  title: string
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

        <Field
          label="Output · 生成结果"
          trailing={
            output ? (
              <button
                type="button"
                onClick={() => downloadDataUrl(output, `${title || 'pineline'}.png`)}
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-ink-2 hover:bg-white/5 hover:text-white"
                title="下载 PNG"
              >
                <Download size={11} /> 下载
              </button>
            ) : null
          }
        >
          {output ? (
            <a
              href={output}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-md border border-white/[0.07] bg-bg-2/40"
              title="点击大图预览（新标签页）"
            >
              <img src={output} alt={title} className="h-auto w-full object-contain" />
            </a>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-white/[0.07] bg-bg-2/30 text-[11px] text-ink-3">
              {status === 'running' ? '生成中…' : '运行后显示生成图'}
            </div>
          )}
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

function copyText(text: string) {
  navigator.clipboard?.writeText(text).catch(() => {})
}

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
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

function Field({
  label,
  trailing,
  children,
}: {
  label: string
  trailing?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-ink-2">
        <span>{label}</span>
        {trailing}
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

const ASPECT_OPTIONS: [string, string][] = [
  ['16:9', '16:9 · 横幅'],
  ['9:16', '9:16 · 竖幅'],
  ['1:1', '1:1 · 方图'],
  ['4:3', '4:3 · 复古电视'],
  ['3:4', '3:4 · 杂志竖'],
]

const KIND_LABEL: Record<string, { label: string; runLabel: string }> = {
  storyboard: { label: '分镜拆分', runLabel: '拆分分镜' },
  scene: { label: '场景四宫格', runLabel: '生成场景' },
  character: { label: '角色三视图', runLabel: '生成角色' },
  prop: { label: '道具三视图', runLabel: '生成道具' },
  shot: { label: '分镜图（多参考）', runLabel: '生成分镜图' },
}

function PipelineInspector({
  node,
  onChangeParams,
  onOutputChange,
  onRun,
  onDelete,
}: {
  node: PineNode
  onChangeParams: (patch: Record<string, unknown>) => void
  onOutputChange: (v: string) => void
  onRun: () => void
  onDelete: () => void
}) {
  const kind = node.data.kind
  const meta = KIND_LABEL[kind] ?? { label: kind, runLabel: '运行' }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-3 rounded-md border border-white/[0.06] bg-bg-2/40 px-3 py-2 text-[11px] text-ink-2">
          类型：<span className="text-ink-0">{meta.label}</span>
        </div>

        {kind === 'storyboard' && (
          <StoryboardFields
            params={node.data.params as StoryboardParams}
            onChange={onChangeParams}
          />
        )}
        {kind === 'scene' && (
          <SceneFields
            params={node.data.params as SceneParams}
            onChange={onChangeParams}
          />
        )}
        {kind === 'character' && (
          <DescriptionOnlyFields
            placeholder="外貌、服装、年龄、气质…"
            params={node.data.params as CharacterParams}
            onChange={onChangeParams}
          />
        )}
        {kind === 'prop' && (
          <DescriptionOnlyFields
            placeholder="形态、材质、颜色、风格…"
            params={node.data.params as PropParams}
            onChange={onChangeParams}
          />
        )}
        {kind === 'shot' && (
          <ShotFields
            params={node.data.params as ShotParams}
            onChange={onChangeParams}
          />
        )}

        <Field
          label="Output · 输出"
          trailing={
            node.data.output || (node.data.outputs && node.data.outputs.length) ? (
              <OutputActions node={node} />
            ) : null
          }
        >
          <OutputBody node={node} onTextChange={onOutputChange} />
        </Field>
      </div>

      <BottomActions
        status={node.data.status}
        label={meta.runLabel}
        onRun={onRun}
        onDelete={onDelete}
      />
    </>
  )
}

function StoryboardFields({
  params,
  onChange,
}: {
  params: StoryboardParams
  onChange: (patch: Record<string, unknown>) => void
}) {
  return (
    <>
      <Field label="Mode · 拆分方式">
        <Select
          value={params.mode}
          onChange={(v) => onChange({ mode: v })}
          options={[
            ['auto', '自动 · MiniMax 按语义拆'],
            ['manual', '分隔符 · 用户手动标记'],
          ]}
        />
      </Field>
      {params.mode === 'manual' && (
        <Field label="Splitter · 分隔符">
          <input
            value={params.splitter}
            onChange={(e) => onChange({ splitter: e.target.value })}
            placeholder="例如：=== 或 \n---\n"
            className="w-full rounded-md border border-white/[0.07] bg-bg-2/60 px-2.5 py-2 text-[12px] text-ink-0 outline-none transition focus:border-white/25"
          />
        </Field>
      )}
      <Field label="Screenplay · 剧本（可从上游读取）">
        <textarea
          value={params.screenplay}
          onChange={(e) => onChange({ screenplay: e.target.value })}
          rows={6}
          placeholder="留空则读取上游 Script 节点输出…"
          className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
        />
      </Field>
    </>
  )
}

function SceneFields({
  params,
  onChange,
}: {
  params: SceneParams
  onChange: (patch: Record<string, unknown>) => void
}) {
  return (
    <>
      <Field label="Description · 场景描述">
        <textarea
          value={params.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={5}
          placeholder="地点、时段、光线、氛围…"
          className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
        />
      </Field>
      <Field label="Aspect Ratio">
        <Select
          value={params.aspectRatio}
          onChange={(v) => onChange({ aspectRatio: v })}
          options={ASPECT_OPTIONS}
        />
      </Field>
    </>
  )
}

function DescriptionOnlyFields({
  params,
  placeholder,
  onChange,
}: {
  params: CharacterParams | PropParams
  placeholder: string
  onChange: (patch: Record<string, unknown>) => void
}) {
  return (
    <Field label="Description · 描述">
      <textarea
        value={params.description}
        onChange={(e) => onChange({ description: e.target.value })}
        rows={5}
        placeholder={placeholder}
        className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
      />
    </Field>
  )
}

function ShotFields({
  params,
  onChange,
}: {
  params: ShotParams
  onChange: (patch: Record<string, unknown>) => void
}) {
  return (
    <>
      <Field label="Shot Description · 分镜图描述">
        <textarea
          value={params.shotDescription}
          onChange={(e) => onChange({ shotDescription: e.target.value })}
          rows={5}
          placeholder="留空会从上游分镜节点取第一条…"
          className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/60 p-2.5 text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
        />
      </Field>
      <Field label="Aspect Ratio">
        <Select
          value={params.aspectRatio}
          onChange={(v) => onChange({ aspectRatio: v })}
          options={ASPECT_OPTIONS}
        />
      </Field>
      <div className="mb-4 rounded-md border border-white/[0.06] bg-bg-2/40 px-3 py-2 text-[11px] text-ink-2">
        多参考：从画布把「场景 / 角色 / 道具」节点连到此节点的左侧 handle，对应输出图会自动作为 Gemini 的参考图。
      </div>
    </>
  )
}

function OutputActions({ node }: { node: PineNode }) {
  const isTextLike = node.data.kind === 'storyboard'
  return (
    <div className="flex items-center gap-2 text-[10px] text-ink-2">
      {isTextLike && node.data.output && (
        <>
          <button
            type="button"
            onClick={() => copyText(node.data.output!)}
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/5 hover:text-white"
            title="复制"
          >
            <Copy size={11} />
          </button>
          <button
            type="button"
            onClick={() => downloadText(node.data.output!, 'storyboard.txt')}
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/5 hover:text-white"
            title="下载 .txt"
          >
            <Download size={11} />
          </button>
        </>
      )}
    </div>
  )
}

function OutputBody({
  node,
  onTextChange,
}: {
  node: PineNode
  onTextChange: (v: string) => void
}) {
  const { kind, output, outputs = [], status, title } = node.data

  if (kind === 'storyboard') {
    return (
      <textarea
        value={output ?? ''}
        onChange={(e) => onTextChange(e.target.value)}
        rows={12}
        placeholder={status === 'running' ? '拆分中…' : '运行后显示分镜列表。'}
        className="w-full resize-none rounded-md border border-white/[0.07] bg-bg-2/40 p-2.5 font-mono text-[12px] leading-relaxed text-ink-0 outline-none transition focus:border-white/25"
      />
    )
  }

  if (outputs.length > 0) {
    const cols = outputs.length === 4 ? 'grid-cols-2' : 'grid-cols-3'
    return (
      <div className={`grid ${cols} gap-2`}>
        {outputs.map((src, i) =>
          src ? (
            <div key={i} className="relative overflow-hidden rounded-md border border-white/[0.06] bg-bg-2/40">
              <a href={src} target="_blank" rel="noreferrer" title="点击新标签大图">
                <img src={src} alt={`${title}-${i + 1}`} className="h-auto w-full object-cover" />
              </a>
              <button
                type="button"
                onClick={() => downloadDataUrl(src, `${title || 'pineline'}-${i + 1}.png`)}
                className="absolute right-1 top-1 rounded bg-black/60 p-1 text-white/90 backdrop-blur transition hover:bg-black/80 hover:text-white"
                title="下载"
              >
                <Download size={10} />
              </button>
            </div>
          ) : (
            <div
              key={i}
              title={node.data.outputErrors?.[i] ?? '生成失败'}
              className="flex aspect-square items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-[10px] text-red-300"
            >
              失败
            </div>
          ),
        )}
      </div>
    )
  }

  if (output && output.startsWith('data:image')) {
    return (
      <div className="relative overflow-hidden rounded-md border border-white/[0.07] bg-bg-2/40">
        <a href={output} target="_blank" rel="noreferrer" title="点击新标签大图">
          <img src={output} alt={title} className="h-auto w-full object-contain" />
        </a>
        <button
          type="button"
          onClick={() => downloadDataUrl(output, `${title || 'pineline'}.png`)}
          className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/90 backdrop-blur transition hover:bg-black/80 hover:text-white"
          title="下载"
        >
          <Download size={11} /> 下载
        </button>
      </div>
    )
  }

  return (
    <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-white/[0.07] bg-bg-2/30 text-[11px] text-ink-3">
      {status === 'running' ? '生成中…' : '运行后显示输出'}
    </div>
  )
}
