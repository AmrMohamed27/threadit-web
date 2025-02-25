"use client";
import PostsFeed from "@/components/posts/PostsFeed";
import { POSTS_PER_PAGE } from "@/constants";
import { useGetAllPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";

const AllPostsPage = () => {
  const { currentPage, sortBy } = useCurrentPage();
  const { data, loading, error } = useGetAllPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy,
      },
    },
  });
  const {
    postsArray: posts,
    count,
    errors,
  } = data?.getAllPosts ?? {
    postsArray: [],
    count: 0,
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : errors || !posts || !count ? (
        <div> {errors ? errors[0].message : "An error occurred"}</div>
      ) : error ? (
        <div>Error: {error?.message ?? "An error occurred"}</div>
      ) : (
        <>
          <PostsFeed posts={posts} count={count} hasPagination={true} />
        </>
      )}
    </>
  );
};

export default AllPostsPage;
