import jwt from "jsonwebtoken";
import createError from "http-errors";

const isLoggedIn = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_lOGIN_SECRET);
            if (!decoded) {
                throw createError(401, "Unauthorized Access");
            }
            req.user = decoded.user;
            next();
        } else {
            throw createError(404, "please login first");
        }
    } catch (error) {
        throw error;
    }
};

const isLoggedOut = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_lOGIN_SECRET);
            if (decoded) {
                throw createError(401, "User already logged in");
            }
        }
        next();
    } catch (error) {
        throw error;
    }
};

const isAdmin = (req, res, next) => {
    try {
        const { user } = req;

        if (user.isAdmin) {
            next();
        } else {
            res.createError(401, "Unauthorized Access");
        }
    } catch (error) {
        throw error;
    }
};

export { isLoggedIn, isLoggedOut, isAdmin };
