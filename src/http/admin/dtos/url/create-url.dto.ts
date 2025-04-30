import { z } from "zod";

export const CreateUrlDTO = z.object({
     old_url: z.string().url("URL inválida"),
     alias: z.string(),
});
