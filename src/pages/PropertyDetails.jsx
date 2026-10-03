import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  ShieldCheck,
  BedDouble,
  Users,
  Bath,
  Home,
} from "lucide-react";

import { useState } from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import properties from "../data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchFilters = location.state?.searchFilters;

  const [checkIn, setCheckIn] = useState(
    searchFilters?.checkIn || ""
  );

  const [checkOut, setCheckOut] = useState(
    searchFilters?.checkOut || ""
  );

  const [guests, setGuests] = useState(
    searchFilters?.guests || 1
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F3] text-2xl">
            🏡
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The property you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-full bg-[#FF385C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E31C5F]"
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const difference =
      endDate.getTime() - startDate.getTime();

    const nights =
      difference / (1000 * 60 * 60 * 24);

    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();

  // Price calculation
  const stayPrice = property.price * nights;

  const cleaningFee = nights > 0 ? 500 : 0;

  const totalPrice = stayPrice + cleaningFee;

  // Reserve property
  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert(
        "Please select check-in and check-out dates."
      );
      return;
    }

    if (nights <= 0) {
      alert(
        "Check-out date must be after check-in date."
      );
      return;
    }

    if (guests > property.guests) {
      alert(
        `This property can accommodate up to ${property.guests} guests.`
      );
      return;
    }

    navigate("/booking-confirmation", {
      state: {
        property,
        checkIn,
        checkOut,
        guests,
        nights,
        totalPrice,
      },
    });
  };

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-[#FF385C]"
        >
          <ArrowLeft size={18} />

          Back to stays
        </button>

        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              {property.rating >= 4.8 && (
                <span className="inline-flex items-center rounded-full bg-[#FFF0F3] px-3 py-1 text-xs font-semibold text-[#E31C5F]">
                  Guest favourite
                </span>
              )}

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {property.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">

                <span className="flex items-center gap-1 font-semibold text-gray-900">
                  <Star
                    size={15}
                    fill="currentColor"
                    className="text-[#FF385C]"
                  />

                  {property.rating}
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span className="flex items-center gap-1 text-gray-600">
                  <MapPin size={15} />

                  {property.location}
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span className="text-gray-600">
                  {property.category}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">

              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Share size={16} />

                <span className="hidden sm:inline">
                  Share
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsFavorite(!isFavorite)
                }
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Heart
                  size={16}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                  className={
                    isFavorite
                      ? "text-[#FF385C]"
                      : ""
                  }
                />

                <span className="hidden sm:inline">
                  {isFavorite ? "Saved" : "Save"}
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* Property Image */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
          <img
            src={property.image}
            alt={property.title}
            className="h-[300px] w-full object-cover transition duration-500 hover:scale-[1.01] sm:h-[430px] lg:h-[520px]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow-sm">
            <Star
              size={14}
              fill="currentColor"
              className="text-[#FF385C]"
            />

            {property.rating}
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_390px]">

          {/* Left Content */}
          <div>

            {/* Property Summary */}
            <div className="border-b border-gray-200 pb-8">

              <h2 className="text-2xl font-bold text-gray-900">
                {property.title}
              </h2>

              <p className="mt-2 text-gray-500">
                {property.category} stay in{" "}
                {property.location}
              </p>

              {/* Property Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

                <div className="rounded-2xl bg-gray-50 p-4">
                  <Users
                    size={20}
                    className="text-[#FF385C]"
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    Guests
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {property.guests}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <BedDouble
                    size={20}
                    className="text-[#FF385C]"
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    Bedrooms
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {property.bedrooms}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <BedDouble
                    size={20}
                    className="text-[#FF385C]"
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    Beds
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {property.beds}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <Bath
                    size={20}
                    className="text-[#FF385C]"
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    Bathrooms
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {property.bathrooms}
                  </p>
                </div>

              </div>
            </div>

            {/* Highlights */}
            <div className="grid gap-5 border-b border-gray-200 py-8 sm:grid-cols-3">

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F3] text-[#FF385C]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Great stay
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Highly rated by previous guests.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F3] text-[#FF385C]">
                  <MapPin size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Great location
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Explore the destination with ease.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F3] text-[#FF385C]">
                  <Star
                    size={19}
                    fill="currentColor"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Guest favourite
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Loved for its overall experience.
                  </p>
                </div>
              </div>

            </div>

            {/* About */}
            <div className="border-b border-gray-200 py-8">

              <h2 className="text-2xl font-bold text-gray-900">
                About this place
              </h2>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-gray-600">
                {property.description}
              </p>

            </div>

            {/* Location */}
            <div className="py-8">

              <h2 className="text-2xl font-bold text-gray-900">
                Where you'll be
              </h2>

              <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-[#FFF0F3]">

                <div className="text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <MapPin
                      size={28}
                      className="text-[#FF385C]"
                    />
                  </div>

                  <p className="mt-4 font-semibold text-gray-900">
                    {property.location}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore this beautiful destination
                  </p>

                </div>

              </div>

            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:relative">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:sticky lg:top-28">

              {/* Price */}
              <div className="flex items-end justify-between">

                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{property.price.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-sm text-gray-500">
                    night
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-[#FF385C]"
                  />

                  {property.rating}
                </div>

              </div>

              {/* Booking Inputs */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-300">

                <div className="grid grid-cols-2">

                  {/* Check-in */}
                  <div className="border-r border-gray-300 p-4">

                    <label
                      htmlFor="checkIn"
                      className="block text-[11px] font-bold uppercase tracking-wide text-gray-700"
                    >
                      Check-in
                    </label>

                    <input
                      id="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(event) =>
                        setCheckIn(event.target.value)
                      }
                      className="mt-2 w-full bg-transparent text-sm text-gray-800 outline-none"
                    />

                  </div>

                  {/* Check-out */}
                  <div className="p-4">

                    <label
                      htmlFor="checkOut"
                      className="block text-[11px] font-bold uppercase tracking-wide text-gray-700"
                    >
                      Check-out
                    </label>

                    <input
                      id="checkOut"
                      type="date"
                      value={checkOut}
                      min={checkIn || undefined}
                      onChange={(event) =>
                        setCheckOut(event.target.value)
                      }
                      className="mt-2 w-full bg-transparent text-sm text-gray-800 outline-none"
                    />

                  </div>

                </div>

                {/* Guests */}
                <div className="border-t border-gray-300 p-4">

                  <label
                    htmlFor="guests"
                    className="block text-[11px] font-bold uppercase tracking-wide text-gray-700"
                  >
                    Guests
                  </label>

                  <select
                    id="guests"
                    value={guests}
                    onChange={(event) =>
                      setGuests(
                        Number(event.target.value)
                      )
                    }
                    className="mt-2 w-full bg-transparent text-sm text-gray-800 outline-none"
                  >
                    {Array.from(
                      {
                        length: property.guests,
                      },
                      (_, index) => index + 1
                    ).map((count) => (
                      <option
                        key={count}
                        value={count}
                      >
                        {count}{" "}
                        {count === 1
                          ? "Guest"
                          : "Guests"}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      ₹
                      {property.price.toLocaleString(
                        "en-IN"
                      )}{" "}
                      × {nights} nights
                    </span>

                    <span>
                      ₹
                      {stayPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Cleaning fee
                    </span>

                    <span>
                      ₹
                      {cleaningFee.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">

                    <span>Total</span>

                    <span>
                      ₹
                      {totalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>
              )}

              {/* Reserve */}
              <button
                type="button"
                onClick={handleReserve}
                className="mt-6 w-full rounded-xl bg-[#FF385C] py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#E31C5F] hover:shadow-md"
              >
                Reserve
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                You won't be charged until you confirm.
              </p>

              {/* Capacity */}
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500">
                <Home size={15} />

                Up to {property.guests} guests
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;