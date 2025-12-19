// 从网站提取图片URL
// 这个脚本需要手动运行，或者可以访问网站来提取图片
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

// 手动提取的图片URL - 请从网站中复制实际的图片URL
// 访问这些网站，右键点击图片 -> 复制图片地址，然后替换下面的URL
const activityImages = {
  'Bellevue Family 4th - 独立日庆典': [
    // 请从 https://www.bellevuedowntown.com/bellevue-family-4th 复制实际的图片URL
    // 示例格式（请替换为实际URL）:
    'https://www.bellevuedowntown.com/sites/default/files/2024-07/family-4th-1.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/2024-07/family-4th-2.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/2024-07/family-4th-3.jpg',
  ],
  'Bellevue Arts Fair Weekend - 艺术博览会': [
    // 请从 https://www.bellevueartsfair.com/ 复制实际的图片URL
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-1.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-2.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-3.jpg',
    'https://www.bellevueartsfair.com/wp-content/uploads/2024/07/arts-fair-4.jpg',
  ],
  'Bellevue Downtown Ice Rink - 市中心溜冰场': [
    // 请从 https://www.bellevuedowntown.com/do/bellevue-downtown-ice-rink-presented-by-symetra 复制实际的图片URL
    'https://www.bellevuedowntown.com/sites/default/files/2024-11/ice-rink-1.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/2024-11/ice-rink-2.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/2024-11/ice-rink-3.jpg',
    'https://www.bellevuedowntown.com/sites/default/files/2024-11/ice-rink-4.jpg',
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
    
    console.log(`📋 找到 ${activities.length} 个活动\n`);
    console.log('⚠️  注意：请先手动从网站提取图片URL，然后更新此脚本中的 activityImages 对象\n');

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
          console.log(`   图片数量: ${images.length}\n`);
          updatedCount++;
        }
      }
    }

    console.log(`\n✅ 更新完成！共更新 ${updatedCount} 个活动的图片`);

  } catch (error) {
    console.error('❌ 更新失败:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

updateActivityImages();

