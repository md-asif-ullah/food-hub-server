import express from "express";
import { createProduct } from "../controllers/ProductController.js";
import upload from "../helper/uploadMulter.js";

const ProductRouter = express.Router();

ProductRouter.post("/", upload.single("image"), createProduct);

export default ProductRouter;
