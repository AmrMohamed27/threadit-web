import { z } from "zod";
import { passwordValidation } from "./RegisterSchema";

const ResetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    newPassword: passwordValidation,
    confirmNewPassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
export default ResetPasswordSchema;
