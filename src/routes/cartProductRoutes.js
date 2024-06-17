import express from "express";
import {
    addtoCart,
    deleteCartProduct,
    getCartProducts,
    updateCartProductQuantity,
} from "../controllers/cartProductController.js";
import { isLoggedIn } from "../middleware/auth.js";

const cartProductRouter = express.Router();

cartProductRouter.use(
    "/updateQuantity/:id",
    isLoggedIn,
    updateCartProductQuantity
);

cartProductRouter.post("/", isLoggedIn, addtoCart);
cartProductRouter.get("/:id", isLoggedIn, getCartProducts);
cartProductRouter.delete("/:id", isLoggedIn, deleteCartProduct);

export default cartProductRouter;
