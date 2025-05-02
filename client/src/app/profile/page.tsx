import Image from 'next/image';

export default function ProfilePage() {
  const user = {
    name: 'Maneesh Kumar',
    dob: '28/04/2003',
    gender: 'Male',
    email: 'maneeshkumar345645@gmail.com',
    phone: '+91 8792489207',
    address: 'Mangalore, Karnataka, India',
    photo: '/profile.jpg',
  };

  return (
    <main className="min-h-screen bg-[#f1fdf3] pt-20 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={user.photo}
            alt="Profile Photo"
            width={120}
            height={120}
            className="rounded-full mb-4 border-4 border-[#183B4E]"
          />
          <h2 className="text-2xl font-bold text-[#183B4E]">{user.name}</h2>
          <p className="text-gray-600">Date of Birth: {user.dob}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#183B4E]">
          <div className="bg-[#d1edc4] p-4 rounded shadow-sm">
            <p className="font-semibold">Full Name</p>
            <p>{user.name}</p>
          </div>
          <div className="bg-[#d1edc4] p-4 rounded shadow-sm">
            <p className="font-semibold">Gender</p>
            <p>{user.gender}</p>
          </div>
          <div className="bg-[#d1edc4] p-4 rounded shadow-sm">
            <p className="font-semibold">Email</p>
            <p>{user.email}</p>
          </div>
          <div className="bg-[#d1edc4] p-4 rounded shadow-sm">
            <p className="font-semibold">Phone</p>
            <p>{user.phone}</p>
          </div>
          <div className="sm:col-span-2 bg-[#d1edc4] p-4 rounded shadow-sm">
            <p className="font-semibold">Address</p>
            <p>{user.address}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
