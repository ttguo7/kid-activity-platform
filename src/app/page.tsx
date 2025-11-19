export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Hello, 亲子活动平台!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          我们的 MVP 开发之旅正式开始！🚀
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <p className="text-green-600 font-semibold">
            ✅ Next.js 项目创建成功<br/>
            ✅ Tailwind CSS 已配置<br/>
            ✅ TypeScript 已就绪
          </p>
        </div>
      </div>
    </div>
  );
}