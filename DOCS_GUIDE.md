# 📚 HAL Plus 文档自动生成指南

HAL Plus 使用 **Astro** 静态站点生成器来自动构建和部署文档到 GitHub Pages。

## 🚀 快速开始

### 本地开发

```bash
# 启动文档开发服务器 (http://localhost:4321)
npm run docs:dev

# 构建文档（用于预览）
npm run docs:build

# 预览构建后的文档
npm run docs:preview
```

### 直接在 docs 目录工作

```bash
cd docs

# 安装依赖
npm install

# 开发服务器
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

## 🔧 文档结构

```
docs/
├── src/
│   ├── pages/              # 页面文件
│   │   ├── index.astro     # 首页
│   │   ├── documentation.astro  # 文档页面
│   │   └── api.astro       # API 参考
│   ├── layouts/            # 布局组件
│   │   ├── Layout.astro    # 基础布局
│   │   └── DocsLayout.astro  # 文档布局
│   └── styles/             # 样式文件
├── public/                 # 静态资源
├── astro.config.mjs       # Astro 配置
└── package.json           # 依赖和脚本
```

## 📝 编辑文档

### 添加新页面

1. 在 `docs/src/pages/` 目录下创建新的 `.astro` 文件
2. 使用现有布局或创建新布局
3. 文档会自动重新构建和部署

### 更新内容

- **首页**: 编辑 `docs/src/pages/index.astro`
- **文档页面**: 编辑 `docs/src/pages/documentation.astro`
- **API 参考**: 编辑 `docs/src/pages/api.astro`

### 样式修改

- 全局样式: `docs/src/styles/global.css`
- 使用 Tailwind CSS 类进行样式设计

## 🤖 自动部署

### GitHub Actions 工作流

文档通过 GitHub Actions 自动部署：

1. **触发条件**: 
   - 推送到 `main` 分支时
   - 手动触发 (`workflow_dispatch`)

2. **部署过程**:
   - 安装 Node.js 和依赖
   - 构建 Astro 站点
   - 部署到 GitHub Pages

3. **访问地址**: https://onenov.github.io/HAL-PLUS/

### 手动触发部署

在 GitHub 仓库页面:
1. 进入 "Actions" 标签
2. 选择 "Deploy Docs to GitHub Pages" 工作流
3. 点击 "Run workflow"

## ⚙️ 配置说明

### Astro 配置 (`docs/astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://onenov.github.io',    // GitHub Pages 域名
  base: '/HAL-PLUS',                   // 仓库名称
  integrations: [tailwind()],         // Tailwind CSS 集成
  markdown: {
    shikiConfig: {
      theme: 'github-dark',            // 代码高亮主题
      wrap: true
    }
  }
});
```

### GitHub Pages 设置

确保在 GitHub 仓库设置中：
1. 进入 Settings > Pages
2. Source 选择 "GitHub Actions"
3. 保存设置

## 🛠️ 开发技巧

### 实时预览

开发服务器支持热重载，修改文件后页面会自动刷新。

### 代码高亮

在 Markdown 中使用代码块：

\`\`\`typescript
// TypeScript 代码会自动高亮
interface DynamicAuth {
  type: 'bearer' | 'apikey';
  value: string;
}
\`\`\`

### 组件复用

在 `.astro` 文件中可以使用 JavaScript 和组件：

```astro
---
// 前置脚本
const title = "HAL Plus 文档";
---

<Layout title={title}>
  <h1>{title}</h1>
  <!-- 内容 -->
</Layout>
```

## 📋 维护清单

### 定期更新

- [ ] 检查依赖版本更新
- [ ] 更新功能文档
- [ ] 添加新的使用示例
- [ ] 检查链接有效性

### 发布新版本时

- [ ] 更新版本号引用
- [ ] 添加新功能文档
- [ ] 更新 API 参考
- [ ] 添加迁移指南（如需要）

---

📍 **提示**: 文档站点会在每次推送到 main 分支后 2-3 分钟内自动更新。
