# Cloudflare Pages 接 Git 自动构建 · 详细操作手册

> 项目：PineLine（仓库 `maitongxue1994/AIGC-PineLine`）
> 目标：让 Cloudflare Pages 和 GitHub 绑定，每次 push 代码自动发布新版本，不再需要手动上传 ZIP。

---

## 第 1 步 · 登录并找到项目

1. 浏览器访问 <https://dash.cloudflare.com>
2. 用你的 Cloudflare 账号登录
3. 左侧菜单点 **Workers & Pages**（不同版本可能叫 **Compute (Workers)**）
4. 在项目列表里找到 **`aigcpineline`**，点进去

---

## 第 2 步 · 判断当前项目是不是 Direct Upload 类型

进入项目后，顶部能看到几个 Tab：**Deployments / Metrics / Custom domains / Settings**

点 **Settings** → 左侧找到 **Builds & deployments**，看 **Source** 区块：

| 看到什么 | 判断 | 下一步 |
|---------|------|-------|
| `Connected to maitongxue1994/AIGC-PineLine` | 已接 Git | 跳到**第 4 步** |
| `This project was created through direct upload` 或 `Connect to Git` 按钮 | 未接 Git | 继续**第 3 步** |

---

## 第 3 步 · Direct Upload 项目需要重建

> ⚠️ Cloudflare 限制：Direct Upload 创建的项目不能中途改成 Git 模式，必须新建一个项目。

### 3.1 新建项目（接 Git）

1. 回到 **Workers & Pages** 主页
2. 点右上角 **Create** 按钮
3. 选 **Pages** Tab
4. 点 **Connect to Git**

### 3.2 授权 GitHub

- 如果是第一次接 GitHub：
  1. 点 **Connect GitHub account**
  2. 浏览器弹窗跳到 GitHub
  3. 点 **Authorize Cloudflare Pages**
  4. GitHub 会问授权范围，选 **Only select repositories**
  5. 勾选 **`maitongxue1994/AIGC-PineLine`**
  6. 点 **Install & Authorize**

- 如果之前已经授权过：直接在下拉框里选仓库即可。

### 3.3 填写项目配置

回到 Cloudflare 页面，按下表填：

| 字段 | 填什么 |
|------|-------|
| **Select a repository** | `maitongxue1994/AIGC-PineLine` |
| **Project name** | `aigcpineline-git`（新名字，不能和旧的重名）<br>或者先去把旧项目 `aigcpineline` 删掉，再用这个名 |
| **Production branch** | `deploy/cloudflare` |
| **Framework preset** | `None` |
| **Build command** | 留空 |
| **Build output directory** | `/` |
| **Root directory (advanced)** | 留空 |
| **Environment variables** | 不用加 |

点 **Save and Deploy**。

### 3.4 等待部署

Cloudflare 会立刻从 `deploy/cloudflare` 分支拉代码、跳过构建、直接发布静态文件。大概 30 秒到 1 分钟。

完成后会给你一个新的域名，形如 `aigcpineline-git.pages.dev` 或 `<hash>.aigcpineline-git.pages.dev`。

### 3.5（可选）删除旧的 Direct Upload 项目

如果新项目跑通了，可以回到 Workers & Pages → 点旧的 `aigcpineline` → **Settings** → 拉到底 → **Delete project**。

---

## 第 4 步 · 已经接 Git 的话，直接改分支就行

在 **Settings → Builds & deployments** 里：

1. **Production branch** 改成 `deploy/cloudflare`
2. **Build configurations**：
   - Framework preset: `None`
   - Build command: 留空
   - Build output directory: `/`
3. 点 **Save**
4. 回到 **Deployments** Tab → 右上角 **Create deployment** 或 **Retry deployment**

---

## 第 5 步 · 验证部署结果

部署状态变 **Success** 后，点新 URL 打开：

1. **首屏大标题**："从剧本到成片，只需一条管线。"
   中文不会在"管/线"之间断字（这是之前修复的 bug）
2. **路由检查**：依次访问以下路径，都能正常渲染不 404
   - `/`
   - `/studio`
   - `/templates`
   - `/showcase`
   - `/pricing`
3. **交互检查**：右上角"开始创作"按钮点一下能跳到 `/studio`

---

## 第 6 步 · 以后怎么更新代码？

配置好之后，**你什么都不用做**。我只要 `git push` 到 `deploy/cloudflare` 分支，Cloudflare 就会自动拉新代码、自动发布。

我的标准更新流程：

```bash
# 1. 在源码分支改代码 + 构建
git checkout claude/ai-video-creation-site-S9TCQ
# ...修改源码...
npm run build

# 2. 切到部署分支，铺平新 dist 内容
git checkout deploy/cloudflare
cp -r dist/. .
rm -rf dist

# 3. 提交 + 推送，CF 自动触发部署
git add -A
git commit -m "update build"
git push
```

---

## 常见坑和解决办法

| 问题 | 解决办法 |
|------|---------|
| GitHub 授权时只勾了一部分仓库，后来加仓库搜不到 | 去 <https://github.com/settings/installations> → 找 Cloudflare Pages → **Configure** → 重新勾选仓库 |
| Production branch 下拉框里找不到 `deploy/cloudflare` | 刷新页面；或去 Cloudflare 的 Git 集成设置里点 **Sync branches** |
| 部署成功但打开是白屏 | 90% 是 Build output directory 填错了，应该是 `/`（因为 dist 内容已平铺到分支根目录） |
| 部署失败显示 `No wrangler.toml found` | 无视即可。Pages 静态项目不需要 `wrangler.toml`，这是警告不是错误 |
| 刷新子路由 `/studio` 返回 404 | 检查分支根目录有没有 `_redirects` 文件，内容应为 `/*    /index.html   200` |

---

## 分支说明

| 分支 | 用途 | 谁在用 |
|------|------|-------|
| `main` | 空初始分支 | 不用 |
| `claude/ai-video-creation-site-S9TCQ` | **源码分支**（React + TS + Vite 源码） | 开发改代码用 |
| `deploy/cloudflare` | **部署分支**（只放构建产物 `dist/` 的扁平内容） | Cloudflare Pages 拉它自动部署 |

`deploy/cloudflare` 根目录应该永远只有这 6 个文件：

```
.gitignore
_redirects
assets/index-<hash>.js
assets/index-<hash>.css
favicon.svg
index.html
```

---

## 附录 · 如果你想转成 Word 文档

这份文件是 Markdown 格式（`.md`）。要转成 `.docx`：

- **方法 1**：用 [Typora](https://typora.io/) 打开 → 文件 → 导出 → Word (.docx)
- **方法 2**：用 VS Code 装 Markdown All in One 插件，或用在线工具 <https://cloudconvert.com/md-to-docx>
- **方法 3**：直接在 Word 里 **打开** `.md` 文件，Word 2019+ 可以识别基础 Markdown

---

*文档生成日期：2026-04-18*
*对应构建：`claude/ai-video-creation-site-S9TCQ` @ `8b2185d` / `deploy/cloudflare` @ `14fb4b2`*
