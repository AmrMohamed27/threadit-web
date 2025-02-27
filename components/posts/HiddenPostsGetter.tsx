import { POSTS_PER_PAGE } from "@/constants";
import { useGetUserHiddenPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import PostsFeed from "./PostsFeed";
import PostsFeedLoading from "../loading/PostsFeedLoading";

const HiddenPostsGetter = () => {
  const { currentPage, sortBy } = useCurrentPage();
  const { data, loading, error } = useGetUserHiddenPostsQuery({
    variables: {
      options: {
        page: currentPage,
        limit: POSTS_PER_PAGE,
        sortBy,
      },
    },
  });
  if (loading) return <PostsFeedLoading hasPagination />;
  if (error) return <div> {error.message}</div>;
  if (data?.getUserHiddenPosts.errors)
    return <div> {data?.getUserHiddenPosts.errors[0].message}</div>;
  const posts = data?.getUserHiddenPosts.postsArray ?? [];
  const count = data?.getUserHiddenPosts.count ?? 0;
  if (posts.length === 0) return <div>No posts found</div>;
  return <PostsFeed posts={posts} count={count} hasPagination />;
};

export default HiddenPostsGetter;
