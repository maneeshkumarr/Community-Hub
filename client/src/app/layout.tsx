'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Community Hub', path: '/community' },
  { label: 'Services', path: '/services' },
  { label: 'Profile', path: '/profile' },
  { label: 'Family Zone', path: '/family' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-full md:w-64 md:min-h-screen p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">MyApp</h2>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="bg-gray-800 text-white w-full flex md:hidden justify-between items-center p-4">
        <h2 className="text-lg font-bold">MyApp</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-gray-800 text-white p-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
