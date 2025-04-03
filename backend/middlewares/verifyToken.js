/* global process */

import jwt from "jsonwebtoken"; // Import JWT library for token verification
import { createError } from "../error.js"; // Import custom error creator

// Middleware function to verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    // Check if the request contains an authorization header
    if (!req.headers.authorization) {
      return next(createError(401, "You're not authenticated!"));
    }
    // Extract token from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    // If no token is found, return an authentication error
    if (!token) return next(createError(401, "You're not authenticated!"));
    // Verify the token using the secret key stored in environment variables
    const decode = jwt.verify(token, process.env.JWT);
    // Store decoded token (user info) in the request object
    req.user = decode;
    // Call the next middleware in the stack
    next();
  } catch (error) {
    // Pass any errors to the next middleware error handler
    next(error);
  }
};
