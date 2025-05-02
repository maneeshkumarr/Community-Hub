'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f1fdf3] pt-20 px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Banner */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#183B4E] mb-2">Welcome to Samriddhi Setu 👋</h1>
            <p className="text-gray-700 max-w-md">
              Empowering communities through connection, services, and shared support. Explore posts,
              services, events, and family engagement.
            </p>
          </div>
          <Image
            src="/community-banner.avif"
            alt="Community"
            width={300}
            height={200}
            className="rounded"
          />
        </section>

        {/* Navigation Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sections.map(({ title, href, description, color }, index) => (
            <Link href={href} key={index}>
              <div
                className={`p-6 rounded-lg shadow-md text-white transition-transform transform hover:scale-[1.02] ${color}`}
              >
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-sm">{description}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

const sections = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    description: 'Your personalized dashboard with updates and insights.',
    color: 'bg-[#183B4E]',
  },
  {
    title: 'Community Hub',
    href: '/community',
    description: 'Posts, discussions, and shared community stories.',
    color: 'bg-[#56b870]',
  },
  {
    title: 'Services',
    href: '/services',
    description: 'Health, legal, housing, and employment assistance.',
    color: 'bg-[#388659]',
  },
  {
    title: 'Profile',
    href: '/profile',
    description: 'Your personal details, info, and settings.',
    color: 'bg-[#3b6978]',
  },
  {
    title: 'Family Zone',
    href: '/family-zone',
    description: 'Engage with your family and household members.',
    color: 'bg-[#32746d]',
  },
  {
    title: 'Settings',
    href: '/settings',
    description: 'Manage app preferences and account settings.',
    color: 'bg-[#224957]',
  },
];
