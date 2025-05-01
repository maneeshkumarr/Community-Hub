import React from 'react';

type Props = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({ categories, activeCategory, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-full border border-black text-sm font-medium
            ${activeCategory === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-800'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
