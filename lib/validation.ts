import { z } from "zod";
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe al menos 2 caracteres.")
    .max(100, "El nombre admite hasta 100 caracteres."),
  email: z
    .string()
    .trim()
    .max(254, "El correo admite hasta 254 caracteres.")
    .email("Introduce un correo válido."),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más: al menos 20 caracteres.")
    .max(5000, "El mensaje admite hasta 5000 caracteres."),
});
export type FieldErrors = Partial<
  Record<"name" | "email" | "message", string[]>
>;
