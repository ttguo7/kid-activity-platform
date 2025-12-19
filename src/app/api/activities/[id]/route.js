import { MongoClient, ObjectId } from 'mongodb'

export async function GET(request, context) {
  let client;
  try {
    // 正确的参数获取方式
    const { id } = await context.params;
    console.log('查询的活动ID:', id);

    if (!id) {
      return Response.json({ 
        success: false, 
        error: '活动ID不能为空' 
      }, { status: 400 });
    }

    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    
    let activity;
    
    // 先尝试 ObjectId 查询
    try {
      activity = await db.collection('activities').findOne({ 
        _id: new ObjectId(id) 
      });
    } catch (objectIdError) {
      console.log('ObjectId 转换失败，尝试字符串查询');
      // 如果 ObjectId 转换失败，尝试字符串查询
      activity = await db.collection('activities').findOne({ 
        _id: id 
      });
    }
    
    if (!activity) {
      // 调试：查看数据库中的所有活动
      const allActivities = await db.collection('activities').find({}).toArray();
      console.log('数据库中的所有活动:', allActivities);
      
      return Response.json({ 
        success: false, 
        error: '活动不存在',
        debug: {
          requestedId: id,
          totalActivities: allActivities.length,
          availableIds: allActivities.map(a => a._id.toString())
        }
      }, { status: 404 });
    }
    
    // 格式化返回数据
    const formattedActivity = {
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
    };
    
    return Response.json({ 
      success: true, 
      data: formattedActivity 
    });
    
  } catch (error) {
    console.error('获取活动详情错误:', error);
    return Response.json({ 
      success: false, 
      error: '获取活动详情失败: ' + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// 更新活动
export async function PUT(request, context) {
  let client;
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!id) {
      return Response.json({ 
        success: false, 
        error: 'Activity ID is required' 
      }, { status: 400 });
    }

    // 验证必需字段
    if (!body.title || !body.description) {
      return Response.json({ 
        success: false, 
        error: 'Title and description are required' 
      }, { status: 400 });
    }

    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    
    // 更新活动
    const updateData = {
      title: body.title,
      description: body.description,
      date: body.date || '',
      location: body.location || '',
      ageRange: body.ageRange || '',
      price: body.price || 0,
      images: body.images || [],
      category: body.category || '',
      status: body.status || 'active',
      updatedAt: new Date()
    };

    const result = await db.collection('activities').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return Response.json({ 
        success: false, 
        error: 'Activity not found' 
      }, { status: 404 });
    }

    return Response.json({ 
      success: true, 
      message: 'Activity updated successfully',
      id: id
    });
    
  } catch (error) {
    console.error('Update activity error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to update activity: ' + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// 删除活动
export async function DELETE(request, context) {
  let client;
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json({ 
        success: false, 
        error: 'Activity ID is required' 
      }, { status: 400 });
    }

    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    
    const result = await db.collection('activities').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return Response.json({ 
        success: false, 
        error: 'Activity not found' 
      }, { status: 404 });
    }

    return Response.json({ 
      success: true, 
      message: 'Activity deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete activity error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to delete activity: ' + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}