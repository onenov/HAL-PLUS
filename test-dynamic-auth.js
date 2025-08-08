#!/usr/bin/env node

/**
 * HAL Plus Dynamic Authentication Test Script
 * 这个脚本验证动态认证功能是否正常工作
 */

const examples = [
  {
    name: "Bearer Token 认证",
    tool: "http-get",
    params: {
      url: "https://httpbin.org/bearer",
      auth: {
        type: "bearer",
        value: "test-token-12345"
      }
    }
  },
  {
    name: "API Key 头部认证",
    tool: "http-get", 
    params: {
      url: "https://httpbin.org/headers",
      auth: {
        type: "apikey",
        value: "test-api-key-67890",
        header: "X-Custom-API-Key"
      }
    }
  },
  {
    name: "API Key 查询参数认证",
    tool: "http-get",
    params: {
      url: "https://httpbin.org/get",
      auth: {
        type: "apikey", 
        value: "query-api-key-123",
        query: "api_key"
      }
    }
  },
  {
    name: "Basic 认证",
    tool: "http-get",
    params: {
      url: "https://httpbin.org/basic-auth/testuser/testpass",
      auth: {
        type: "basic",
        username: "testuser",
        password: "testpass"
      }
    }
  },
  {
    name: "自定义认证",
    tool: "http-get",
    params: {
      url: "https://httpbin.org/headers",
      auth: {
        type: "custom",
        value: "CustomAuthValue xyz789",
        header: "X-Custom-Authorization"
      }
    }
  },
  {
    name: "POST 请求与动态认证",
    tool: "http-post",
    params: {
      url: "https://httpbin.org/post",
      body: JSON.stringify({"message": "test with dynamic auth"}),
      auth: {
        type: "bearer",
        value: "post-test-token"
      }
    }
  }
];

console.log(`
🚀 HAL Plus Dynamic Authentication Test Suite
==============================================

这个脚本提供了动态认证功能的测试示例。
要运行这些测试，请：

1. 启动 HAL Plus 服务器：
   npx hal-plus-mcp

2. 在支持 MCP 的客户端中使用以下工具调用：

`);

examples.forEach((example, index) => {
  console.log(`## 测试 ${index + 1}: ${example.name}`);
  console.log(`工具: ${example.tool}`);
  console.log(`参数:`);
  console.log(JSON.stringify(example.params, null, 2));
  console.log(`\n预期行为: 动态认证信息应该被自动应用到请求中，并且在响应中被编辑为 [REDACTED]`);
  console.log(`\n${'='.repeat(60)}\n`);
});

console.log(`
🔍 验证要点：
============

1. **认证应用**: 检查请求是否正确包含了认证信息
2. **自动编辑**: 确认响应中的认证值被替换为 [REDACTED]
3. **优先级**: 动态认证应该优先于环境变量
4. **类型支持**: 验证所有认证类型 (bearer, apikey, basic, custom) 都正常工作
5. **工具覆盖**: 确认所有 HTTP 工具都支持动态认证

📝 如果需要更详细的使用指南，请查看：
- README.md - 基础使用说明
- DYNAMIC_AUTH_EXAMPLES.md - 详细示例和场景

🐛 如果遇到问题：
- 检查 HAL Plus 服务器是否正常启动
- 确认 MCP 客户端支持新的参数结构
- 查看服务器日志了解详细错误信息
`);
