# PineLine 工程 JSON 格式（version 2）

用户可在 Studio 顶栏「导入工程」载入此格式文件，整图替换当前画布。

## 顶层结构

```json
{
  "app": "pineline",
  "version": 2,
  "projectName": "工程名",
  "exportedAt": "2026-07-06T00:00:00.000Z",
  "nodes": [],
  "edges": []
}
```

导入校验只要求 `nodes` / `edges` 为数组；每个节点必须有 `id`（字符串）、`position.x/y`（有限数）、`data.kind`。

## 节点（React Flow 节点形制）

```json
{
  "id": "text-任意唯一串",
  "type": "text",
  "position": { "x": 80, "y": 80 },
  "data": {
    "kind": "text",
    "preset": "script",
    "title": "剧本",
    "prompt": "一支关于……的短片",
    "params": {},
    "versions": [],
    "activeVersion": 0,
    "status": "idle"
  }
}
```

- `type` 与 `data.kind` 相同：`text` / `image` / `video` / `asset`。
- `data.preset`：text 为 `script | storyboard | ad-copy | free`；image 为 `single | shot | scene-grid | char-triview | prop-triview`；video/asset 为 `null`。
- `data.versions`：产出版本数组（新建管线给 `[]`）；`data.status` 给 `"idle"`。
- 建议布局：链式从左到右 x 依次 +480；并行分支 y 依次 +560。

## 常用 params

- 文本：`tone`（cinematic/commercial/drama/documentary）、`length`（short/medium/long）、`textModel`
- 分镜额外：`voiceNarration`（旁白音色串）、`voiceCast`（角色音色表，每行「角色名：音色描述」）
- 图片：`shotIndex`（分镜图必填，0 起）、`aspectRatio`（"16:9" 等）、`quality`（1K/2K/4K）、`batch`（1/2/4）、`imageModel`（gemini-3.1-flash / seedream-5.0）
- 视频：`videoDuration`（4-15）、`videoResolution`（480p/720p/1080p/4k）、`videoRatio`、`videoModel`（seedance-2.0 等）、`videoAudio`、`videoNoSubtitles`、`videoNoBgm`、`videoNoSfx`

## 连线

```json
{ "id": "e1", "source": "<上游节点id>", "target": "<下游节点id>" }
```

语义：文本喂文本、图片作下游生图参考图、图片作视频首帧。

## 完整管线示例（1 剧本 + 1 分镜 + 2 分镜图 + 2 视频）

```json
{
  "app": "pineline",
  "version": 2,
  "projectName": "示例管线",
  "nodes": [
    { "id": "n1", "type": "text", "position": { "x": 80, "y": 80 }, "data": { "kind": "text", "preset": "script", "title": "剧本", "prompt": "……", "params": { "tone": "cinematic" }, "versions": [], "activeVersion": 0, "status": "idle" } },
    { "id": "n2", "type": "text", "position": { "x": 560, "y": 80 }, "data": { "kind": "text", "preset": "storyboard", "title": "分镜", "prompt": "", "params": { "voiceNarration": "中年男性，低沉温润，语速偏慢，情绪平静" }, "versions": [], "activeVersion": 0, "status": "idle" } },
    { "id": "n3", "type": "image", "position": { "x": 1040, "y": 80 }, "data": { "kind": "image", "preset": "shot", "title": "分镜图 1", "prompt": "", "params": { "shotIndex": 0, "imageModel": "seedream-5.0" }, "versions": [], "activeVersion": 0, "status": "idle" } },
    { "id": "n4", "type": "image", "position": { "x": 1040, "y": 640 }, "data": { "kind": "image", "preset": "shot", "title": "分镜图 2", "prompt": "", "params": { "shotIndex": 1, "imageModel": "seedream-5.0" }, "versions": [], "activeVersion": 0, "status": "idle" } },
    { "id": "n5", "type": "video", "position": { "x": 1520, "y": 80 }, "data": { "kind": "video", "preset": null, "title": "镜头视频 1", "prompt": "", "params": { "videoDuration": 5 }, "versions": [], "activeVersion": 0, "status": "idle" } },
    { "id": "n6", "type": "video", "position": { "x": 1520, "y": 640 }, "data": { "kind": "video", "preset": null, "title": "镜头视频 2", "prompt": "", "params": { "videoDuration": 5 }, "versions": [], "activeVersion": 0, "status": "idle" } }
  ],
  "edges": [
    { "id": "e1", "source": "n1", "target": "n2" },
    { "id": "e2", "source": "n2", "target": "n3" },
    { "id": "e3", "source": "n2", "target": "n4" },
    { "id": "e4", "source": "n3", "target": "n5" },
    { "id": "e5", "source": "n4", "target": "n6" }
  ]
}
```
