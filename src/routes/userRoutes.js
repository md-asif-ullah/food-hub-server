import express from "express";
import {
    deleteUserById,
    getUsers,
    getuserById,
    processForgetPassword,
    processRegister,
    resetUserPassword,
    seedUser,
    updateUserById,
    verifyForgetPassword,
    verifyUser,
} from "../controllers/usercontrollers.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getuserById);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", updateUserById);
userRouter.post("/process-register", processRegister);
userRouter.post("/vefity", verifyUser);
userRouter.post("/process-forget-password", processForgetPassword);
userRouter.post("/verify-forget-password", verifyForgetPassword);
userRouter.post("/reset-password", resetUserPassword);

export default userRouter;
