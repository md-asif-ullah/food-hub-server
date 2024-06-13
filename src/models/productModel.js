import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        unique: [true, "Product name already exists"],
        minLength: [3, "Product name must be at least 3 characters"],
        maxLength: [100, "Product name cannot exceed 100 characters"],
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"],
        match: [/^\d+(\.\d{1,2})?$/, "Please enter valid price"],
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
        minLength: [3, "Product description must be at least 3 characters"],
        maxLength: [200, "Product description cannot exceed 200 characters"],
    },
    quantity: {
        type: Number,
        required: [true, "Please enter product quantity"],
        validate: {
            validator: (v) => v > 0,
            message: "Quantity must be greater than 0",
        },
    },
    image: {
        type: String,
        required: [true, "Please enter product image"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    rating: {
        type: Number,
        default: 0,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
