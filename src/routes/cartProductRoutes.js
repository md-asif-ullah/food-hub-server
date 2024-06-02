import express from "express";
import { addtoCart } from "../controllers/cartProductController.js";
import { isLoggedIn } from "../middleware/auth.js";

const cartProductRouter = express.Router();

cartProductRouter.post("/", isLoggedIn, addtoCart);

export default cartProductRouter;
