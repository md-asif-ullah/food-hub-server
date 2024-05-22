import cloudinary from "../helper/uploadToCloudinary.js";
import Product from "../models/productModel.js";
import { successResponse } from "./responcesController.js";

const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, quantity, shipping } =
            req.body;
        const image = req.file;

        const uploadResult = await cloudinary.uploader.upload(image.path, {
            folder: "food-hub-product-img",
        });

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            quantity,
            shipping,
            image: uploadResult.secure_url,
        });
        const product = await Product.create(newProduct);

        return successResponse(res, {
            statusCode: 200,
            message: " Product created successfully",
            payload: product,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

export { createProduct };
