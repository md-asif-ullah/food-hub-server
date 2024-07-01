import express from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    getProductsForAdmin,
    popularProduct,
    updateProduct,
} from "../controllers/ProductController.js";
import upload from "../helper/uploadMulter.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";
import inputErrorhandling from "../middleware/zodInputValidate.js";
import { productValidation } from "../validations/productInputValidation.js";

const ProductRouter = express.Router();

ProductRouter.get("/popular", popularProduct);
ProductRouter.get("/admin", isLoggedIn, isAdmin, getProductsForAdmin);
ProductRouter.put("/update/:id", upload.single("image"), updateProduct);

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
ProductRouter.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

export default ProductRouter;
