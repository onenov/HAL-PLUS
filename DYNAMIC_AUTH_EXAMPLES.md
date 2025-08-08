# HAL 动态认证功能使用指南

## 概述

HAL 现在支持动态传入 API 密钥和认证信息，无需再依赖固定的环境变量。这个功能为多用户场景、OAuth 流程和临时令牌提供了完整的解决方案。

## 功能特性

✅ **多种认证类型**：Bearer Token、API Key、Basic Auth、自定义认证  
✅ **灵活配置**：支持头部、查询参数等多种传递方式  
✅ **自动安全编辑**：动态传入的认证信息也会被自动编辑保护  
✅ **向后兼容**：完全兼容原有的环境变量方式  
✅ **优先级机制**：动态认证 > 环境变量 > 默认值

## 支持的认证类型

### 1. Bearer Token 认证

最常用的 API 认证方式，适用于 JWT、OAuth 访问令牌等：

```json
{
  "url": "https://api.github.com/user/repos",
  "auth": {
    "type": "bearer",
    "value": "ghp_your_dynamic_token_here"
  }
}
```

### 2. API Key 认证

#### 2.1 默认头部（X-API-Key）

```json
{
  "url": "https://api.example.com/data",
  "auth": {
    "type": "apikey",
    "value": "your_api_key_here"
  }
}
```

#### 2.2 自定义头部

```json
{
  "url": "https://api.service.com/endpoint",
  "auth": {
    "type": "apikey",
    "value": "your_api_key_here",
    "header": "X-Custom-API-Key"
  }
}
```

#### 2.3 查询参数

```json
{
  "url": "https://api.service.com/search",
  "auth": {
    "type": "apikey",
    "value": "your_api_key_here",
    "query": "api_key"
  }
}
```

### 3. Basic 认证

适用于需要用户名密码的基础认证：

```json
{
  "url": "https://api.protected.com/data",
  "auth": {
    "type": "basic",
    "username": "your_username",
    "password": "your_password"
  }
}
```

### 4. 自定义认证

完全自定义的头部认证方式：

```json
{
  "url": "https://api.custom.com/endpoint",
  "auth": {
    "type": "custom",
    "value": "CustomToken abc123xyz",
    "header": "X-Custom-Auth"
  }
}
```

## 实际使用场景

### 场景 1：多用户 SaaS 应用

```json
// 为不同用户使用不同的 API 密钥
{
  "url": "https://api.stripe.com/v1/customers",
  "auth": {
    "type": "bearer",
    "value": "sk_test_user123_specific_key"
  }
}
```

### 场景 2：OAuth 访问令牌

```json
// 使用动态获取的 OAuth 令牌
{
  "url": "https://graph.microsoft.com/v1.0/me",
  "auth": {
    "type": "bearer",
    "value": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6..."
  }
}
```

### 场景 3：临时 API 密钥

```json
// 使用临时生成的 API 密钥
{
  "url": "https://api.temp-service.com/data",
  "auth": {
    "type": "apikey",
    "value": "temp_key_expires_in_1h",
    "header": "X-Temp-Key"
  }
}
```

### 场景 4：混合认证（动态 + 环境变量）

```json
// 动态认证优先，如果不提供则使用环境变量
{
  "url": "https://api.example.com/data?user_id={secrets.user_id}",
  "auth": {
    "type": "bearer",
    "value": "dynamic_token_here"
  }
}
```

## 与现有功能的集成

### 1. 与环境变量密钥结合

```json
{
  "url": "https://api.service.com/user/{secrets.user_id}/data",
  "auth": {
    "type": "bearer",
    "value": "dynamic_access_token"
  }
}
```

### 2. 与 Swagger 工具结合

所有 Swagger 生成的工具都自动支持动态认证：

```json
{
  "id": "user123",
  "auth": {
    "type": "bearer",
    "value": "user_specific_token"
  }
}
```

## 安全特性

### 1. 自动编辑保护

动态传入的所有认证信息都会被自动编辑，确保不会泄露到 AI 对话中：

```
❌ 原始响应可能包含: "Authorization: Bearer abc123"
✅ 编辑后显示: "Authorization: Bearer [REDACTED]"
```

### 2. Base64 编码保护

Basic 认证的 Base64 编码凭证也会被自动编辑：

```javascript
// 内部处理：btoa("user:pass") = "dXNlcjpwYXNz"
// 编辑保护：[REDACTED]
```

## 向后兼容性

### 旧方式（仍然支持）

```bash
# 环境变量
export HAL_SECRET_API_KEY="your_key"

# 工具调用
{
  "url": "https://api.example.com/data",
  "headers": {
    "Authorization": "Bearer {secrets.api_key}"
  }
}
```

### 新方式（推荐）

```json
{
  "url": "https://api.example.com/data",
  "auth": {
    "type": "bearer",
    "value": "your_dynamic_key"
  }
}
```

## 优先级规则

1. **动态认证** - 最高优先级
2. **环境变量密钥** - 中等优先级
3. **默认值** - 最低优先级

如果同时提供动态认证和环境变量密钥，动态认证将优先使用。

## 所有支持动态认证的工具

- `http-get` - GET 请求
- `http-post` - POST 请求
- `http-put` - PUT 请求
- `http-patch` - PATCH 请求
- `http-delete` - DELETE 请求
- `http-head` - HEAD 请求
- `http-options` - OPTIONS 请求
- `swagger_*` - 所有 Swagger 生成的工具

## 最佳实践

### 1. 安全建议

- 使用最短生命周期的令牌
- 定期轮换动态密钥
- 不要在日志中记录认证信息

### 2. 性能建议

- 缓存常用的认证令牌
- 批量处理需要相同认证的请求
- 避免频繁的认证请求

### 3. 错误处理

- 检查认证失败的响应码（401, 403）
- 实现令牌刷新逻辑
- 准备降级到环境变量方案

## 迁移指南

### 从固定环境变量迁移

**之前：**

```bash
export HAL_SECRET_GITHUB_TOKEN="ghp_fixed_token"
```

**现在：**

```json
{
  "url": "https://api.github.com/user",
  "auth": {
    "type": "bearer",
    "value": "ghp_dynamic_token_per_user"
  }
}
```

这样的改进为 HAL 工具带来了更大的灵活性和实用性，特别适合企业级部署和多用户场景。
