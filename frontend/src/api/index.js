// Importing the axios library to make HTTP requests
import axios from "axios";

// Creating an axios instance with a predefined base URL for the API endpoints
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// API call for user sign up. Sends a POST request with user data to the sign up endpoint.
export const UserSignUp = async (data) => await API.post("/user/signup", data);

// API call for user sign in. Sends a POST request with user credentials to the sign in endpoint.
export const UserSignIn = async (data) => await API.post("/user/signin", data);

// API call to fetch all products with a filter query string.
export const getAllProducts = async (filter) => {
  const queryString = filter ? `?${filter}` : "";
  return await API.get(`/products${queryString}`);
};
// API call to get details of a specific product by its id.
export const getProductDetails = async (id) => await API.get(`/products/${id}`);

// API call to retrieve the user's cart information.
// It includes an authorization header with a Bearer token.
export const getCart = async (token) =>
  await API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to add an item to the user's cart.
// Sends a POST request with item data and an authorization header.
export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to remove an item from the cart.
// Uses a PATCH request with the required data and an authorization header.
export const deleteFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to fetch the user's favorite items.
export const getFavorite = async (token) =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to add an item to the user's favorites.
// Sends a POST request with the item data and includes an authorization header.
export const addToFavorite = async (token, data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to delete an item from the user's favorites.
// Uses a PATCH request with the required data and an authorization header.
export const deleteFromFavorite = async (token, data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to place an order. Sends a POST request with order details and an authorization header.
export const placeOrder = async (token, data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to get orders information.
// Sends a GET request with an authorization header.
export const getOrders = async (token) =>
  await API.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
