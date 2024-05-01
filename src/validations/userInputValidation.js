import { z } from "zod";

const userInputValidation = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must not exceed 50 characters" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),

    image: z.string().default("defaultImage"),
});

export default userInputValidation;
