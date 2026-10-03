import {
  Umbrella,
  Mountain,
  Waves,
  Home,
  Castle,
  Trees,
  Building2,
} from "lucide-react";

import properties from "../data/properties";

const categoryIcons = {
  Beach: Umbrella,
  Mountains: Mountain,
  Lake: Waves,
  Cabins: Home,
  Historical: Castle,
  Countryside: Trees,
  Cities: Building2,
};

const CategoryBar = ({
  selectedCategory,
  onCategoryChange,
}) => {
  // Get unique categories from property data
  const categories = [
    ...new Set(
      properties.map(
        (property) => property.category
      )
    ),
  ];

  return (
    <section className="sticky top-20 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide">

          {/* All */}
          <button
            type="button"
            onClick={() => onCategoryChange("All")}
            className={`relative flex min-w-fit flex-col items-center gap-2 py-5 text-sm transition ${
              selectedCategory === "All"
                ? "font-medium text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Home
              size={23}
              strokeWidth={
                selectedCategory === "All"
                  ? 2
                  : 1.6
              }
            />

            <span>All</span>

            {selectedCategory === "All" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gray-900" />
            )}
          </button>

          {/* Dynamic Categories */}
          {categories.map((category) => {
            const Icon =
              categoryIcons[category] || Home;

            const isSelected =
              selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  onCategoryChange(category)
                }
                className={`relative flex min-w-fit flex-col items-center gap-2 py-5 text-sm transition ${
                  isSelected
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon
                  size={23}
                  strokeWidth={
                    isSelected ? 2 : 1.6
                  }
                />

                <span>{category}</span>

                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gray-900" />
                )}
              </button>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default CategoryBar;