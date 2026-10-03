import {
  Globe,
  Menu,
  Search,
  UserCircle,
  Heart,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold tracking-tight text-[#FF385C]">
            staybnb
          </span>
        </button>

        {/* Desktop Search */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="hidden items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition duration-200 hover:shadow-md md:flex"
        >
          <span className="px-4 text-sm font-semibold text-gray-800">
            Anywhere
          </span>

          <span className="h-5 border-l border-gray-300" />

          <span className="px-4 text-sm font-semibold text-gray-800">
            Any week
          </span>

          <span className="h-5 border-l border-gray-300" />

          <span className="px-4 text-sm text-gray-500">
            Add guests
          </span>

          <span className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF385C] text-white shadow-sm transition hover:bg-[#E31C5F]">
            <Search size={17} />
          </span>
        </button>

        {/* Right Side */}
        <div className="flex items-center gap-1">

          {/* Become a host */}
          <button
            type="button"
            className="hidden rounded-full px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 lg:block"
          >
            Become a host
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => navigate("/wishlist")}
            aria-label="Wishlist"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
          >
            <Heart
              size={20}
              fill={
                wishlist.length > 0
                  ? "currentColor"
                  : "none"
              }
              className={
                wishlist.length > 0
                  ? "text-[#FF385C]"
                  : ""
              }
            />

            {/* Wishlist Count */}
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF385C] px-1 text-[9px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Globe */}
          <button
            type="button"
            aria-label="Language"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 sm:flex"
          >
            <Globe size={19} />
          </button>

          {/* User Menu */}
          <button
            type="button"
            aria-label="Account menu"
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-2 py-1.5 shadow-sm transition hover:shadow-md"
          >
            <Menu
              size={19}
              className="text-gray-700"
            />

            <UserCircle
              size={31}
              className="text-gray-500"
            />
          </button>

        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-gray-100 px-5 py-3 md:hidden">

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-left shadow-sm"
        >

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F3] text-[#FF385C]">
            <Search size={17} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Where to?
            </p>

            <p className="text-xs text-gray-500">
              Anywhere · Any week · Add guests
            </p>
          </div>

        </button>

      </div>
    </header>
  );
};

export default Navbar;