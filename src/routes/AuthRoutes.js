import express from "express";
import { userLoginValidation } from "../validations/userInputValidation.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";
import { isLoggedIn, isLoggedOut } from "../middleware/auth.js";
import {
    SocialLogin,
    loginUser,
    logoutUser,
    refreshToken,
} from "../controllers/AuthController.js";

const authRoutes = express.Router();

authRoutes.post(
    "/",
    isLoggedOut,
    inputErrorhandling(userLoginValidation),
    loginUser
);
authRoutes.post("/social-login", SocialLogin);
authRoutes.post("/logout", isLoggedIn, logoutUser);
authRoutes.get("/refresh-token", refreshToken);

export default authRoutes;
