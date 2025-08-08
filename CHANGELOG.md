# Changelog

All notable changes to HAL Plus (Enhanced HTTP API Layer) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-09

### 🎉 Initial Release of HAL Plus

HAL Plus is an enhanced MCP server based on the original HAL project, featuring **dynamic authentication** as a core capability alongside all the proven features from HAL.

### 🚀 Core Features

#### Dynamic Authentication (New!)

- **Runtime API Keys**: No more fixed environment variables - pass authentication directly in requests
- **Multiple Auth Types**: Bearer Token, API Key, Basic Auth, and Custom authentication
- **Flexible Configuration**: API keys via headers, query parameters, or custom locations
- **Auto-redaction**: Dynamic auth values are automatically redacted from AI responses
- **Priority System**: Dynamic auth > environment variables > defaults

#### HTTP API Capabilities

- **Complete HTTP Support**: GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS requests
- **Smart Response Handling**: Automatic JSON parsing and error handling
- **Custom Headers**: Full control over request headers and content types

#### Security & Secret Management

- **Environment-based Secrets**: Traditional `{secrets.key}` substitution support
- **Namespace Organization**: Hierarchical secret organization (e.g., `azure.storage.key`)
- **URL Restrictions**: Limit secrets to specific URL patterns for enhanced security
- **Automatic Redaction**: All secret values replaced with `[REDACTED]` in responses

#### OpenAPI/Swagger Integration

- **Auto-tool Generation**: Automatically create tools from OpenAPI specifications
- **Parameter Validation**: Type checking and validation based on schemas
- **Path Parameter Support**: Dynamic URL path substitution
- **Documentation Tools**: Built-in API documentation and search capabilities

#### Advanced Features

- **URL Filtering**: Global whitelist/blacklist URL filtering
- **Multi-user Support**: Perfect for SaaS applications with per-user credentials
- **OAuth Compatible**: Seamless support for dynamic OAuth access tokens
- **Temporary Credentials**: Handle short-lived tokens and temporary API keys

### 📋 Supported Authentication Types

```json
// Bearer Token
{"auth": {"type": "bearer", "value": "your_token"}}

// API Key in custom header
{"auth": {"type": "apikey", "value": "your_key", "header": "X-API-Key"}}

// API Key in query parameter
{"auth": {"type": "apikey", "value": "your_key", "query": "api_key"}}

// Basic Authentication
{"auth": {"type": "basic", "username": "user", "password": "pass"}}

// Custom Authentication
{"auth": {"type": "custom", "value": "Custom auth", "header": "X-Custom-Auth"}}
```

### 🛠️ Installation & Usage

```bash
# Install and run
npx hal-plus-mcp

# With Swagger integration
HAL_SWAGGER_FILE=./api.yaml npx hal-plus-mcp
```

### 🔧 Configuration

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

### 🎯 Key Improvements Over Original HAL

- ✅ **Dynamic Authentication**: No more environment variable limitations
- ✅ **Multi-user Ready**: Different API keys per request/user
- ✅ **OAuth Native**: Built-in support for dynamic OAuth tokens
- ✅ **Enhanced Security**: Comprehensive credential protection
- ✅ **Backward Compatible**: All existing HAL configurations work unchanged

### 📚 Documentation

- **README.md**: Quick start and basic usage
- **DYNAMIC_AUTH_EXAMPLES.md**: Comprehensive authentication examples
- **Configuration Examples**: Multiple real-world setup scenarios

---

_HAL Plus is based on the original HAL project and includes all its proven features plus enhanced dynamic authentication capabilities._
