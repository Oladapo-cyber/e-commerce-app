// /* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart, getCart, placeOrder } from "../api";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getCart(token).then((res) => {
      console.log("API response:", res.data);
      setProducts(res.data.cartItems);
      setLoading(false);
    });
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("krist-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    await deleteFromCart(token, {
      productId: id,
      quantity: qnt,
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) =>
        total +
        (Number(item.quantity) || 0) * (Number(item?.product?.price?.org) || 0),
      0
    );
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const convertAddressToString = (addressObj) => {
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emailAddress;

      if (!isDeliveryDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Delivery details required...",
            severity: "error",
          })
        );
        setButtonLoad(false);
        return;
      }
      const token = localStorage.getItem("krist-app-token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };

      await placeOrder(token, orderDetails);

      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );

      // Clear cart and reset delivery details here
      setProducts([]);
      setDeliveryDetails({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        completeAddress: "",
      });

      setButtonLoad(false);
      setReload(!reload);
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 px-2 py-4">
      {loading ? (
        <div className="w-full flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <Skeleton variant="rectangular" width="100%" height={80} />
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="60%" height={20} />
            </div>
          ))}
        </div>
      ) : (
        <section className="w-full max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">
            Your Shopping Cart
          </h1>
          {products.length === 0 ? (
            <div className="text-center font-semibold text-gray-500 py-8">
              No items in your Cart
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex flex-col gap-4 mb-6">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-3"
                  >
                    <img
                      src={item.product?.img}
                      alt={item.product?.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="font-semibold text-lg text-gray-800">
                        {item.product?.title}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {item.product?.desc}
                      </span>
                      <span className="text-gray-700 text-2xl  p-1 font-bold">
                        ${item.product?.price?.org}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <IconButton
                          onClick={() =>
                            removeCart(item.product._id, item.quantity, "full")
                          }
                          sx={{
                            width: 40,
                            height: 40,
                            background: "#fee2e2",
                            border: "2px solid #fecaca",
                            boxShadow: 3,
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                              background: "#86efac",
                              transform: "scale(1.1)",
                              boxShadow: 6,
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 4,
                              left: 4,
                              right: 4,
                              bottom: 4,
                              border: "2px solid #fff",
                              borderRadius: "50%",
                              zIndex: 1,
                            },
                          }}
                        >
                          <RemoveIcon
                            sx={{
                              zIndex: 2,
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#b91c1c",
                            }}
                          />
                        </IconButton>
                        <span className="text-lg font-black">
                          <span className="font-medium">Qty:</span>{" "}
                          {item.quantity}
                        </span>
                        <div className="flex items-center justify-center">
                          <IconButton
                            onClick={() => addCart(item.product._id)}
                            sx={{
                              width: 40,
                              height: 40,
                              background: "#dcfce7",
                              border: "2px solid #bbf7d0",
                              boxShadow: 3,
                              transition: "transform 0.2s, box-shadow 0.2s",
                              "&:hover": {
                                background: "#86efac",
                                transform: "scale(1.1)",
                                boxShadow: 6,
                              },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 4,
                                left: 4,
                                right: 4,
                                bottom: 4,
                                border: "2px solid #fff",
                                borderRadius: "50%",
                                zIndex: 1,
                              },
                            }}
                          >
                            <AddIcon
                              sx={{
                                zIndex: 2,
                                fontSize: 20,
                                fontWeight: "bold",
                              }}
                            />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="font-bold text-gray-700">Subtotal:</span>
                  <span className="font-bold text-2xl">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="font-semibold text-lg mb-2">Delivery Details</h2>
                <div className="flex flex-col gap-2">
                  <TextInput
                    value={deliveryDetails.firstName}
                    handleChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="First Name"
                  />
                  <TextInput
                    value={deliveryDetails.lastName}
                    handleChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Last Name"
                  />
                  <TextInput
                    value={deliveryDetails.emailAddress}
                    handleChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        emailAddress: e.target.value,
                      })
                    }
                    placeholder="Email"
                  />
                  <TextInput
                    value={deliveryDetails.phoneNumber}
                    handleChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        phoneNumber: e.target.value,
                      })
                    }
                    placeholder="Phone +234..."
                  />
                  <TextInput
                    textArea
                    rows={3}
                    handleChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        completeAddress: e.target.value,
                      })
                    }
                    value={deliveryDetails.completeAddress}
                    placeholder="Full Address"
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="font-semibold text-lg mb-2">Payment Details</h2>
                <div className="flex flex-col gap-2">
                  <TextInput placeholder="Card Number" />
                  <div className="flex gap-2">
                    <TextInput placeholder="Expiry Date" />
                    <TextInput placeholder="CVV" />
                  </div>
                  <TextInput placeholder="Card Holder Name" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                isLoading={buttonLoad}
                isDisabled={buttonLoad}
                onClick={PlaceOrder}
                text="Submit Order"
                className="w-full"
              />
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default Cart;
