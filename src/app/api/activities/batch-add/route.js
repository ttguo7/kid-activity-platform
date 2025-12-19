import { MongoClient } from 'mongodb'

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

export async function POST(request) {
  let client;
  try {
    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    const collection = db.collection('activities');
    
    // 检查是否已存在这些活动（根据标题）
    const existingTitles = await collection.find({
      title: { $in: activities.map(a => a.title) }
    }).toArray();
    
    const existingTitleSet = new Set(existingTitles.map(a => a.title));
    const newActivities = activities.filter(a => !existingTitleSet.has(a.title));
    
    if (newActivities.length === 0) {
      return Response.json({ 
        success: true, 
        message: '所有活动已存在，无需重复添加',
        added: 0,
        skipped: activities.length
      });
    }
    
    // 插入新活动
    const result = await collection.insertMany(newActivities);
    
    return Response.json({ 
      success: true, 
      message: `成功添加 ${result.insertedCount} 个活动`,
      added: result.insertedCount,
      skipped: activities.length - result.insertedCount,
      ids: Object.values(result.insertedIds).map(id => id.toString())
    });
    
  } catch (error) {
    console.error('批量添加活动错误:', error);
    return Response.json({ 
      success: false, 
      error: '批量添加活动失败: ' + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

