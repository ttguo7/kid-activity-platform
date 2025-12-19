'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BatchAddPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleBatchAdd = async () => {
    setLoading(true);
    setMessage('');
    setResult(null);

    try {
      const response = await fetch('/api/activities/batch-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.message}`);
        setResult(data);
      } else {
        setMessage(`❌ 添加失败: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ 网络错误: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/admin" className="text-blue-500 hover:underline">
            ← 返回管理后台
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">批量添加活动</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <p className="text-gray-700">
            此操作将添加以下三个活动到数据库：
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
            <li>Bellevue Family 4th - 独立日庆典</li>
            <li>Bellevue Arts Fair Weekend - 艺术博览会</li>
            <li>Bellevue Downtown Ice Rink - 市中心溜冰场</li>
          </ul>

          <button
            onClick={handleBatchAdd}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 font-semibold"
          >
            {loading ? '添加中...' : '批量添加活动'}
          </button>

          {message && (
            <div className={`p-4 rounded-md ${
              message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">添加结果：</h3>
              <p>成功添加: {result.added} 个活动</p>
              <p>跳过: {result.skipped} 个活动（已存在）</p>
              {result.ids && result.ids.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">活动ID：</p>
                  <ul className="list-disc list-inside text-sm">
                    {result.ids.map((id: string) => (
                      <li key={id}>{id}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <Link 
              href="/activities"
              className="text-blue-500 hover:underline"
            >
              查看活动列表 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

