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
    console.log('=== 🚨 服务器端调试开始 ===');
    
    // 使用固定URL确保线上环境正常工作
    const baseUrl = 'https://kid-activity-platform.vercel.app';
    console.log('🔄 获取活动数据，URL:', `${baseUrl}/api/activities`);
    
    const response = await fetch(`${baseUrl}/api/activities`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('📡 响应状态:', response.status);
    console.log('📡 响应OK:', response.ok);
    
    if (!response.ok) {
      console.log('❌ HTTP错误:', response.status);
      return [];
    }
    
    const result = await response.json();
    console.log('📦 API返回结果 success:', result.success);
    console.log('📦 API返回数据长度:', result.data?.length || 0);
    
    if (result.success) {
      console.log(`✅ 获取到 ${result.data.length} 个活动`);
      console.log('📋 活动标题:', result.data.map((a: any) => a.title));
      return result.data;
    } else {
      console.log('❌ API返回错误:', result.error);
      return [];
    }
  } catch (error) {
    console.log('💥 获取活动数据错误:', error);
    return [];
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
        
        {/* 调试信息 - 始终显示 */}
        <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-yellow-800">调试信息</h3>
          <p>活动数量: {activities.length}</p>
          <p>环境: {process.env.NODE_ENV}</p>
          <p>VERCEL_URL: {process.env.VERCEL_URL || '未设置'}</p>
        </div>
        
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg mb-2">暂无活动数据</p>
            <p className="text-gray-400 mb-6">API返回了空数据</p>
            <Link 
              href="/admin"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              添加活动
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-green-100 border border-green-400 p-4 rounded-lg mb-6">
              <p className="text-green-800 font-semibold">
                ✅ 成功获取到 {activities.length} 个活动，但可能渲染有问题
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border-2 border-blue-500">
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
                    
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    
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
          </div>
        )}
      </div>
    </div>
  );
}