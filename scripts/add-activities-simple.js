// 简单的添加活动脚本 - 直接读取 .env.local 文件
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
          const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // 移除引号
          process.env[key.trim()] = value.trim();
        }
      }
    }
  } catch (error) {
    console.error('读取 .env.local 文件失败:', error.message);
  }
}

loadEnv();

const activities = [
  {
    title: 'Bellevue Family 4th - 独立日庆典',
    description: `贝尔维尤家庭独立日庆典是东区最大的独立日庆祝活动！每年7月4日在贝尔维尤市中心公园举行，活动包括：

🎵 现场音乐表演
🎪 家庭娱乐活动
🎨 各种趣味互动项目
🎆 壮观的烟花表演

这是一个适合全家参与的盛大节日庆典，为孩子们创造难忘的独立日回忆！`,
    date: '2025-07-04',
    location: 'Bellevue Downtown Park, Bellevue, WA',
    ageRange: '全年龄段',
    price: 0,
    images: ['https://www.bellevuedowntown.com/bellevue-family-4th'],
    category: '节日庆典',
    status: 'active',
    createdAt: new Date()
  },
  {
    title: 'Bellevue Arts Fair Weekend - 艺术博览会',
    description: `贝尔维尤艺术博览周末是一个为期三天的艺术盛会！

🎨 汇集350多位艺术家
🖼️ 展示超过20种艺术形式的手工艺品
🎭 现场表演和互动艺术项目
🍔 美食车和特色小吃

这是一个充满创意和艺术氛围的周末活动，让孩子们接触各种艺术形式，激发创造力和艺术欣赏能力。适合全家一起探索艺术的魅力！`,
    date: '2025-07-25',
    location: 'Bellevue Downtown, Bellevue, WA',
    ageRange: '全年龄段',
    price: 0,
    images: ['https://www.bellevueartsfair.com/'],
    category: '艺术文化',
    status: 'active',
    createdAt: new Date()
  },
  {
    title: 'Bellevue Downtown Ice Rink - 市中心溜冰场',
    description: `贝尔维尤市中心溜冰场由Symetra公司赞助，是西雅图地区最大的露天溜冰场！

⛸️ 9,000平方英尺的真冰场地
🎓 免费滑冰课程
🎉 主题滑冰之夜
🍿 现场小吃和热饮

溜冰场每年11月下旬至次年1月中旬开放，是冬季最受欢迎的亲子活动之一。无论是初学者还是滑冰高手，都能在这里找到乐趣！`,
    date: '2024-11-23',
    location: 'Bellevue Downtown Park Plaza, Bellevue, WA',
    ageRange: '5岁以上',
    price: 0,
    images: ['https://www.bellevuedowntown.com/do/bellevue-downtown-ice-rink-presented-by-symetra'],
    category: '户外运动',
    status: 'active',
    createdAt: new Date()
  }
];

async function addActivities() {
  let client;
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI 环境变量未设置，请检查 .env.local 文件');
    }

    console.log('正在连接数据库...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ 数据库连接成功！');

    const db = client.db('kid-activity-platform');
    const collection = db.collection('activities');

    // 检查是否已存在
    const existingTitles = await collection.find({
      title: { $in: activities.map(a => a.title) }
    }).toArray();
    
    const existingTitleSet = new Set(existingTitles.map(a => a.title));
    const newActivities = activities.filter(a => !existingTitleSet.has(a.title));

    if (newActivities.length === 0) {
      console.log('ℹ️  所有活动已存在，无需重复添加');
      return;
    }

    console.log(`正在添加 ${newActivities.length} 个活动...`);
    const result = await collection.insertMany(newActivities);
    console.log(`✅ 成功添加 ${result.insertedCount} 个活动！\n`);
    
    result.insertedIds.forEach((id, index) => {
      const activity = newActivities[index];
      console.log(`  - ${activity.title}`);
      console.log(`    ID: ${id}`);
    });

    if (existingTitles.length > 0) {
      console.log(`\nℹ️  跳过了 ${existingTitles.length} 个已存在的活动`);
    }

  } catch (error) {
    console.error('❌ 添加活动失败:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n数据库连接已关闭');
    }
  }
}

addActivities();

