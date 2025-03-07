"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortingOptions } from "@/constants";
import { useSort } from "@/hooks/use-sort";
import { ChevronDown as DropdownIcon } from "lucide-react";
import { Button } from "../ui/button";

const SortBy = () => {
  const { handleSortByChange, sortBy } = useSort();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"grey"} className="max-w-24">
          <span>{sortBy}</span>
          <DropdownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortingOptions.map(({ id, option, icon: Icon }) => (
          <DropdownMenuItem
            key={id}
            className="flex flex-row items-center gap-2 py-2 cursor-pointer"
            onClick={() => handleSortByChange(option)}
          >
            <Icon size={16} aria-label={option} />
            <span>{option}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
