import { useCallback, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useStudioStore } from '../store'
import { estimateCost, IMAGE_MODELS } from '../nodeCatalog'
import { TOKENS } from '../designTokens'
import type { PineNodeData } from '../types'
import OpsPanelShell, { EditModelPicker, SliderRow, Toggle } from './OpsPanelShell'

/**
 * 多角度面板（设计稿 §05）：3D 立方体拖拽 + 旋转/倾斜/缩放滑杆双向联动 + 广角开关。
 * 参数注入提示词，以原图为参考重新生成（结果入版本栈，可回退）。
 */
export default function MultiAnglePanel({
  id,
  data,
  onClose,
}: {
  id: string
  data: PineNodeData
  onClose: () => void
}) {
  const runImageEdit = useStudioStore((s) => s.runImageEdit)
  const [editModel, setEditModel] = useState(data.params.imageModel ?? IMAGE_MODELS[0].id)
  const [rotate, setRotate] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [wide, setWide] = useState(false)
  const dragRef = useRef<{ x: number; y: number; r: number; t: number } | null>(null)

  const running = data.status === 'running'
  const cost = estimateCost('image', 'single', data.params)

  const onCubeDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      dragRef.current = { x: e.clientX, y: e.clientY, r: rotate, t: tilt }
    },
    [rotate, tilt],
  )
  const onCubeMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d) return
    setRotate(Math.max(-180, Math.min(180, Math.round(d.r + (e.clientX - d.x) * 0.8))))
    setTilt(Math.max(-90, Math.min(90, Math.round(d.t - (e.clientY - d.y) * 0.5))))
  }, [])
  const onCubeUp = useCallback(() => {
    dragRef.current = null
  }, [])

  const buildPrompt = () => {
    const dirR = rotate === 0 ? '' : rotate > 0 ? `orbit ${rotate}° to the right` : `orbit ${-rotate}° to the left`
    const dirT = tilt === 0 ? '' : tilt > 0 ? `pitch ${tilt}° upward` : `pitch ${-tilt}° downward (looking down)`
    const zoomTxt = zoom === 1 ? '' : zoom > 1 ? `zoom in ${zoom.toFixed(1)}x (closer framing)` : `zoom out ${zoom.toFixed(1)}x (wider framing)`
    const parts = [dirR, dirT, zoomTxt, wide ? 'use a 24mm wide-angle lens with mild perspective distortion' : '']
      .filter(Boolean)
      .join(', ')
    return `Re-render the exact same subject and scene from a different camera angle. Keep the subject identity, materials, style and lighting identical to the reference image. Camera change: ${parts || 'the same angle'}. Photorealistic, seamless, no artifacts.（保持主体与风格与参考图完全一致，仅改变相机角度）`
  }

  const cubeFace = 'absolute inset-0 rounded-[10px] border'

  return (
    <OpsPanelShell
      title="多角度"
      hint="拖拽方块调整角度"
      cost={cost}
      running={running}
      headerExtra={<EditModelPicker value={editModel} onChange={setEditModel} />}
      onSubmit={() => {
        void runImageEdit(id, buildPrompt(), { label: '多角度', model: editModel })
        onClose()
      }}
      onClose={onClose}
    >
      <div className="flex gap-5">
        {/* 左：3D 立方体 */}
        <div
          className="relative flex h-[190px] w-[190px] shrink-0 select-none items-center justify-center rounded-[16px]"
          style={{ background: TOKENS.chipBg }}
        >
          <div
            className="cursor-grab active:cursor-grabbing"
            style={{ perspective: 420 }}
            onPointerDown={onCubeDown}
            onPointerMove={onCubeMove}
            onPointerUp={onCubeUp}
          >
            <div
              className="relative h-[74px] w-[74px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${-22 - tilt * 0.6}deg) rotateY(${-32 + rotate * 0.8}deg) scale(${0.7 + zoom * 0.3})`,
              }}
            >
              <div className={cubeFace} style={{ background: '#3A3A3E', borderColor: 'rgba(255,255,255,0.2)', transform: 'translateZ(37px)' }} />
              <div className={cubeFace} style={{ background: '#29292C', borderColor: 'rgba(255,255,255,0.1)', transform: 'rotateY(90deg) translateZ(37px)' }} />
              <div className={cubeFace} style={{ background: '#202023', borderColor: 'rgba(255,255,255,0.08)', transform: 'rotateX(-90deg) translateZ(37px)' }} />
            </div>
          </div>
          <button
            onClick={() => {
              setRotate(0)
              setTilt(0)
              setZoom(1)
              setWide(false)
            }}
            className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[13px] transition hover:text-white"
            style={{ color: TOKENS.textMuted }}
          >
            <RotateCcw size={13} /> 重置
          </button>
        </div>

        {/* 右：滑杆组 */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[18px]">
          <SliderRow label="旋转" min={-180} max={180} value={rotate} format={(v) => `${v}°`} onChange={setRotate} />
          <SliderRow label="倾斜" min={-90} max={90} value={tilt} format={(v) => `${v}°`} onChange={setTilt} />
          <SliderRow
            label="缩放"
            min={0.5}
            max={2}
            step={0.1}
            value={zoom}
            format={(v) => `${v.toFixed(1)}×`}
            onChange={setZoom}
          />
          <div className="flex items-center justify-between">
            <span className="text-[14px]" style={{ color: TOKENS.textBody }}>
              广角镜头
            </span>
            <Toggle on={wide} onChange={setWide} />
          </div>
        </div>
      </div>
    </OpsPanelShell>
  )
}
