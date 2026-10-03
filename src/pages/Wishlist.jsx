import {
  Heart,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import PropertyCard from "../components/PropertyCard";

import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  return (
    <main className="min-h-[calc(100vh-76px)] bg-white">

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-[#FF385C]"
        >
          <ArrowLeft size={18} />

          Back to stays
        </button>

        {/* Header */}
        <div className="flex items-end justify-between">

          <div>

            <div className="mb-3 flex items-center gap-2">
              <Heart
                size={19}
                fill="currentColor"
                className="text-[#FF385C]"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF385C]">
                Your collection
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Wishlist
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "stay"
                : "stays"}{" "}
              saved
            </p>

          </div>

        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="mt-12 flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-[#FFF8F9]">

            <div className="max-w-md px-6 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F3]">
                <Heart
                  size={28}
                  className="text-[#FF385C]"
                />
              </div>

              <h2 className="mt-6 text-xl font-bold text-gray-900">
                Your wishlist is empty
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Save your favourite stays by clicking
                the heart icon. They'll appear here so
                you can easily find them later.
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-7 rounded-xl bg-[#FF385C] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E31C5F] hover:shadow-md"
              >
                Explore stays
              </button>

            </div>

          </div>
        ) : (
          /* Wishlist Grid */
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlist.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                searchFilters={{
                  destination: "",
                  checkIn: "",
                  checkOut: "",
                  guests: 1,
                }}
              />
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default Wishlist;