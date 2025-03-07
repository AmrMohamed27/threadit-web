import { z } from "zod";

const CreateCommunitySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(300, { message: "Name must be at most 300 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }),
  isPrivate: z.boolean(),
});

export default CreateCommunitySchema;
