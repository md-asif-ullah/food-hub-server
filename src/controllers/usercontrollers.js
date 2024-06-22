import sendUserMail from "../helper/sendMail.js";
import User from "../models/usermodel.js";
import { errorResponse, successResponse } from "./responcesController.js";

const getUsers = async (req, res, next) => {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    console.log(search, typeof page, typeof limit);

    const searchRegex = new RegExp(".*" + search + ".*", "i");

    const filter = {
        $or: [
            { name: { $regex: searchRegex } },
            { email: { $regex: searchRegex } },
            { phone: { $regex: searchRegex } },
        ],
    };

    try {
        const users = await User.find(filter)
            .select("-password")
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const totalProducts = await User.countDocuments();

        return successResponse(res, {
            statusCode: 200,
            message: "Users fetched successfully",
            payload: {
                users,
                pagination: {
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

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const updated = {};

        for (let key in req.body) {
            if (
                [
                    "name",
                    "password",
                    "address",
                    "birthday",
                    "phone",
                    "isAdmin",
                    "isBanned",
                ].includes(key)
            ) {
                updated[key] = req.body[key];
            }
        }

        const updatedUser = await User.findByIdAndUpdate(id, updated, {
            context: "query",
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return errorResponse(res, {
                statusCode: 500,
                message: "Failed to update user",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "User updated successfully",
            payload: updatedUser,
        });
    } catch (error) {
        return next(error);
    }
};

const processRegister = async (req, res, next) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const verificationCodeExpires = Date.now() + 120000;

        const { name, email, password } = req.body;

        const userExistVerified = await User.findOne({
            email,
        });
        if (userExistVerified) {
            if (userExistVerified.isVerified) {
                return errorResponse(res, {
                    statusCode: 400,
                    message: "User already exist with this email. Please login",
                });
            } else {
                userExistVerified.verificationCode = verificationCode;
                userExistVerified.verificationCodeExpires =
                    verificationCodeExpires;
                await userExistVerified.save();
            }
        } else {
            const newUser = new User({
                name,
                email,
                password,
                verificationCode,
                verificationCodeExpires,
            });

            await newUser.save();
        }

        const mailData = {
            from: process.env.SMTP_USERNAME,
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

const verifyUser = async (req, res, next) => {
    try {
        const { email, verificationCode } = req.body;

        const existUser = await User.findOne({ email });

        if (!existUser) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        if (existUser.verificationCode !== verificationCode) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Invalid verification code",
            });
        }
        if (existUser.verificationCodeExpires < Date.now()) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Verification code expired",
            });
        }

        existUser.isVerified = true;

        await existUser.save();

        return successResponse(res, {
            statusCode: 200,
            message: "User verified successfully",
        });
    } catch (error) {
        return next(error);
    }
};

// forget password

const processForgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const verificationCodeExpires = Date.now() + Date.now() + 120000;

        user.verificationCode = verificationCode;
        user.verificationCodeExpires = verificationCodeExpires;

        await user.save();

        const mailData = {
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: "Reset Password",
            html: `<h3>Use this verification code below to reset your password</h3>
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
            statusCode: 200,
            message: `go to ${email} to verify your account`,
        });
    } catch (error) {
        return next(error);
    }
};

const verifyForgetPassword = async (req, res, next) => {
    try {
        const { email, verificationCode } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        if (user.verificationCode !== verificationCode) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Invalid verification code",
            });
        }

        if (user.verificationCodeExpires < Date.now()) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Verification code expired",
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Verification code verified successfully",
        });
    } catch (error) {
        error(next);
    }
};

const resetUserPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        user.password = password;

        await user.save();

        return successResponse(res, {
            statusCode: 200,
            message: "Password reset successfully",
        });
    } catch (error) {
        return next(error);
    }
};

export {
    getUsers,
    getuserById,
    deleteUserById,
    updateUserById,
    processRegister,
    verifyUser,
    processForgetPassword,
    verifyForgetPassword,
    resetUserPassword,
};
