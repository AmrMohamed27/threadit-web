"use client";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { createMultipleQueryStringsFn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { DEFAULT_SEARCH_URL } from "@/constants";
import { useCurrentPage } from "@/hooks/use-current-page";

interface Props {
  origin?: string;
  placeholder?: string;
  hasPagination?: boolean;
}

const SearchBar = ({
  origin = DEFAULT_SEARCH_URL,
  placeholder = "Search",
  hasPagination = false,
}: Props) => {
  const { searchTerm: initialSearchTerm } = useCurrentPage();
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [isOpen, setIsOpen] = useState(false); // Manually control popover state

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(e.target.value.trim().length > 0); // Open popover only if input has text
  };

  const handleFocus = () => {
    if (searchTerm.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100); // Slight delay to allow clicking inside popover
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const createMultipleQueryStrings = useCallback(
    (names: string[], values: string[]) => {
      return createMultipleQueryStringsFn({ names, values, searchParams });
    },
    [searchParams]
  );
  const isCommunitySearch = searchTerm.startsWith("c/");
  const isUserSearch = searchTerm.startsWith("u/");
  const searchURL =
    (isCommunitySearch ? "/c" : isUserSearch ? "/users" : "") +
    origin +
    "?" +
    createMultipleQueryStrings(
      hasPagination ? ["q", "page"] : ["q"],
      hasPagination ? [searchTerm, "1"] : [searchTerm]
    );

  const handleSearch = () => {
    if (searchTerm.trim().length !== 0) {
      router.push(searchURL);
    }
  };

  return (
    <div className="relative flex flex-wrap flex-1 w-full md:max-w-[400px]">
      <Popover open={isOpen} modal={false}>
        <PopoverAnchor className="w-full">
          <Input
            className="relative pl-10 rounded-full w-full"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchTermChange}
            onFocus={handleFocus} // Open popover when input is focused
            onBlur={handleBlur} // Close popover when input loses focus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsOpen(false);
                handleSearch();
              } else if (e.key === "Escape") {
                setIsOpen(false);
              }
            }}
          />
        </PopoverAnchor>
        <SearchIcon
          className="top-1/2 left-4 absolute text-muted-foreground -translate-y-1/2"
          size={18}
        />
        {isOpen && (
          <PopoverContent
            className="z-50 relative flex flex-col flex-1 gap-4 hover:bg-muted w-[300px] md:w-[400px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {origin === DEFAULT_SEARCH_URL && (
              <div className="flex flex-wrap w-full">
                <p className="text-muted-foreground text-xs">
                  Prefix your search with c/ to search for communities or u/ to
                  search for users.
                </p>
              </div>
            )}
            <Link href={searchURL} className="flex flex-col gap-4 w-full">
              <div className="flex flex-row flex-wrap justify-between items-start gap-2">
                <SearchIcon className="mt-1 text-muted-foreground" size={18} />
                <p className="flex-1 w-full break-all">{searchTerm}</p>
              </div>
            </Link>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

export default SearchBar;
