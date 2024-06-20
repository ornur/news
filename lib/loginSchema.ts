import { object, string } from "zod"
 
export const loginSchema = object({
  phone: string({ required_error: "Phone is required" })
    .min(17, "Phone is required")
    .max(17, "Phone must be less than 17 characters"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})