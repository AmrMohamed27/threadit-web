import { z } from "zod";

const MessageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long" }),
  media: z.string().optional(),
});
export default MessageSchema;
