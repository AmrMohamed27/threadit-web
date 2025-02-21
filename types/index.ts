export type ErrorField =
  | "email"
  | "name"
  | "password"
  | "confirmPassword"
  | "root"
  | `root.${string}`;
export type LoginErrorType = "email" | "password" | "root" | `root.${string}`;

export type CreatePostErrorType =
  | "title"
  | "content"
  | "root"
  | `root.${string}`;

export type ResetPasswordErrorType =
  | "root"
  | `root.${string}`
  | "newPassword"
  | "confirmNewPassword";

export type RequestResetErrorType = "email" | "root" | `root.${string}`;

export type ConfirmErrorType = "code" | "root" | `root.${string}`;
