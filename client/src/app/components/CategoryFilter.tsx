
interface Props {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, activeCategory, onSelect }) => (
  <div className="flex flex-wrap gap-2 mb-3">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`px-3 py-1 rounded-full text-sm ${
          activeCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
