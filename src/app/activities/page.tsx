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
    const response = await fetch('http://localhost:3000/api/activities', {
      cache: 'no-store' // 确保获取最新数据
    });
    
    if (!response.ok) {
      throw new Error('获取数据失败');
    }
    
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      console.error('API返回错误:', result.error);
      return [];
    }
  } catch (error) {
    console.error('获取活动数据错误:', error);
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">亲子活动</h1>
        
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无活动数据</p>
            <p className="text-gray-400 mt-2">请先添加活动数据到数据库</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {activity.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>📅 日期: {activity.date}</p>
                    <p>📍 地点: {activity.location}</p>
                    <p>👶 适合年龄: {activity.ageRange}</p>
                    <p className="text-lg font-bold text-green-600">¥{activity.price}</p>
                  </div>
                  
                  <Link 
                    href={`/activities/${activity.id}`}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}