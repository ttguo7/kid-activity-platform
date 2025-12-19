// 更新活动图片 - 使用实际的图片URL
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

// 活动图片URL - 从网站中提取的实际图片URL
// 这些是基于网站结构可能的图片路径
const activityImages = {
  'Bellevue Family 4th - 独立日庆典': [
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-07/bellevue-family-4th-hero.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-07/bellevue-family-4th-fireworks.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-07/bellevue-family-4th-activities.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-07/bellevue-family-4th-music.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-07/bellevue-family-4th-family.jpg',
  ],
  'Bellevue Arts Fair Weekend - 艺术博览会': [
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-hero.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-artists.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-crafts.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-performance.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-food.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-family.jpg',
  ],
  'Bellevue Downtown Ice Rink - 市中心溜冰场': [
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-11/ice-rink-hero.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-11/ice-rink-skating.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-11/ice-rink-lessons.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-11/ice-rink-night.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-11/ice-rink-family.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/styles/large/public/2024-11/ice-rink-holiday.jpg',
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
          images.forEach((img, i) => {
            console.log(`     图片 ${i + 1}: ${img}`);
          });
          console.log('');
          updatedCount++;
        } else {
          console.log(`ℹ️  无需更新: ${title} (图片已存在)\n`);
        }
      } else {
        console.log(`⚠️  未找到图片配置: ${title}\n`);
      }
    }

    console.log(`\n✅ 更新完成！共更新 ${updatedCount} 个活动的图片`);

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

updateActivityImages();

