import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import { Button } from "../ui/button";

const SearchSwitch = () => {
  const { searchTerm, router, createMultipleQueryStrings, pathname } =
    useCurrentPage();
  const isCommunitySearch = pathname.includes("/c/search");
  const isUserSearch = pathname.includes("/users/search");
  const isPostSearch = !isCommunitySearch && !isUserSearch;

  const handleCommunitySearch = () => {
    router.push(
      "/c/search" +
        "?" +
        createMultipleQueryStrings(["q", "page"], [searchTerm, "1"])
    );
  };
  const handleUserSearch = () => {
    router.push(
      "/users/search" +
        "?" +
        createMultipleQueryStrings(["q", "page"], [searchTerm, "1"])
    );
  };
  const handlePostSearch = () => {
    router.push(
      "/search" +
        "?" +
        createMultipleQueryStrings(["q", "page"], [searchTerm, "1"])
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
