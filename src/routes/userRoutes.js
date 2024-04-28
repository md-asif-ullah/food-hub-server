import express from "express";
import { getUsers, seedUser } from "../controllers/usercontrollers.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUser);
userRouter.get("/", getUsers);

export default userRouter;
