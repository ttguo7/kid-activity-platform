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
    const response = await fetch('https://kid-activity-platform.vercel.app/api/activities', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log('获取活动数据错误:', error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 只保留标题，移除添加活动按钮 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">亲子活动</h1>
        </div>
        
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg mb-2">暂无活动数据</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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