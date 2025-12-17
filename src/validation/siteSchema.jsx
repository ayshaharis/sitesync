import { z } from "zod";

export const siteSchema = z
  .object({
    name: z.string().min(1, "Site name is required"),
    location: z.string().min(1, "Location is required"),
    owner_name: z.string().min(1, "Owner name is required"),

    contact: z.union([
      z.string(),
      z.number().transform(val => String(val))
    ])
    .refine(val => /^[0-9]{10}$/.test(String(val)), {
      message: "Contact should be exactly 10 digits"
    }),

    notes: z.string().optional(),

    budget: z.union([
      z.string().transform(val => val === "" ? undefined : Number(val)),
      z.number()
    ])
    .refine(val => val === undefined || val >= 0, {
      message: "Budget cannot be negative"
    })
    .optional(),

    start_date: z.string().min(1, "Start date required"),
    end_date: z.string().min(1, "End date required"),

    status: z.string().min(1, "Status is required"),
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.end_date) return true;
      return new Date(data.end_date) > new Date(data.start_date);
    },
    {
      message: "End date should be greater than start date",
      path: ["end_date"],
    }
  );