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

const getOrderByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ userId }).select("-userId");

        if (!orders) {
            return errorResponse(res, {
                statusCode: 400,
                message: "No orders found",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Orders found",
            payload: orders,
        });
    } catch (error) {
        return next(error);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().select("-userId");

        if (!orders) {
            return errorResponse(res, {
                statusCode: 400,
                message: "No orders found",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Orders found",
            payload: orders,
        });
    } catch (error) {
        return next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const id = req.params.id;

        const updatedOrdr = await Order.findByIdAndUpdate(
            id,
            { status: req.body.status },
            { new: true }
        ).select("-userId");

        if (!updatedOrdr) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Order update failed",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Order updated successfully",
            payload: updatedOrdr,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Order delete failed",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Order deleted successfully",
            payload: order,
        });
    } catch (error) {
        return next(error);
    }
};

export {
    addOrder,
    getOrderByUserId,
    getOrders,
    updateOrderStatus,
    deleteOrder,
};
