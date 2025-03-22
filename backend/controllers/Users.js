/* global process */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/Users.js";
import Orders from "../models/Orders.js";
import { json } from "express";

dotenv.config();

//UserRegister controller
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;
    const existingUser = await User.findOne({ email }).exex();
    if (existingUser) {
      return next(createError(409, "Email already in use"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: password,
      img,
    });

    const createdUser = user.save();
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

//Login controller
export const UserLogin = async (req, res, next) => {};
