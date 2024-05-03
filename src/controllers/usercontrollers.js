import users from "../data.js";
import sendUserMail from "../helper/sendMail.js";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "./responcesController.js";
import createJwt from "../helper/createJwt.js";

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

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const updated = {};

        for (let key in req.body) {
            if (["name", "password", "address", "phone"].includes(key)) {
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
        const verificationCodeExpires = Date.now() + Date.now() + 120000;

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

        const varifiedUser = await User.findOne({ email });

        if (!varifiedUser) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        if (varifiedUser.verificationCode !== verificationCode) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Invalid verification code",
            });
        }
        if (varifiedUser.verificationCodeExpires < Date.now()) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Verification code expired",
            });
        }
        varifiedUser.isVarified = true;

        await varifiedUser.save();

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

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Invalid password",
            });
        }

        const token = createJwt({ user }, process.env.JWT_lOGIN_SECRET, "1h");

        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "User login successfully",
        });
    } catch (error) {
        return next(error);
    }
};

export {
    seedUser,
    getUsers,
    getuserById,
    deleteUserById,
    updateUserById,
    processRegister,
    verifyUser,
    processForgetPassword,
    verifyForgetPassword,
    resetUserPassword,
    loginUser,
};
