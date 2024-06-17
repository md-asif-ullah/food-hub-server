import CartProduct from "../models/cartProductModel.js";
import { errorResponse, successResponse } from "./responcesController.js";

const addtoCart = async (req, res, next) => {
    try {
        const cartProduct = req.body;

        const existProduct = await CartProduct.findOne({
            name: cartProduct.name,
            size: cartProduct.size,
        });

        if (existProduct) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Product already exists in cart.",
            });
        }

        // Create new product in cart
        await CartProduct.create(cartProduct);

        return successResponse(res, {
            statusCode: 200,
            message: "Product added to cart successfully.",
        });
    } catch (error) {
        return next(error);
    }
};

const getCartProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartProducts = await CartProduct.find({ userId: id }).select(
            "-userId"
        );

        return successResponse(res, {
            statusCode: 200,
            message: "Cart products fetched successfully.",
            payload: cartProducts,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteCartProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cartProduct = await CartProduct.findByIdAndDelete(id);

        if (!cartProduct) {
            return errorResponse(res, {
                statusCode: 404,
                message: "Product not found in cart.",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product removed from cart successfully.",
        });
    } catch (error) {
        return next(error);
    }
};

const updateCartProductQuantity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const quantity = req.body;

        if (!quantity) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid product data provided.",
            });
        }

        const updatedProductQuantity = await CartProduct.findByIdAndUpdate(
            id,
            quantity,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProductQuantity) {
            return res.status(404).json({
                statusCode: 404,
                message: "Product not found in cart.",
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: "Product quantity updated successfully.",
        });
    } catch (error) {
        return next(error);
    }
};

export {
    addtoCart,
    getCartProducts,
    deleteCartProduct,
    updateCartProductQuantity,
};
