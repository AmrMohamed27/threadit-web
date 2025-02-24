import { z } from "zod";

const CreatePostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(300, { message: "Title must be at most 300 characters long" }),
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long" }),
  communityId: z.number(),
});
export default CreatePostSchema;
