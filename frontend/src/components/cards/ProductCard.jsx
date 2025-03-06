import Rating from "@mui/material/Rating";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const productRating = 4; // Using a static value

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex flex-col shadow-lg h-fit p-5 cursor-pointer bg-white rounded-lg">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
        alt="Product"
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4">
        {/* Product name and price on the same line */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">Product Name</p>
          <p className="text-lg font-bold">
            $59
            <span className="align-text-top text-xs">.00</span>
          </p>
        </div>
        <p className="inline text-sm text-gray-600">
          Short description about the product.
        </p>
        <div className="flex items-center mt-2">
          <Rating
            name="product-rating"
            value={productRating}
            precision={0.5}
            readOnly
            sx={{ fontSize: "1.25rem" }}
          />
          <span className="ml-2 text-gray-600">(5)</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button className="flex items-center border-black border-2 shadow-sm px-3 py-1 rounded-2xl">
            <ShoppingCartIcon className="mr-1" />
            Add to Cart
          </button>
          <button onClick={toggleFavorite}>
            {isFavorite ? (
              <FavoriteIcon sx={{ fontSize: "1.5rem", color: "red" }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ fontSize: "1.5rem", color: "inherit" }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
