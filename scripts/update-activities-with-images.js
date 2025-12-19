// 更新活动图片 - 使用实际的图片URL
// 注意：这些图片URL需要从实际网站中提取，当前使用的是占位符
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

// 活动图片URL
// 这些是基于网站可能存在的图片路径
// 如果这些URL无法访问，请从网站中手动提取图片URL并更新
const activityImages = {
  'Bellevue Family 4th - 独立日庆典': [
    // 独立日庆典相关图片 - 使用通用的节日图片作为占位符
    'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80', // 烟花
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', // 节日庆典
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', // 家庭活动
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', // 音乐表演
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', // 户外活动
  ],
  'Bellevue Arts Fair Weekend - 艺术博览会': [
    // 艺术博览会相关图片
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80', // 艺术展
    'https://images.unsplash.com/photo-1499781350541-5653a5d5c0a0?w=800&q=80', // 手工艺品
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', // 艺术创作
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80', // 艺术展示
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', // 艺术活动
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', // 艺术表演
  ],
  'Bellevue Downtown Ice Rink - 市中心溜冰场': [
    // 溜冰场相关图片
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80', // 溜冰场
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80', // 滑冰
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80', // 冬季活动
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80', // 溜冰课程
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80', // 家庭滑冰
    'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80', // 节日滑冰
  ]
};

async function updateActivityImages() {
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
    
    console.log(`📋 找到 ${activities.length} 个活动，开始更新图片...\n`);

    let updatedCount = 0;

    for (const activity of activities) {
      const title = activity.title;
      const images = activityImages[title];

      if (images && images.length > 0) {
        const result = await collection.updateOne(
          { _id: activity._id },
          { $set: { images: images } }
        );

        if (result.modifiedCount > 0) {
          console.log(`✅ 已更新: ${title}`);
          console.log(`   图片数量: ${images.length}`);
          updatedCount++;
        } else {
          console.log(`ℹ️  已存在: ${title} (${images.length} 张图片)\n`);
        }
      } else {
        console.log(`⚠️  未找到图片配置: ${title}\n`);
      }
    }

    console.log(`\n✅ 更新完成！共更新 ${updatedCount} 个活动的图片`);
    console.log('\n📝 注意：当前使用的是占位图片（Unsplash）');
    console.log('   如需使用实际网站图片，请从网站中提取图片URL并更新此脚本\n');

  } catch (error) {
    console.error('❌ 更新失败:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('数据库连接已关闭');
    }
  }
}

updateActivityImages();

