import express from "express";
import {
    addOrder,
    deleteOrder,
    getOrderByUserId,
    getOrders,
    updateOrderStatus,
} from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", addOrder);
orderRouter.get("/:id", getOrderByUserId);
orderRouter.get("/", getOrders);
orderRouter.delete("/:id", deleteOrder);
orderRouter.put("/update-Status/:id", updateOrderStatus);

export default orderRouter;
