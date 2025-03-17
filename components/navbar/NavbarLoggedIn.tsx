import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import { closeChat, setChats } from "@/lib/features/chatSlice";
import { cn, getDefaultAvatar } from "@/lib/utils";
import {
  MessageCircleMore as ChatIcon,
  Plus as CreateIcon,
  LogOut as LogOutIcon,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ChatTrigger from "../chat/ChatTrigger";
import AvatarWrapper from "../common/AvatarWrapper";
import GreyDiv from "../common/GreyDiv";
import { Button } from "../ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { useTheme } from "next-themes";

interface Props {
  user: User;
}

const NavbarLoggedIn = ({ user }: Props) => {
  // dispatcher
  const dispatch = useDispatch();
  // Refetch current user
  const { refetch } = useCurrentUser();
  // Dark mode resolver
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  // Logout handler function
  const handleLogout = async () => {
    // Clear chats and Close the chat window if it's open
    dispatch(closeChat());
    dispatch(setChats([]));
    // Clear token from localStorage
    localStorage.removeItem("auth_token");
    // Redirect to login page
    await refetch();
  };
  return (
    <div className="flex flex-row-reverse items-center gap-2">
      {/* Avatar and dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarWrapper
            src={user.image ?? getDefaultAvatar({ name: user.name })}
            alt={`${user.name}'s profile picture`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{`${user.name}'s Account`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Mobile Create Post button */}
          <DropdownMenuItem className="md:hidden">
            <Link
              className="flex flex-row items-center gap-2 py-2"
              href={"/posts/create"}
            >
              <CreateIcon size={16} />
              <span>Create a post</span>
            </Link>
          </DropdownMenuItem>
          {/* Mobile Open Chat button */}
          <DropdownMenuItem className="md:hidden">
            <ChatTrigger className="flex flex-row items-center gap-2 py-2">
              <ChatIcon size={16} />
              <span>Open Chat</span>
            </ChatTrigger>
          </DropdownMenuItem>
          {/* Mobile Dark Mode toggle */}
          <DropdownMenuItem className="md:hidden flex flex-row items-center gap-2 py-2">
            <button
              className="flex flex-row items-center gap-2 py-2 cursor-pointer"
              onClick={toggleTheme}
            >
              {resolvedTheme === "dark" ? (
                <Moon size={16} />
              ) : (
                <Sun size={16} />
              )}
              <span>Toggle Theme</span>
            </button>
          </DropdownMenuItem>
          {/* Profile link */}
          <DropdownMenuItem>
            <Link
              className="flex flex-row items-center gap-2 py-2"
              href={`/users/${user.name}`}
            >
              {/* Image */}
              <AvatarWrapper
                src={user.image ?? getDefaultAvatar({ name: user.name })}
                alt={`${user.name}'s profile picture`}
                className="w-8 h-8"
              />
              {/* Name */}
              <div className="flex flex-col gap-0">
                <span>View Profile</span>
                <span className="text-muted-foreground text-xs">
                  u/{user.name}
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
          {/* Logout Button */}
          <DropdownMenuItem>
            <Button
              className="p-0"
              variant={"ghost"}
              onClick={async () => {
                await handleLogout();
              }}
            >
              <LogOutIcon size={16} aria-label="Logout Icon" />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Desktop Create Post button */}
      <GreyDiv className={cn("bg-transparent px-4 py-2 hidden md:block")}>
        <Link
          className="flex flex-row items-center gap-2"
          href={"/posts/create"}
        >
          <CreateIcon size={20} />
          <span>Create</span>
        </Link>
      </GreyDiv>
      {/* Desktop Chat button */}
      <GreyDiv className={cn("bg-transparent p-2 hidden md:block")}>
        <ChatTrigger className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <ChatIcon size={20} />
        </ChatTrigger>
      </GreyDiv>
      {/* Desktop Dark Mode Toggle */}
      <DarkModeToggle className="max-md:hidden" />
    </div>
  );
};

export default NavbarLoggedIn;
