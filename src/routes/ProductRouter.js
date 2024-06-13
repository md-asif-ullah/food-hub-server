import express from "express";
import {
    createProduct,
    getProductById,
    getProducts,
    popularProduct,
} from "../controllers/ProductController.js";
import upload from "../helper/uploadMulter.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";
import { productValidation } from "../validations/productInputValidation.js";

const ProductRouter = express.Router();

ProductRouter.get("/popular", popularProduct);

ProductRouter.post(
    "/",
    upload.single("image"),
    inputErrorhandling(productValidation),
    isLoggedIn,
    isAdmin,
    createProduct
);
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProductById);

export default ProductRouter;
