// src/app/components/Header.tsx
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Community Hub', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Profile', href: '/profile' },
  { name: 'Family Zone', href: '/family-zone' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Community</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="hover:text-green-200 transition-colors duration-200">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-green-800">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="py-2 px-3 rounded hover:bg-green-600 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
