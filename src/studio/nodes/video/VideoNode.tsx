import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { NodeProps } from '@xyflow/react'
import {
  BadgeCheck,
  Loader2,
  Maximize2,
  Pause,
  Play,
  Star,
  Upload,
  Video as VideoIcon,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { activeContent, isVideoContent, type PineNode } from '../../types'
import { TOKENS } from '../../designTokens'
import { useStudioStore } from '../../store'
import NodeShell from '../NodeShell'
import VideoToolbarBar from './VideoToolbarBar'
import VideoPromptBar from './VideoPromptBar'
import VideoTrimMode from './VideoTrimMode'
import VideoEnhancePanel from './VideoEnhancePanel'
import VideoLightbox from './VideoLightbox'

const CARD_W = 480

function fmt(t: number): string {
  return `${t.toFixed(1)}s`
}

/** 生成中的计时文案：视频异步任务通常 1-5 分钟，给用户明确的进行中反馈 */
function RunningElapsed() {
  const [sec, setSec] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setSec((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])
  const label = sec < 60 ? `${sec}s` : `${Math.floor(sec / 60)}m${sec % 60}s`
  return (
    <span className="text-[13px]" style={{ color: TOKENS.textFaint }}>
      生成中 {label} · 视频生成通常需 1-5 分钟
    </span>
  )
}

/**
 * 视频内容节点（video-node-tools §1）：16:9 播放器卡片。
 * 悬停显示底部播放条；左上静音/收藏；合规蓝勾在外置标签；软剪辑 clamp 到 params.trim。
 */
function VideoNodeInner({ id, data, selected }: NodeProps<PineNode>) {
  const addVideoNodeContent = useStudioStore((s) => s.updateActiveContent)
  const resumeVideoTask = useStudioStore((s) => s.resumeVideoTask)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [starred, setStarred] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [mode, setMode] = useState<'idle' | 'trim' | 'enhance'>('idle')

  const output = activeContent(data)
  const hasVideo = isVideoContent(output)
  const running = data.status === 'running'
  const trim = data.params.trim

  // 软剪辑：播放范围 clamp 到 trim 区间
  const clampStart = trim?.start ?? 0
  const clampEnd = trim?.end ?? Infinity

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.currentTime >= Math.min(clampEnd, v.duration || Infinity)) {
      v.currentTime = clampStart
      if (!v.loop) v.pause()
    }
    setTime(v.currentTime)
  }, [clampStart, clampEnd])

  const onLoaded = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration || 0)
    if (trim && v.currentTime < clampStart) v.currentTime = clampStart
  }, [trim, clampStart])

  useEffect(() => {
    const v = videoRef.current
    if (v) v.muted = muted
  }, [muted, output])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      if (trim && (v.currentTime < clampStart || v.currentTime >= clampEnd)) {
        v.currentTime = clampStart
      }
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const seekTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const t = ratio * duration
    v.currentTime = trim ? Math.max(clampStart, Math.min(t, clampEnd)) : t
    setTime(v.currentTime)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('video/')) return
    if (file.size > 64 * 1024 * 1024) {
      window.dispatchEvent(new CustomEvent('pineline:flash', { detail: '视频超过 64MB，暂不支持' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      addVideoNodeContent(id, String(reader.result ?? ''))
    }
    reader.readAsDataURL(file)
  }

  const effDuration = trim ? Math.min(clampEnd, duration) - clampStart : duration
  const effTime = trim ? Math.max(0, time - clampStart) : time
  const progress = effDuration > 0 ? Math.min(1, effTime / effDuration) : 0

  return (
    <NodeShell
      id={id}
      data={data}
      selected={selected}
      width={CARD_W}
      typeIcon={<VideoIcon />}
      labelExtra={
        data.params.compliance ? (
          <span title="已通过 Seedance 2.0 合规验证">
            <BadgeCheck size={15} fill={TOKENS.accent} stroke="#fff" strokeWidth={1.6} />
          </span>
        ) : undefined
      }
      errorAction={
        // 超时/查询中断的任务带 taskRef：提供「继续查询」续查取件（不重新下单）
        !running && data.versions.some((v) => !v.content && v.taskRef)
          ? { label: '继续查询', onClick: () => void resumeVideoTask(id) }
          : undefined
      }
      toolbar={
        mode === 'idle' ? (
          <VideoToolbarBar
            id={id}
            data={data}
            videoElRef={videoRef}
            hasVideo={hasVideo}
            output={output}
            onPreview={() => setLightbox(true)}
            onTrim={() => setMode('trim')}
            onEnhance={() => setMode('enhance')}
            onReplace={() => fileRef.current?.click()}
          />
        ) : undefined
      }
      composer={
        mode === 'trim' && hasVideo && output ? (
          <VideoTrimMode
            id={id}
            src={output}
            duration={duration}
            initial={trim}
            onCancel={() => setMode('idle')}
            onDone={() => setMode('idle')}
          />
        ) : mode === 'enhance' ? (
          <VideoEnhancePanel id={id} data={data} thumb={null} onClose={() => setMode('idle')} />
        ) : (
          <VideoPromptBar id={id} data={data} />
        )
      }
    >
      {hasVideo && output ? (
        <div className="group/video relative" style={{ aspectRatio: '16/9', background: '#0A0A0B' }}>
          <video
            ref={videoRef}
            src={output}
            playsInline
            loop={!trim}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoaded}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onDoubleClick={(e) => {
              e.stopPropagation()
              setLightbox(true)
            }}
            className="block h-full w-full object-contain"
          />

          {/* 左上：静音 / 收藏（34×34，r11） */}
          <div className="absolute left-3 top-3 flex gap-1.5 opacity-0 transition group-hover/video:opacity-100">
            <button
              title={muted ? '取消静音' : '静音'}
              onClick={(e) => {
                e.stopPropagation()
                setMuted((m) => !m)
              }}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[11px] text-white backdrop-blur"
              style={{ background: 'rgba(10,10,12,0.65)' }}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              title={starred ? '取消收藏' : '收藏'}
              onClick={(e) => {
                e.stopPropagation()
                setStarred((v) => !v)
              }}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[11px] text-white backdrop-blur"
              style={{ background: 'rgba(10,10,12,0.65)' }}
            >
              <Star size={15} fill={starred ? '#F2C744' : 'none'} style={starred ? { color: '#F2C744' } : undefined} />
            </button>
          </div>

          {/* 底部播放条（悬停显示，渐变底） */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-[18px] pb-3 pt-6 opacity-0 transition group-hover/video:opacity-100"
            style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.55))' }}
          >
            <button
              title={playing ? '暂停' : '播放'}
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              className="shrink-0 text-white"
            >
              {playing ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" />}
            </button>
            <span className="shrink-0 text-[15px] font-[650] text-white">{fmt(effTime)}</span>
            <div
              className="nodrag relative min-w-0 flex-1 cursor-pointer py-2"
              onPointerDown={(e) => {
                e.stopPropagation()
                seekTo(e)
              }}
            >
              <div className="h-[5px] rounded-[3px]" style={{ background: 'rgba(255,255,255,0.28)' }}>
                <div className="h-full rounded-[3px] bg-white" style={{ width: `${progress * 100}%` }} />
              </div>
              <span
                className="absolute top-1/2 h-[15px] w-[15px] -translate-y-1/2 rounded-full bg-white shadow"
                style={{ left: `calc(${progress * 100}% - 7px)` }}
              />
            </div>
            <span className="shrink-0 text-[15px] text-white/85">{fmt(effDuration)}</span>
            <button
              title="全屏查看"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(true)
              }}
              className="shrink-0 text-white"
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-3"
          style={{ aspectRatio: '16/9', background: '#1A1A1C' }}
        >
          {running ? (
            <>
              <Loader2 size={22} className="animate-spin" style={{ color: TOKENS.textMuted }} />
              <RunningElapsed />
            </>
          ) : data.params.enhance ? (
            <span className="text-[16px]" style={{ color: TOKENS.textMuted }}>
              配置参数生成高清视频
            </span>
          ) : (
            <>
              <VideoIcon size={22} strokeWidth={1.8} style={{ color: TOKENS.textDisabled }} />
              <span className="text-[13px]" style={{ color: TOKENS.textFaint }}>
                上传视频，或输入提示词生成
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  fileRef.current?.click()
                }}
                className="nodrag flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition hover:bg-white/[0.14]"
                style={{ background: 'rgba(255,255,255,0.08)', color: TOKENS.textBody }}
              >
                <Upload size={13} /> 上传视频
              </button>
            </>
          )}
        </div>
      )}

      <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleUpload} />

      {lightbox && hasVideo && output && (
        <VideoLightbox src={output} title={data.title} onClose={() => setLightbox(false)} />
      )}
    </NodeShell>
  )
}

export default memo(VideoNodeInner)
