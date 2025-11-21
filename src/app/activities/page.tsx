import Link from 'next/link';

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

async function getActivities(): Promise<Activity[]> {
  try {
    const response = await fetch('https://kid-activity-platform.vercel.app/api/activities', {
      cache: 'no-store',
    });
    
    if (!response.ok) return [];
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 英雄区域 */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            One-Stop Family Life Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            一站式家庭服务解决方案，给孩子们一个完整的童年
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition shadow-lg">
              Get Started
            </button>
            <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-900 hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* 分类网格 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🎪', title: 'Park Activity', color: 'bg-blue-100' },
              { icon: '🌟', title: 'Faith Experience', color: 'bg-purple-100' },
              { icon: '🔬', title: 'STEAM Education', color: 'bg-green-100' },
              { icon: '📅', title: 'Weekend Ideas', color: 'bg-yellow-100' }
            ].map((category, index) => (
              <div key={index} className={`${category.color} rounded-2xl p-6 text-center hover:shadow-lg transition cursor-pointer`}>
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 活动列表 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Fun activities for whole family</h2>
            <div className="flex space-x-4">
              <button className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition">
                This Week's Picks
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-white transition">
                View All
              </button>
            </div>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <p className="text-gray-500 text-lg">正在筹备精彩活动，敬请期待！</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* 图片区域 */}
                  <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 relative">
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex-1 pr-4">
                        {activity.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {activity.category || 'Family Fun'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center">
                        <span className="w-6">📅</span>
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6">📍</span>
                        <span className="flex-1">{activity.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-6">👶</span>
                        <span>{activity.ageRange}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-blue-900">
                        {activity.price === 0 ? '免费' : `¥${activity.price}`}
                      </span>
                      <Link 
                        href={`/activities/${activity.id}`}
                        className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition font-semibold"
                      >
                        立即报名
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}