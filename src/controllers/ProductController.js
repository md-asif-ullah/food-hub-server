import cloudinary from "../helper/CloudinaryConfig.js";
import Product from "../models/productModel.js";
import { successResponse } from "./responcesController.js";

const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, discount, quantity } =
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
            discount,
            quantity,
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

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Product fetched successfully",
            payload: product,
        });
    } catch (error) {
        return next(error);
    }
};

const popularProduct = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ rating: -1 }).limit(4);
        return successResponse(res, {
            statusCode: 200,
            message: "Popular products fetched successfully",
            payload: products,
        });
    } catch (error) {
        return next(error);
    }
};

const getProductsForAdmin = async (req, res, next) => {
    try {
        const search = req.query.search || "";

        const regex = new RegExp(search, "i");

        const filter = {
            $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }],
        };

        const products = await Product.find(filter);
        return successResponse(res, {
            statusCode: 200,
            message: "All products fetched successfully",
            payload: products,
        });
    } catch (error) {
        return next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const image = req.file;
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return next({
                statusCode: 404,
                message: "Product not found",
            });
        }

        // Delete the previous image from cloudinary

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            console.log(publicId);
            await cloudinary.uploader.destroy(
                `food-hub-product-img/${publicId}`
            );
        }

        // Update the product

        const update = {};

        for (const key in req.body) {
            if (req.body[key]) {
                update[key] = req.body[key];
            }
        }

        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image.path, {
                folder: "food-hub-product-img",
            });
            update.image = uploadResult.secure_url;
        }

        const newProduct = await Product.findByIdAndUpdate(id, update);

        return successResponse(res, {
            statusCode: 200,
            message: "Product updated successfully",
            payload: newProduct,
        });
    } catch (error) {
        return next(error);
    }
};

export {
    createProduct,
    getProducts,
    getProductById,
    popularProduct,
    getProductsForAdmin,
    updateProduct,
};
