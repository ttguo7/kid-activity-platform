import Link from 'next/link'

// 临时测试数据 - 稍后从数据库获取
const testActivities = [
  {
    id: '1',
    title: '周末亲子绘画课',
    description: '适合3-6岁孩子的创意绘画活动',
    date: '2025-11-25',
    location: '北京朝阳区艺术中心',
    ageRange: '3-6岁',
    price: 120
  },
  {
    id: '2', 
    title: '儿童科学实验营',
    description: '探索科学奥秘，培养孩子好奇心',
    date: '2025-11-26',
    location: '上海科技馆',
    ageRange: '5-8岁',
    price: 180
  }
]

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">亲子活动</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testActivities.map((activity) => (
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
      </div>
    </div>
  )
}