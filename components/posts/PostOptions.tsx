import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis as OptionsIcon } from "lucide-react";
import {
  loggedOutUserOptionsDropdown,
  postOptionsDropdown,
  userPostOptionsDropdown,
} from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";

interface Props {
  authorId: number;
}

const PostOptions = ({ authorId }: Props) => {
  const { user } = useCurrentUser();
  const options = user
    ? user.id === authorId
      ? userPostOptionsDropdown
      : postOptionsDropdown
    : loggedOutUserOptionsDropdown;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted p-1 rounded-full">
        <OptionsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map(({ id, label, icon: Icon, onClick }) => (
          <DropdownMenuItem key={id}>
            <button
              className="flex flex-row items-center gap-2 p-2 rounded-md"
              onClick={onClick}
            >
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
