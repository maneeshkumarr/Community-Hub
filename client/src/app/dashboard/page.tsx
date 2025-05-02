export default function DashboardPage() {
  const stats = [
    { label: 'Posts', value: 24 },
    { label: 'Comments', value: 135 },
    { label: 'Likes', value: 842 },
  ];

  const activities = [
    { id: 1, description: 'You commented on "Mental Health Awareness"', time: '2 hours ago' },
    { id: 2, description: 'You liked "Job Fair 2025"', time: '5 hours ago' },
    { id: 3, description: 'You posted "Volunteer Program Update"', time: 'Yesterday' },
  ];

  return (
    <main className="min-h-screen bg-[#f1fdf3] pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#183B4E] mb-6">Welcome, Maneesh 👋</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-2xl font-semibold text-[#2e7d32]">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-[#183B4E] mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="border-b pb-2">
                <p>{activity.description}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
