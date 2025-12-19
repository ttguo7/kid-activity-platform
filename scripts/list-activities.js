// 列出数据库中的所有活动
import { readFileSync } from 'fs';
import { MongoClient } from 'mongodb';
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

async function listActivities() {
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

    const activities = await collection.find({}).toArray();
    
    console.log(`📋 数据库中共有 ${activities.length} 个活动：\n`);
    
    if (activities.length === 0) {
      console.log('  (暂无活动)');
    } else {
      activities.forEach((activity, index) => {
        console.log(`${index + 1}. ${activity.title}`);
        console.log(`   ID: ${activity._id}`);
        console.log(`   日期: ${activity.date || '未设置'}`);
        console.log(`   地点: ${activity.location || '未设置'}`);
        console.log(`   分类: ${activity.category || '未设置'}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ 查询失败:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

listActivities();

