import z from "zod";

export  const dailyUpdateSchema=z.object({
    date:z.string().nonempty("Date is required"),
workers: z
  .string()
  .min(1, "Workers is required")
  .refine((v) => !isNaN(Number(v)), "Workers must be a number")
  .transform((v) => Number(v))
  .refine((v) => v >= 0, "Workers cannot be negative"),
  worker_wage:z.string()
  .min(1,"Worker Wage is required")
    .refine((v) => !isNaN(Number(v)), "Worker Wage must be a number")
    .transform((v) => Number(v))
    .refine((v) => v >= 0, "Worker Wage cannot be negative"),

expenses: z
  .string()
  .min(1, "Expenses is required")
  .refine((v) => !isNaN(Number(v)), "Expenses must be a number")
  .transform((v) => Number(v))
  .refine((v) => v >= 0, "Expenses cannot be negative"),
    description:z.string().optional(),
    summary:z.string().optional(),
})