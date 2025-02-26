"use client";
import CommunitySearchFeed from "@/components/communities/CommunitySearchFeed";
import CommunitySearchFeedLoading from "@/components/loading/CommunitySearchFeedLoading";
import { POSTS_PER_PAGE } from "@/constants";
import { useSearchCommunitiesQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";

const SearchCommunityPage = () => {
  const { currentPage, searchTerm: paramSearch } = useCurrentPage();
  const searchTerm = paramSearch.startsWith("c/")
    ? paramSearch.slice(2)
    : paramSearch;
  const { data, loading, error } = useSearchCommunitiesQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        searchTerm,
      },
    },
  });
  const {
    communitiesArray: communities,
    count,
    errors,
  } = data?.searchCommunities ?? {
    communitiesArray: [],
    count: 0,
  };
  return (
    <>
      {/* Heading */}
      <h1 className="text-xl md:text-3xl">
        Search Results for {searchTerm} in Communities
      </h1>
      {loading ? (
        <CommunitySearchFeedLoading hasPagination />
      ) : errors || !communities || !count ? (
        <div> {errors ? errors[0].message : "An error occurred"}</div>
      ) : error ? (
        <div>Error: {error?.message ?? "An error occurred"}</div>
      ) : (
        <CommunitySearchFeed
          communities={communities}
          count={count}
          hasPagination
        />
      )}
    </>
  );
};

export default SearchCommunityPage;
