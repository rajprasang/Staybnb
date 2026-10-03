import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import Wishlist from "./pages/Wishlist";

import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/property/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;