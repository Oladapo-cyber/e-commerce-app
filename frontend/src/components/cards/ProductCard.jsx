/* eslint-disable react/prop-types */
import Rating from "@mui/material/Rating";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../../redux/reducers/snackbarSlice";
import { addToCart, addToFavorite, deleteFromFavorite, getFavorite } from "../../api";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToFavorite(token, { productID: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await deleteFromFavorite(token, { productID: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const addCart = async () => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const checkFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavorite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === product?._id
        );
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    checkFavourite();
  }, []);

  console.log(product);
  return (
    <div className="flex flex-col shadow-lg h-fit p-5 cursor-pointer bg-white rounded-lg">
      <img
        src={product?.img}
        alt={product?.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4">
        {/* Product name and price on the same line */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">
            {product?.title}
          </p>
          <p className="text-lg font-bold">
            ${product?.price?.org }
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
