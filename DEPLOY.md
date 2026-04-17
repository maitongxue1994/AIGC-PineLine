# 部署到 Cloudflare Pages

## 方式 A · 直接上传（最快，无需 Git）

1. 打开 https://dash.cloudflare.com/?to=/:account/pages
2. 点击 **Create application → Pages → Upload assets**
3. 输入项目名（例：`pineline`），把本目录里的所有文件拖进去（或直接拖整个 zip）
4. 点击 **Deploy**，几秒后会拿到 `https://<项目名>.pages.dev`

## 方式 B · 连接 Git（后续自动部署）

1. Cloudflare Pages → **Create application → Connect to Git**
2. 选择仓库 `maitongxue1994/AIGC-PineLine`，分支选 `claude/ai-video-creation-site-S9TCQ`
3. 构建设置：
   - **Framework preset**：`Vite`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
4. Deploy

## 说明

- `_redirects` 已经内置：`/* /index.html 200`，SPA 路由可正常工作（`/studio`、`/templates` 等直接访问不会 404）
- 静态资源都在 `assets/` 下，已带 hash 指纹，可长缓存
- 无需设置环境变量，无服务端依赖
