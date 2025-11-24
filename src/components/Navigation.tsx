// src/components/Navigation.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container rainbow-nav">
      <div className="nav-content">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-image">
            {/* 保持你的蜜蜂Logo */}
            <img src="/Logo.png" alt="Famzzi" className="logo-img" />
          </div>
          <span className="logo-text">Famzzi</span>
        </Link>

        {/* 桌面端导航链接 */}
        <div className="nav-links">
          <Link href="/" className="nav-link">首页</Link>
          <Link href="/activities" className="nav-link">活动探索</Link>
          <Link href="/about" className="nav-link">关于我们</Link>
          <Link href="/contact" className="nav-link">联系我们</Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button 
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link href="/" className="mobile-link">首页</Link>
          <Link href="/activities" className="mobile-link">活动探索</Link>
          <Link href="/about" className="mobile-link">关于我们</Link>
          <Link href="/contact" className="mobile-link">联系我们</Link>
        </div>
      )}
    </nav>
  );
}