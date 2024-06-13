import { z } from "zod";

const productValidation = z.object({
    name: z
        .string({ required_error: "Please enter product name" })
        .trim()
        .min(3, { message: "Product name must be at least 3 characters" })
        .max(100, { message: "Product name cannot exceed 100 characters" }),
    category: z.string({ required_error: "Please enter product category" }),
    price: z
        .string({ required_error: "Please enter product price" })
        .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
            message: "Please enter a valid price",
        }),
    description: z
        .string({ required_error: "Please enter product description" })
        .min(3, {
            message: "Product description must be at least 3 characters",
        })
        .max(200, {
            message: "Product description cannot exceed 200 characters",
        }),
    quantity: z.string({ required_error: "Please enter product quantity" }),
    discount: z.string().optional().default(0),
});

export { productValidation };
