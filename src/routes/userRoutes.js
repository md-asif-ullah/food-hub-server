import express from "express";
import { seedUser } from "../controllers/usercontrollers.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUser);

export default userRouter;
