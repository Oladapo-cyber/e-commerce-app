/* eslint-disable react/prop-types */
import { CircularProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorite,
  deleteFromFavorite,
  getFavorite,
  getProductDetails,
} from "../api";
import Button from "../components/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");

    await addToFavorite(token, { productID: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((error) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: error.message,
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
      .catch((error) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: error.message,
            severity: "error",
          })
        );
      });
  };

  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = async () => {
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
      .catch((error) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: error.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getProduct();
    checkFavorite();
  }, []);

  return (
    <div className="w-full h-[99%] flex justify-center items-center overflow-y-scroll">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="flex flex-col md:flex-row w-full max-w-[1400px] p-3 gap-8 py-4">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={product?.img}
              alt={product?.title}
              className="h-[600px] rounded-xl md:h-[600px] object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 gap-4 p-2">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {product?.title}
              </h1>
              <h2 className="text-lg font-normal text-gray-700">
                {product?.name}
              </h2>
            </div>
            <Rating value={3.5} readOnly />
            <div className="flex items-center gap-2 text-2xl font-medium">
              ${product?.price?.org}
              <span className="text-[16px] font-medium line-through text-gray-500">
                ${product?.price?.mrp}
              </span>
              <span className="text-[16px] font-medium text-green-600">
                ({product?.price?.off}% Off)
              </span>
            </div>
            <p className="text-lg font-normal text-gray-800">{product?.desc}</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 italic">
                {product?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelected(size)}
                    className={`flex items-center justify-center text-sm border-2 rounded-full h-9 w-9 ${
                      selected === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-center items-center gap-4">
                  <Button
                    text="Add to Cart"
                    full
                    outlined={false}
                    isLoading={cartLoading}
                    onClick={() => addCart}
                  />
                  <Button
                    leftIcon={
                      favorite ? (
                        <FavoriteRounded
                          style={{ fontSize: "22px", color: "red" }}
                        />
                      ) : (
                        <FavoriteBorder style={{ fontSize: "22px" }} />
                      )
                    }
                    text=""
                    outlined
                    isLoading={favoriteLoading}
                    onClick={() =>
                      favorite ? removeFavorite() : addFavorite()
                    }
                  />
                </div>

                <Button text="Buy Now" full />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
