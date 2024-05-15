import sendUserMail from "../helper/sendMail.js";
import { errorResponse, successResponse } from "./responcesController.js";

const userContectInfo = async (req, res, next) => {
    const { name, email, message } = req.body;
    try {
        const mailData = {
            from: email,
            to: process.env.SEND_EMAIL,
            subject: `Message from ${name}`,
            html: `${message}`,
        };

        const sendMail = await sendUserMail(mailData);

        if (!sendMail) {
            return errorResponse(res, {
                statusCode: 500,
                success: false,
                message: "Failed to send message",
            });
        }

        return successResponse(res, {
            statusCode: 201,
            success: true,
            message: `Thank you for your message`,
        });
    } catch (error) {
        return next(error);
    }
};

export default userContectInfo;
