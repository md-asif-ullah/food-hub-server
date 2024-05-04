import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";
import { errorResponse, successResponse } from "./responcesController.js";
import createJwt from "../helper/createJwt.js";
import jwt from "jsonwebtoken";

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

        if (user.isBanned) {
            return errorResponse(res, {
                statusCode: 400,
                message: "User is banned , please contact to authorizations",
            });
        }

        const token = createJwt({ user }, process.env.JWT_lOGIN_SECRET, "1h");

        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true,
        });

        const refreshToken = createJwt(
            { user },
            process.env.JWT_REFRESHTOKEN_SECRET,
            "7d"
        );

        res.cookie("refreshToken", refreshToken, {
            maxAge: 604800000,
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

const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return successResponse(res, {
            statusCode: 200,
            message: "User logout successfully",
        });
    } catch (error) {
        return next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        const decodedToken = jwt.verify(
            oldRefreshToken,
            process.env.JWT_REFRESHTOKEN_SECRET
        );

        if (!decodedToken) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Invalid refresh token",
            });
        }

        const token = createJwt(
            decodedToken.user,
            process.env.JWT_lOGIN_SECRET,
            "1h"
        );

        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "Token refreshed successfully",
        });
    } catch (error) {
        return next(error);
    }
};

export { loginUser, logoutUser, refreshToken };
