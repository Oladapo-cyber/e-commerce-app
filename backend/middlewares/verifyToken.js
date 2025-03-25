/* global process */

import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You're not authenticated!"));
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(createError(401, "You're not authenticated!"));
    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
  } catch (error) {
    next(error);
  }
};
