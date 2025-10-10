import { z } from "zod"

export const userRegisterSchema = z.object({
    fullName: z.string().min(5, "Atleast 5 character required"),
    username: z.string().min(5, "Atleast 5 character required"),
    email: z.email("Invalid Email"),
    password: z.string().min(5, "Atleast 5 character"),
})

export const userLoginSchema = userRegisterSchema.pick({
    email: true,
    password: true
})