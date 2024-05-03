import express from "express";
import {
    deleteUserById,
    getUsers,
    getuserById,
    loginUser,
    processForgetPassword,
    processRegister,
    resetUserPassword,
    seedUser,
    updateUserById,
    verifyForgetPassword,
    verifyUser,
} from "../controllers/usercontrollers.js";
import {
    userLoginValidation,
    userRegistrationValidation,
} from "../validations/userInputValidation.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getuserById);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", updateUserById);
userRouter.post(
    "/process-register",
    inputErrorhandling(userRegistrationValidation),
    processRegister
);
userRouter.post("/vefity", verifyUser);
userRouter.post("/process-forget-password", processForgetPassword);
userRouter.post("/verify-forget-password", verifyForgetPassword);
userRouter.post("/reset-password", resetUserPassword);
userRouter.post("/login", inputErrorhandling(userLoginValidation), loginUser);

export default userRouter;
