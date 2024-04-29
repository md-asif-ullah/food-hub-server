import mongoose from "mongoose";
import { defaultImage } from "../secrect.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [50, "Name must not exceed 50 characters"],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            set: (value) => bcrypt.hashSync(value, 8),
        },
        image: {
            type: String,
            default: defaultImage,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
        },
        isVarified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const user = mongoose.model("User", userSchema);

export default user;
