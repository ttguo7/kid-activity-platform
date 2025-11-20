import { MongoClient } from 'mongodb'

export async function GET() {
  let client;
  try {
    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    const activities = await db.collection('activities').find({}).toArray();
    
    // 将 MongoDB 的 _id 转换为字符串
    const formattedActivities = activities.map(activity => ({
      id: activity._id.toString(),
      title: activity.title || '',
      description: activity.description || '',
      date: activity.date || '',
      location: activity.location || '',
      ageRange: activity.ageRange || '',
      price: activity.price || 0,
      images: activity.images || [],
      category: activity.category || '',
      status: activity.status || 'active'
    }));
    
    return Response.json({ 
      success: true, 
      data: formattedActivities 
    });
    
  } catch (error) {
    console.error('获取活动列表错误:', error);
    return Response.json({ 
      success: false, 
      error: '获取数据失败: ' + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// 在 GET 方法后面添加 POST 方法
export async function POST(request) {
  let client;
  try {
    const body = await request.json();
    
    // 验证必需字段
    if (!body.title || !body.description) {
      return Response.json({ 
        success: false, 
        error: '标题和描述是必填字段' 
      }, { status: 400 });
    }

    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    
    // 创建新活动
    const newActivity = {
      title: body.title,
      description: body.description,
      date: body.date || new Date().toISOString().split('T')[0],
      location: body.location || '',
      ageRange: body.ageRange || '',
      price: body.price || 0,
      images: body.images || [],
      category: body.category || '',
      status: 'active',
      createdAt: new Date()
    };
    
    const result = await db.collection('activities').insertOne(newActivity);
    
    return Response.json({ 
      success: true, 
      message: '活动创建成功',
      id: result.insertedId.toString()
    });
    
  } catch (error) {
    console.error('创建活动错误:', error);
    return Response.json({ 
      success: false, 
      error: '创建活动失败: ' + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}