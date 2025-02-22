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
import { LogOut, Plus as CreateIcon } from "lucide-react";
import { useLogoutMutation, User } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import GreyDiv from "./GreyDiv";
import Link from "next/link";
import { getDefaultAvatar } from "@/lib/utils";

interface Props {
  user: User;
}

const NavbarLoggedIn = ({ user }: Props) => {
  // Router
  const router = useRouter();
  // Logout mutation
  const [logoutMutation, { loading: isLogoutLoading, error: logoutError }] =
    useLogoutMutation();
  // Logout handler function
  const handleLogout = async () => {
    // perform the logout mutation on the server
    await logoutMutation({
      refetchQueries: ["Me", "GetAllPosts", "GetPostById"],
    });
    router.push("/");
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
      {/* Create Post button */}
      <GreyDiv className="bg-transparent px-4 py-2">
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
