import express from "express";
import userContectInfo from "../controllers/ContactController.js";

const contactRouter = express.Router();

contactRouter.post("/", userContectInfo);

export default contactRouter;
