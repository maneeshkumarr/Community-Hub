// src/app/profile/page.tsx
import Image from 'next/image';

export default function ProfilePage() {
  const user = {
    name: 'Maneesh Kumar',
    dob: '28/04/2003',
    photo: '/profile.jpg', // This should match the uploaded image path in the public folder
  };

  return (
    <main className="min-h-screen bg-gray-100 pt-20 px-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Image
            src={user.photo}
            alt="Profile Photo"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600">Date of Birth: {user.dob}</p>
        </div>
      </div>
    </main>
  );
}
