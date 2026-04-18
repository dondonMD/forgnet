import { z } from "zod";
import { cities } from "./demo-data";

export const jobRequestSchema = z.object({
  title: z.string().min(6).max(100),
  category: z.enum(["FABRICATION", "PACKAGING", "WAREHOUSING", "COLD_STORAGE", "LOGISTICS"]),
  quantity: z.coerce.number().int().positive().max(100000),
  preferredLocation: z.enum(cities as [string, ...string[]]),
  deadline: z.string().min(1),
  budgetMin: z.coerce.number().int().positive(),
  budgetMax: z.coerce.number().int().positive(),
  notes: z.string().min(12).max(500),
  complianceRequirements: z.string().max(200).optional().or(z.literal("")),
});

export const roleSchema = z.object({
  role: z.enum(["buyer", "provider", "admin"]),
});

export function validateBudgetRange(values: z.infer<typeof jobRequestSchema>) {
  return values.budgetMax >= values.budgetMin;
}
