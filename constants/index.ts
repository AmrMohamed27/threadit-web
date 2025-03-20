import UserCommentsFeed from "@/components/user/UserCommentsFeed";
import UserHiddenFeed from "@/components/user/UserHiddenFeed";
import UserPostsFeed from "@/components/user/UserPostsFeed";
import UserSavedFeed from "@/components/user/UserSavedFeed";
import UserVotedFeed from "@/components/user/UserVotedFeed";
import { Community } from "@/generated/graphql";
import { CommentOptions, PostOptions, SortingObjects } from "@/types";
import {
  Book as AboutIcon,
  Globe as AllIcon,
  Trophy as BestIcon,
  Trash as DeleteIcon,
  Pencil as EditIcon,
  EyeOff as HideIcon,
  Eye as UnhideIcon,
  Home as HomeIcon,
  Flame as HotIcon,
  ClockArrowUp as NewIcon,
  ClockArrowDown as OldIcon,
  PlusIcon,
  Flame as PopularIcon,
  Flag as ReportIcon,
  Bookmark as SaveIcon,
  SquareArrowUp as TopIcon,
  BookmarkX as UnsaveIcon,
} from "lucide-react";

export const POSTS_PER_PAGE = 5;

export const MAX_REPLY_DEPTH = 3;

export const EXPLORE_COMMUNITIES_COUNT = 4;

export const DEFAULT_COVER_PHOTO_URL =
  "https://flowbite.com/docs/images/examples/image-3@2x.jpg";

// POSTS
// Options for logged out users options dropdown
export const savePostOption: PostOptions = {
  id: "save",
  label: "Save",
  icon: SaveIcon,
} as const;
export const unsavePostOption: PostOptions = {
  id: "unsave",
  label: "Unsave",
  icon: UnsaveIcon,
} as const;
export const deletePostOption: PostOptions = {
  id: "delete",
  label: "Delete",
  icon: DeleteIcon,
} as const;
export const hidePostOption: PostOptions = {
  id: "hide",
  label: "Hide",
  icon: HideIcon,
} as const;
export const unhidePostOption: PostOptions = {
  id: "unhide",
  label: "Unhide",
  icon: UnhideIcon,
} as const;
export const editPostOption: PostOptions = {
  id: "edit",
  label: "Edit post",
  icon: EditIcon,
} as const;
export const reportPostOption: PostOptions = {
  id: "report",
  label: "Report",
  icon: ReportIcon,
} as const;

export const loggedOutUserOptionsDropdown: PostOptions[] = [
  reportPostOption,
] as const;

// Options for post options dropdown if post is not saved
export const postOptionsDropdown: PostOptions[] = [
  hidePostOption,
  reportPostOption,
] as const;

export const savedPostOptionsDropdown: PostOptions[] = [
  unsavePostOption,
  reportPostOption,
] as const;

// Options for user's post options dropdown
export const userPostOptionsDropdown: PostOptions[] = [
  editPostOption,
  hidePostOption,
  savePostOption,
  deletePostOption,
  reportPostOption,
] as const;

// options for user's post options dropdown if post is saved
export const savedUserPostOptionsDropdown: PostOptions[] = [
  editPostOption,
  unsavePostOption,
  reportPostOption,
  deletePostOption,
];

// COMMENTS
export const editCommentOption: CommentOptions = {
  id: "edit",
  label: "Edit comment",
  icon: EditIcon,
} as const;
// Options for logged out users options dropdown
export const loggedOutUserCommentOptionsDropdown: CommentOptions[] = [
  reportPostOption,
] as const;
// Options for comment options dropdown
export const commentOptionsDropdown: CommentOptions[] = [
  reportPostOption,
] as const;
// Options for user's comment options dropdown
export const userCommentOptionsDropdown: CommentOptions[] = [
  editCommentOption,
  deletePostOption,
  reportPostOption,
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
    title: "Your Communities",
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
    title: "Explore",
    children: [],
  },
  {
    id: 3,
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

export const userFeeds = [
  { id: 1, value: "Posts", component: UserPostsFeed },
  { id: 2, value: "Comments", component: UserCommentsFeed },
] as const;

export const profileFeeds = [
  userFeeds[0],
  userFeeds[1],
  { id: 3, value: "Saved", component: UserSavedFeed },
  { id: 4, value: "Hidden", component: UserHiddenFeed },
  { id: 5, value: "Upvoted", component: UserVotedFeed },
  { id: 6, value: "Downvoted", component: UserVotedFeed },
];

export const DEFAULT_SEARCH_URL = "/search";
