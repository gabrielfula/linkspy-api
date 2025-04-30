import { z } from "zod";

export const RegisterDTO = z.object({
     name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
     username: z.string().email("Email inválido"),
     password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
