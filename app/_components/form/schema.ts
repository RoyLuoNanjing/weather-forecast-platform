import { z } from "zod";

export const selectOptionSchema = z.object({
  value: z.number(),
  label: z.string(),
});

export const weatherParamsFormSchema = z.object({
  forecastDays: z.coerce
    .number()
    .min(0, "Please enter a greater number")
    .max(99999, "Please enter a lower number"),
  units: z.coerce.string(),
});
