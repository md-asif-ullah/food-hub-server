import express from "express";
import {
    AddFavoriteProduct,
    DeleteFavoriteProduct,
    GetFavoriteProducts,
} from "../controllers/FavouriteProductController.js";

const favouriteProductRouter = express.Router();

favouriteProductRouter.post("/", AddFavoriteProduct);
favouriteProductRouter.delete("/:id", DeleteFavoriteProduct);
favouriteProductRouter.get("/:id", GetFavoriteProducts);

export default favouriteProductRouter;
