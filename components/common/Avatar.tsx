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

interface AvatarProps {
  handleLogout: () => void;
}

const Avatar = ({ handleLogout }: AvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarContainer>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </AvatarContainer>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className="p-0"
            variant={"ghost"}
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOut size={16} aria-label="Logout Icon" />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatar;
