import Link from 'next/link';

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

// 从API获取活动数据
async function getActivities(): Promise<Activity[]> {
  try {
    // 修复：线上环境使用正确的URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://kid-activity-platform.vercel.app`
      : 'http://localhost:3000';
    
    console.log('🔄 获取活动数据，URL:', `${baseUrl}/api/activities`);
    
    const response = await fetch(`${baseUrl}/api/activities`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('📡 响应状态:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('📦 API返回数据:', result);
    
    if (result.success) {
      console.log(`✅ 获取到 ${result.data.length} 个活动`);
      return result.data;
    } else {
      console.error('❌ API返回错误:', result.error);
      return [];
    }
  } catch (error) {
    console.error('💥 获取活动数据错误:', error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

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
        
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg mb-2">暂无活动数据</p>
            <p className="text-gray-400 mb-6">快来添加第一个亲子活动吧！</p>
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
                      <span className="w-20 text-gray-400">📅 日期</span>
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">📍 地点</span>
                      <span className="flex-1">{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">👶 年龄</span>
                      <span>{activity.ageRange}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">🏷️ 分类</span>
                      <span>{activity.category || '亲子活动'}</span>
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
        
        {/* 调试信息 - 上线前可以删除 */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
          <p>调试信息: 共 {activities.length} 个活动</p>
          <p>活动ID: {activities.map(a => a.id).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}