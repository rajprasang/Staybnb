import properties from "../data/properties";
import PropertyCard from "./PropertyCard";

const PropertyGrid = ({
  selectedCategory,
  searchQuery,
  searchFilters,
}) => {
  const filteredProperties = properties.filter(
    (property) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        property.category === selectedCategory;

      // Destination filter
      const query =
        searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        property.title
          .toLowerCase()
          .includes(query) ||
        property.location
          .toLowerCase()
          .includes(query) ||
        property.category
          .toLowerCase()
          .includes(query);

      // Guest filter
      const requestedGuests =
        searchFilters?.guests || 1;

      const matchesGuests =
        property.guests >= requestedGuests;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesGuests
      );
    }
  );

  const requestedGuests =
    searchFilters?.guests || 1;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:py-14">

      {/* Section Header */}
      <div className="mb-8 flex items-end justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF385C]" />

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF385C]">
              Discover
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {searchQuery
              ? `Stays in ${searchQuery}`
              : selectedCategory === "All"
                ? "Explore stays"
                : `${selectedCategory} stays`}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1
              ? "property"
              : "properties"}{" "}
            available
          </p>
        </div>

        {/* Results Badge */}
        <div className="hidden rounded-full border border-[#FFD1DA] bg-[#FFF8F9] px-4 py-2 text-xs font-medium text-[#E31C5F] sm:block">
          {filteredProperties.length} stays
        </div>

      </div>

      {/* Active Guest Filter */}
      {requestedGuests > 1 && (
        <div className="mb-7 flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">

          <span>
            Showing stays for
          </span>

          <span className="font-semibold text-gray-900">
            {requestedGuests}{" "}
            {requestedGuests === 1
              ? "guest"
              : "guests"}
          </span>

        </div>
      )}

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-[#FFF8F9]">

          <div className="max-w-sm px-6 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F3] text-2xl">
              🏡
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              No stays found
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We couldn't find any properties matching
              your search. Try another destination,
              category, or guest count.
            </p>

          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredProperties.map(
            (property) => (
              <PropertyCard
                key={property.id}
                property={property}
                searchFilters={searchFilters}
              />
            )
          )}

        </div>
      )}

    </section>
  );
};

export default PropertyGrid;