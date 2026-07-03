# Agentation 集成与 MCP 配置笔记

> 项目：PineLine（`~/vibe coding/aigc pipeline/`）
> Agentation 版本：3.0.2 · MCP server 版本：1.2.0
> 老板：麦老板 / Claude Code 主助手

---

## 一、装了什么

| 包 | 位置 | 作用 |
|----|------|------|
| `agentation` 3.0.2 | `dependencies` | React UI 组件，悬浮 toolbar，点元素加注释 |
| `agentation-mcp` 1.2.0 | `devDependencies` | MCP server，HTTP+stdio 双端点，SQLite 存数据 |

零运行时外部依赖（除了 React/ReactDOM peer deps）。

---

## 二、代码改动

### `src/App.tsx`

```diff
+ import { Agentation } from 'agentation'
  ...
    {!isStudio && <Footer />}
+   {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
  </div>
```

- `import.meta.env.DEV`：**只在 dev 模式渲染**，production build 不会带
- `endpoint="http://localhost:4747"`：让 annotations 同步到本地 server，才能让 Claude Code 通过 MCP 看到

### 已删除/保留说明

- **没改**任何 vite.config 或生产构建 — Agentation 默认 0KB 生产 bundle
- **没加**任何 backend 路由 — server 自己开 4747 HTTP

---

## 三、Server 架构与启动

### 架构图

```
┌─────────────────┐        HTTP POST /sessions          ┌──────────────────────┐
│   浏览器 Toolbar │ ─────────────────────────────────► │  agentation-mcp      │
│  (PineLine 页)  │        /annotations                 │  HTTP server :4747   │
│                 │ ◄─────────────────────────────────  │  (常驻进程)          │
└─────────────────┘        实时双向                      └──────────┬───────────┘
                                                                     │
                                                                     │ SQLite
                                                                     ▼
                                                          ┌──────────────────────┐
                                                          │  ~/.agentation/*.db   │
                                                          └──────────┬───────────┘
                                                                     │
┌─────────────────┐        MCP stdio (npx + args)       ┌──────────▼───────────┐
│   Claude Code   │ ◄────────────────────────────────► │  agentation-mcp      │
│   (anywhere)    │   tools: agentation_* (9 个)        │  stdio client        │
└─────────────────┘                                    │  --http-url :4747     │
                                                       └──────────────────────┘
```

### 启动方式

#### ✅ 推荐：launchd 常驻（系统级，开机自启）

plist 已写到 `~/Library/LaunchAgents/com.maitongxue.agentation-mcp.plist`：

```bash
# 加载（启动 + 设置开机自启）
launchctl load ~/Library/LaunchAgents/com.maitongxue.agentation-mcp.plist

# 卸载（如要停止）
launchctl unload ~/Library/LaunchAgents/com.maitongxue.agentation-mcp.plist

# 查状态
launchctl list | grep agentation
```

日志：`tail -f ~/.agentation/mcp-server.log`

#### 兜底：手动启

```bash
~/.openclaw/workspace/tmp/agentation-mcp.sh
```

或一行：

```bash
nohup npx -y agentation-mcp server >> ~/.agentation/mcp-server.log 2>&1 &
```

---

## 四、MCP 客户端配置

### 全局 Claude Code（`~/.claude.json`）

```json
{
  "mcpServers": {
    "agentation": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y", "agentation-mcp", "server",
        "--mcp-only",
        "--http-url", "http://localhost:4747"
      ],
      "env": {}
    }
  }
}
```

### 项目级（已写到 `.mcp.json`）

```json
{
  "mcpServers": {
    "agentation": {
      "command": "npx",
      "args": ["-y", "agentation-mcp", "server", "--mcp-only", "--http-url", "http://localhost:4747"],
      "env": {},
      "description": "Agentation MCP — 老板在 PineLine 页面上点元素加注释，Claude Code 实时读取。HTTP server 由 launchd 常驻。"
    }
  }
}
```

**关键参数**：
- `--mcp-only`：stdIO 客户端只启 stdio，**不开 HTTP**（避免和常驻 server 抢 4747 端口）
- `--http-url http://localhost:4747`：所有数据读写走常驻 HTTP server，两边共享 SQLite

### 注册命令（已执行）

```bash
claude mcp add --scope user --transport stdio agentation \
  -- npx -y agentation-mcp server --mcp-only --http-url http://localhost:4747
```

### 验证状态

```bash
$ claude mcp list
Checking MCP server health…
agentation: npx -y agentation-mcp server --mcp-only --http-url http://localhost:4747 - ✔ Connected
```

---

## 五、Claude Code 端使用流程

老板的工作流（鼠标 + 自然语言）：

1. **打开 PineLine 页面** → `http://localhost:5173/`（dev server 一直跑）
2. **右下角出现 Agentation toolbar**（v3.0.2 蓝紫色）
3. **点 toolbar 激活** → cursor 进入 annotation 模式
4. **点页面元素** → 弹出输入框 → 写笔记 → 提交
5. **看到 annotations 自动 POST 到 server**（toolbar 上的状态指示器会变绿）
6. **回到 Claude Code（任意 session）** → 询问：
   > "老板在 PineLine 页面加了哪些 annotations？"
7. **Claude Code 用 `agentation_list_sessions` + `agentation_get_session` 拉数据** → 自动看到老板点的所有元素 + 笔记
8. **Claude Code 根据 context 直接改代码**

---

## 六、验证记录（2026-07-03）

| 检查项 | 结果 |
|--------|------|
| `npm view agentation` | 3.0.2 / react ≥18 peer ✓ |
| `npm view agentation-mcp` | 1.2.0 / deps: MCP SDK + better-sqlite3 + zod（无 postinstall）|
| `npm install` 在 PineLine | ✓ 1 package + 0 deps |
| 修改 `src/App.tsx` 加入 `<Agentation />` | ✓ |
| Vite dev server 启动 `localhost:5173` | ✓ 200 OK |
| 浏览器 snapshot：toolbar 完整渲染（含 MCP 面板） | ✓ v3.0.2 / Output Detail / Standard / React Components ✓ / Marker Color 7 色 |
| 安装 `agentation-mcp` 1.2.0 | ✓ |
| 修改 `<Agentation endpoint="http://localhost:4747" />` | ✓ |
| 写项目级 `.mcp.json` | ✓ |
| `claude mcp add --scope user` 注册 | ✓ |
| `claude mcp list` 显示 Connected | ✓ |
| 验证命令：`npx agentation-mcp server` 手动启动 | ✓ 输出 `[MCP] Agentation MCP server started on stdio (HTTP: http://localhost:4747)` |
| 写 launchd plist + load | ✓ PID 86307 listening *:4747 |
| 浏览器 GET `http://localhost:4747/sessions` | ✓ 200，返回真实 session 数据 `[{"id":"mr4exwmz-ksmcew", ...}]` |

---

## 七、可能踩的坑

### 1. React 严格模式（StrictMode）双渲染

dev mode 下 React 18 StrictMode 会让 Agentation 渲染两次。**不影响功能**（Agentation 内部幂等），但 toolbar 可能闪一下。如果老板看到 toolbar "跳动"，检查 `src/main.tsx` 是否有 `<StrictMode>`。

### 2. Production 排除

`{import.meta.env.DEV && <Agentation />}` 已经做了 production 排除，**build 后 bundle 不含 Agentation 代码**（CSS modules 会被 tree-shake）。

### 3. 端口冲突

如果老板有别的工具占了 4747 端口：

```bash
# 改 plist 里加 --port 4800
<string>server</string>
<string>--port</string>
<string>4800</string>

# 同步改 App.tsx endpoint
<Agentation endpoint="http://localhost:4800" />

# 同步改 .claude.json args 里 --http-url
"--http-url", "http://localhost:4800"
```

需要三处同步改。

### 4. ClawHub 流程断了？

之前流程：`claude mcp list` 看到 ✔ Connected 但其实是**stdio 协议握手成功**。**关键看 server 进程是否在跑**：

```bash
lsof -nP -iTCP:4747 -sTCP:LISTEN
```

如果没监听，说明 launchd 没启或挂了。

### 5. 浏览器 toolbar 连不上 HTTP server

打开浏览器 DevTools，看 Network 标签，404/拒绝连接 → 检查 4747 端口 + launchd。

### 6. SQLite 数据在哪

`~/.agentation/` 目录下的 `.db` 文件。常驻 server 和 Claude Code stdio client 共享同一个 db。

---

## 八、给 Claude Code 看的（让它知道工具存在）

如果老板启动了一个新的 Claude Code session，下面的 prompt 它会自动加载 MCP 工具（`agentation_*` 9 个）。可以在 prompt 里这样引用：

```text
老板刚在 PineLine 页面加了几个 annotations。先用 agentation_list_sessions 看看当前活跃的
session，再用 agentation_get_session 拉完整内容，看看老板想要怎么改。
```

可用的 9 个工具（来自官方文档）：
1. `agentation_list_sessions` — 列所有活跃/历史 session
2. `agentation_get_session` — 拿完整 annotations（含元素 selector、笔记、时间戳）
3. `agentation_acknowledge_annotation` — 标记"已读/在处理"
4. `agentation_resolve_annotation` — 标记"已完成"
5. `agentation_dismiss_annotation` — 标记"不做/有理由"
6. `agentation_ask_followup` — 主动问老板补充问题
7. `agentation_create_session` — 创建新 session
8. `agentation_list_annotations` — 列某 session 下所有 annotations
9. `agentation_get_annotation` — 拿单个 annotation 详情

---

## 九、一键复位（如果彻底乱了）

```bash
# 1. 卸载 launchd
launchctl unload ~/Library/LaunchAgents/com.maitongxue.agentation-mcp.plist

# 2. 删数据（保留 session 历史或全清）
rm -rf ~/.agentation/         # ⚠️ 全删，丢所有 annotation 历史
# 或选择性：rm ~/.agentation/data.db # 仅清数据

# 3. 重新加载
launchctl load ~/Library/LaunchAgents/com.maitongxue.agentation-mcp.plist

# 4. 重启 Claude Code 让 MCP 重连
```

---

## 十、相关链接

- [Agentation 官方](https://agentation.dev)
- [MCP 文档](https://agentation.dev/mcp)
- [GitHub](https://github.com/benjitaylor/agentation)
- [Claude Code MCP 指南](https://docs.claude.com/en/docs/claude-code/mcp)

---

*配置人：小麦同学（老板的赛博员工）*
*时间：2026-07-03 12:08 CST*
