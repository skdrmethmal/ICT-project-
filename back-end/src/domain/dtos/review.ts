import { z } from "zod";

export const createreviewDTO = z.object({
  hotelId: z.string(),
  rating: z.number(),
  review: z.string(),
});
