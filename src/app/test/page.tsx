export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-8">
      {/* 测试1: 纯CSS背景 */}
      <div 
        className="w-64 h-64 border-4 border-red-500 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="text-white text-center pt-4">测试1: CSS背景</div>
      </div>

      {/* 测试2: img标签 */}
      <div className="w-64 h-64 border-4 border-green-500 overflow-hidden">
        <img 
          src="/images/hero.jpg" 
          alt="测试" 
          className="w-full h-full object-cover"
        />
        <div className="text-white text-center pt-2">测试2: img标签</div>
      </div>

      {/* 测试3: 网络图片 */}
      <div 
        className="w-64 h-64 border-4 border-blue-500 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516627145497-ae69578cf5d6?w=400&q=80')" }}
      >
        <div className="text-white text-center pt-4">测试3: 网络图片</div>
      </div>

      <div className="mt-8 text-center">
        <p>访问: https://kid-activity-platform.vercel.app/test</p>
        <p>看看哪个能显示图片</p>
      </div>
    </div>
  );
}