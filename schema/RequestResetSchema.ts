import { z } from "zod";

const RequestResetSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});
export default RequestResetSchema;
