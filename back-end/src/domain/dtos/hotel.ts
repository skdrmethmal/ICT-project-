import { z } from "zod";

export const addHotelDTO = z.object({
  name: z.string(),
  location: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  propertyType: z.string(),
});
