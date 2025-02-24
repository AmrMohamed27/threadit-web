"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Community } from "@/generated/graphql";
import AvatarWrapper from "../common/AvatarWrapper";
import { getDefaultAvatar } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  communities: Community[];
  selectedCommunityId?: number;
  onSelect: (id: number) => void;
}

const ChooseCommunity = ({
  communities,
  selectedCommunityId,
  onSelect,
}: Props) => {
  // Get selected community if it exists
  const selectedCommunity = communities.find(
    (c) => c.id === selectedCommunityId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="grey"
          className="flex items-center gap-2 py-4 max-w-[150px] text-sm"
        >
          {selectedCommunity ? (
            <>
              <AvatarWrapper
                src={
                  selectedCommunity.image ??
                  getDefaultAvatar({ name: selectedCommunity.name })
                }
                alt={`${selectedCommunity.name}'s image`}
                className="w-6 h-6"
              />
              <span>{selectedCommunity.name}</span>
            </>
          ) : (
            "Choose a community"
          )}
          <ChevronDownIcon size={16} aria-label="Open Community Selector" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {communities.map((community) => (
          <DropdownMenuItem
            key={community.id}
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => onSelect(community.id)}
          >
            <AvatarWrapper
              src={
                community.image ?? getDefaultAvatar({ name: community.name })
              }
              alt={`${community.name}'s image`}
              className="w-6 h-6"
            />
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-foreground">
                {community.name}
              </span>
              <span className="text-muted-foreground">
                {community.membersCount ?? 1} members
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChooseCommunity;
