import { z } from "zod";

export const taskValidateSchema = z.object({
  title: z.string({
    required_error: "El título es requerido",
  }),
  description: z.string({
    required_error: "La descripción debe ser un string",
  }),
  date: z.string().datetime().optional(),
});
