import { PostOptions } from "@/types";
import {
  Bookmark as SaveIcon,
  EyeOff as HideIcon,
  Flag as ReportIcon,
  Trash as DeleteIcon,
  Pencil as EditIcon,
} from "lucide-react";

export const POSTS_PER_PAGE = 5;

// Options for logged out users options dropdown
export const loggedOutUserOptionsDropdown: PostOptions[] = [
  { id: "report", label: "Report", icon: ReportIcon, onClick: () => {} },
] as const;
// Options for post options dropdown
export const postOptionsDropdown: PostOptions[] = [
  { id: "save", label: "Save", icon: SaveIcon, onClick: () => {} },
  { id: "hide", label: "Hide", icon: HideIcon, onClick: () => {} },
  loggedOutUserOptionsDropdown[0],
] as const;

// Options for user's post options dropdown
export const userPostOptionsDropdown: PostOptions[] = [
  {
    id: "edit",
    label: "Edit post",
    icon: EditIcon,
    href: (postId: number) => `/posts/${postId}/edit`,
  },
  postOptionsDropdown[0],
  postOptionsDropdown[1],
  {
    id: "delete",
    label: "Delete",
    icon: DeleteIcon,
    onClick: () => {},
  },
] as const;
