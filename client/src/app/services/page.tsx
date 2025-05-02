'use client';

import { HeartPulse, Gavel, GraduationCap, Home, Briefcase } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      name: 'Healthcare Support',
      description: 'Access local health clinics, hospitals, and emergency services in your area.',
      icon: <HeartPulse className="text-[#183B4E] w-6 h-6" />,
    },
    {
      name: 'Legal Assistance',
      description: 'Free or affordable legal consultation and rights awareness programs.',
      icon: <Gavel className="text-[#183B4E] w-6 h-6" />,
    },
    {
      name: 'Education Aid',
      description: 'Resources for scholarships, tuition support, and nearby institutions.',
      icon: <GraduationCap className="text-[#183B4E] w-6 h-6" />,
    },
    {
      name: 'Housing Help',
      description: 'Government housing schemes, rent support, and shelter availability.',
      icon: <Home className="text-[#183B4E] w-6 h-6" />,
    },
    {
      name: 'Employment Services',
      description: 'Find local job opportunities, skill training, and job fairs.',
      icon: <Briefcase className="text-[#183B4E] w-6 h-6" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f1fdf3] pt-20 px-6 pb-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#183B4E] mb-6">🔧 Services</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow border-l-4 border-[#56b870] flex items-start gap-4"
            >
              <div className="bg-[#d1edc4] p-2 rounded">
                {service.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#183B4E]">{service.name}</h2>
                <p className="text-gray-700 text-sm mt-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
