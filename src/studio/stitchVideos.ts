/**
 * 视频片段拼接（第一期，纯浏览器零依赖）：canvas 逐帧绘制 + Web Audio 混音，
 * 用 MediaRecorder 实时录制成一整段视频。保留画面与音频，输出 webm/mp4（看浏览器）。
 * 实时录制 = 耗时约等于总时长；大批量拼接较慢但一次成片，交付前的粗剪足够。
 * 精剪仍建议用剪辑软件（导出交付包已含各片段原文件）。
 */

function pickMime(): string {
  const candidates = [
    'video/mp4;codecs=avc1,mp4a',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ]
  for (const m of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) return m
  }
  return ''
}

function loadVideo(url: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const v = document.createElement('video')
    v.src = url
    v.crossOrigin = 'anonymous'
    v.preload = 'auto'
    v.muted = false
    v.onloadedmetadata = () => resolve(v)
    v.onerror = () => reject(new Error('视频解码失败'))
  })
}

/** 把一段视频画进 canvas（等比 letterbox）并把音频接进混音总线，播放到结束 */
function playSegment(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  audioCtx: AudioContext,
  audioDest: MediaStreamAudioDestinationNode,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let src: MediaElementAudioSourceNode | null = null
    try {
      src = audioCtx.createMediaElementSource(video)
      src.connect(audioDest)
    } catch {
      /* 无音轨或已接管：忽略，纯画面拼接 */
    }
    const cw = canvas.width
    const ch = canvas.height
    const scale = Math.min(cw / video.videoWidth, ch / video.videoHeight)
    const dw = video.videoWidth * scale
    const dh = video.videoHeight * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2
    let raf = 0
    const draw = () => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, cw, ch)
      ctx.drawImage(video, dx, dy, dw, dh)
      raf = requestAnimationFrame(draw)
    }
    const finish = () => {
      cancelAnimationFrame(raf)
      src?.disconnect()
      resolve()
    }
    video.onended = finish
    video.onerror = () => {
      cancelAnimationFrame(raf)
      src?.disconnect()
      reject(new Error('视频播放失败'))
    }
    draw()
    void video.play().catch(reject)
  })
}

export async function stitchVideos(
  urls: string[],
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  if (!urls.length) throw new Error('没有可拼接的视频')
  const first = await loadVideo(urls[0])
  const canvas = document.createElement('canvas')
  canvas.width = first.videoWidth || 1280
  canvas.height = first.videoHeight || 720
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法创建画布上下文')

  const canvasStream = canvas.captureStream(30)
  const AudioCtx: typeof AudioContext =
    window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const audioCtx = new AudioCtx()
  const audioDest = audioCtx.createMediaStreamDestination()
  const mixed = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...audioDest.stream.getAudioTracks(),
  ])

  const mime = pickMime()
  const recorder = new MediaRecorder(mixed, mime ? { mimeType: mime } : undefined)
  const chunks: BlobPart[] = []
  recorder.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data)
  }
  const stopped = new Promise<void>((res) => {
    recorder.onstop = () => res()
  })
  recorder.start()

  try {
    for (let i = 0; i < urls.length; i++) {
      onProgress?.(i, urls.length)
      const video = i === 0 ? first : await loadVideo(urls[i])
      await playSegment(video, canvas, ctx, audioCtx, audioDest)
      video.remove()
    }
  } finally {
    recorder.stop()
    await stopped
    await audioCtx.close().catch(() => {})
  }
  onProgress?.(urls.length, urls.length)
  return new Blob(chunks, { type: mime || 'video/webm' })
}
