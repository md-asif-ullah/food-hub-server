import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import createError from "http-errors";
import userRouter from "./routes/userRoutes.js";
const app = express();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    message: "Too many requests , please try again after 5 minutes.",
});

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

//routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/users", userRouter);

//error handling middleware

app.use((req, res, next) => {
    return next(createError(404, "Not found"));
});

app.use((err, req, res, next) => {
    return next(createError({ statusCode: err.status, message: err.message }));
});

export default app;
