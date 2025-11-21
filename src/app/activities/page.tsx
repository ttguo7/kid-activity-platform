'use client';

import { useState, useEffect } from 'react';
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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/activities');
        
        if (!response.ok) {
          throw new Error(`获取数据失败: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setActivities(result.data);
        } else {
          throw new Error(result.error || '获取数据失败');
        }
      } catch (err) {
        console.error('获取活动数据错误:', err);
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
            <h2 className="text-red-800 text-xl font-semibold mb-2">加载失败</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">亲子活动</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            发现适合您和孩子的精彩活动，创造美好回忆
          </p>
        </div>
        
        {activities.length === 0 ? (
          // 没有活动时的显示
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
            <div className="text-6xl mb-6">👨‍👩‍👧‍👦</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">暂无活动</h3>
            <p className="text-gray-500 mb-8">我们正在筹备更多精彩活动，敬请期待！</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800 text-sm">管理员可前往管理后台添加活动</p>
            </div>
          </div>
        ) : (
          // 有活动时的显示
          <div>
            {/* 活动数量统计 */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
                <span className="text-gray-600 mr-2">共找到</span>
                <span className="text-2xl font-bold text-blue-600 mx-2">{activities.length}</span>
                <span className="text-gray-600 ml-2">个精彩活动</span>
              </div>
            </div>
            
            {/* 活动卡片网格 */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* 图片区域 */}
                  <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center relative">
                    <span className="text-5xl">🎪</span>
                    {/* 价格标签 */}
                    <div className="absolute top-4 right-4">
                      {activity.price === 0 ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          免费参与
                        </span>
                      ) : (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          ¥{activity.price}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-6">
                    {/* 标题和分类 */}
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {activity.title}
                      </h2>
                      {activity.category && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {activity.category}
                        </span>
                      )}
                    </div>
                    
                    {/* 描述 */}
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    {/* 活动信息 */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <span className="w-8 text-lg">📅</span>
                        <div>
                          <div className="font-semibold text-sm">活动日期</div>
                          <div className="text-gray-600">{activity.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <span className="w-8 text-lg">📍</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">活动地点</div>
                          <div className="text-gray-600 line-clamp-2">{activity.location}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <span className="w-8 text-lg">👶</span>
                        <div>
                          <div className="font-semibold text-sm">适合年龄</div>
                          <div className="text-gray-600">{activity.ageRange}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 行动按钮 */}
                    <Link 
                      href={`/activities/${activity.id}`}
                      className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                    >
                      查看详情 & 立即报名
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 底部提示 */}
            <div className="text-center mt-12">
              <p className="text-gray-500 text-sm">
                找不到想要的活动？ <span className="text-blue-500">联系我们</span> 定制专属亲子活动
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}