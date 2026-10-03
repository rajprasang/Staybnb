import { Heart, Star } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

const PropertyCard = ({
  property,
  searchFilters,
}) => {
  const navigate = useNavigate();

  const {
    isFavorite,
    toggleWishlist,
  } = useWishlist();

  const favorite = isFavorite(property.id);

  const handleCardClick = () => {
    navigate(`/property/${property.id}`, {
      state: {
        searchFilters,
      },
    });
  };

  const handleFavorite = (event) => {
    event.stopPropagation();

    toggleWishlist(property);
  };

  return (
    <article
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">

        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
        />

        {/* Image Gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Guest Favourite */}
        {property.rating >= 4.8 && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
            Guest favourite
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          onClick={handleFavorite}
          className={`absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition duration-200 hover:scale-110 ${
            property.rating >= 4.8
              ? "top-12"
              : "top-3"
          }`}
        >
          <Heart
            size={19}
            strokeWidth={2}
            className={
              favorite
                ? "text-[#FF385C]"
                : "text-gray-800"
            }
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* Mobile Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold shadow-sm sm:hidden">

          <Star
            size={12}
            fill="currentColor"
          />

          {property.rating}

        </div>
      </div>

      {/* Property Information */}
      <div className="mt-3">

        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-3">

          <h3 className="line-clamp-1 text-[15px] font-semibold text-gray-900">
            {property.title}
          </h3>

          <div className="hidden shrink-0 items-center gap-1 text-sm text-gray-900 sm:flex">

            <Star
              size={13}
              fill="currentColor"
              strokeWidth={1.5}
            />

            <span>
              {property.rating}
            </span>

          </div>
        </div>

        {/* Location */}
        <p className="mt-1 text-sm text-gray-500">
          {property.location}
        </p>

        {/* Category */}
        <p className="mt-1 text-xs text-gray-400">
          {property.category}
        </p>

        {/* Price */}
        <p className="mt-2 text-sm text-gray-900">

          <span className="text-base font-semibold">
            ₹
            {property.price.toLocaleString(
              "en-IN"
            )}
          </span>

          <span className="text-gray-500">
            {" "}
            night
          </span>

        </p>

      </div>
    </article>
  );
};

export default PropertyCard;