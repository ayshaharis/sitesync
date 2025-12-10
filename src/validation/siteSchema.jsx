import z from "zod";

export const siteSchema = z
  .object({
    name: z.string().nonempty("Site name is required"),
    location: z.string().nonempty("Location is required"),
    owner_name: z.string().nonempty("Owner name is required"),

    contact: z
      .string()
      .length(10, "Contact should be 10 digits")
      .regex(/^[0-9]+$/, "Only numbers allowed"),

    notes: z.string().optional(),

    budget: z
      .string()
      .refine((v) => Number(v) >= 100, "Budget must be at least 3 digits"),

    start_date: z.string().nonempty("Start date required"),
    end_date: z.string().nonempty("End date required"),

    status: z.string().nonempty("Status is required"),
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

