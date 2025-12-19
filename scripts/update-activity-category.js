// 更新活动分类为"文化与信仰"
import { readFileSync } from 'fs';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

async function updateActivityCategory() {
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

    // 要更新的3个活动
    const activitiesToUpdate = [
      'Bellevue Family 4th - 独立日庆典',
      'Bellevue Arts Fair Weekend - 艺术博览会',
      'Bellevue Downtown Ice Rink - 市中心溜冰场'
    ];

    console.log('📋 开始更新活动分类为"文化与信仰"...\n');

    let updatedCount = 0;

    for (const title of activitiesToUpdate) {
      const result = await collection.updateOne(
        { title: title },
        { $set: { category: '文化与信仰' } }
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ 已更新: ${title}`);
        updatedCount++;
      } else {
        // 检查活动是否存在
        const activity = await collection.findOne({ title: title });
        if (activity) {
          console.log(`ℹ️  无需更新: ${title} (分类已是"文化与信仰")\n`);
        } else {
          console.log(`⚠️  未找到活动: ${title}\n`);
        }
      }
    }

    console.log(`\n✅ 更新完成！共更新 ${updatedCount} 个活动的分类`);

    // 列出更新后的活动
    console.log('\n📋 更新后的活动列表：\n');
    const updatedActivities = await collection.find({ category: '文化与信仰' }).toArray();
    updatedActivities.forEach((activity, index) => {
      console.log(`${index + 1}. ${activity.title}`);
      console.log(`   分类: ${activity.category}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ 更新失败:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n数据库连接已关闭');
    }
  }
}

updateActivityCategory();

