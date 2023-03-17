import { z } from "zod";

export const joinSchema = z.object({
  subject: z.string().trim().toLowerCase().min(1).max(255),
});
