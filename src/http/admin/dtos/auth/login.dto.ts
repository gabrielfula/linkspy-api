import { z } from "zod";

export const LoginDTO = z.object({
     username: z.string().email("Email inválido"),
     password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});