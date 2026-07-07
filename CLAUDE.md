# PineLine — AIGC 影视创作管线

节点画布式 AIGC 工作台：用户在画布上搭「剧本 → 分镜 → 分镜图 → 视频」的生成管线，节点连线即上游产出自动喂下游。仓库 `maitongxue1994/AIGC-PineLine`，本地 `/Users/tongxue/vibe coding/aigc pipeline`（路径含空格，命令要加引号）。

## 沟通语言

- 所有对用户的回复使用**中文**。
- 代码注释、commit message、PR 描述沿用仓库现有语言习惯（中文为主）。
- commit 尾部加 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`。

## 技术栈

Vite 5 + React 18 + TS 5 + Tailwind 3 + zustand v5(persist) + @xyflow/react v12（React Flow）；后端 Cloudflare Worker（`src/worker/`，同一 Worker 既服务静态资源又处理 `/api/*`）。

## 部署链（关键）

`push main` → GitHub Action `sync-deploy` → `deploy/cloudflare` 分支 → Cloudflare 自动构建 → https://aigcpineline0419.mys2388212.workers.dev 。**约 5 分钟生效**。**API 密钥只在线上 Worker（本地无 .dev.vars）**，本地 dev 调 `/api/*` 会走线上或失败——真实生成验证要在线上做。验证部署完成：探测新 bundle hash 变化或 `/api/generate/video-status {readiness:true}` 端点行为，不要靠本地 build hash 对比（CI 注入环境变量导致 hash 不同）。

- **Worker 零 npm 依赖（硬约束）**：deploy 分支**没有 package.json**，Cloudflare 直接 bundle `src/worker/` 的 TS——任何 npm 包都进不了 Worker（MCP 处理器因此是手写 JSON-RPC）。
- **wrangler.jsonc 双分支独立**：sync-deploy 不同步 wrangler.jsonc（两分支 assets.directory 不同）；改 DO binding / run_worker_first 等配置需**分别提交 main 与 deploy/cloudflare**。改 deploy 分支配置前确认 worker 代码已同步过去（否则 DO class 不存在会构建失败）。
- sync-deploy 同步范围：`dist/assets/*` + `index.html` + `favicon.svg` + `src/worker/`。

## 架构要点

### 节点体系 v4（`src/studio/`）
- `NodeKind` = text / image / asset / video；业务语义下沉为 `preset`：
  - text: script(剧本) / storyboard(分镜，产出结构化 `shots[]`) / ad-copy / free
  - image: single / shot(分镜图，绑定 `params.shotIndex` 读上游 shots) / scene-grid / char-triview / prop-triview
- 多产出统一为 `versions: NodeVersion[]` + `activeVersion`（承载三视图/四宫格/批量/版本层叠）。
- `store.ts` 是中枢：`runNode`（按 kind×preset 分派）、`runPipeline`（Kahn 拓扑分层 + **级联跳过**：上游 error/无产出则下游不跑）、`runImageEdit`（高级面板再生成通道）、`deriveShotImageNodes`/`generateAllShotImages`（分镜两段式）、撤销 150ms 合并窗、`generation` 代际守卫（导入/重置后丢弃在飞的旧结果）。

### 持久化（双层）
- **localStorage** `pineline-studio-v1` v4：画布结构，`partialize` 用 `stripHeavyOutputs` **剥离所有 `data:` 媒体**（5MB 限制）。
- **IndexedDB** `pineline-studio`：`assets`(素材库) / `history`(生成历史 LRU 200) / `projects`(项目档案，**媒体完整保留**，配额 GB 级)。
- **关键**：项目档案存完整媒体（`sanitizeForArchive`，非 stripHeavyOutputs）；Studio 挂载时 `restoreCurrentProject` 从档案恢复完整画布——刷新/重开项目后图片由此找回。画布变更 2s 防抖自动落档。
- 其他：`pineline-agent-v1`(Agent 会话)、`pineline-ui-v1`(小地图/网格吸附偏好)。

### 生成后端（`src/worker/`）
- 文本：`minimax.ts`（MiniMax-M2.7，推理模型，长文超时 150s / max_tokens 4096-8192 防截断；`callMinimaxVisionChat` 走 OpenAI 兼容端点供 M3 多模态）+ `ark.ts`（豆包 Seed 2.0，OpenAI 兼容 chat completions，content 支持 image_url parts）。路由按 `doubao-` 前缀分派。
- 图像：`gemini.ts`（**`gemini-3.1-flash-image` 稳定版**，preview 版已弃用勿用）+ `ark.ts` 的 Seedream（同步 images/generations，比例→显式宽高映射）。**Seedance 2.0 拒绝疑似真人人脸参考图**（仅信任 Seedream 产物等），含人物分镜图建议走 Seedream。
- 视频（异步任务：创建→轮询→取件代理）：`video/` 目录 Provider 抽象。`seedance.ts`(方舟，主模型) + `minimax.ts`(海螺，与文本同 key) 完整实现；Wan/Kling/Veo 桩。路由 `/api/generate/video`、`video-status`、`video-file`(取件代理，各家临时 URL 有时效需现查现取)。
- Agent：`routes/agentChat.ts`（编排 → `{reply, ops[]}`，容错解析链 + `agentOps.ts` 白名单）；ops 含 add_node/set_prompt/connect/run/clear_canvas(前端强制确认)/`derive_shot_images`/`derive_shot_videos`(派生自动化)/`remember`(写用户记忆)。系统提示词含 `PRODUCT_PROFILE` 产品档案（prompts.ts）。联网双路：豆包→`arkResponses.ts`(Responses API web_search，失败自动降级)；MiniMax→`tavily.ts` function calling 循环。
- 提示词体系：Worker 侧集中在 `prompts.ts`（script/ad-copy/free/image-prompt/extract-entities + 分镜 + 产品档案）；视频提示词组装在前端 `src/studio/videoPrompt.ts`（Seedance 官方公式：画面→音色→纯净约束，幂等标记防回填翻倍，音色串挂分镜节点 params）。
- MCP 桥：`bridge/CanvasBridgeDO.ts`（DO，WebSocket 中继）+ `routes/mcp.ts`（手写零依赖 JSON-RPC，`/mcp/<会话码>`）；浏览器侧 `src/studio/bridge/bridgeStore.ts` + 顶栏「外部 Agent」。画布真源在浏览器，桥只转发。

### 密钥与多模型
- `MINIMAX_API_KEY`（文本，已配）、`GEMINI_API_KEY`（图像，已配）、`ARK_API_KEY`（方舟，**已配**——同一把钥匙覆盖 Seedance 视频 / Seedream 图片 / 豆包 Seed 文本）。
- `TAVILY_API_KEY`（**可选，未配**）：聊天联网 MiniMax 通道；缺失时联网开关返回 501 指引。豆包联网走方舟 Responses API 官方插件，需在方舟控制台开通「联网内容插件」（月免 2 万次）。
- `TEXT_MODELS`/`IMAGE_MODELS`/`VIDEO_MODELS`（`nodeCatalog.ts`）驱动模型选择器；`resolveApiModel` 把选择解析为 Worker 的 `model` 字段（默认通道返回 undefined）。模型就绪态复用 `readiness.seedance`（ark 系同一 key）。

### 隐藏开关与开放生态
- 管理员模式：`?admin=1` 开 / `?admin=0` 关（localStorage 持久，dev 恒开）——历史面板「日志」tab 只对管理员显示（`src/studio/adminMode.ts`）。
- Agent Skill 文档包：`public/assets/skills/pineline/`（SKILL.md + 工程 JSON schema / ops / MCP 文档），线上 `/assets/skills/pineline/SKILL.md` 可被外部 agent fetch。
- 用户记忆：IndexedDB `memory` 库（DB v4，LRU 100），助手 remember op 沉淀 + 记忆管理对话框（可导入 MEMORY.md）；每轮注入「用户长期记忆」。

## 文档

- `docs/Studio-画布-v4.md`：架构文档（含 v4.2 增量）
- `docs/模型API调研-2026-07.md`：视频 7 家 + 图片 6 家官方 API 调研（端点/鉴权/异步流/参数/价格/接入门槛，官方文档核实）
- `docs/视频生成接入指南.md`：各家 key 申请与配置步骤

## CI 门禁

`npm run lint`（`--max-warnings 0`）+ `npm run test:tapnow`（只测首页，勿破坏）+ `tsc -b`。React 19 lint 规则严：禁止 effect 内 setState（用 key 重挂载替代）、禁止 render 期非纯调用（Date.now 提到组件外）。

## 用户协作偏好

- 视觉唯一依据 = 用户的 Claude Design 设计稿；偏好**设计稿先行**再写 UI。
- 参照 TapNow 画布（app.tapnow.ai）的交互规范。
- 授权：调研/计划后可直接实施并推 main，测试通过即可。
- **自动提交（硬性要求，务必执行）**：每完成一处修改就**立即**自动 `git commit` 到**本地**，无需逐次询问、也不要攒多个改动一起提交——**一个语义一个提交**（一个 bug 修复 / 一个功能点 = 一次 commit）。message 用中文、尾部加 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`。提交前必须先过门禁：`tsc -b` + `npm run lint`（`--max-warnings 0`）+ 相关 verify 脚本通过再提交（用 `set -o pipefail` 防管道吞退出码）。`push` 到 main（触发部署）按需进行，本地提交与推送解耦；一批相关提交做完可一起 push。
- 假积分为**本地模拟**（`INITIAL_CREDITS=1000`），非真实计费。
