import express from "express";
import { userLoginValidation } from "../validations/userInputValidation.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";
import { isLoggedOut } from "../middleware/auth.js";
import { loginUser } from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.post(
    "/",
    isLoggedOut,
    inputErrorhandling(userLoginValidation),
    loginUser
);

export default authRoutes;
