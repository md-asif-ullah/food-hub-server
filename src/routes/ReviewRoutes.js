import express from "express";
import { getReviews } from "../controllers/ReviewsController.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);

export default reviewsRouter;
