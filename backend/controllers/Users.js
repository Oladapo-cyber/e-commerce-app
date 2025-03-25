/* global process */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Orders from "../models/Orders.js";

dotenv.config(); // Loads environment variables from .env file

//UserRegister controller
export const UserRegister = async (req, res, next) => {
  try {
    // Destructure the request body to get user details
    const { email, password, name, img } = req.body;

    // Check if the user already exists in the database by email
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      // If the user exists, pass error to error handler
      return next(createError(409, "User not found"));
    }

    // Generate a salt and hash the user's password for security
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance with hashed password and provided details
    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });

    // Save the newly created user to the database
    const createdUser = await user.save();

    // Generate a token for the new user, valid for an extremely long time
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT, {
      expiresIn: "9999 years",
    });

    // Respond with JSON containing the token and the user information
    return res.status(200).json({ token, user: createdUser });
  } catch (error) {
    // Pass any errors that occur to the next error handling middleware
    return next(error);
  }
};

//Login controller
export const UserLogin = async (req, res, next) => {
  try {
    // Destructure the request body to get login credentials
    const { email, password } = req.body;

    // Retrieve the user with the provided email from the database
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      // If user does not exist, pass error to error handler
      return next(createError(404, "Email already in use"));
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      // If password is incorrect, pass error to error handler
      return next(createError(403, "Invalid credentials"));
    }

    // Generate a token for the user with a very long expiry time
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT, {
      expiresIn: "9999 years",
    });

    // Respond with JSON containing the token and the user details
    return res.status(200).json({ token, user: existingUser });
  } catch (error) {
    // Pass any errors that occur to the next error handling middleware
    return next(error);
  }
};

// Controller to add a product to the user's cart
export const addToCart = async (req, res, next) => {
  try {
    // Extract the product ID and quantity from the request body
    const { productId, quantity } = req.body;
    // Get the authenticated user's info from the JWT attached to the request
    const userJWT = req.user;
    // Find the user in the database using the ID from the JWT
    const user = await User.findById(userJWT.id);
    // Look for the product in the user's cart by checking if any cart item has a matching product ID
    const existingCartItemIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    // If the product is already in the cart, update its quantity
    if (existingCartItemIndex !== -1) {
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // Otherwise, add the new product with the specified quantity to the cart
      user.cart.push({ product: productId, quantity });
    }
    // Save the updated user record to the database
    await user.save();
    // Return a successful response with a confirmation message and the updated user data
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to remove a product or decrease its quantity from the user's cart
export const removeFromCart = async (req, res, next) => {
  try {
    // Extract the product ID and quantity from the request body
    const { productId, quantity } = req.body;
    // Get the authenticated user's info from the JWT attached to the request
    const userJWT = req.user;
    // Find the user in the database using the ID from the JWT
    const user = await user.findById(userJWT.id);
    // If the user is not found, forward an error message
    if (!user) {
      return next(createError(404, "User not found."));
    }
    // Locate the product in the cart array by checking for a matching product ID
    const productIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );
    // If the product is found in the cart
    if (productIndex !== -1) {
      // If a valid quantity is provided, reduce the product quantity in the cart
      if (quantity && quantity > 0) {
        user.cart[productIndex].quantity -= quantity;
        // If the new quantity is zero or less, remove the product from the cart altogether
        if (user.cart[productIndex].quantity <= 0) {
          user.cart.splice(productIndex, 1);
        }
      } else {
        // If no quantity is specified, remove the product entirely from the cart
        user.cart.splice(productIndex, 1);
      }
      // Save the updated user record
      await user.save();
      // Return a successful response with a confirmation message and the updated user data
      return res
        .status(200)
        .json({ message: "Product quantity updated in cart", user });
    } else {
      // If the product is not found in the user's cart, forward an error message
      return next(createError(404, "Product not found in the user's cart."));
    }
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to get and return all items from the user's cart
export const getAllCartItems = async (req, res, next) => {
  try {
    // Get the authenticated user's info from the JWT attached to the request
    const userJWT = req.user;
    // Find the user in the database and populate the "cart.product" field with the corresponding product data
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Products",
    });
    // Retrieve the cart items from the user document
    const cartItems = user.cart;
    // Return a successful response with the list of cart items
    return res.status(200).json({ cartItems });
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to place an order from the items in the user's cart
export const placeOrder = async (req, res, next) => {
  try {
    // Extract order details (products, address, total amount) from the request body
    const { products, address, totalAmount } = req.body;
    // Get the authenticated user's info from the JWT
    const userJWT = req.user;
    // Find the user in the database using the JWT ID
    const user = await User.findById(userJWT.id);
    // Create a new order instance with the provided details and associate it with the user
    const order = new Orders({
      products,
      user: user._id,
      total_amount: totalAmount,
      address,
    });
    // Save the new order to the database
    await order.save();

    // The following line appears to try saving the cart as if it were a document (likely an error)
    user.cart.save();

    // Clear the user's cart after the order is placed
    user.cart = [];
    // Save the updated user record with an empty cart
    await user.save();

    // Return a successful response with a confirmation message and the created order data
    return res
      .status(200)
      .json({ message: "Order placed successfully!", order });
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to retrieve all orders made by the user
export const getAllOrders = async (req, res, next) => {
  try {
    // Get the authenticated user's info from the request
    const user = req.user;
    // Find all orders in the database that match the user's ID
    const orders = await Orders.find({ user: user.id });
    // Return a successful response with the list of orders
    return res.status(200).json(orders);
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to add a product to the user's favorites list
export const addToFavorites = async (req, res, next) => {
  try {
    // Extract the product ID from the request body
    const { productId } = req.body;
    // Get the authenticated user's info from the JWT
    const userJWT = req.user;
    // Find the user in the database using the provided JWT ID (using findOne instead of findById)
    const user = await User.findOne(userJWT.id);
    // If the favorites list does not already include the product ID, add it
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      // Save the updated user record
      await user.save();
    }
    // Return a successful response with a confirmation message and the updated user data
    return res
      .status(200)
      .json({ message: "Product added to favorites successfully", user });
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to remove a product from the user's favorites list
export const removeFromFavorites = async (req, res, next) => {
  try {
    // Extract the product ID from the request body
    const { productId } = req.body;
    // Get the authenticated user's info from the JWT
    const userJWT = req.user;
    // Find the user in the database using the provided JWT ID (using findOne instead of findById)
    const user = await User.findOne(userJWT.id);
    // Filter the favorites array to remove the product that matches the product ID
    user.favorites = user.favorites.filter((fav) => !fav.equals(productId));
    // Save the updated user record
    await user.save();
    // Return a successful response with a confirmation message and the updated user data
    return res
      .status(200)
      .json({ message: "Product removed from favorites successfully", user });
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};

// Controller to retrieve all favorite products of the user
export const getUserFavorites = async (req, res, next) => {
  try {
    // Retrieve the authenticated user's ID from the JWT
    const userId = req.user.id;
    // Find the user in the database and populate the "favorites" field with the actual product data
    const user = await User.findById(userId).populate("favorites").exec();
    // If the user is not found, forward an error message
    if (!user) {
      return next(createError(404, "User not found"));
    }
    // Return a successful response with the user's favorite products
    return res.status(200).json(user.favorites);
  } catch (error) {
    // Forward any errors to the error handling middleware
    next(error);
  }
};
