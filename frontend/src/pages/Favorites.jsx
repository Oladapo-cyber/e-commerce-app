import { useState, useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import CardWrapper from "../components/CardWrapper";
import { getFavorite } from "../api"; // API call to retrieve favorite items
import { CircularProgress } from "@mui/material";

const Favorites = () => {
  // List of favorite products fetched from the server
  const [favorites, setFavorites] = useState([]);
  // Indicates whether the data is currently being loaded
  const [loading, setLoading] = useState(false);
  // Toggle state to trigger a refetch of favorites
  const [reload, setReload] = useState(false);

  /**
   * Fetches the user's favorite products from the API.
   * Retrieves the token from localStorage for authentication,
   * updates state with the response data, handles errors,
   * and manages the loading indicator.
   */
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("krist-app-token");
      const res = await getFavorite(token);
      setFavorites(res.data);
      console.log("Fetched favorites:", res.data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inverts the reload flag to trigger useEffect
   * and force a re-fetch of favorite items.
   */
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  // Run fetchFavorites on component mount and whenever `reload` changes
  useEffect(() => {
    fetchFavorites();
  }, [reload]);

  return (
    <div>
      {/* Page header */}
      <h1 className="flex justify-start m-2 items-center text-2xl font-bold mb-4">
        Favorite Items
      </h1>

      {loading ? (
        // Show spinner while waiting for API response
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        // Once loaded, display favorites or a fallback message
        <CardWrapper>
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleReload={handleReload}
              />
            ))
          ) : (
            <p className="text-center font-bold">
              You haven&apos;t added any items to your favorites yet.
            </p>
          )}
        </CardWrapper>
      )}
    </div>
  );
};

export default Favorites;
