'use client';

import Image from 'next/image';

export default function FamilyZone() {
  const familyMembers = [
    {
      name: 'Maneesh Kumar',
      relation: 'Self',
      photo: '/profile.jpg',
    },
    {
      name: 'Sushma Devi',
      relation: 'Mother',
      photo: '/mother.jpg',
    },
    {
      name: 'Ravi Kumar',
      relation: 'Father',
      photo: '/father.jpg',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f1fdf3] pt-20 px-6 pb-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#183B4E] mb-6">👨‍👩‍👧‍👦 Family Zone</h1>

        {/* Family Members */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#183B4E] mb-4">Family Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {familyMembers.map((member, index) => (
              <div key={index} className="bg-[#d1edc4] p-4 rounded shadow text-center">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-2 border-2 border-[#183B4E]"
                />
                <p className="font-semibold text-[#183B4E]">{member.name}</p>
                <p className="text-gray-600">{member.relation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shared Activities */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#183B4E] mb-4">Family Activities</h2>
          <ul className="list-disc pl-5 text-gray-800 space-y-2">
            <li>Plan monthly get-togethers</li>
            <li>Share achievements and moments</li>
            <li>Create a family task board</li>
          </ul>
        </section>

        {/* Shared Resources */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#183B4E] mb-4">Shared Resources</h2>
          <ul className="text-gray-800 space-y-2">
            <li>📄 Family medical history</li>
            <li>🏠 Property records</li>
            <li>💳 Budget & expenses</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
