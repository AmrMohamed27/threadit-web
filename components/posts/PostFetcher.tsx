"use client";
import { POSTS_PER_PAGE } from "@/constants";
import { useGetUserCommunityPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import { SortOptions } from "@/types";
import PostsFeed from "./PostsFeed";
import { useSort } from "@/hooks/use-sort";

interface Props {
  passedSortBy?: SortOptions;
}

const PostFetcher = ({ passedSortBy }: Props) => {
  const { currentPage } = useCurrentPage();
  const { sortBy } = useSort();
  const { data, loading, error } = useGetUserCommunityPostsQuery({
    variables: {
      options: {
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy: passedSortBy ? passedSortBy : sortBy,
      },
    },
  });

  const {
    postsArray: posts,
    count,
    errors,
  } = data?.getUserCommunityPosts ?? {
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

export default PostFetcher;
