# Vercel 部署指南

## 方式一：通过 Vercel CLI 部署（推荐）

### 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2: 登录 Vercel

```bash
vercel login
```

### 步骤 3: 在项目目录中部署

```bash
cd kid-activity-platform
vercel
```

按照提示操作：
- 选择项目范围（个人或团队）
- 确认项目名称（默认：kid-activity-platform）
- 确认目录（默认：./）
- 是否覆盖设置（首次部署选择 No）

### 步骤 4: 配置环境变量

部署完成后，需要配置 MongoDB 连接字符串：

```bash
vercel env add MONGODB_URI
```

然后输入你的 MongoDB 连接字符串（与 .env.local 中的相同）

或者通过 Vercel 网站配置：
1. 访问 https://vercel.com/dashboard
2. 选择你的项目
3. 进入 Settings > Environment Variables
4. 添加 `MONGODB_URI`，值为你的 MongoDB 连接字符串

### 步骤 5: 重新部署

配置环境变量后，需要重新部署：

```bash
vercel --prod
```

---

## 方式二：通过 Vercel 网站部署

### 步骤 1: 准备代码仓库

1. 将代码推送到 GitHub/GitLab/Bitbucket
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin 你的仓库地址
   git push -u origin main
   ```

### 步骤 2: 导入项目到 Vercel

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择你的代码仓库
4. 配置项目：
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `kid-activity-platform`（如果仓库在子目录）
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）
   - **Install Command**: `npm install`（默认）

### 步骤 3: 配置环境变量

在部署前或部署后，在项目设置中添加环境变量：

1. 在项目导入页面，点击 "Environment Variables"
2. 添加变量：
   - **Name**: `MONGODB_URI`
   - **Value**: 你的 MongoDB 连接字符串
   - **Environment**: Production, Preview, Development（全选）

### 步骤 4: 部署

点击 "Deploy" 按钮，Vercel 会自动：
- 安装依赖
- 构建项目
- 部署到生产环境

---

## 部署后验证

### 1. 检查部署状态

访问 Vercel Dashboard，查看部署日志，确保构建成功。

### 2. 测试 API

访问以下 URL 测试：
- 健康检查：`https://你的域名.vercel.app/api/test`
- 活动列表：`https://你的域名.vercel.app/api/activities`
- 活动页面：`https://你的域名.vercel.app/activities`

### 3. 常见问题排查

#### 问题：环境变量未生效
- 确保在 Vercel 中正确配置了 `MONGODB_URI`
- 重新部署项目（环境变量更改后需要重新部署）

#### 问题：构建失败
- 检查构建日志中的错误信息
- 确保所有依赖都已正确安装
- 检查 Node.js 版本（Vercel 默认使用 Node.js 18+）

#### 问题：API 路由返回 500 错误
- 检查 MongoDB 连接字符串是否正确
- 检查 MongoDB Atlas 的 IP 白名单设置
- 查看 Vercel 函数日志

---

## 自动部署（推荐）

配置完成后，每次推送到主分支，Vercel 会自动：
- 检测代码更改
- 重新构建
- 部署到生产环境

---

## 项目配置说明

### 构建配置

项目已配置为 Next.js 16，使用 App Router：
- 构建命令：`npm run build`
- 输出目录：`.next`
- Node.js 版本：18.x 或更高

### 环境变量

必需的环境变量：
- `MONGODB_URI`: MongoDB 连接字符串

### 自定义域名

部署成功后，可以在 Vercel Dashboard 中：
1. 进入项目设置
2. 选择 "Domains"
3. 添加你的自定义域名

---

## 快速部署命令总结

```bash
# 1. 安装 CLI（如果还没有）
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
cd kid-activity-platform
vercel

# 4. 配置环境变量
vercel env add MONGODB_URI

# 5. 生产环境部署
vercel --prod
```

---

## 需要帮助？

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查环境变量配置
3. 确认 MongoDB 连接正常
4. 查看项目文档：https://vercel.com/docs

