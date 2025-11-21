'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo 区域 */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/Logo.png" 
              alt="Famzzi" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-yellow-400">Famzzi</span>
          </Link>

          {/* 桌面端菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/activities" 
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              Activities
            </Link>
            <Link 
              href="/destinations" 
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              Destinations
            </Link>
            <Link 
              href="/about" 
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              About
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 py-4 space-y-4">
            <Link 
              href="/" 
              className="block hover:text-yellow-400 transition duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/activities" 
              className="block hover:text-yellow-400 transition duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Activities
            </Link>
            <Link 
              href="/destinations" 
              className="block hover:text-yellow-400 transition duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              href="/about" 
              className="block hover:text-yellow-400 transition duration-300 font-medium"
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