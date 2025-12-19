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
              One-stop family service solutions for a complete childhood
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
                description: 'Outdoor park activities and nature exploration',
                color: 'category-blue',
                href: '/activities'
              },
              { 
                icon: '🌟', 
                title: 'Faith Experiences', 
                description: 'Cultural and faith experience activities',
                color: 'category-purple',
                href: '/activities?category=文化与信仰'
              },
              { 
                icon: '🔬', 
                title: 'STEAM Education', 
                description: 'Science, Technology, Engineering, Arts, and Mathematics',
                color: 'category-green',
                href: '/activities'
              },
              { 
                icon: '📅', 
                title: 'Weekend Ideas', 
                description: 'Weekend family activity recommendations',
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
              Curated family activities to create wonderful memories
            </p>
          </div>

          <div className="activities-grid">
            {[
              {
                title: 'Weekend Family Baking Class',
                description: 'Make delicious cookies together and develop children\'s hands-on skills',
                image: '🍪',
                tag: 'Popular'
              },
              {
                title: 'Nature Exploration Journey', 
                description: 'Park plant recognition and outdoor adventure activities',
                image: '🌳',
                tag: 'New'
              },
              {
                title: 'Science Experiment Workshop',
                description: 'Fun physics and chemistry experiments to spark curiosity',
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
                    Explore More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/activities" className="view-all-button">
              View All Activities →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}