import express from "express";
import { userLoginValidation } from "../validations/userInputValidation.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";
import { isLoggedOut } from "../middleware/auth.js";
import { loginUser, logoutUser } from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.post(
    "/",
    isLoggedOut,
    inputErrorhandling(userLoginValidation),
    loginUser
);

authRoutes.get("/logout", logoutUser);

export default authRoutes;
