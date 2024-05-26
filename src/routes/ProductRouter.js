import express from "express";
import {
    createProduct,
    getProducts,
} from "../controllers/ProductController.js";
import upload from "../helper/uploadMulter.js";

const ProductRouter = express.Router();

ProductRouter.post("/", upload.single("image"), createProduct);
ProductRouter.get("/", getProducts);

export default ProductRouter;
