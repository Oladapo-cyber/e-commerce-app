/* eslint-disable react/prop-types */
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../../redux/reducers/snackbarSlice";
import {
  addToCart,
  addToFavorite,
  deleteFromFavorite,
  getFavorite,
} from "../../api";
import { CircularProgress } from "@mui/material";
import { AddShoppingCartOutlined, FavoriteRounded } from "@mui/icons-material";

const ProductCard = ({ product, handleReload }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToFavorite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
        handleReload();
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
    await deleteFromFavorite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
        handleReload();
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

  return (
    <div className="flex flex-col shadow-lg p-4 md:p-5 cursor-pointer mb-4 bg-white rounded-md md:rounded-lg">
      <img
        src={product?.img}
        alt={product?.name}
        className="w-full h-32 sm:h-40 object-cover rounded-md transition-transform duration-200 hover:scale-105"
      />
      <div className="mt-3">
        <div onClick={() => navigate(`/shop/${product._id}`)}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {product?.title}
            </p>
            <p className="text-base sm:text-lg font-bold ml-2 sm:ml-0 text-gray-700">
              ${product?.price?.org}
            </p>
          </div>
          <p className="inline text-xs sm:text-sm text-gray-600">
            {product?.desc}
          </p>
        </div>
        <div className="flex items-center mt-2">
          <Rating
            value={3.5}
            readOnly
            sx={{ fontSize: "1rem", sm: { fontSize: "1.25rem" } }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => addCart(product?._id)}
            className="flex items-center border border-black shadow-sm px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-base
    transition-all duration-200
    hover:bg-black hover:text-white
    hover:scale-105 hover:shadow-lg
    active:scale-95 active:animate-pulse"
          >
            <AddShoppingCartOutlined className="mr-1" fontSize="small" />
            Add to Cart
          </button>
          <button
            onClick={() => (favorite ? removeFavorite() : addFavorite())}
            className="flex items-center"
          >
            {favoriteLoading ? (
              <CircularProgress size={20} />
            ) : favorite ? (
              <FavoriteRounded style={{ fontSize: "20px", color: "red" }} />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: "22px" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
