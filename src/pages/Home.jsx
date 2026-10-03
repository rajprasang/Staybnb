import { useState } from "react";

import SearchBar from "../components/SearchBar";
import CategoryBar from "../components/CategoryBar";
import PropertyGrid from "../components/PropertyGrid";

const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setSelectedCategory("All");
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200">
        {/* Background decoration */}
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#FFE4EA] blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#FFF0F3] blur-3xl" />

        <div className="relative mx-auto flex min-h-[470px] max-w-7xl flex-col items-center justify-center px-6 py-16">
          {/* Hero Text */}
          <div className="max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#FFD1DA] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E31C5F] shadow-sm">
              Your perfect getaway
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find your
              <span className="text-[#FF385C]">
                {" "}
                next stay
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Discover beautiful places to stay, from
              peaceful mountain cabins to relaxing beach
              houses.
            </p>
          </div>

          {/* Search */}
          <div className="mt-12 w-full">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Small trust indicators */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
            <span>✦ Unique stays</span>
            <span>✦ Great locations</span>
            <span>✦ Easy booking</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Properties */}
      <PropertyGrid
        selectedCategory={selectedCategory}
        searchQuery={searchFilters.destination}
        searchFilters={searchFilters}
      />
    </main>
  );
};

export default Home;