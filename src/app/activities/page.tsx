import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 英雄区域 - 强制修复版 */}
      <section 
        className="relative min-h-screen flex items-center justify-start pt-20 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hero.jpg')"
        }}
      >
        {/* 文字内容 */}
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our
              <br />
              <span className="text-yellow-400">Exciting</span>
              <br />
              Kids Bootcamp
              <br />
              Program
            </h1>
            
            <p className="text-xl text-white mb-8 opacity-90 max-w-lg">
              一站式家庭服务解决方案，给孩子们一个完整的童年
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/activities"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition shadow-lg text-center"
              >
                Get Started
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition text-center">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 分类区域 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover the perfect activities for your family
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: '🎪', 
                title: 'Park Activities', 
                description: '户外公园活动与自然探索',
                color: 'bg-blue-50',
                textColor: 'text-blue-900'
              },
              { 
                icon: '🌟', 
                title: 'Faith Experiences', 
                description: '文化与信仰体验活动',
                color: 'bg-purple-50', 
                textColor: 'text-purple-900'
              },
              { 
                icon: '🔬', 
                title: 'STEAM Education', 
                description: '科学科技工程艺术数学',
                color: 'bg-green-50',
                textColor: 'text-green-900'
              },
              { 
                icon: '📅', 
                title: 'Weekend Ideas', 
                description: '周末家庭活动推荐',
                color: 'bg-yellow-50',
                textColor: 'text-yellow-900'
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className={`${category.color} ${category.textColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特色活动区域 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Family Activities
            </h2>
            <p className="text-gray-600 text-lg">
              精选亲子活动，创造美好回忆
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: '周末亲子烘焙课',
                description: '一起制作美味饼干，培养孩子动手能力',
                image: '🍪',
                tag: 'Popular'
              },
              {
                title: '自然探索之旅', 
                description: '公园植物认知与户外探险活动',
                image: '🌳',
                tag: 'New'
              },
              {
                title: '科学实验工作坊',
                description: '有趣的物理化学实验，激发好奇心',
                image: '🧪',
                tag: 'Educational'
              }
            ].map((activity, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center relative">
                  <span className="text-6xl">{activity.image}</span>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                      {activity.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 mb-6">{activity.description}</p>
                  <Link 
                    href="/activities"
                    className="block w-full bg-blue-900 text-white text-center py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
                  >
                    探索更多
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/activities"
              className="inline-block bg-white border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-900 hover:text-white transition"
            >
              查看所有活动 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}