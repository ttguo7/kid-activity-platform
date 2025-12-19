// 删除前4个测试活动
import { readFileSync } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 .env.local 文件
function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key.trim()] = value.trim();
        }
      }
    }
  } catch (error) {
    console.error('读取 .env.local 文件失败:', error.message);
  }
}

loadEnv();

// 前4个测试活动的ID（按列表顺序）
const testActivityIds = [
  '691eba0d6085bb1ff24f5282', // Snowflake Lane
  '691ecb34784c155c4e78a35e', // snowflake lane
  '691ecba222a234a8f930fb34', // dd
  '691f826bcaeba51599c1bf15'  // 测试
];

async function deleteActivities() {
  let client;
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI 环境变量未设置');
    }

    console.log('正在连接数据库...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ 数据库连接成功！\n');

    const db = client.db('kid-activity-platform');
    const collection = db.collection('activities');

    // 先列出要删除的活动
    console.log('📋 准备删除以下测试活动：\n');
    const activitiesToDelete = [];
    
    for (const id of testActivityIds) {
      try {
        const activity = await collection.findOne({ _id: new ObjectId(id) });
        if (activity) {
          activitiesToDelete.push({ id, activity });
          console.log(`  - ${activity.title} (ID: ${id})`);
        } else {
          console.log(`  ⚠️  活动 ID ${id} 不存在`);
        }
      } catch (error) {
        console.log(`  ⚠️  无法查找活动 ID ${id}: ${error.message}`);
      }
    }

    if (activitiesToDelete.length === 0) {
      console.log('\n❌ 没有找到要删除的活动');
      return;
    }

    console.log(`\n⚠️  确认删除 ${activitiesToDelete.length} 个活动？`);
    console.log('正在删除...\n');

    // 删除活动
    const objectIds = activitiesToDelete.map(item => new ObjectId(item.id));
    const result = await collection.deleteMany({
      _id: { $in: objectIds }
    });

    console.log(`✅ 成功删除 ${result.deletedCount} 个活动！\n`);

    // 列出剩余活动
    const remainingActivities = await collection.find({}).toArray();
    console.log(`📋 剩余 ${remainingActivities.length} 个活动：\n`);
    
    if (remainingActivities.length === 0) {
      console.log('  (暂无活动)');
    } else {
      remainingActivities.forEach((activity, index) => {
        console.log(`${index + 1}. ${activity.title}`);
        console.log(`   ID: ${activity._id}`);
        console.log(`   日期: ${activity.date || '未设置'}`);
        console.log(`   地点: ${activity.location || '未设置'}`);
        console.log(`   分类: ${activity.category || '未设置'}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ 删除失败:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n数据库连接已关闭');
    }
  }
}

deleteActivities();

