import {
  Search,
  Users,
  CalendarDays,
  X,
} from "lucide-react";

import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");

    // Check-out cannot be selected without check-in
    if (checkOut && !checkIn) {
      setError("Please select a check-in date first.");
      return;
    }

    // Check-out must be after check-in
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);

      if (endDate <= startDate) {
        setError(
          "Check-out date must be after check-in date."
        );
        return;
      }
    }

    onSearch({
      destination: destination.trim(),
      checkIn,
      checkOut,
      guests,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCheckInChange = (event) => {
    const value = event.target.value;

    setCheckIn(value);
    setError("");

    // Reset checkout if it becomes invalid
    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  };

  const handleCheckOutChange = (event) => {
    setCheckOut(event.target.value);
    setError("");
  };

  const clearSearch = () => {
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    setError("");

    onSearch({
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
    });
  };

  const hasSearchValues =
    destination ||
    checkIn ||
    checkOut ||
    guests > 1;

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* Search Box */}
      <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:flex-row md:items-center md:rounded-full">

        {/* Where */}
        <div className="min-w-0 flex-[1.4] px-6 py-4 transition hover:bg-gray-50 md:rounded-l-full">
          <label
            htmlFor="destination"
            className="block text-xs font-semibold text-gray-900"
          >
            Where
          </label>

          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(event) => {
              setDestination(event.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search destinations"
            className="mt-1 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Divider */}
        <div className="hidden h-10 border-l border-gray-200 md:block" />

        {/* Check-in */}
        <div className="min-w-0 flex-1 px-6 py-4 transition hover:bg-gray-50">
          <label
            htmlFor="searchCheckIn"
            className="flex items-center gap-1 text-xs font-semibold text-gray-900"
          >
            <CalendarDays size={13} />

            Check-in
          </label>

          <input
            id="searchCheckIn"
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleCheckInChange}
            className="mt-1 w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Divider */}
        <div className="hidden h-10 border-l border-gray-200 md:block" />

        {/* Check-out */}
        <div className="min-w-0 flex-1 px-6 py-4 transition hover:bg-gray-50">
          <label
            htmlFor="searchCheckOut"
            className="flex items-center gap-1 text-xs font-semibold text-gray-900"
          >
            <CalendarDays size={13} />

            Check-out
          </label>

          <input
            id="searchCheckOut"
            type="date"
            value={checkOut}
            min={
              checkIn
                ? checkIn
                : new Date()
                    .toISOString()
                    .split("T")[0]
            }
            onChange={handleCheckOutChange}
            className="mt-1 w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Divider */}
        <div className="hidden h-10 border-l border-gray-200 md:block" />

        {/* Guests */}
        <div className="flex min-w-0 flex-1 items-center gap-3 px-6 py-4 transition hover:bg-gray-50">
          <Users
            size={18}
            className="shrink-0 text-gray-500"
          />

          <div className="min-w-0 flex-1">
            <label
              htmlFor="searchGuests"
              className="block text-xs font-semibold text-gray-900"
            >
              Guests
            </label>

            <select
              id="searchGuests"
              value={guests}
              onChange={(event) =>
                setGuests(
                  Number(event.target.value)
                )
              }
              className="mt-1 w-full cursor-pointer bg-transparent text-sm text-gray-700 outline-none"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5 Guests</option>
              <option value={6}>6 Guests</option>
              <option value={7}>7 Guests</option>
              <option value={8}>8 Guests</option>
            </select>
          </div>
        </div>

        {/* Clear */}
        {hasSearchValues && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="mx-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={17} />
          </button>
        )}

        {/* Search */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search"
          className="m-2 flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-full bg-[#FF385C] text-white shadow-md transition duration-200 hover:scale-105 hover:bg-[#E31C5F] md:self-center"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Validation Error */}
      {error && (
        <div className="mx-auto mt-3 w-fit rounded-full bg-[#FFF0F3] px-4 py-2 text-xs font-medium text-[#E31C5F] shadow-sm">
          {error}
        </div>
      )}

    </div>
  );
};

export default SearchBar;