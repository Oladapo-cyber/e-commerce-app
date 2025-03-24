/* global process */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
// import Orders from "../models/Orders.js";

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
