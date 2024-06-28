import express from "express";
import {
    addOrder,
    getOrderByUserId,
    getOrders,
    updateOrderStatus,
} from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", addOrder);
orderRouter.get("/:id", getOrderByUserId);
orderRouter.get("/", getOrders);
orderRouter.put("/update-Status/:id", updateOrderStatus);

export default orderRouter;
