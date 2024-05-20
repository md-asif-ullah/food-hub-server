import express from "express";
import { seeProduct } from "../controllers/ProductController";

const ProductRouter = express.Router();

ProductRouter.get("/seed", seeProduct);

export default ProductRouter;
