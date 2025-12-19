// 更新活动图片
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

// 活动图片映射
// 注意：这些是网站URL，实际使用时需要从这些网站获取真实的图片URL
// 或者使用这些网站上的OG图片/hero图片
const activityImages = {
  'Bellevue Family 4th - 独立日庆典': [
    'https://www.bellevuedowntown.com/bellevue-family-4th'
  ],
  'Bellevue Arts Fair Weekend - 艺术博览会': [
    'https://www.bellevueartsfair.com/'
  ],
  'Bellevue Downtown Ice Rink - 市中心溜冰场': [
    'https://www.bellevuedowntown.com/do/bellevue-downtown-ice-rink-presented-by-symetra'
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

    // 获取所有活动
    const activities = await collection.find({}).toArray();
    
    console.log(`📋 找到 ${activities.length} 个活动，开始更新图片...\n`);

    let updatedCount = 0;

    for (const activity of activities) {
      const title = activity.title;
      const images = activityImages[title];

      if (images && images.length > 0) {
        // 更新活动图片
        const result = await collection.updateOne(
          { _id: activity._id },
          { $set: { images: images } }
        );

        if (result.modifiedCount > 0) {
          console.log(`✅ 已更新: ${title}`);
          console.log(`   图片: ${images.join(', ')}\n`);
          updatedCount++;
        } else {
          console.log(`ℹ️  无需更新: ${title} (图片已存在)\n`);
        }
      } else {
        console.log(`⚠️  未找到图片配置: ${title}\n`);
      }
    }

    console.log(`\n✅ 更新完成！共更新 ${updatedCount} 个活动的图片`);

    // 列出更新后的活动
    console.log('\n📋 更新后的活动列表：\n');
    const updatedActivities = await collection.find({}).toArray();
    updatedActivities.forEach((activity, index) => {
      console.log(`${index + 1}. ${activity.title}`);
      console.log(`   ID: ${activity._id}`);
      console.log(`   图片: ${activity.images && activity.images.length > 0 ? activity.images.join(', ') : '无'}`);
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

updateActivityImages();

