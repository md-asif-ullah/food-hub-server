import users from "../data.js";
import sendUserMail from "../helper/sendMail.js";
import User from "../models/usermodel.js";
import { errorResponse, successResponse } from "./responcesController.js";

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

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletUser = await User.findByIdAndDelete(id);

        if (!deletUser) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }
        return successResponse(res, {
            statusCode: 200,
            message: "User deleted successfully",
        });
    } catch (error) {
        return next(error);
    }
};

const processRegister = async (req, res, next) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const { name, email, password } = req.body;

        const userExistVerified = await User.findOne({
            email,
        });
        if (userExistVerified) {
            if (userExistVerified.isVarified) {
                return errorResponse(res, {
                    statusCode: 400,
                    message: "User already exist with this email. Please login",
                });
            } else {
                userExistVerified.verificationCode = verificationCode;
                await userExistVerified.save();
            }
        } else {
            const newUser = new User({
                name,
                email,
                password,
                verificationCode,
            });

            await newUser.save();
        }

        const mailData = {
            to: email,
            subject: "Email Verification",
            html: `<h3>Use this verification code below to sign up</h3>
                <hr/>
                <p>Your verification code is: <strong>${verificationCode}</strong></p>`,
        };

        const sendMail = await sendUserMail(mailData);

        if (!sendMail) {
            return errorResponse(res, {
                statusCode: 500,
                message: "Failed to send verification code",
            });
        }

        return successResponse(res, {
            statusCode: 201,
            message: `go to ${email} to verify your account`,
        });
    } catch (error) {
        return next(error);
    }
};

export { seedUser, getUsers, getuserById, deleteUserById, processRegister };
