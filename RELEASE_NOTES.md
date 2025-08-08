# HAL Plus v1.0.0 发布说明

_发布日期: 2025 年 8 月 9 日_

## 🎉 欢迎使用 HAL Plus！

HAL Plus 是基于原始 HAL 项目的增强版本，专门为需要**动态认证**功能的用户设计。我们重新打包并重命名为 `hal-plus-mcp`，让您可以享受到最新的动态认证功能。

## 📚 项目仓库

🔗 **GitHub**: [https://github.com/onenov/HAL-PLUS](https://github.com/onenov/HAL-PLUS)

## 📦 包名更改

- **旧包名**: `hal-mcp`
- **新包名**: `hal-plus-mcp`
- **新版本**: 1.0.0 (重置版本号)

## 🚀 核心新功能：动态认证

### 解决的问题

❌ **之前**: 只能使用固定的环境变量 API_KEY  
✅ **现在**: 支持运行时动态传入任何认证信息

### 支持的认证类型

#### 1. Bearer Token 认证

```json
{
  "url": "https://api.github.com/user",
  "auth": {
    "type": "bearer",
    "value": "your_dynamic_token_here"
  }
}
```

#### 2. API Key 认证

```json
// 默认 X-API-Key 头部
{
  "auth": {
    "type": "apikey",
    "value": "your_api_key"
  }
}

// 自定义头部
{
  "auth": {
    "type": "apikey",
    "value": "your_api_key",
    "header": "X-Custom-API-Key"
  }
}

// 查询参数
{
  "auth": {
    "type": "apikey",
    "value": "your_api_key",
    "query": "api_key"
  }
}
```

#### 3. Basic 认证

```json
{
  "auth": {
    "type": "basic",
    "username": "your_username",
    "password": "your_password"
  }
}
```

#### 4. 自定义认证

```json
{
  "auth": {
    "type": "custom",
    "value": "CustomToken abc123",
    "header": "X-Custom-Auth"
  }
}
```

## 🎯 适用场景

### 多用户 SaaS 应用

```json
// 不同用户使用不同的 API 密钥
{
  "url": "https://api.stripe.com/v1/customers",
  "auth": {
    "type": "bearer",
    "value": "sk_test_user_specific_key"
  }
}
```

### OAuth 访问令牌

```json
// 使用动态获取的 OAuth 令牌
{
  "url": "https://graph.microsoft.com/v1.0/me",
  "auth": {
    "type": "bearer",
    "value": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIs..."
  }
}
```

### 临时 API 密钥

```json
// 使用临时生成的 API 密钥
{
  "url": "https://api.temp-service.com/data",
  "auth": {
    "type": "apikey",
    "value": "temp_key_expires_in_1h"
  }
}
```

## 🔧 安装和使用

### 安装

```bash
# 直接使用（推荐）
npx hal-plus-mcp

# 或全局安装
npm install -g hal-plus-mcp
```

### Claude Desktop 配置

```json
{
  "mcpServers": {
    "hal-plus": {
      "command": "npx",
      "args": ["hal-plus-mcp"]
    }
  }
}
```

### 带 Swagger 集成

```json
{
  "mcpServers": {
    "hal-plus": {
      "command": "npx",
      "args": ["hal-plus-mcp"],
      "env": {
        "HAL_SWAGGER_FILE": "/path/to/openapi.json",
        "HAL_API_BASE_URL": "https://api.example.com"
      }
    }
  }
}
```

## 🛡️ 安全特性

### 自动编辑保护

- 所有动态认证值自动编辑为 `[REDACTED]`
- Base64 编码的凭证也受保护
- 零配置，默认启用

### 优先级系统

1. **动态认证** (最高优先级)
2. **环境变量密钥**
3. **默认值**

## 🔄 迁移指南

### 从原 HAL 迁移

**无需任何更改！** HAL Plus 100% 向后兼容：

```bash
# 旧方式（仍然有效）
export HAL_SECRET_API_KEY="your_key"
# 使用: {"headers": {"Authorization": "Bearer {secrets.api_key}"}}

# 新方式（推荐）
# 使用: {"auth": {"type": "bearer", "value": "your_dynamic_key"}}
```

### 渐进式迁移

您可以混合使用两种方式：

```json
{
  "url": "https://api.service.com/user/{secrets.user_id}/data",
  "auth": {
    "type": "bearer",
    "value": "dynamic_access_token"
  }
}
```

## 📚 文档和资源

- **README.md**: 基础使用指南
- **DYNAMIC_AUTH_EXAMPLES.md**: 详细认证示例
- **CHANGELOG.md**: 完整功能列表
- **test-dynamic-auth.js**: 功能测试脚本

## 🆚 与原 HAL 的对比

| 功能             | 原 HAL | HAL Plus |
| ---------------- | ------ | -------- |
| 固定环境变量认证 | ✅     | ✅       |
| 动态运行时认证   | ❌     | ✅       |
| 多用户支持       | 受限   | ✅       |
| OAuth 令牌支持   | 需手动 | ✅       |
| 临时凭证支持     | ❌     | ✅       |
| 认证自动编辑     | 部分   | ✅       |
| 向后兼容性       | -      | 100%     |

## 🤔 为什么选择 HAL Plus？

1. **解决实际痛点**: 不再受限于固定环境变量
2. **企业级就绪**: 支持多用户和动态凭证
3. **安全优先**: 增强的认证保护机制
4. **无缝迁移**: 完全向后兼容
5. **持续改进**: 基于社区反馈的增强功能

## 🚀 立即开始

```bash
# 试用 HAL Plus
npx hal-plus-mcp

# 第一个动态认证请求
{
  "url": "https://httpbin.org/bearer",
  "auth": {
    "type": "bearer",
    "value": "test-token-123"
  }
}
```

## 💬 反馈和支持

如果您有任何问题或建议，请通过以下方式联系：

- 查看文档: README.md
- 运行测试: `node test-dynamic-auth.js`
- 检查示例: DYNAMIC_AUTH_EXAMPLES.md

---

**HAL Plus - 让 AI 与 API 的连接更加智能和灵活！** 🎯
