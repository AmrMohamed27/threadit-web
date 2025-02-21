import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis as OptionsIcon } from "lucide-react";
import { postOptionsDropdown } from "@/constants";

const PostOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted p-1 rounded-full">
        <OptionsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {postOptionsDropdown.map(({ id, label, icon: Icon }) => (
          <DropdownMenuItem key={id}>
            <button className="flex flex-row items-center gap-2 p-2 rounded-md">
              <Icon size={16} aria-label={label} />
              <span>{label}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
