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

// 根据ID获取单个活动详情
async function getActivity(id: string): Promise<Activity | null> {
  try {
    // 使用固定URL确保线上环境正常工作
    const baseUrl = 'https://kid-activity-platform.vercel.app';
    
    const response = await fetch(`${baseUrl}/api/activities/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.log('API响应失败:', response.status);
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('获取活动详情错误:', error);
    return null;
  }
}

// 正确的参数获取方式
export default async function ActivityDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  // 等待 params Promise 解析
  const { id } = await params;
  const activity = await getActivity(id);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">活动不存在</h1>
          <p className="text-gray-600 mb-2">请求的ID: {id}</p>
          <Link href="/activities" className="text-blue-500 hover:underline">
            返回活动列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/activities" className="text-blue-500 hover:underline mb-6 inline-block">
          ← 返回活动列表
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 活动头部 */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">{activity.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>📅 {activity.date}</span>
              <span>📍 {activity.location}</span>
              <span>👶 {activity.ageRange}</span>
              <span className="text-2xl font-bold">
                {activity.price === 0 ? '免费' : `¥${activity.price}`}
              </span>
            </div>
          </div>
          
          {/* 活动内容 */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">活动介绍</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{activity.description}</p>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">活动亮点</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>专业教师指导</li>
                    <li>安全的活动环境</li>
                    <li>丰富的互动环节</li>
                    <li>培养孩子创造力</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">活动信息</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">分类:</span> {activity.category || '亲子活动'}</p>
                    <p><span className="font-medium">适合年龄:</span> {activity.ageRange}</p>
                    <p><span className="font-medium">活动日期:</span> {activity.date}</p>
                    <p><span className="font-medium">活动地点:</span> {activity.location}</p>
                    {activity.price === 0 && (
                      <p className="text-green-600 font-semibold">🎉 免费活动</p>
                    )}
                  </div>
                </div>
                
                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200">
                  {activity.price === 0 ? '免费报名' : `立即报名 ¥${activity.price}`}
                </button>
                
                <div className="text-center text-sm text-gray-500">
                  <p>📞 如有疑问，请联系客服</p>
                  <p>电话: 400-123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}