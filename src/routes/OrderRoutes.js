import express from "express";
import { addOrder, getOrderByUserId } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", addOrder);
orderRouter.get("/:id", getOrderByUserId);

export default orderRouter;
