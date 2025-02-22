import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarContainer,
} from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  LogOut as LogOutIcon,
  Plus as CreateIcon,
  Bookmark as SavedIcon,
} from "lucide-react";
import { useLogoutMutation, User } from "@/generated/graphql";
import { Skeleton } from "../ui/skeleton";
import GreyDiv from "./GreyDiv";
import Link from "next/link";
import { cn, getDefaultAvatar } from "@/lib/utils";

interface Props {
  user: User;
}

const NavbarLoggedIn = ({ user }: Props) => {
  // Logout mutation
  const [logoutMutation, { loading: isLogoutLoading, error: logoutError }] =
    useLogoutMutation();
  // Logout handler function
  const handleLogout = async () => {
    // perform the logout mutation on the server
    await logoutMutation({
      refetchQueries: [
        "Me",
        "GetAllPosts",
        "GetPostById",
        "GetSavedPosts",
        "GetSavedPostsIds",
      ],
    });
  };
  if (logoutError) console.error(logoutError);
  return (
    <div className="flex flex-row-reverse items-center gap-4">
      {/* Avatar and dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarContainer>
            {isLogoutLoading ? (
              <Skeleton />
            ) : (
              <AvatarImage
                src={user.image ?? getDefaultAvatar({ name: user.name })}
                alt={`${user.name}'s profile picture`}
              />
            )}
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </AvatarContainer>
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
          {/* Saved Posts link */}
          <DropdownMenuItem>
            <Link
              className="flex flex-row items-center gap-2 py-2"
              href="/saved"
            >
              <SavedIcon size={16} aria-label="Saved Posts Icon" />
              Saved posts
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
    </div>
  );
};

export default NavbarLoggedIn;
