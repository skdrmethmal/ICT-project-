import z from "zod";

export const createHelpDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "Topic is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});
