# Studio 节点使用说明（v0.2）

## 节点类型

### Script 节点（橙色端口）
- **作用**：调用 MiniMax-M2.7 生成分镜脚本
- **输入参数**（右侧 Inspector）：
  - `Brief` — 一两句话的创意简述
  - `Tone` — 电影级 / 商业广告 / 短剧 / 纪录片
  - `Length` — 短（1 段）/ 中（3 段）/ 长（5 段）
- **输出**：脚本文本，自动写到节点预览区，可流向下游 Image 节点

### Image 节点（紫色端口）
- **作用**：调用 Gemini Nano Banana Pro（`gemini-3.1-flash-image-preview`）生成图片
- **输入参数**：
  - `Prompt` — 图像描述。**留空时自动使用上游节点的输出作为 prompt**
  - `Aspect Ratio` — 16:9 / 9:16 / 1:1 / 4:3 / 3:4
- **输出**：base64 data URL，直接显示在节点预览框内

## 操作

| 动作 | 方式 |
|---|---|
| 新增 Script 节点 | 点左侧工具栏「剧本」按钮 |
| 新增 Image 节点 | 点左侧工具栏「素材」按钮 |
| 连线 | 拖拽节点右侧端口 → 下一个节点左侧端口 |
| 删除节点 | 选中节点 → 右侧 Inspector 底部🗑 |
| 运行 | 节点底部 ▶ 按钮，或 Inspector 底部「生成」按钮 |
| 选中节点 | 单击节点；多选 / 框选见 ReactFlow 默认快捷键 |

## 数据流约定

- 一条 edge `A → B` 把 A 的 `output` 作为 B 的默认输入
- 当 B 的 `params.prompt` 留空时，运行 B 会自动取上游 A 的 `output`
- 当 B 的 `params.prompt` 有内容时，**忽略上游**，使用本节点的 prompt

## 服务端配置

API key 通过 Cloudflare Worker 的 Secret 注入：
- `MINIMAX_API_KEY` — MiniMax 官方 Coding Plan
- `GEMINI_API_KEY` — Google AI Studio key

本地调试：复制 `.dev.vars.example` 为 `.dev.vars` 填入两个 key，运行 `npx wrangler dev`，浏览器访问 `http://localhost:8787/studio`。

## 已知限制（v0.2）

- 图片以 base64 data URL 内嵌在前端 store，单张 1~2 MB，节点过多会导致画布卡顿。后续接 R2 / KV 托管
- 没有持久化，刷新即丢
- 暂不支持视频节点
