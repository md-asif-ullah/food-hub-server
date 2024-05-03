import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_lOGIN_SECRET);
            if (!decoded) {
                res.status(401).send("Unauthorized Access");
            }
            req.user = decoded.user;
            next();
        } else {
            res.status(401).send("Unauthorized Access");
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
                req.user = decoded.user;
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
            res.status(401).send("Unauthorized Access");
        }
    } catch (error) {
        throw error;
    }
};

export { isLoggedIn, isLoggedOut, isAdmin };
