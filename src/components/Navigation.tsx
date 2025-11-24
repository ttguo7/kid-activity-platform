'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container rainbow-nav">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo 区域 */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/Logo.png" 
              alt="Famzzi" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold logo-text">Famzzi</span>
          </Link>

          {/* 桌面端菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="nav-link"
            >
              Home
            </Link>
            <Link 
              href="/activities" 
              className="nav-link"
            >
              Activities
            </Link>
            <Link 
              href="/destinations" 
              className="nav-link"
            >
              Destinations
            </Link>
            <Link 
              href="/about" 
              className="nav-link"
            >
              About
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu">
            <Link 
              href="/" 
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/activities" 
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Activities
            </Link>
            <Link 
              href="/destinations" 
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              href="/about" 
              className="mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}