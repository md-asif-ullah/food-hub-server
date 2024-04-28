import express from "express";
import {
    getUsers,
    getuserById,
    seedUser,
} from "../controllers/usercontrollers.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getuserById);

export default userRouter;
