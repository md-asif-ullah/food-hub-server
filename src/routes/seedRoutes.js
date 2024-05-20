import exprss from "express";
import { seedProduct, seedUser } from "../controllers/seedController.js";

const seedRouter = exprss.Router();

seedRouter.get("/user", seedUser);
seedRouter.get("/products", seedProduct);

export default seedRouter;
