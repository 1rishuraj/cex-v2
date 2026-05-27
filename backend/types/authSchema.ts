import zod from "zod"
export const authSchema = zod.object({
    username : zod.string().trim().min(1,"username required"),
    password : zod.string().min(1,"password required")
});
