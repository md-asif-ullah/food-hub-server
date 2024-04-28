import users from "../data.js";
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

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        return successResponse(res, {
            statusCode: 200,
            message: "Users fetched successfully",
            payload: users,
        });
    } catch (error) {
        return next(error);
    }
};

const getuserById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id).select("-password");

        return successResponse(res, {
            statusCode: 200,
            message: "User fetched successfully",
            payload: user,
        });
    } catch (error) {
        return next(error);
    }
};

export { seedUser, getUsers, getuserById };
