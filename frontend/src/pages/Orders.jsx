import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../api";
import Skeleton from "@mui/material/Skeleton";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("krist-app-token");
      const res = await getOrders(token);
      setOrders(res.data.orders || res.data);
    } catch (error) {
      setOrders([]);
      dispatch(
        openSnackbar({
          message:
            error?.response?.data?.message ||
            error.message ||
            "Failed to fetch orders.",
          severity: "error",
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loading ? (
        <div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-4 p-4 bg-white rounded shadow">
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="rectangular" width="100%" height={40} />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={order._id || idx} className="bg-white rounded shadow p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="font-semibold text-lg">
                  Order #{order._id?.slice(-6).toUpperCase() || idx + 1}
                </div>
                <div className="text-sm text-gray-600">
                  Placed on:{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </div>
                {order.status && (
                  <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-semibold mt-2 md:mt-0">
                    {order.status}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-700 mb-2 font-medium">
                Total: $
                {Number(order.totalAmount || order.total_amount || 0).toFixed(
                  2
                )}
              </div>
              <div>
                <span className="font-semibold">Items:</span>
                <ul className="list-disc ml-6 mt-1 space-y-2">
                  {(order.products || []).map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {item.product?.img && (
                        <img
                          src={item.product.img}
                          alt={
                            item.product.title || item.product.name || "Product"
                          }
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <span>
                        {item.product?.title || item.product?.name || "Product"}{" "}
                        <span className="text-gray-500">x{item.quantity}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {order.address && (
                <div className="mt-2 text-xs text-gray-500">
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {order.address}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
