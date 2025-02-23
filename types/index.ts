import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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

export interface PostOptions {
  id: OptionIds;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href?: (postId: number) => string;
}

export type OptionIds =
  | "hide"
  | "edit"
  | "delete"
  | "report"
  | "save"
  | "unsave";

export type SortOptions = "Best" | "Hot" | "New" | "Top" | "Old";

export interface SortingObjects {
  id: number;
  option: SortOptions;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
