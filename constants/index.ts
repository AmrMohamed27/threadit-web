import { Community } from "@/generated/graphql";
import { CommentOptions, PostOptions, SortingObjects } from "@/types";
import {
  Bookmark as SaveIcon,
  EyeOff as HideIcon,
  Flag as ReportIcon,
  Trash as DeleteIcon,
  Pencil as EditIcon,
  BookmarkX as UnsaveIcon,
  Trophy as BestIcon,
  Flame as HotIcon,
  ClockArrowDown as OldIcon,
  ClockArrowUp as NewIcon,
  SquareArrowUp as TopIcon,
  Home as HomeIcon,
  Flame as PopularIcon,
  Globe as AllIcon,
  PlusIcon,
  Book as AboutIcon,
} from "lucide-react";

export const POSTS_PER_PAGE = 5;

export const MAX_REPLY_DEPTH = 3;

// POSTS
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
    href: ({ postId }) => `/posts/${postId}/edit`,
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
    href: ({ postId }) => `/posts/${postId}/edit`,
  },
  savedPostOptionsDropdown[0],
  savedPostOptionsDropdown[1],
  {
    id: "delete",
    label: "Delete",
    icon: DeleteIcon,
  },
];

// COMMENTS
// Options for logged out users options dropdown
export const loggedOutUserCommentOptionsDropdown: CommentOptions[] = [
  { id: "report", label: "Report", icon: ReportIcon },
] as const;
// Options for comment options dropdown
export const commentOptionsDropdown: CommentOptions[] = [
  loggedOutUserCommentOptionsDropdown[0],
] as const;
// Options for user's comment options dropdown
export const userCommentOptionsDropdown: CommentOptions[] = [
  {
    id: "edit",
    label: "Edit comment",
    icon: EditIcon,
    href: ({ postId, commentId }) =>
      `/posts/${postId}/comment/${commentId}/edit`,
  },
  {
    id: "delete",
    label: "Delete",
    icon: DeleteIcon,
  },
  loggedOutUserCommentOptionsDropdown[0],
] as const;

export const sortingOptions: SortingObjects[] = [
  { id: 1, option: "Best", icon: BestIcon },
  { id: 2, option: "Hot", icon: HotIcon },
  { id: 3, option: "New", icon: NewIcon },
  { id: 4, option: "Top", icon: TopIcon },
  { id: 5, option: "Old", icon: OldIcon },
];

export const sidebarHeader = [
  { id: 1, title: "Home", href: "/", icon: HomeIcon },
  { id: 2, title: "Popular", href: "/popular", icon: PopularIcon },
  { id: 3, title: "All", href: "/all", icon: AllIcon },
] as const;

export const sidebarCollapsibles = [
  {
    id: 1,
    title: "Communities",
    children: [
      {
        id: 10,
        title: "Create a community",
        href: "/c/create",
        icon: PlusIcon,
      },
    ],
  },
  {
    id: 2,
    title: "Resources",
    children: [
      { id: 20, title: "About Threadit", href: "/about", icon: AboutIcon },
    ],
  },
] as const;

export const sidebarCommunitiesCollapsible = (communities: Community[]) =>
  [
    {
      id: 1,
      name: "Create a community",
      href: "/c/create",
      icon: PlusIcon,
    },
    communities.map(({ id, name, image }) => ({
      id,
      name,
      image,
      href: `/c/${name}`,
    })),
  ] as const;

export const sidebarResourcesCollapsible = [
  { id: 1, title: "About Threadit", href: "/about", icon: AboutIcon },
] as const;

export const sidebarCollapsiblesMap = [] as const;
