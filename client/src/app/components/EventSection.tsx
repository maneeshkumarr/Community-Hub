'use client';
import React from 'react';

interface Event {
  title: string;
  date: string;
  location: string;
}

interface EventSectionProps {
  events: Event[];
}

const EventSection: React.FC<EventSectionProps> = ({ events }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{event.date}</p>
            <p className="text-sm text-gray-600">{event.location}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
