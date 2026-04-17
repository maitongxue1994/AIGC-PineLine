# PineLine · 专业 AIGC 影视创作管线

> **从一段剧本到一条成片，只需一条管线。**
> PineLine 是为专业影视团队打造的 AIGC 创作管线（Pipeline）——
> 在无限画布上，把剧本、分镜、角色、镜头、多模型生成、剪辑与音画连成一张可视化工作流。

本仓库包含 PineLine 产品官网与 Studio 工作台的前端实现。

---

## 产品定位

参考 [TapNow](https://www.tapnow.ai/) 的 **AI-Native Creative Canvas** 理念，PineLine 重新设计了面向**专业影视**的可视化创作管线：

| | 单模型 AI 视频工具 | TapNow (TapFlow Board) | **PineLine** |
|---|---|---|---|
| 核心形态 | 单点生成 | 通用创作画布 | **影视级管线画布** |
| 目标用户 | 个人玩家 | 电商 / 品牌创意 | 广告公司、短剧厂牌、导演工作室 |
| 多模型 | 否 | 部分 | 多模型智能路由 |
| 角色一致性 | 否 | 虚拟模特 | 数字演员 LoRA |
| 专业输出 | MP4 | MP4 / PNG | 4K + PR / DaVinci 时间线 |

---

## 技术栈

- **Vite 5** + **React 18** + **TypeScript 5**
- **Tailwind CSS 3**（自定义设计令牌：颜色、字体、阴影、动画）
- **Framer Motion**（节段动画）
- **React Router v6**（多页）
- **Lucide Icons**

## 运行

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # 产出 dist/
npm run preview # 本地预览构建产物
```

## 信息架构

```
/                 首页
  · Hero + Tapflow 风画布演示
  · 模型 marquee
  · 六阶段管线 (Script → Storyboard → Shot → Generate → Edit → Sound)
  · 无限画布能力
  · 功能网格
  · 数字演员
  · 作品墙
  · 客户证言
  · 定价 & FAQ & CTA

/studio           Studio 工作台（核心创作画布）
  · 顶部项目栏（自动保存 · 协作者 · 预览 · 导出）
  · 左侧工具栏（剧本 / 分镜 / 镜头 / 素材 / 演员 / 模型 / 音画 / 资产）
  · 二级面板（当前工具的上下文列表）
  · 中间：可平移无限画布 + 节点 + 连线 + 迷你地图 + 画布工具条
  · 右侧 Inspector（Prompt · 模型 · 运镜 · 风格 · 时长 · 高级开关 · 生成）
  · 底部时间线（多轨 · 播放头）

/templates        工作流模板库（按品类筛选 + 搜索）
/showcase         精选作品墙（支持 fork 画布）
/pricing          定价（月/年切换 + 能力对比表 + FAQ）
```

## 设计系统

**关键字**：Cinematic · AI-native · Editorial · Dark Canvas

- 主色：`#FF6A3D → #FF3D7F → #7C5CFF → #22D3EE`（品牌渐变）
- 背景：`#07070B` 深空黑，叠加径向光晕 + 点阵网格 + 薄噪点
- 字体：**Space Grotesk** (display) + **Inter** (sans) + **JetBrains Mono**
- 版式：`display-xl` 可达 ~120px，字距 `-0.04em`，大量留白
- 动效：Framer Motion 进场、连线蚂蚁线、generate 扫描线、pulsing dot、cursor 漫游
- 玻璃卡片 + 描边渐变 (`.animated-border`) + 径向光 + 水印噪点

## 目录结构

```
src/
  App.tsx
  main.tsx
  styles/globals.css
  components/
    Logo.tsx
    Navbar.tsx
    Footer.tsx
    HeroCanvas.tsx              # Hero 区域画布 mockup
    StoryboardCanvas.tsx        # Studio 可拖拽节点画布
    InspectorPanel.tsx          # Studio 右侧 Inspector
  sections/                     # 首页分段
    Hero.tsx
    ModelMarquee.tsx
    Pipeline.tsx
    CanvasShowcase.tsx
    FeatureGrid.tsx
    VirtualActors.tsx
    ShowcaseWall.tsx
    Testimonials.tsx
    PricingTeaser.tsx
    FAQ.tsx
    CTA.tsx
  pages/
    Landing.tsx
    Studio.tsx
    Templates.tsx
    Showcase.tsx
    Pricing.tsx
```

## 参考

- [TapNow · AI-Native Creative Canvas](https://www.tapnow.ai/)
- [TapNow Docs · E-commerce AI Workspace](https://docs.tapnow.ai/en/docs)
- 视频模型参考（展示用途）：Sora, Kling, Runway Gen-4, Veo 3, Luma DM, MiniMax Hailuo, Pika, HunyuanVideo, Vidu, Wan, CogVideoX, LTX-Video

> PineLine 是产品设计与前端原型，不包含真实模型调用。生产环境接入时应在后端实现统一的 Generation Router + 权限、配额、水印与合规校验。
