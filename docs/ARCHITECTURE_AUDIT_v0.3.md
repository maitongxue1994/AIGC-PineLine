# PineLine Studio 架构审计与改进方案（v0.3）

> 审计时间：2026-05-17
> 审计范围：`src/studio/**`、`src/components/InspectorPanel.tsx`、`src/pages/Studio.tsx`、`src/worker/**`
> 参照对象：TapNow（TapFlow Board）+ 用户提出的 5 段创作流

---

## 0. 现状速写（你已经做对的部分）

- **节点层**：7 种业务节点 — `script` / `image` / `storyboard` / `scene` / `character` / `prop` / `shot`，已抽出 `GridImageNode` 复用三视图/四宫格
- **后端**：Cloudflare Worker 4 条路由（script / image / storyboard / image-grid），跑 MiniMax-M2.7（文）+ Gemini 3.1 Flash Image（图），有超时、来源校验、鉴权、大 body 拦截、`Promise.allSettled` 容错
- **状态层**：Zustand + persist（`pineline-studio-v1`），刷新前把 base64 图清掉避免爆 5MB localStorage
- **交互层**：右键空白弹 NodePaletteMenu 新建节点 + 自动连线；Cmd/Ctrl+Enter 运行选中；Delete 删除；Shot 节点用了 4 个分色 typed handle（text / scene / character / prop）

整体水准已经是「能跑通的 MVP」，比一般 demo 高一个台阶。下面的问题不是「不能用」，而是「想做成专业向产品要补的洞」。

---

## 1. 架构层 8 大问题（按严重度倒序）

### P0-1 ❌ 没有 Project 单一事实源（SoT）

所有节点都是浮在画布上的孤岛。没有一个 `Project` 实体存放「全局风格 / 比例 / 帧率 / 时长 / 数字演员注册表 / 场景库 / 道具库 / 时间线」。这导致：

- 每个 ImageNode / ShotNode 都要单独选一次 `aspectRatio`，改一次得改 N 处
- ShotNode 想用 Character，只能靠 edge 连过来；如果同一个角色出现在 12 个分镜里就要拖 12 条线
- 时间线（`BottomTimeline`）目前是写死的演示数据，跟画布完全不通

**影响**：任何「全局设定」「资产复用」「批量导出」都做不了。这是阻塞 v1.0 的头号问题。

### P0-2 ❌ Output 类型用 `string | null` 裸表达，语义混乱

`PineNodeData.output` 既装文本，又装 base64 data URL，靠 `startsWith('data:image')` 做运行时区分（见 `store.ts:76, 105`）。`outputs?: (string | null)[]` 也是同一笔糊涂账。

**问题**：
- 不能区分「单图 / 多图 / 视频 / 音频 / 结构化数据」
- 加视频节点必须重构这一层
- 类型校验靠字符串前缀，脆弱

**应改成**判别联合（discriminated union），见第 3 节。

### P0-3 ❌ 连线没有类型校验

`onConnect` 直接 `addEdge`，不管 source 输出什么、target 接什么（`store.ts:196-202`）。`Handle` 上有 id 但 ReactFlow 默认不做强校验。理论上你可以把一个 Image 节点连到 Script 节点的 prompt 输入，运行时才报错。

**专业向画布的底线**：连线时实时阻拦 + 给红色边框提示「类型不匹配」。这是 TapNow / ComfyUI / Unreal Blueprint 都做的基础事。

### P1-4 ⚠️ 没有 DAG 执行器（Batch Run）

每个节点要单独点 ▶。脚本改了一个字，想重跑下游 12 个分镜，只能手动一个一个点。`runNode` 是单点函数，没有 `runDownstream(id)` / `runAll()` / 并发控制 / 失败重试队列。

**用户痛点**：MVP 阶段还能忍，做长片就崩了。

### P1-5 ⚠️ 图片存储策略不可持续

base64 data URL 全塞内存 + persist 时丢弃。一旦节点 > 30 个、图片 > 50 张，单次 zustand set 都会卡顿；persist 一刷新所有图就消失，用户不知道也不会重新生成。

**应改成**：图片走 IndexedDB（前端缓存）+ R2/KV（远端持久化），节点里只存 `assetId`。

### P1-6 ⚠️ 后端 4 条路由各自为政，没有 Job/Task 抽象

每次生成都是一次 fetch，前端等 25s（worker `DEFAULT_TIMEOUT_MS`）。视频生成 30~120s 起步，CF Worker free plan 单请求 30s 强限，根本撑不住。

**应改成**：`POST /api/jobs` 异步入队 → `GET /api/jobs/:id` 轮询/SSE → 完成后回写。视频生成、长批次都依赖这一层。

### P2-7 🟡 没有 Template / Group 概念

TapNow 把「Node-Wire-Group-Canvas」当核心心智模型，Group 是「可复用的子工作流」。PineLine 现在没有 group，也没有真正的 template — `/templates` 路由的页面里数据全是静态展示，点了不会变成画布。

**影响**：用户做完一个「电商短片」工作流，没法存成模板下次复用，更别说分享/fork。这是 TapNow 社区生态（TapTV）的根基。

### P2-8 🟡 Inspector 与 Node 内嵌编辑双轨重复

绝大多数节点（Storyboard / Shot / GridImage）已经在节点内联编辑参数；右侧 InspectorPanel 又重新实现了一遍，且交互比节点内的更弱（没有上传图、没有运行进度）。两套表单同步靠同一个 store 没出问题，但维护成本翻倍 + 用户认知撕裂（"我该在哪儿改？"）。

**应统一**为「节点内简版 + Inspector 高级版」分层，Inspector 只放节点容不下的高级参数（seed / cfg / negative prompt / 模型切换 / 历史版本）。

---

## 2. 功能层缺口（按模块）

### 节点系统

| 缺什么 | 现状 | 应该 |
|---|---|---|
| **VideoNode（Seedance 2.0）** | 完全没有，README 列了一堆模型但只有 Gemini 接通 | 新增 `video` 类型，支持文生视频 / 图生视频，参数含 `durationSec / motion / model`；后端走异步 job |
| **AudioNode** | 没有，但底部时间线已经画了 A1 轨 | 新增 `audio` 类型：AI 配乐 / TTS 旁白 / 音效，输出 dataUrl + waveform |
| **GlobalSettings 节点（或顶部全局栏）** | 没有；aspect / style 散落各处 | 单独一个 ProjectSettings 节点 or Studio 顶部全局栏，所有节点默认继承 |
| **ModelSelector 嵌入式** | 模型写死（Script→MiniMax / Image→Gemini） | Inspector 加模型下拉，每节点可选模型 + 调用参数 |
| **GroupNode（子图）** | 没有 | 选中多个节点 → 右键「合并为 Group」→ 暴露输入/输出端口，存为模板 |
| **CommentNode / FrameNode** | 没有 | 画布留白注释 + 区域框（FigJam 那种），方便长片整理 |

### 连线与数据流

| 缺什么 | 现状 | 应该 |
|---|---|---|
| **类型校验** | 不校验 | Handle 加 `accept: OutputType[]`，连线时实时拦截 |
| **typed edge 颜色** | 全是橙色 | 按数据类型分色（text=橙 / image=紫 / video=粉 / audio=青），用户一眼看懂 |
| **环检测** | 不检测 | DAG 添加 cycle detection，连成环直接拒绝 |
| **多 handle 自动路由** | ShotNode 已有 4 个 handle，但用户得手动拖到对应端口 | 拖到节点空白处时按上游类型自动定位到对应 handle |
| **断线提示** | 删节点时 edge 自动清，但没有「断线警告」 | 下游节点变 stale 状态，提示重跑 |

### Inspector 参数面板

| 缺什么 | 现状 | 应该 |
|---|---|---|
| **Seed / 随机性控制** | 没有 | 加 seed 输入框 + 🎲 随机按钮，方便锁定结果 |
| **Negative Prompt** | 没有 | 图像 / 视频节点必备 |
| **历史版本（version）** | 没有 | 每次运行保存到 history，可切换回看 |
| **批量参数** | 没有 | 同一个 prompt 跑 4 张备选（n=4） |
| **上传参考图** | 节点和 Inspector 都没做 UI | 拖拽上传 → 转 base64 → 存 referenceImage |
| **Prompt 库** | 没有 | 风格 preset、镜头语汇（远 / 中 / 近 / 特写）一键插入 |

### 画布交互

| 缺什么 | 现状 | 应该 |
|---|---|---|
| **Undo / Redo** | 没有 | `zundo` 中间件 或者自实现 history stack，Cmd+Z 必备 |
| **Copy / Paste** | 没有 | Cmd+C/V 复制节点及其参数（不复制 output） |
| **Cmd+K 命令面板** | 没有 | 节点搜索 / 全局动作 / 跳转 |
| **左侧工具栏点击行为** | 直接在随机位置新建节点（`Studio.tsx:51`） | 应改成：点击进入「待放置」态，光标变十字，下一次画布点击落点；或打开二级面板 |
| **多选 + 框选 + 对齐** | ReactFlow 默认有，但没有对齐线 / 自动布局 | 加 `auto-layout`（dagre / elkjs） |
| **Group 颜色框 / 注释框** | 没有 | 选中多节点 → G 键打组 + 配色 |
| **画布缩略图导航** | MiniMap 有，但没法点击跳转聚焦节点 | MiniMap 双击聚焦；Cmd+1~9 跳到关键节点 |

### 时间线（最大缺口）

`BottomTimeline` 现在 100% 是静态演示，跟画布完全不联动。

| 缺什么 | 应该 |
|---|---|
| **数据源** | 时间线轨道应该订阅 `project.cuts[]`，每个 cut 引用一个 ShotNode / VideoNode 的 output |
| **拖拽编辑** | 鼠标拖动 clip 改长度 / 顺序，类似剪映 |
| **转场 / 关键帧** | clip 之间的过渡 / 节点参数随时间变化 |
| **音频 waveform** | A 轨显示真实波形 |
| **播放头 ↔ 画布** | 播放头移到某 cut，画布高亮对应 ShotNode |
| **导出** | "预览成片" 按钮目前没接：应该把所有 cut 渲染成最终 MP4 / 时间线 XML（FCP/PR/DaVinci） |

---

## 3. 新架构提案

### 3.1 数据层 — 三层结构

```
┌─────────────────────────────────────────────────────────────────┐
│                   Project (Zustand store, persisted)             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ settings: { aspectRatio, fps, duration, style, palette,  │   │
│  │             defaultModels: {script, image, video, audio} }│   │
│  │ assets: {                                                │   │
│  │   characters: Character[]  // 可复用                     │   │
│  │   scenes: Scene[]          // 可复用                     │   │
│  │   props: Prop[]            // 可复用                     │   │
│  │   audio: AudioAsset[]                                    │   │
│  │   images: ImageAsset[]     // 用 IndexedDB blob 存       │   │
│  │ }                                                        │   │
│  │ graph: { nodes: PineNode[], edges: PineEdge[] }          │   │
│  │ timeline: { tracks: Track[], cuts: Cut[] }               │   │
│  │ history: ProjectSnapshot[]    // undo/redo               │   │
│  │ jobs: Job[]                   // 异步任务队列            │   │
│  │ groups: Group[]               // 子工作流模板            │   │
│  │ versions: Map<nodeId, NodeRun[]>  // 节点级历史         │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────┬───────────────────┬──────────────────┬──────────────┘
            │                   │                  │
     ┌──────▼─────┐      ┌──────▼──────┐    ┌──────▼──────┐
     │ Canvas DAG │      │ Asset Panel │    │  Timeline   │
     │ (创意层)   │      │ (注册表)    │    │  (剪辑层)   │
     └────────────┘      └─────────────┘    └─────────────┘
```

三个视图共用一个 Project — Canvas 是创意发散，Asset 是结构化资产清单，Timeline 是出片。

### 3.2 节点输出类型（discriminated union）

```ts
type NodeOutput =
  | { type: 'text'; text: string; tokens?: number }
  | { type: 'image'; assetId: string; width: number; height: number }
  | { type: 'images'; assetIds: string[] }   // 三视图 / 四宫格
  | { type: 'video'; assetId: string; durationSec: number; fps: number }
  | { type: 'audio'; assetId: string; durationSec: number; kind: 'music' | 'voice' | 'sfx' }
  | { type: 'storyboard'; shots: ShotItem[] }
  | { type: 'structured'; schema: string; data: unknown }  // 留给未来
  | null

type NodeRun = {
  id: string
  startedAt: number
  finishedAt: number | null
  output: NodeOutput
  paramsSnapshot: PineNodeData['params']
  modelId: string
  cost?: { credits: number; model: string }
}
```

每个节点保留最近 N 次 run（默认 5），用户可切换、对比、回滚。

### 3.3 节点目录（v1.0 完整清单）

| 分类 | 节点 | 输出类型 | 用什么模型 |
|---|---|---|---|
| **设定** | `project-settings`（单例） | — | — |
| **文本** | `script` | text | MiniMax-M2.7 / Claude / GPT-5 |
| **文本** | `storyboard` | storyboard | MiniMax + 解析器 |
| **资产** | `character` | images（多视图） | Gemini Nano Banana / Flux |
| **资产** | `scene` | images | Gemini |
| **资产** | `prop` | images | Gemini |
| **静帧** | `image` | image | Gemini / Flux / Imagen |
| **静帧** | `shot` | image | Gemini（多参考合成） |
| **动态** | `video` ★新 | video | **Seedance 2.0** / Kling / Sora / Veo |
| **动态** | `motion-frame` ★新 | video | 首尾帧插值（Kling / Runway） |
| **声音** | `tts` ★新 | audio | ElevenLabs / MiniMax T2A |
| **声音** | `music` ★新 | audio | Suno / Udio |
| **声音** | `sfx` ★新 | audio | ElevenLabs SFX |
| **后期** | `upscale` ★新 | image/video | Topaz / Magnific |
| **后期** | `color-grade` ★新 | image/video | LUT preset / AI 调色 |
| **组织** | `group` ★新 | passthrough | 子图封装 |
| **组织** | `comment` / `frame` ★新 | — | 纯视觉注释 |

### 3.4 创作流（基于你提的 5 段，做了细化）

```
 Stage 0           Stage 1          Stage 2           Stage 3          Stage 4         Stage 5
 全局设定   ──→    剧本       ──→   资产铸造   ──→    分镜 + 视频  ──→  时间线  ──→   导出
 ProjectSettings   ScriptNode       Char/Scene/Prop   Storyboard       Timeline       MP4/XML/EDL
 · 风格            · MiniMax        · 自动从剧本      · 拆分           · 自动           · 1080P
 · 比例            · 编辑           　抽取实体        · ShotNode       　 populate     · 4K
 · 帧率            · 多版本         · 三视图 / 四宫格 · VideoNode      · 拖拽剪辑     · PR XML
 · 调色板                          · 注册到资产库    　(Seedance)    · 转场/字幕    · DaVinci EDL
 · 默认模型                                                            · 音轨
```

**关键点**：
1. Stage 0 一次性设定，后面所有节点继承。
2. Stage 2 改成**自动从剧本抽实体**（用 LLM 解析人物 / 地点 / 道具列表），用户只需 review + 微调描述，每个实体自动建一个 Character/Scene/Prop 节点。
3. Stage 3 每个 ShotNode 默认通过**资产 ID 引用**人物/场景/道具，而不是靠 edge 拖（edge 仍可用作 override）。
4. Stage 4 VideoNode 接 Seedance 2.0 异步 job，跑完自动入 Timeline。
5. Stage 5 Timeline 是一等公民，不是装饰。

**两种模式开关**（顶部一个 Toggle）：
- **Guided（向导）**：按 5 段一步步走，每段完成解锁下一段，适合新手
- **Free（自由）**：直接在画布拖节点，适合专业用户

---

## 4. 改进清单（优先级排序）

> 估时按 1 人全职计；P0 + P1 大约 4–6 周可以做完。

### 🔥 P0（阻塞 v1.0，必须先做）

| # | 项 | 模块 | 工作量 | 收益 |
|---|---|---|---|---|
| P0-1 | 引入 `Project` 全局 store（settings + assets + graph + timeline 分离） | 状态层 | 3d | 解锁所有后续 |
| P0-2 | `NodeOutput` 重构为判别联合 | 类型层 | 2d | 解锁视频/音频节点 |
| P0-3 | 连线类型校验 + typed edge 颜色 | 画布 | 2d | 用户体验立刻专业 |
| P0-4 | 图片走 IndexedDB（idb-keyval），节点存 assetId | 性能 | 2d | 解决 5MB localStorage 红线 |
| P0-5 | 后端 `POST /api/jobs` + `GET /api/jobs/:id` 异步任务 | 后端 | 4d | 视频生成的前置条件 |
| P0-6 | VideoNode + Seedance 2.0 接入 | 节点 + 后端 | 3d | 用户最想要的事 |

### ⚡ P1（v1.0 内必做）

| # | 项 | 模块 | 工作量 | 收益 |
|---|---|---|---|---|
| P1-1 | DAG 执行器：`runDownstream` / `runAll` / 并发控制 | 状态层 | 3d | 长片必备 |
| P1-2 | Undo/Redo（zundo 中间件） | 画布 | 1d | 用户必备 |
| P1-3 | Cmd+K 命令面板 + Copy/Paste 节点 | 画布 | 2d | 提速 |
| P1-4 | Timeline 与 Canvas 双向联动：cut 引用 ShotNode | 时间线 | 5d | 这块从 0 到 1 |
| P1-5 | ProjectSettings 顶栏 + 节点继承机制 | 全局 | 2d | 改一处全局生效 |
| P1-6 | 自动从剧本抽实体（人物/场景/道具） | 后端 + UI | 3d | 体验跃迁 |
| P1-7 | ModelSelector 嵌入式 + 节点级模型切换 | Inspector | 2d | 多模型卖点落地 |
| P1-8 | Inspector 与节点内编辑职责拆分 | UI | 2d | 减负 |

### 🟡 P2（v1.1）

| # | 项 |
|---|---|
| P2-1 | GroupNode + 模板保存 / 加载 / 分享 |
| P2-2 | Templates 页面真接 JSON 模板，"Use as new project" |
| P2-3 | Showcase 页面真接公开 canvas，支持 fork |
| P2-4 | Seed / Negative Prompt / 历史版本（每节点） |
| P2-5 | Audio 节点（TTS / 音乐 / SFX）|
| P2-6 | 自动布局（dagre / elkjs） |
| P2-7 | 协作多人光标（Yjs / Liveblocks）|
| P2-8 | 导出 PR / DaVinci XML / EDL |
| P2-9 | 上传参考图 UI（拖拽 + 摄像头）|
| P2-10 | 评论 / Frame 节点 |

---

## 5. 建议两周落地顺序（最快出效果）

**Week 1：打地基**
- D1–D2：P0-1 Project store + P0-2 NodeOutput 重构（一起做，避免一次重构两次）
- D3：P0-3 连线类型校验 + 颜色区分
- D4：P0-4 IndexedDB 图片存储
- D5：P0-5 后端 Job 抽象 + 前端轮询

**Week 2：上视频 + 时间线 + 流程闭环**
- D6–D7：P0-6 VideoNode + Seedance 2.0 接入（端到端跑通一条「文 → 图 → 视频」）
- D8：P1-1 DAG 执行器
- D9：P1-5 全局设定继承
- D10：P1-4 Timeline ↔ Canvas 联动（先做 ShotNode 出现 → 自动入 V1 轨）

跑完这两周，PineLine 就具备「设定 → 剧本 → 资产 → 分镜视频 → 时间线导出」的完整链路，可以做第一版商业 demo。

---

## 6. 风险与权衡

- **Seedance 2.0 接入**：火山引擎/字节侧目前是按 token 计费的异步接口，单条视频 30–120s，必须走 P0-5 Job 异步层，否则前端假死。
- **IndexedDB 兼容**：Safari 隐身模式 IDB 容量很小（约 1MB），需要降级到 R2 远端。建议直接 R2 + IDB 仅做热缓存。
- **重构 NodeOutput 类型**会触动每一个节点文件，建议安排一次集中重构 PR，不要慢慢改半年。
- **Group / 子图**真做的话工作量比看着大（端口暴露 / 内外坐标 / 复用引用），所以放 P2。
- **Undo/Redo**：zundo 对 zustand 很友好，但要注意 ReactFlow 的 nodeChange 是 batched 的，需要 throttle。

---

## 7. 一句话总结

**当前 PineLine = 能跑的画布 MVP；要变成专业向产品，先补「Project 单一事实源 + 异步 Job 层 + Video 节点 + Timeline 联动」这四件事，其它都是锦上添花。**
