"use client";
import SearchSwitch from "@/components/common/SearchSwitch";
import UserSearchFeed from "@/components/user/UserSearchFeed";
import { POSTS_PER_PAGE } from "@/constants";
import { useSearchForUserQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";

const SearchUserPage = () => {
  const { currentPage, searchTerm: paramSearch } = useCurrentPage();
  const searchTerm = paramSearch.startsWith("u/")
    ? paramSearch.slice(2)
    : paramSearch;
  const { data, loading, error } = useSearchForUserQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        searchTerm,
      },
    },
  });
  const {
    userArray: users,
    count,
    errors,
  } = data?.searchForUser ?? {
    userArray: [],
    count: 0,
  };
  return (
    <>
      {/* Heading */}
      <h1 className="text-xl md:text-3xl">
        Search Results for {searchTerm} in Users
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : errors || !users || !count ? (
        <div> {errors ? errors[0].message : "An error occurred"}</div>
      ) : error ? (
        <div>Error: {error?.message ?? "An error occurred"}</div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <SearchSwitch />
          <UserSearchFeed users={users} count={count} hasPagination />
        </div>
      )}
    </>
  );
};

export default SearchUserPage;
