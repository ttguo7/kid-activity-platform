import Link from 'next/link';
import { MongoClient } from 'mongodb';

// 定义活动类型
interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  ageRange: string;
  price: number;
  images: string[];
  category: string;
  status: string;
}

// 直接连接数据库获取数据，不通过API
async function getActivities(): Promise<Activity[]> {
  let client;
  try {
    console.log('=== 🚨 服务器端直接获取数据 ===');
    
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI 未设置');
      return [];
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('kid-activity-platform');
    const activities = await db.collection('activities').find({}).toArray();
    
    console.log(`✅ 直接获取到 ${activities.length} 个活动`);
    
    // 将 MongoDB 的 _id 转换为字符串
    return activities.map(activity => ({
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
    
  } catch (error) {
    console.error('💥 直接获取数据错误:', error);
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export default async function ActivitiesPage() {
  console.log('=== 🎬 页面组件开始渲染 ===');
  const activities = await getActivities();
  console.log('📊 最终活动数据:', activities.length);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">亲子活动</h1>
          <Link 
            href="/admin"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + 添加活动
          </Link>
        </div>
        
        {/* 调试信息 - 生产环境可以移除 */}
        <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-yellow-800">调试信息</h3>
          <p>活动数量: {activities.length}</p>
          <p>环境: {process.env.NODE_ENV}</p>
          <p>数据获取方式: 直接数据库连接</p>
        </div>
        
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg mb-2">暂无活动</p>
            <p className="text-gray-400 mb-6">欢迎添加第一个亲子活动</p>
            <Link 
              href="/admin"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              添加活动
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 flex-1">
                      {activity.title}
                    </h2>
                    {activity.price === 0 && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">
                        免费
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-16 text-gray-400">📅</span>
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-gray-400">📍</span>
                      <span className="flex-1">{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-gray-400">👶</span>
                      <span>{activity.ageRange}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-lg font-bold text-green-600">
                        {activity.price === 0 ? '免费' : `¥${activity.price}`}
                      </span>
                      <Link 
                        href={`/activities/${activity.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}