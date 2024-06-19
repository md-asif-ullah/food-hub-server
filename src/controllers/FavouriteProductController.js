import mongoose from "mongoose";
import FavouriteProduct from "../models/FavouriteProductModel.js";
import { errorResponse, successResponse } from "./responcesController.js";

const AddFavoriteProduct = async (req, res, next) => {
    try {
        const { product_id } = req.body;
        const existingProduct = await FavouriteProduct.findOne({
            product_id,
        });
        if (existingProduct) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Product already in favourite",
            });
        }
        const favouriteProduct = await FavouriteProduct.create(req.body);
        return successResponse(res, {
            statusCode: 201,
            message: "Product added to favourite",
            data: favouriteProduct,
        });
    } catch (error) {
        return next(error);
    }
};

const GetFavoriteProducts = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const results = await FavouriteProduct.find({ userId: userId });

        return successResponse(res, {
            statusCode: 200,
            message: "Favourite products fetched successfully",
            payload: results,
        });
    } catch (error) {
        return next(error);
    }
};

const DeleteFavoriteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const favouriteProduct = await FavouriteProduct.findByIdAndDelete(id);

        return successResponse(res, {
            statusCode: 200,
            message: "Product removed from favourite",
            data: favouriteProduct,
        });
    } catch (error) {
        return next(error);
    }
};

export { AddFavoriteProduct, GetFavoriteProducts, DeleteFavoriteProduct };
