import { z } from "zod";

const CommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long" }),
});
export default CommentSchema;
