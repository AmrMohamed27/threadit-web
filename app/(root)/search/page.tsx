"use client";
import PostsFeed from "@/components/posts/PostsFeed";
import { POSTS_PER_PAGE } from "@/constants";
import { useSearchPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";

const SearchPage = () => {
  const { currentPage, searchTerm } = useCurrentPage();
  const { data, loading, error } = useSearchPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        searchTerm,
      },
    },
  });
  const {
    postsArray: posts,
    count,
    errors,
  } = data?.searchPosts ?? {
    postsArray: [],
    count: 0,
  };
  return (
    <>
      {/* Heading */}
      <h1 className="text-xl md:text-3xl">Search Results for {searchTerm}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : errors || !posts || !count ? (
        <div> {errors ? errors[0].message : "An error occurred"}</div>
      ) : error ? (
        <div>Error: {error?.message ?? "An error occurred"}</div>
      ) : (
        <>
          <PostsFeed posts={posts} count={count} hasPagination />
        </>
      )}
    </>
  );
};

export default SearchPage;
