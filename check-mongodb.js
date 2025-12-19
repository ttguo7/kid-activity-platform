// 检查 MongoDB 连接字符串配置
// 运行方式: node check-mongodb.js

const uri = process.env.MONGODB_URI;

console.log('=== MongoDB 连接字符串检查 ===\n');

if (!uri) {
  console.log('❌ MONGODB_URI 环境变量未设置！');
  console.log('\n请按以下步骤配置：');
  console.log('1. 在项目根目录创建 .env.local 文件');
  console.log('2. 添加以下内容：');
  console.log('   MONGODB_URI=你的MongoDB连接字符串');
  console.log('\nMongoDB 连接字符串格式示例：');
  console.log('   mongodb+srv://用户名:密码@集群地址/数据库名?retryWrites=true&w=majority');
  console.log('\n或者本地 MongoDB：');
  console.log('   mongodb://localhost:27017/kid-activity-platform');
  process.exit(1);
}

console.log('✅ 找到 MONGODB_URI 环境变量');
console.log('连接字符串: ' + uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // 隐藏密码

// 尝试连接测试
import('mongodb').then(({ MongoClient }) => {
  const client = new MongoClient(uri);
  
  client.connect()
    .then(() => {
      console.log('\n✅ 数据库连接成功！');
      return client.db('kid-activity-platform').admin().ping();
    })
    .then(() => {
      console.log('✅ 数据库 ping 测试通过');
      return client.close();
    })
    .then(() => {
      console.log('\n🎉 MongoDB 配置正确，可以正常使用！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 数据库连接失败:', error.message);
      console.log('\n请检查：');
      console.log('1. MongoDB 连接字符串是否正确');
      console.log('2. 网络是否可以访问 MongoDB 服务器');
      console.log('3. 用户名和密码是否正确');
      console.log('4. IP 地址是否在白名单中（如果是 MongoDB Atlas）');
      process.exit(1);
    });
}).catch((error) => {
  console.error('❌ 无法导入 mongodb 模块:', error.message);
  console.log('请运行: npm install mongodb');
  process.exit(1);
});

