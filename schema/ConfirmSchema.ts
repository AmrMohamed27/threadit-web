import { z } from "zod";

const ConfirmSchema = z.object({
  code: z
    .string()
    .length(6, { message: "Code must be 6 digits" })
    .refine(
      (value) => {
        return /^\d{6}$/.test(value);
      },
      { message: "Code must be numeric only and contain exactly 6 digits." }
    ),
});
export default ConfirmSchema;
