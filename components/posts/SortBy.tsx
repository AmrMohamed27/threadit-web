"use client";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentPage } from "@/hooks/use-current-page";
import { Button } from "../ui/button";
import { ChevronDown as DropdownIcon } from "lucide-react";
import { SortOptions } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { sortingOptions } from "@/constants";

const SortBy = () => {
  const { createQueryString, searchParams } = useCurrentPage();
  const pathname = usePathname();
  const router = useRouter();
  const [sortBy, setSortBy] = React.useState<SortOptions>(
    (searchParams.get("sortBy") as SortOptions) ||
      (localStorage.getItem("sortBy") as SortOptions) ||
      "Best"
  );

  function handleSortByChange(sortBy: SortOptions) {
    setSortBy(sortBy);
    localStorage.setItem("sortBy", sortBy);
  }

  useEffect(() => {
    const queryString = createQueryString("sortBy", sortBy);
    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  }, [sortBy, createQueryString, router, pathname]);
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
