import { products, users } from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/usermodel.js";
import { successResponse } from "./responcesController.js";

const seedUser = async (req, res, next) => {
    try {
        await User.deleteMany();

        const user = await User.insertMany(users);

        return successResponse(res, {
            statusCode: 201,
            message: "Users seeded successfully",
            payload: user,
        });
    } catch (error) {
        return next(error);
    }
};

const seedProduct = async (req, res, next) => {
    try {
        await Product.deleteMany();

        const product = await Product.insertMany(products);

        return successResponse(res, {
            statusCode: 201,
            message: "Products seeded successfully",
            payload: product,
        });
    } catch (error) {
        return next(error);
    }
};

export { seedUser, seedProduct };
