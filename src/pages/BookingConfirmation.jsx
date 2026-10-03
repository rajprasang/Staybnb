import {
  CheckCircle,
  Home,
  MapPin,
  CalendarDays,
  Users,
  Moon,
  ArrowRight,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state;

  // No booking data
  if (!booking) {
    return (
      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F3]">
            <Home
              size={28}
              className="text-[#FF385C]"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Booking not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We couldn't find any booking information.
            Please select a property and try again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-7 w-full rounded-xl bg-[#FF385C] py-3.5 text-sm font-semibold text-white transition hover:bg-[#E31C5F]"
          >
            Explore stays
          </button>

        </div>
      </main>
    );
  }

  const {
    property,
    checkIn,
    checkOut,
    guests,
    nights,
    totalPrice,
  } = booking;

  // Format date
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-[calc(100vh-76px)] bg-gradient-to-b from-[#FFF8F9] via-white to-white">

      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">

        {/* Success Header */}
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0F3]">
            <CheckCircle
              size={48}
              strokeWidth={1.8}
              className="text-[#FF385C]"
            />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF385C]">
            Reservation complete
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Booking confirmed!
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            Your stay has been successfully reserved.
            We hope you have an amazing trip.
          </p>

        </div>

        {/* Booking Card */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.07)]">

          {/* Property */}
          <div className="grid md:grid-cols-[280px_1fr]">

            {/* Image */}
            <div className="h-64 md:h-full">

              <img
                src={property.image}
                alt={property.title}
                className="h-full w-full object-cover"
              />

            </div>

            {/* Property Information */}
            <div className="p-6 sm:p-8">

              <div className="flex flex-wrap items-center gap-2">

                {property.rating >= 4.8 && (
                  <span className="rounded-full bg-[#FFF0F3] px-3 py-1 text-xs font-semibold text-[#E31C5F]">
                    Guest favourite
                  </span>
                )}

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {property.category}
                </span>

              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {property.title}
              </h2>

              <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin size={15} />

                {property.location}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  ★ {property.rating}
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span>
                  ₹
                  {property.price.toLocaleString(
                    "en-IN"
                  )}{" "}
                  / night
                </span>
              </div>

            </div>
          </div>

          {/* Booking Details */}
          <div className="border-t border-gray-200 p-6 sm:p-8">

            <h3 className="text-lg font-bold text-gray-900">
              Your trip
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Check-in */}
              <div className="rounded-2xl bg-gray-50 p-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F3]">
                  <CalendarDays
                    size={17}
                    className="text-[#FF385C]"
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-gray-500">
                  Check-in
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatDate(checkIn)}
                </p>

              </div>

              {/* Check-out */}
              <div className="rounded-2xl bg-gray-50 p-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F3]">
                  <CalendarDays
                    size={17}
                    className="text-[#FF385C]"
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-gray-500">
                  Check-out
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatDate(checkOut)}
                </p>

              </div>

              {/* Guests */}
              <div className="rounded-2xl bg-gray-50 p-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F3]">
                  <Users
                    size={17}
                    className="text-[#FF385C]"
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-gray-500">
                  Guests
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {guests}{" "}
                  {guests === 1
                    ? "Guest"
                    : "Guests"}
                </p>

              </div>

              {/* Nights */}
              <div className="rounded-2xl bg-gray-50 p-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F3]">
                  <Moon
                    size={17}
                    className="text-[#FF385C]"
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-gray-500">
                  Duration
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {nights}{" "}
                  {nights === 1
                    ? "night"
                    : "nights"}
                </p>

              </div>

            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t border-gray-200 bg-gray-50/70 p-6 sm:p-8">

            <h3 className="text-lg font-bold text-gray-900">
              Price summary
            </h3>

            <div className="mt-5 max-w-xl space-y-4">

              <div className="flex justify-between text-sm text-gray-600">

                <span>
                  ₹
                  {property.price.toLocaleString(
                    "en-IN"
                  )}{" "}
                  × {nights}{" "}
                  {nights === 1
                    ? "night"
                    : "nights"}
                </span>

                <span>
                  ₹
                  {(
                    property.price * nights
                  ).toLocaleString("en-IN")}
                </span>

              </div>

              <div className="flex justify-between text-sm text-gray-600">

                <span>
                  Cleaning fee
                </span>

                <span>
                  ₹500
                </span>

              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>
          </div>

        </div>

        {/* Booking Status */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#FFD1DA] bg-[#FFF8F9] p-5">

          <CheckCircle
            size={20}
            className="mt-0.5 shrink-0 text-[#FF385C]"
          />

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Your reservation is confirmed
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Your booking details are shown above.
              Keep this page for your trip information.
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF385C] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E31C5F] hover:shadow-md"
          >
            <Home size={17} />

            Explore more stays
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/property/${property.id}`
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            View property

            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    </main>
  );
};

export default BookingConfirmation;