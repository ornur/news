import z from "zod";

export const loginSchema = z.object({
  phone: z.string().min(17).max(17),
  password: z.string().min(8),
});

export type User = z.infer<typeof loginSchema>;