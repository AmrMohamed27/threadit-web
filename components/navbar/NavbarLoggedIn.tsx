import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation, User } from "@/generated/graphql";
import { cn, getDefaultAvatar } from "@/lib/utils";
import {
  Plus as CreateIcon,
  LogOut as LogOutIcon
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import AvatarWrapper from "../common/AvatarWrapper";
import GreyDiv from "../common/GreyDiv";

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
      refetchQueries: "all",
    });
  };
  if (logoutError) console.error(logoutError);
  return (
    <div className="flex flex-row-reverse items-center gap-4">
      {/* Avatar and dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarWrapper
            src={user.image ?? getDefaultAvatar({ name: user.name })}
            alt={`${user.name}'s profile picture`}
            loading={isLogoutLoading}
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
                loading={isLogoutLoading}
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
    </div>
  );
};

export default NavbarLoggedIn;
