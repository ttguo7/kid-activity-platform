import { MongoClient } from 'mongodb'

export async function GET() {
  let client;
  try {
    console.log('开始连接数据库...')
    
    // 连接数据库
    client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    
    // 测试连接
    await client.db().admin().ping()
    console.log('数据库连接测试通过')
    
    // 确保 activities 集合存在
    const db = client.db('kid-activity-platform')
    const collections = await db.listCollections().toArray()
    const exists = collections.some(col => col.name === 'activities')
    
    let message = '数据库连接成功！'
    if (!exists) {
      await db.createCollection('activities')
      message += ' 并创建了activities集合！'
      console.log('创建了activities集合')
    } else {
      message += ' activities集合已存在。'
    }
    
    return Response.json({ 
      success: true, 
      message: message
    })
    
  } catch (error) {
    console.error('数据库连接错误:', error)
    return Response.json({ 
      success: false, 
      error: '连接失败: ' + error.message 
    }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
      console.log('数据库连接已关闭')
    }
  }
}