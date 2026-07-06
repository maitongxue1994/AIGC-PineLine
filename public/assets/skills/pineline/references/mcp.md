# PineLine MCP 桥

## 接入

1. 用户在 PineLine Studio 顶栏打开「外部 Agent」对话框 → 生成会话码（8 位），浏览器与云端桥建立 WebSocket。
2. 外部 agent 连接（Streamable HTTP，无状态单响应）：

```bash
claude mcp add --transport http pineline https://<PineLine 域名>/mcp/<会话码>
```

Codex（`~/.codex/config.toml`）：

```toml
[mcp_servers.pineline]
url = "https://<PineLine 域名>/mcp/<会话码>"
```

## 工具

### get_canvas

无参数。返回画布快照 JSON：`nodes[]`（id/kind/preset/title/prompt 前 120 字/status/hasImage/versionCount/params 摘要）与 `edges[]`。

### apply_ops

参数：`{ "ops": [ ... ] }`——ops 全集见 [ops.md](ops.md)。服务端先过白名单校验再转发浏览器执行，返回执行摘要（成功/跳过与原因）。

### run_pipeline

参数：`{ "ids": ["<节点id>"] }`。按依赖顺序异步启动运行，立即返回；生成需数秒~数分钟，用 `get_canvas` 轮询 `status`（idle/running/done/error）。

### read_node_text

参数：`{ "id": "<节点id>" }`。返回该节点当前激活版本的完整文本产出（截 8000 字；图片/视频节点只回元信息）。

### remember

参数：`{ "content": "<一条用户偏好/项目设定，≤500 字>" }`。写入 PineLine 本地记忆，画布助手后续对话自动携带。

## 语义与限制

- 画布真源在用户浏览器：Studio 页面必须保持打开，关闭后调用返回 409（浏览器未连接）。
- 单次工具调用端到端超时 30s（run_pipeline 只等启动回执，不等生成完成）。
- 会话码即凭证：随「外部 Agent」对话框关闭/刷新失效，泄露风险窗口小；不要写进持久配置分享。
- 典型编排流：`get_canvas` 看现状 → `apply_ops` 搭链（优先 derive 派生 op）→ `run_pipeline` → 轮询 `get_canvas` → `read_node_text` 取产出。
