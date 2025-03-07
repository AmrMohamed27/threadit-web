import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, {message: "Password must at least contain 6 letters"}),
});
export default LoginSchema;
