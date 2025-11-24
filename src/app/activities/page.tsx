import Link from 'next/link';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  ageRange: string;
  price: number;
  category: string;
  status: string;
}

// 获取活动列表
async function getActivities(): Promise<Activity[]> {
  try {
    const baseUrl = 'https://kid-activity-platform.vercel.app';
    const response = await fetch(`${baseUrl}/api/activities`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.log('获取活动列表失败:', response.status);
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('获取活动列表错误:', error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">所有活动</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            发现适合您家庭的精彩亲子活动
          </p>
        </div>

        {/* 活动列表 */}
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无活动数据</p>
            <Link href="/admin" className="text-blue-500 hover:underline mt-4 inline-block">
              去管理后台添加活动
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  <span className="text-4xl">
                    {activity.category === '户外' ? '🌳' : 
                     activity.category === '艺术' ? '🎨' : 
                     activity.category === '科学' ? '🔬' : '🌟'}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800">{activity.title}</h2>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {activity.price === 0 ? '免费' : `¥${activity.price}`}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">👶</span>
                      <span>{activity.ageRange}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/activities/${activity.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition font-medium"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 返回首页链接 */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}