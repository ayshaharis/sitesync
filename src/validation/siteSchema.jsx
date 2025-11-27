import z from "zod";
export const siteSchema =z.object({
    name:z.string().min(1,"Site name is required"),
    location:z.string().min(1,"Location is required"),

})