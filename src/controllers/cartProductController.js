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

export { addtoCart };
