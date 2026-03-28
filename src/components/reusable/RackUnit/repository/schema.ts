import { z } from "zod";
import raw from "./blades.json";

const deepDiveSchema = z.object({
  lines: z.array(z.string()),
  note: z.string(),
});

export const bladeSchema = z.object({
  id: z.string(),
  name: z.string(),
  port: z.string(),
  type: z.string(),
  role: z.string(),
  uptime: z.string(),
  deepDive: deepDiveSchema,
});

export const bladesSchema = z.array(bladeSchema);

export const BLADES = bladesSchema.parse(raw);
