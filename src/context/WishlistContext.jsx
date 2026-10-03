import {
  createContext,
  useContext,
  useState,
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState([]);

  const isFavorite = (propertyId) => {
    return wishlist.some(
      (property) => property.id === propertyId
    );
  };

  const toggleWishlist = (property) => {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === property.id
      );

      if (alreadySaved) {
        return currentWishlist.filter(
          (item) => item.id !== property.id
        );
      }

      return [...currentWishlist, property];
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isFavorite,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};