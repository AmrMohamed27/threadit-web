import { z } from "zod";

const EditUsernameSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
});

export default EditUsernameSchema;
