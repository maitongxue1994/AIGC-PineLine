# PineLine 画布操作（ops）全集

`apply_ops`（MCP 桥）与画布助手共用同一套服务端白名单校验：非法 op 丢弃、参数键白名单过滤、单批 ≤48 条。新建节点用 `ref`（如 `n1`）作临时引用，同批后续 op 可用 ref 或已有节点 id。

## 节点操作

```json
{"op":"add_node","ref":"n1","kind":"text","preset":"script","title":"剧本","prompt":"…","params":{},"position":{"x":80,"y":80}}
{"op":"set_prompt","id":"<节点id或ref>","prompt":"…"}
{"op":"set_params","id":"…","params":{"videoDuration":8}}
{"op":"rename","id":"…","title":"…"}
{"op":"connect","source":"…","target":"…"}
{"op":"delete_node","id":"…"}
```

- `kind`：`text | image | video`（video 无 preset）
- text preset：`script | storyboard | ad-copy | free`；image preset：`single | shot | scene-grid | char-triview | prop-triview`

## 运行与派生自动化

```json
{"op":"run","ids":["n1"]}
{"op":"clear_canvas"}
{"op":"derive_shot_images","id":"<分镜节点id>","indices":[0,1]}
{"op":"derive_shot_videos","id":"<分镜节点id>","run":false}
```

- `run`：按依赖拓扑顺序运行（上游 error/无产出则下游级联跳过）。
- `clear_canvas`：前端会向用户二次确认。
- `derive_shot_images`：为分镜的镜头批量建分镜图节点并自动生成生图提示词（`indices` 省略 = 全部未派生镜头）。**优先用它替代手工 N×(add_node+connect)**。
- `derive_shot_videos`：为每个已出图的分镜图挂镜头视频节点并按 Seedance 官方公式预填提示词；`run:true` 立即整批生成（消耗积分，先确认用户意图）。

## params 白名单键

| 适用 | 键 | 说明 |
|---|---|---|
| 文本 | `tone` | cinematic / commercial / drama / documentary |
| 文本 | `length` | short / medium / long |
| 分镜 | `voiceNarration` | 旁白音色串：性别+年龄+声音属性+语速+情绪基线 |
| 分镜 | `voiceCast` | 角色音色表（每行「角色名：音色描述」） |
| 图片 | `shotIndex` | 分镜图绑定镜头下标（0 起） |
| 图片 | `aspectRatio` / `quality` / `batch` | "16:9" 等 / 1K/2K/4K / 1/2/4 |
| 视频 | `videoDuration` / `videoResolution` / `videoRatio` | 4-15 秒 / 480p~4k / 16:9 等 |
| 视频 | `videoAudio` | 是否生成音频（默认 true） |
| 视频 | `videoNoSubtitles` / `videoNoBgm` / `videoNoSfx` | 纯净模式：去字幕/去 BGM/去音效 |
| 通用 | `textModel` / `imageModel` / `videoModel` | 模型枚举见下 |

模型枚举（值必须原样使用）：

- textModel：`minimax-m2.7`（默认）/ `minimax-m3` / `doubao-seed-2.0-pro` / `doubao-seed-2.0-lite` / `doubao-seed-evolving`
- imageModel：`gemini-3.1-flash`（默认）/ `seedream-5.0`（含人物且后续生视频时用它——Seedance 2.0 拒绝疑似真人人脸参考图）
- videoModel：`seedance-2.0`（默认）/ `seedance-2.0-fast` / `seedance-2.0-mini` / `hailuo-2.3` / `hailuo-02` / `wan-2.7` / `kling-v2-6` / `veo-3.1-fast`
