import Link from 'next/link';
import './home.css';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 英雄区域 - 纯CSS方案 */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="content-wrapper">
            <h1 className="hero-title">
              Our
              <br />
              <span className="hero-highlight">Exciting</span>
              <br />
              Kids Bootcamp
              <br />
              Program
            </h1>
            
            <p className="hero-description">
              一站式家庭服务解决方案，给孩子们一个完整的童年
            </p>
            
            <div className="hero-buttons">
              <Link href="/activities" className="btn-primary">
                Get Started
              </Link>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 分类区域 */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-description">
            Discover the perfect activities for your family
          </p>
          
          <div className="categories-grid">
            {[
              { 
                icon: '🎪', 
                title: 'Park Activities', 
                description: '户外公园活动与自然探索',
                color: 'category-blue',
                href: '/activities'
              },
              { 
                icon: '🌟', 
                title: 'Faith Experiences', 
                description: '文化与信仰体验活动',
                color: 'category-purple',
                href: '/activities?category=文化与信仰'
              },
              { 
                icon: '🔬', 
                title: 'STEAM Education', 
                description: '科学科技工程艺术数学',
                color: 'category-green',
                href: '/activities'
              },
              { 
                icon: '📅', 
                title: 'Weekend Ideas', 
                description: '周末家庭活动推荐',
                color: 'category-yellow',
                href: '/activities'
              }
            ].map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className={`category-card ${category.color}`}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 特色活动区域 */}
      <section className="activities-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Family Activities</h2>
            <p className="section-description">
              精选亲子活动，创造美好回忆
            </p>
          </div>

          <div className="activities-grid">
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
              <div key={index} className="activity-card">
                <div className="activity-image">
                  <span className="activity-emoji">{activity.image}</span>
                  <div className="activity-tag">
                    <span>{activity.tag}</span>
                  </div>
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                  <Link href="/activities" className="activity-button">
                    探索更多
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/activities" className="view-all-button">
              查看所有活动 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}