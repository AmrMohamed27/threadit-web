import { PostOptions } from "@/types";
import {
  Bookmark as SaveIcon,
  EyeOff as HideIcon,
  Flag as ReportIcon,
  Trash as DeleteIcon,
  Pencil as EditIcon,
  BookmarkX as UnsaveIcon,
} from "lucide-react";

export const POSTS_PER_PAGE = 5;




// Options for logged out users options dropdown
export const loggedOutUserOptionsDropdown: PostOptions[] = [
  { id: "report", label: "Report", icon: ReportIcon },
] as const;
// Options for post options dropdown if post is not saved
export const postOptionsDropdown: PostOptions[] = [
  { id: "save", label: "Save", icon: SaveIcon },
  { id: "hide", label: "Hide", icon: HideIcon },
  loggedOutUserOptionsDropdown[0],
] as const;

export const savedPostOptionsDropdown: PostOptions[] = [
  { id: "unsave", label: "Unsave", icon: UnsaveIcon },
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
  },
  postOptionsDropdown[2],
] as const;

// options for user's post options dropdown if post is saved
export const savedUserPostOptionsDropdown: PostOptions[] = [
  {
    id: "edit",
    label: "Edit post",
    icon: EditIcon,
    href: (postId: number) => `/posts/${postId}/edit`,
  },
  savedPostOptionsDropdown[0],
  savedPostOptionsDropdown[1],
  {
    id: "delete",
    label: "Delete",
    icon: DeleteIcon,
  },
];
