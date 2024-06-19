import mongoose from "mongoose";

const FavouiteProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    image: {
        type: String,
        required: [true, "Please enter product image"],
    },
    userId: {
        type: String,
        required: [true, "Please enter user id"],
    },
    product_id: {
        type: String,
        required: [true, "Please enter product id"],
    },
});

const FavouriteProduct = mongoose.model(
    "favouriteProduct",
    FavouiteProductSchema
);

export default FavouriteProduct;
