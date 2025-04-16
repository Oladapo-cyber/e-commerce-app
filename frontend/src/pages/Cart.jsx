// /* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart, getCart, placeOrder } from "../api";
import Button from "../components/Button";
import Table from "../components/Table";
import TextInput from "../components/TextInput";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { CircularProgress } from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState([]);

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
      (total, item) => total + item.quantity * item?.product?.price?.org,
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
    <div className="flex items-center flex-col overflow-y-scroll md:px-5 md:py-7 gap-7">
      {loading ? (
        <CircularProgress />
      ) : (
        <section className="w-full max-w-[1400px] py-4">
          <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
            Your Shopping Cart
          </h1>
          {products.length === 0 ? (
            <div className="text-center font-bold">No items in your Cart</div>
          ) : (
            <div className="flex flex-col gap-7 p-3 md:flex-row">
              <div className=" flex-1">
                <Table
                  products={products}
                  addCart={(id) => addCart(id)}
                  removeCart={(id, quantity) => removeCart(id, quantity)}
                />
              </div>
              <div className=" flex-1">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="font-bold">Subtotal:</span> $12.00
                </div>
                <div className="flex flex-col gap-1.5 text-[18px] mt-2 ">
                  <span className="font-semibold">Delivery details:</span>
                  <div>
                    <div className="flex gap-1.5">
                      <TextInput
                        value={deliveryDetails.firstName}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            firstName: e.target.value,
                          })
                        }
                        placeholder={"First Name"}
                      />
                      <TextInput
                        value={deliveryDetails.lastName}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            lastName: e.target.value,
                          })
                        }
                        placeholder={"Last Name"}
                      />
                    </div>
                    <TextInput
                      value={deliveryDetails.emailAddress}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          emailAddress: e.target.value,
                        })
                      }
                      placeholder={"Email"}
                    />
                    <TextInput
                      value={deliveryDetails.phoneNumber}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder={"Phone +234..."}
                    />
                    <TextInput
                      textArea
                      rows={5}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          completeAddress: e.target.value,
                        })
                      }
                      value={deliveryDetails.completeAddress}
                      placeholder={"Enter your full address..."}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-[18px] mt-2 ">
                  <span className="font-semibold">Payment details:</span>
                  <div>
                    <div className="flex gap-1.5">
                      <TextInput placeholder={"Card Number"} />
                      <TextInput placeholder={"Expiry Date"} />
                    </div>
                    <TextInput placeholder={"CVV"} />
                    <TextInput placeholder={"Card Holder Name"} />
                  </div>
                </div>
                <Button
                  isLoading={buttonLoad}
                  isDisabled={buttonLoad}
                  onClick={placeOrder}
                  text={"Submit Order"}
                />
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Cart;
