import {
  Bookmark as SaveIcon,
  EyeOff as HideIcon,
  Flag as ReportIcon,
} from "lucide-react";

export const POSTS_PER_PAGE = 5;
// Options for post options dropdown
export const postOptionsDropdown = [
  { id: 1, label: "Save", icon: SaveIcon },
  { id: 2, label: "Hide", icon: HideIcon },
  { id: 3, label: "Report", icon: ReportIcon },
] as const;
