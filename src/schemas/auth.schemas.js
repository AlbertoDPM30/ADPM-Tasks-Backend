import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "El Correo electrónico es requerido",
    })
    .email({
      required_error: "El correo electrónico no es valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      required_error: "La contraseña de tener al menos 8 caracteres",
    }),
});

export const loginSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es incorrecto",
  }),
  password: z
    .string({
      required_error: "La contraseña es incorrecta",
    })
    .min(8, {
      required_error: "La contraseña debe tener al menos 8 caracteres",
    }),
});
