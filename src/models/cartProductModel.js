import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema({
    id: {
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
