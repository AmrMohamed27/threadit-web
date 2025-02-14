"use client";
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
import { LogOut } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import NavbarButtons from "./NavbarButtons";
import { useLogoutMutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";

const Avatar = () => {
  // Get current logged in user
  const { user, loading: isUserLoading, error: userError } = useCurrentUser();
  // Logout mutation
  const [
    logoutMutation,
    { data: logoutResult, loading: isLogoutLoading, error: logoutError },
  ] = useLogoutMutation();
  // Router
  const router = useRouter();
  // render skeleton for loading
  if (isUserLoading)
    return <Skeleton className="w-[40px] h-[40px] rounded-full"></Skeleton>;
  // log errors
  if (userError) {
    console.error(userError);
  }
  // Logout handler function
  const handleLogout = async () => {
    // perform the logout mutation on the server
    await logoutMutation({
      refetchQueries: ["Me"],
    });
    if (logoutError) console.error(logoutError);
    if (logoutResult?.logoutUser) router.push("/");
  };
  return user ? (
    // Render user avatar with dropdown menu
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarContainer>
          {isLogoutLoading ? (
            <Skeleton />
          ) : (
            <AvatarImage
              src={user.image ?? "https://github.com/shadcn.png"}
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
        <DropdownMenuItem>
          <Button
            className="p-0"
            variant={"ghost"}
            onClick={async () => {
              await handleLogout();
            }}
          >
            <LogOut size={16} aria-label="Logout Icon" />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      {/* User not logged in so render auth buttons */}
      <NavbarButtons />
    </>
  );
};

export default Avatar;
