import jwt from "jsonwebtoken";

const createJwt = (email, secret, expiresTime) => {
    return jwt.sign({ email }, secret, {
        expiresIn: expiresTime,
    });
};
export default createJwt;
