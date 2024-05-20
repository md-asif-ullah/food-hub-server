import express from "express";
import {
    deleteUserById,
    getUsers,
    getuserById,
    processForgetPassword,
    processRegister,
    resetUserPassword,
    updateUserById,
    verifyForgetPassword,
    verifyUser,
} from "../controllers/usercontrollers.js";
import { userRegistrationValidation } from "../validations/userInputValidation.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";
import { isAdmin, isLoggedIn, isLoggedOut } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", getuserById);
userRouter.delete("/:id", isLoggedIn, isAdmin, deleteUserById);
userRouter.put("/:id", isLoggedIn, updateUserById);
userRouter.post(
    "/process-register",
    inputErrorhandling(userRegistrationValidation),
    isLoggedOut,
    processRegister
);
userRouter.post("/vefity", verifyUser);
userRouter.post("/process-forget-password", processForgetPassword);
userRouter.post("/verify-forget-password", verifyForgetPassword);
userRouter.post("/reset-password", resetUserPassword);

export default userRouter;
