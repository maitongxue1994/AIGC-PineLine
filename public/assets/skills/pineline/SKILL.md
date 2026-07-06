---
name: pineline
description: 操控 PineLine——节点画布式 AIGC 影视创作管线（剧本→分镜→分镜图→镜头视频）。当用户想搭建/修改 PineLine 画布管线、生成可导入的 PineLine 工程文件、或通过 MCP 桥实时控制正在运行的 PineLine Studio 时使用。
compatibility: 需要网络访问 PineLine 部署（默认 https://aigcpineline0419.mys2388212.workers.dev）；MCP 桥需用户在浏览器中打开 Studio 并开启「外部 Agent」会话。
metadata:
  homepage: https://aigcpineline0419.mys2388212.workers.dev
---

# PineLine 画布操控

PineLine 是节点画布式 AIGC 影视创作工作台：画布上的节点（text/image/video/asset）通过连线组成生成管线，上游产出自动喂给下游。核心链路：**剧本(script) → 分镜(storyboard，结构化 shots) → N×分镜图(image/shot) → N×镜头视频(video)**。

有三种方式与 PineLine 协作，按场景选择：

## 方式一：MCP 桥实时操控（推荐，需用户配合开启）

用户在 PineLine Studio 顶栏打开「外部 Agent」对话框后，会得到一个**会话码**与 MCP 端点 URL。接入：

```bash
claude mcp add --transport http pineline https://<PineLine 域名>/mcp/<会话码>
```

可用工具（详见 [references/mcp.md](references/mcp.md)）：

- `get_canvas` — 读取当前画布快照（节点/连线/参数，不含图片数据）
- `apply_ops` — 批量执行画布操作（建节点/连线/改提示词/派生分镜图/一键成片等，见 ops 全集）
- `run_pipeline` — 按依赖顺序运行指定节点（异步启动，结果用 get_canvas 轮询）
- `read_node_text` — 读取某个文本节点的完整产出
- `remember` — 向 PineLine 本地记忆写入一条用户偏好/项目设定

约束：浏览器端 Studio 必须保持打开（画布状态在浏览器本地，桥只做转发）；会话码随对话框关闭失效。

## 方式二：生成工程 JSON，让用户导入

不需要任何连接。按 [references/project-json.md](references/project-json.md) 的 schema 生成一个完整工程文件，用户在 Studio 顶栏「导入工程」选择该 JSON 即可整图落画布。适合：离线策划一条完整管线（含提示词）交给用户执行。

## 方式三：记忆互通

PineLine 的画布助手有本地用户记忆。把你所知的用户长期偏好（如品牌调性、常用比例、旁白音色）整理成条目，通过 MCP 的 `remember` 工具写入；或生成一段 Markdown 让用户拖进 PineLine 的「记忆管理」对话框导入（每行一条）。

## 领域知识速查

- 分镜图节点必须用 `params.shotIndex`（0 起）绑定上游分镜的镜头。
- 视频提示词遵循 Seedance 2.0 官方公式：主体+动作 → 运镜 → 音频信息 → 约束条件；台词用 `{}`、音乐用 `（）`、音效用 `<>`；中文 ≤500 字。
- 音色一致性：在 storyboard 节点 `params.voiceNarration`（性别+年龄+声音属性+语速+情绪基线）与 `params.voiceCast`（每行「角色名：音色描述」）设置，派生视频时自动注入。
- 去字幕/BGM：视频节点 `params.videoNoSubtitles / videoNoBgm / videoNoSfx`。
- Seedance 2.0 不接受疑似真人人脸参考图：含人物的分镜图用 `imageModel: "seedream-5.0"` 生成。

ops 全集与参数枚举见 [references/ops.md](references/ops.md)。
