# 🚀 部署到 Vercel - 详细步骤

## ⚠️ 重要提示

由于 PowerShell 执行策略限制，建议使用**方式二（网页界面部署）**，这是最简单可靠的方法。

---

## 方式一：使用 Vercel CLI（需要解决 PowerShell 限制）

### 解决 PowerShell 执行策略问题

1. **以管理员身份打开 PowerShell**
2. **运行以下命令**：
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. **确认更改**：输入 `Y`

### 然后执行部署：

```bash
# 1. 进入项目目录（如果还没在）
cd kid-activity-platform

# 2. 登录 Vercel（会打开浏览器）
npx vercel login

# 3. 部署项目
npx vercel

# 4. 配置环境变量
npx vercel env add MONGODB_URI production

# 5. 部署到生产环境
npx vercel --prod
```

---

## 方式二：通过 Vercel 网站部署（推荐 ⭐）

这是最简单的方法，无需处理 PowerShell 问题。

### 步骤 1: 准备代码（如果还没推送到 Git）

#### 选项 A: 使用现有 Git 仓库

如果你已经有 Git 仓库：
```bash
git add .
git commit -m "准备部署到 Vercel"
git push
```

#### 选项 B: 创建新的 Git 仓库

1. 在 GitHub/GitLab/Bitbucket 创建新仓库
2. 初始化并推送代码：
   ```bash
   cd kid-activity-platform
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin 你的仓库地址
   git push -u origin main
   ```

### 步骤 2: 导入项目到 Vercel

1. **访问 Vercel**：https://vercel.com/new
2. **登录/注册账号**（可以使用 GitHub 账号）
3. **点击 "Import Git Repository"**
4. **选择你的代码仓库**
5. **配置项目设置**：
   - **Framework Preset**: Next.js（应该自动检测）
   - **Root Directory**: 如果仓库在子目录，填写 `kid-activity-platform`，否则留空
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）
   - **Install Command**: `npm install`（默认）

### 步骤 3: 配置环境变量（重要！）

在部署前，点击 **"Environment Variables"** 添加：

- **Name**: `MONGODB_URI`
- **Value**: 你的 MongoDB 连接字符串（从 `.env.local` 文件中复制）
- **Environment**: 选择所有环境（Production, Preview, Development）

**MongoDB 连接字符串示例**：
```
mongodb+srv://用户名:密码@集群地址.mongodb.net/kid-activity-platform?retryWrites=true&w=majority
```

### 步骤 4: 部署

1. 点击 **"Deploy"** 按钮
2. 等待构建完成（通常需要 1-3 分钟）
3. 部署成功后，你会得到一个 URL，例如：`https://kid-activity-platform.vercel.app`

---

## 步骤 5: 验证部署

部署完成后，访问以下链接测试：

1. **首页**: `https://你的域名.vercel.app`
2. **活动列表**: `https://你的域名.vercel.app/activities`
3. **API 测试**: `https://你的域名.vercel.app/api/test`
4. **健康检查**: `https://你的域名.vercel.app/api/health`

如果看到活动数据，说明部署成功！🎉

---

## 常见问题

### ❌ 问题 1: 环境变量未生效

**解决方案**：
- 确保在 Vercel 中正确配置了 `MONGODB_URI`
- 环境变量更改后，需要重新部署项目
- 在 Vercel Dashboard 中，进入项目 → Settings → Environment Variables 检查

### ❌ 问题 2: 构建失败

**可能原因**：
- 依赖安装失败
- TypeScript 错误
- 构建命令错误

**解决方案**：
- 查看 Vercel 构建日志
- 本地运行 `npm run build` 检查是否有错误
- 确保所有依赖都在 `package.json` 中

### ❌ 问题 3: API 返回 500 错误

**可能原因**：
- MongoDB 连接字符串错误
- MongoDB Atlas IP 白名单未配置

**解决方案**：
1. 检查 MongoDB 连接字符串是否正确
2. 在 MongoDB Atlas 中，确保 IP 白名单包含 `0.0.0.0/0`（允许所有 IP）
3. 查看 Vercel 函数日志：项目 → Deployments → 选择部署 → Functions → 查看日志

### ❌ 问题 4: 活动列表为空

**解决方案**：
- 检查 MongoDB 连接是否正常
- 访问 `/api/test` 测试数据库连接
- 确认数据库中有活动数据

---

## 自动部署

配置完成后，每次你推送到 Git 仓库的主分支，Vercel 会自动：
- ✅ 检测代码更改
- ✅ 重新构建项目
- ✅ 部署到生产环境

---

## 自定义域名

部署成功后，你可以添加自定义域名：

1. 进入 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** → **Domains**
4. 添加你的域名
5. 按照提示配置 DNS 记录

---

## 需要帮助？

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查环境变量配置
3. 确认 MongoDB 连接正常
4. 参考 Vercel 文档：https://vercel.com/docs

---

## 快速检查清单

部署前确认：
- [ ] 代码已推送到 Git 仓库
- [ ] MongoDB 连接字符串已准备好
- [ ] 本地测试 `npm run build` 成功
- [ ] 已准备好 Vercel 账号

部署后确认：
- [ ] 环境变量 `MONGODB_URI` 已配置
- [ ] 构建成功
- [ ] 网站可以正常访问
- [ ] API 接口正常工作
- [ ] 活动数据可以正常显示

