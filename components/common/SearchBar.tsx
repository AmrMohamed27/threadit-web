"use client";
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryStringFn } from "@/lib/utils";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import Link from "next/link";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
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
  const createQueryString = useCallback(
    (name: string, value: string) => {
      return createQueryStringFn(name, value, searchParams);
    },
    [searchParams]
  );
  const searchURL = "/search" + "?" + createQueryString("q", searchTerm);

  const handleSearch = () => {
    if (searchTerm.trim().length !== 0) {
      router.push(searchURL);
    }
  };

  return (
    <div className="relative flex flex-1 max-w-[400px]">
      <Popover open={isOpen} modal={false}>
        <PopoverAnchor className="w-full">
          <Input
            className="relative pl-10 rounded-full w-full"
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
            className="z-50 relative flex flex-1 hover:bg-muted w-full md:w-[400px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
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
