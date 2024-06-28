import mongoose from "mongoose";
import { CartProductSchema } from "./cartProductModel.js";

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: [true, "user id is required"] },
        orderId: { type: String, required: [true, "order id is required"] },
        name: { type: String, required: [true, "name is required"] },
        companyName: { type: String },
        address: { type: String, required: [true, "address is required"] },
        phoneNumber: { type: Number, required: [true, "number is required"] },
        message: { type: String },
        paymentMethod: {
            type: String,
            required: [true, "payment method is required"],
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
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
