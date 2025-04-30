import { z } from "zod";

export const CreateTrackDTO = z.object({
     latitude: z.string(), 
     longitude: z.string(),
     track: z.string().min(1, "O código da trilha é obrigatório"),
});
