import express from "express";
import {
    addtoCart,
    deleteCartProduct,
    getCartProducts,
} from "../controllers/cartProductController.js";
import { isLoggedIn } from "../middleware/auth.js";

const cartProductRouter = express.Router();

cartProductRouter.post("/", isLoggedIn, addtoCart);
cartProductRouter.get("/", isLoggedIn, getCartProducts);
cartProductRouter.delete("/:id", isLoggedIn, deleteCartProduct);

export default cartProductRouter;
