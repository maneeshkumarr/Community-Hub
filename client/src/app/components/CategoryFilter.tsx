// src/app/components/CategoryFilter.tsx
import React from 'react';

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-3 py-1 rounded border ${
            activeCategory === category
              ? 'bg-green-700 text-white'
              : 'bg-white text-black border-green-700'
          } hover:bg-green-600 hover:text-white`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
