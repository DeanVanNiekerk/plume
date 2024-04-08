import * as z from 'zod';

export type Position = z.infer<typeof Position>;
export const Position = z.object({
  longitude: z.number(),
  latitude: z.number(),
});
