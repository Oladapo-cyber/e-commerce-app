import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../api";
import Skeleton from "@mui/material/Skeleton";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { LocalShipping, CheckCircle, Cancel } from "@mui/icons-material";

const statusColors = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  shipped: "bg-blue-100 text-blue-700",
};

const statusIcons = {
  delivered: <CheckCircle className="text-green-500 mr-1" />,
  pending: <LocalShipping className="text-yellow-500 mr-1" />,
  cancelled: <Cancel className="text-red-500 mr-1" />,
  shipped: <LocalShipping className="text-blue-500 mr-1" />,
};

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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">My Orders</h1>
      {loading ? (
        <div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-6 p-6 bg-white rounded-xl shadow-lg">
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="rectangular" width="100%" height={40} />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">No orders found.</div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, idx) => (
            <div
              key={order._id || idx}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="font-semibold text-lg text-gray-800">
                  Order #{order._id?.slice(-6).toUpperCase() || idx + 1}
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="text-sm text-gray-500">
                    Placed on:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                  {order.status && (
                    <span
                      className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ml-2 ${statusColors[order.status] || "bg-gray-200 text-gray-700"}`}
                    >
                      {statusIcons[order.status] || null}
                      {order.status}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="text-base text-gray-700 font-medium">
                  Total: <span className="font-bold text-blue-600">${Number(order.totalAmount || order.total_amount || 0).toFixed(2)}</span>
                </div>
                {order.address && (
                  <div className="mt-2 md:mt-0 text-xs text-gray-500 md:text-right">
                    <span className="font-semibold">Delivery Address:</span> {order.address}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span className="font-semibold text-gray-700">Items:</span>
                <div className="flex gap-4 mt-2 overflow-x-auto pb-2">
                  {(order.products || []).map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gray-50 rounded-lg p-2 min-w-[90px] shadow-sm"
                    >
                      {item.product?.img && (
                        <img
                          src={item.product.img}
                          alt={item.product.title || item.product.name || "Product"}
                          className="w-16 h-16 object-cover rounded mb-1"
                        />
                      )}
                      <span className="text-xs text-gray-800 font-semibold text-center">
                        {item.product?.title || item.product?.name || "Product"}
                      </span>
                      <span className="text-xs text-gray-500">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;