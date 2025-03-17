import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import { Button } from "../ui/button";
import { getCleanSearchTerm } from "@/lib/utils";

const SearchSwitch = () => {
  const { searchTerm, router, createMultipleQueryStrings, pathname } =
    useCurrentPage();
  const isCommunitySearch = pathname.includes("/c/search");
  const isUserSearch = pathname.includes("/users/search");
  const isPostSearch = !isCommunitySearch && !isUserSearch;

  const handleCommunitySearch = () => {
    const newSearchTerm = getCleanSearchTerm(searchTerm);
    router.push(
      "/c/search" +
        "?" +
        createMultipleQueryStrings(["q", "page"], [newSearchTerm, "1"])
    );
  };
  const handleUserSearch = () => {
    const newSearchTerm = getCleanSearchTerm(searchTerm);

    router.push(
      "/users/search" +
        "?" +
        createMultipleQueryStrings(["q", "page"], [newSearchTerm, "1"])
    );
  };
  const handlePostSearch = () => {
    const newSearchTerm = getCleanSearchTerm(searchTerm);

    router.push(
      "/search" +
        "?" +
        createMultipleQueryStrings(["q", "page"], [newSearchTerm, "1"])
    );
  };
  return (
    <div className="flex flex-row items-center gap-4">
      {/* Community Search */}
      {!isCommunitySearch && (
        <Button
          variant={"grey"}
          onClick={handleCommunitySearch}
          className="max-w-48"
        >
          Search in Communities
        </Button>
      )}
      {/* Post Search */}
      {!isPostSearch && (
        <Button
          variant={"grey"}
          onClick={handlePostSearch}
          className="max-w-48"
        >
          Search in Posts
        </Button>
      )}
      {/* User Search */}
      {!isUserSearch && (
        <Button
          variant={"grey"}
          onClick={handleUserSearch}
          className="max-w-48"
        >
          Search in Users
        </Button>
      )}
    </div>
  );
};

export default SearchSwitch;
