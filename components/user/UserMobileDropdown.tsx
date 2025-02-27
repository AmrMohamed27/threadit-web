import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profileFeeds, userFeeds } from "@/constants";
import { User } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ChevronDown as DropdownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  user: User;
};

const UserMobileDropdown = ({ user }: Props) => {
  const { createQueryString, pathname, router } = useCurrentPage();
  const { user: loggedInUser } = useCurrentUser();
  const isProfile = user.id === loggedInUser?.id;
  const feed = isProfile ? profileFeeds : userFeeds;
  const [choice, setChoice] = useState(feed[0]);
  const handleChoiceChange = (id: number) => {
    setChoice(feed[id - 1]);
    router.push(`${pathname}?${createQueryString("page", "1")}`);
  };
  return (
    <div className="md:hidden flex flex-col gap-4 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"grey"} className="max-w-32">
            <span>{choice.value}</span>
            <DropdownIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {feed.map(({ id, value }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => handleChoiceChange(id)}
              className="cursor-pointer"
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <choice.component user={user} isUpvoted={choice.value === "Upvoted"} />
    </div>
  );
};

export default UserMobileDropdown;
