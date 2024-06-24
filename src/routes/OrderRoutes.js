import express from "express";
import { addOrder } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", addOrder);

export default orderRouter;
