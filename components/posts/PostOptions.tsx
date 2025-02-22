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
import { useRouter } from "next/navigation";

interface Props {
  authorId: number;
  postId: number;
}

const PostOptions = ({ authorId, postId }: Props) => {
  const { user } = useCurrentUser();
  const router = useRouter();
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
        {options.map(({ id, label, icon: Icon, onClick, href }) => (
          <DropdownMenuItem key={id}>
            <button
              className="flex flex-row items-center gap-2 p-2 rounded-md"
              onClick={
                onClick
                  ? onClick
                  : href
                  ? () => router.push(href(postId))
                  : undefined 
              }
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
