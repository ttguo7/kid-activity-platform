# MongoDB 配置指南

## 如何检查 MongoDB 连接字符串是否已配置

### 方法一：检查环境变量文件

1. **检查项目根目录是否有 `.env.local` 文件**
   - 如果没有，需要创建一个
   - 这个文件通常不会提交到 Git（已在 .gitignore 中）

2. **查看 `.env.local` 文件内容**
   ```bash
   # Windows PowerShell
   type .env.local
   
   # Windows CMD
   cat .env.local
   
   # 或者直接用文本编辑器打开
   ```

3. **确认文件内容格式**
   ```
   MONGODB_URI=mongodb+srv://用户名:密码@集群地址/数据库名?retryWrites=true&w=majority
   ```

### 方法二：使用检查脚本

运行检查脚本：
```bash
node check-mongodb.js
```

这个脚本会：
- ✅ 检查环境变量是否存在
- ✅ 测试数据库连接
- ✅ 显示连接状态

### 方法三：通过 API 测试

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问测试接口：
   - 浏览器打开：`http://localhost:3000/api/test`
   - 或者：`http://localhost:3000/api/health`

3. 查看返回结果：
   - 如果返回 `success: true`，说明连接正常
   - 如果返回错误，说明配置有问题

### 方法四：检查 Vercel 环境变量（如果已部署）

如果项目已部署到 Vercel：

1. 登录 Vercel 控制台
2. 进入项目设置
3. 查看 "Environment Variables" 部分
4. 确认是否有 `MONGODB_URI` 变量

---

## 如何配置 MongoDB 连接字符串

### 选项 1：使用 MongoDB Atlas（推荐，免费）

1. **注册 MongoDB Atlas 账号**
   - 访问：https://www.mongodb.com/cloud/atlas
   - 注册免费账号（M0 免费层）

2. **创建集群**
   - 选择免费层（M0）
   - 选择区域（建议选择离你最近的）

3. **创建数据库用户**
   - 设置用户名和密码
   - 记住这些信息

4. **配置网络访问**
   - 添加 IP 地址：`0.0.0.0/0`（允许所有 IP，仅用于开发）
   - 或添加你的具体 IP 地址

5. **获取连接字符串**
   - 点击 "Connect"
   - 选择 "Connect your application"
   - 复制连接字符串
   - 格式：`mongodb+srv://用户名:密码@集群地址.mongodb.net/数据库名?retryWrites=true&w=majority`

6. **创建 `.env.local` 文件**
   ```bash
   # 在项目根目录创建
   MONGODB_URI=mongodb+srv://你的用户名:你的密码@你的集群地址.mongodb.net/kid-activity-platform?retryWrites=true&w=majority
   ```

### 选项 2：使用本地 MongoDB

1. **安装 MongoDB**
   - 下载：https://www.mongodb.com/try/download/community
   - 安装并启动 MongoDB 服务

2. **创建 `.env.local` 文件**
   ```
   MONGODB_URI=mongodb://localhost:27017/kid-activity-platform
   ```

---

## 常见问题

### Q: 如何知道连接字符串是否正确？

A: 运行检查脚本或访问测试 API：
```bash
node check-mongodb.js
# 或访问 http://localhost:3000/api/test
```

### Q: 连接失败怎么办？

检查以下几点：
1. ✅ 连接字符串格式是否正确
2. ✅ 用户名和密码是否正确
3. ✅ IP 地址是否在白名单中（MongoDB Atlas）
4. ✅ 网络是否可以访问 MongoDB 服务器
5. ✅ 数据库名称是否正确（`kid-activity-platform`）

### Q: 本地开发可以，但部署后不行？

A: 检查 Vercel 环境变量：
- 确保在 Vercel 中配置了 `MONGODB_URI`
- 确保值是正确的（没有多余的空格或引号）

### Q: 如何隐藏连接字符串中的密码？

A: 在显示时，脚本会自动隐藏密码部分，但实际文件中需要完整的连接字符串。

---

## 快速测试

配置完成后，运行：

```bash
# 方法 1: 使用检查脚本
node check-mongodb.js

# 方法 2: 启动服务器并访问测试 API
npm run dev
# 然后访问 http://localhost:3000/api/test
```

如果看到 ✅ 成功消息，说明配置正确！

