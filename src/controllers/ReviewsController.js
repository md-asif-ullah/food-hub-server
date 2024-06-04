import Review from "../models/ReviewModel.js";
import { successResponse } from "./responcesController.js";

const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();

        return successResponse(res, {
            statusCode: 200,
            message: "Reviews fetched successfully.",
            payload: reviews,
        });
    } catch (error) {
        return next(error);
    }
};

export { getReviews };
