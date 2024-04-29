import express from "express";
import {
    deleteUserById,
    getUsers,
    getuserById,
    processRegister,
    seedUser,
} from "../controllers/usercontrollers.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getuserById);
userRouter.delete("/:id", deleteUserById);
userRouter.post("/process-register", processRegister);

export default userRouter;
