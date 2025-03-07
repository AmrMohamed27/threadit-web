import { POSTS_PER_PAGE } from "@/constants";
import { Community, useGetCommunityPostsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import PostsFeedLoading from "../loading/PostsFeedLoading";
import PostsFeed from "../posts/PostsFeed";

type Props = {
  community: Community;
};

const CommunityFeed = ({ community }: Props) => {
  // Destructure community
  const { id: communityId } = community;
  const { currentPage, sortBy } = useCurrentPage();

  // Get posts from the community
  const { data, loading, error } = useGetCommunityPostsQuery({
    variables: {
      options: {
        communityId,
        limit: POSTS_PER_PAGE,
        page: currentPage,
        sortBy,
      },
    },
  });
  if (loading) return <PostsFeedLoading hasPagination />;
  if (error) return <div>{error.message}</div>;
  const posts = data?.getCommunityPosts.postsArray ?? [];
  const count = data?.getCommunityPosts.count ?? 0;
  const errors = data?.getCommunityPosts.errors ?? [];
  if (errors.length > 0) {
    return <div className="w-full">{errors[0].message}</div>;
  }
  return <PostsFeed posts={posts} count={count} hasPagination />;
};

export default CommunityFeed;
