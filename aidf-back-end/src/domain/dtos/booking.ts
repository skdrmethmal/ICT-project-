import { z } from "zod";

export const createbookingDTO = z.object({
  hotelId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
});
