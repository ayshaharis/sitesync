import {z} from "zod";




export const dailyUpdateSchema = z.object({
  date: z.string().min(1, "Date is required"),
  workers: z.coerce.number().nonnegative("Workers cannot be negative").optional().or(z.literal("").transform(() => undefined)),
  worker_wage: z.coerce.number().nonnegative("Worker wage cannot be negative").optional().or(z.literal("").transform(() => undefined)),
  expenses: z.coerce.number().nonnegative("Expenses cannot be negative").optional().or(z.literal("").transform(() => undefined)),
  description: z.string().optional(),
  summary: z.string().optional(),
});