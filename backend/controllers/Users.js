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

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const existingCartItemIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingCartItemIndex !== -1) {
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    const user = await user.findById(userJWT.id);
    if (!user) {
      return next(createError(404, "User not found."));
    }
    const productIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );
    if (productIndex !== -1) {
      if (quantity && quantity > 0) {
        user.cart[productIndex].quantity -= quantity;
        if (user.cart[productIndex].quantity <= 0) {
          user.cart.splice(productIndex, 1);
        }
      } else {
        user.cart.splice(productIndex, 1);
      }

      await user.save();
      return res
        .status(200)
        .json({ message: "Product quantity updated in cart", user });
    } else {
      return next(createError(404, "Product not found in the user's cart."));
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCartItems = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Products",
    });

    const cartItems = user.cart;
    return res.status(200).json({ cartItems });
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (req, res, next) => {
  try {
    const { products, address, totalAmount } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const order = new Orders({
      products,
      user: user._id,
      total_amount: totalAmount,
      address,
    });
    await order.save();

    user.cart.save();

    user.cart = [];
    await user.save();

    return res
      .status(200)
      .json({ message: "Order placed successfully!", order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await Orders.find({ user: user.id });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userJWT = req.user;
    const user = await User.findOne(userJWT.id);

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    return res
      .status(200)
      .json({ message: "Product added to favorites successfully", user });
  } catch (error) {
    next(error);
  }
};
export const removeFromFavorites = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userJWT = req.user;
    const user = await User.findOne(userJWT.id);

    user.favorites = user.favorites.filter((fav) => !fav.equals(productId));
    await user.save();

    return res
      .status(200)
      .json({ message: "Product removed from favorites successfully", user });
  } catch (error) {
    next(error);
  }
};

export const getUserFavorites = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favorites").exec();

    if (!user) {
      return next(createError(404, "User not found"));
    }

    return res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};
