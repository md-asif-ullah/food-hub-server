import mongoose from "mongoose";
import { CartProductSchema } from "./cartProductModel.js";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: [true, "user id is required"] },
    orderId: { type: String, required: [true, "order id is required"] },
    name: { type: String, required: [true, "name is required"] },
    companyName: { type: String },
    address: { type: String, required: [true, "address is required"] },
    number: { type: Number, required: [true, "number is required"] },
    message: { type: String },
    paymentType: {
        type: String,
        required: [true, "payment type is required"],
        enum: ["cash-on-delivery", "paypal"],
    },
    totalPayAmount: {
        type: Number,
        required: [true, "total pay amount is required"],
    },
    cartProducts: [CartProductSchema],
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "completed", "cancelled"],
    },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
