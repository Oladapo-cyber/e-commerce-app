import { useState, useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import CardWrapper from "../components/CardWrapper";
import { getFavorite } from "../api"; // Importing function to fetch favorite items from API
import { CircularProgress } from "@mui/material";

const Favorites = () => {
  // State to store favorite items
  const [favorites, setFavorites] = useState([]);
  // State to manage loading state
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
      // Get token from localStorage for authentication
      const token = localStorage.getItem("krist-app-token");
      // Call API to fetch favorites
      const res = await getFavorite(token);
      // Update state with fetched data
      setFavorites(res.data);
      console.log("API response:", res.data);
    } catch (error) {
      // Log error if fetching fails
      console.error("Error fetching favorites", error);
    } finally {
      // Set loading state to false after API call completes
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
        // Display a loading spinner while data is being fetched
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        // Display favorites if available, or a message if no items present
        <CardWrapper>
          {favorites.length > 0 ? (
            // Map through the favorites and display each item using ProductCard component
            favorites.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleReload={handleReload}
              />
            ))
          ) : (
            // Message to display when there are no favorite items
            <p className="text-center font-bold">
              You haven&apos;t added any item to your favorites...
            </p>
          )}
        </CardWrapper>
      )}
    </div>
  );
};

export default Favorites;
