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
- 文本：`minimax.ts`（MiniMax-M2.7，推理模型，长文超时 150s / max_tokens 4096-8192 防截断）+ `ark.ts`（豆包 Seed 2.0，OpenAI 兼容 chat completions）。路由按 `doubao-` 前缀分派。
- 图像：`gemini.ts`（**`gemini-3.1-flash-image` 稳定版**，preview 版已弃用勿用）+ `ark.ts` 的 Seedream（同步 images/generations，比例→显式宽高映射）。
- 视频（异步任务：创建→轮询→取件代理）：`video/` 目录 Provider 抽象。`seedance.ts`(方舟，主模型) + `minimax.ts`(海螺，与文本同 key) 完整实现；Wan/Kling/Veo 桩。路由 `/api/generate/video`、`video-status`、`video-file`(取件代理，各家临时 URL 有时效需现查现取)。
- Agent：`routes/agentChat.ts`（MiniMax 编排 → `{reply, ops[]}`，容错解析链 + 白名单）；`ops` 含 add_node/set_prompt/connect/run/`clear_canvas`(新建管线前清空，前端强制确认)。

### 密钥与多模型
- `MINIMAX_API_KEY`（文本，已配）、`GEMINI_API_KEY`（图像，已配）、`ARK_API_KEY`（方舟，**已配**——同一把钥匙覆盖 Seedance 视频 / Seedream 图片 / 豆包 Seed 文本）。
- `TEXT_MODELS`/`IMAGE_MODELS`/`VIDEO_MODELS`（`nodeCatalog.ts`）驱动模型选择器；`resolveApiModel` 把选择解析为 Worker 的 `model` 字段（默认通道返回 undefined）。模型就绪态复用 `readiness.seedance`（ark 系同一 key）。

## 文档

- `docs/Studio-画布-v4.md`：架构文档（含 v4.2 增量）
- `docs/模型API调研-2026-07.md`：视频 7 家 + 图片 6 家官方 API 调研（端点/鉴权/异步流/参数/价格/接入门槛，官方文档核实）
- `docs/视频生成接入指南.md`：各家 key 申请与配置步骤

## CI 门禁

`npm run lint`（`--max-warnings 0`）+ `npm run test:tapnow`（只测首页，勿破坏）+ `tsc -b`。React 19 lint 规则严：禁止 effect 内 setState（用 key 重挂载替代）、禁止 render 期非纯调用（Date.now 提到组件外）。

## 用户协作偏好

- 视觉唯一依据 = 用户的 Claude Design 设计稿；偏好**设计稿先行**再写 UI。
- 参照 TapNow 画布（app.tapnow.ai）的交互规范。
- 授权：调研/计划后可直接实施并推 main，测试通过即可；改动尽量分批 commit（一个语义一个提交）。
- 假积分为**本地模拟**（`INITIAL_CREDITS=1000`），非真实计费。
