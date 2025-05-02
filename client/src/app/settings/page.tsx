export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-100 pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Account Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" placeholder="Maneesh Kumar" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" placeholder="maneesh.kumar@example.com" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full border rounded p-2" />
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="accent-blue-600" />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <span>SMS Alerts</span>
            </label>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="accent-blue-600" />
              <span>Make Profile Public</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <span>Allow Search Engines to Index Profile</span>
            </label>
          </div>
        </section>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded">
          Save Changes
        </button>
      </div>
    </main>
  );
}
