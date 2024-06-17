import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    image: {
        type: String,
    },
    size: {
        type: String,
        required: [true, "Please select product size"],
    },
});

const CartProduct = mongoose.model("CartProduct", CartProductSchema);

export default CartProduct;
