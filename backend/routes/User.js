import express from "express";
import { UserRegister } from "../controllers/Users.js";

const router = express.Router();

router.post("/signup", UserRegister);

export default router;
