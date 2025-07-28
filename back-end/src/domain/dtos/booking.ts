import { z } from "zod";

export const createbookingDTO = z.object({
  hotelId: z.string(),
  hotelName: z.string(),
  totalPrice: z.number(),
  nights: z.number(),
  checkIn: z.string(),
  checkOut: z.string(),
});
