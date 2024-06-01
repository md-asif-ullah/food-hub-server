import express from "express";
import {
    createProduct,
    getProductById,
    getProducts,
    popularProduct,
} from "../controllers/ProductController.js";
import upload from "../helper/uploadMulter.js";

const ProductRouter = express.Router();

ProductRouter.get("/popular", popularProduct);

ProductRouter.post("/", upload.single("image"), createProduct);
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProductById);

export default ProductRouter;
