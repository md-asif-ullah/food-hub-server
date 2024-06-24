import Order from "../models/OrderModel.js";
import CartProduct from "../models/cartProductModel.js";
import { errorResponse, successResponse } from "./responcesController.js";

const addOrder = async (req, res, next) => {
    try {
        await CartProduct.deleteMany({
            userId: req.body.userId,
        });

        const order = await Order.create(req.body);

        if (!order) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Order failed, please try again",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Order successfull",
            payload: order,
        });
    } catch (error) {
        return next(error);
    }
};

export { addOrder };
