import { z } from "zod";

export const FetchTrackDTO = z.object({
     track: z.string().min(1, "O código é obrigatório"),
     latitude: z.number().nullable().optional(),
     longitude: z.number().nullable().optional(),
});
