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

const getProducts = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const category = req.query.category || "";
        const minPrice = Number(req.query.minPrice) || 0;
        const maxPrice = Number(req.query.maxPrice) || 0;
        const rating = Number(req.query.rating) || 0;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        console.log(req.query);

        const searchRegex = new RegExp(".*" + search + ".*", "i");
        const query = {};

        if (search) {
            query.$or = [
                { name: searchRegex },
                { category: { $in: category.split(",") } },
            ];
        }

        if (category) {
            query.category = { $in: category.split(",") };
        }
        if (rating) {
            query.rating = { $gte: rating };
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = minPrice;
            }
            if (maxPrice) {
                query.price.$lte = maxPrice;
            }
        }

        const products = await Product.find(query)
            .limit(limit)
            .skip(limit * (page - 1));

        const totalProducts = await Product.countDocuments(query);

        return successResponse(res, {
            statusCode: 200,
            message: "All products fetched successfully",
            payload: {
                products,
                patination: {
                    totalPages: Math.ceil(totalProducts / limit),
                    prevoiusPage: page - 1 > 0 ? page - 1 : null,
                    nextPage:
                        page + 1 <= Math.ceil(totalProducts / limit)
                            ? page + 1
                            : null,
                },
            },
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

export { createProduct, getProducts };
