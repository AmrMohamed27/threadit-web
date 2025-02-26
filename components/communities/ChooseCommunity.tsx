"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Community } from "@/generated/graphql";
import { getDefaultAvatar } from "@/lib/utils";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import { Input } from "../ui/input";

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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-auto">
        <Button variant="grey" className="flex items-center gap-2 py-4 text-sm">
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
      <DropdownMenuContent loop={false}>
        <SearchBar
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
        />
        {communities
          .filter((c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((community) => (
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

const SearchBar = ({
  searchTerm,
  handleSearchTermChange,
}: {
  searchTerm: string;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="relative flex flex-1 max-w-[400px]">
      <Input
        className="relative pl-10 border-none w-full"
        placeholder={"Search communities"}
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        className="top-1/2 left-4 absolute text-muted-foreground -translate-y-1/2"
        size={18}
      />
    </div>
  );
};
