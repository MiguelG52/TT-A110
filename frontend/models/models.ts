import { number, z } from "zod";

export const User= z.object({
    userId: z.number(),
    email: z.string().email(),
    name: z.string(),
    lastName: z.string(),
    userName: z.string(),
    roleId: z.number()
})