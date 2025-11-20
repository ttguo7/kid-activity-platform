export default async function DebugPage() {
  const response = await fetch('https://kid-activity-platform.vercel.app/api/activities', {
    cache: 'no-store'
  });
  const result = await response.json();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">调试页面</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">活动数量: {result.data?.length || 0}</h2>
        {result.data?.map((activity: any) => (
          <div key={activity.id} className="border p-2 mb-2">
            <p><strong>标题:</strong> {activity.title}</p>
            <p><strong>ID:</strong> {activity.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}