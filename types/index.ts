export type ErrorField =
  | "email"
  | "name"
  | "password"
  | "confirmPassword"
  | "root"
  | `root.${string}`;
export type LoginErrorType = "email" | "password" | "root" | `root.${string}`;
