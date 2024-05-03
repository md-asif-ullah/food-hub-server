import jwt from "jsonwebtoken";

const createJwt = (payload, secret, expiresTime) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresTime,
    });
};
export default createJwt;
