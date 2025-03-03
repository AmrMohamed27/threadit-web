"use client";
import {
  useGetPostByIdQuery,
  useGetUserHiddenPostsQuery,
} from "@/generated/graphql";
import CommentGetter from "../comments/CommentGetter";
import CommentsFeedGetter from "../comments/CommentsFeedGetter";
import CommentForm from "../forms/CommentForm";
import PostsFeedLoading from "../loading/PostsFeedLoading";
import HiddenPost from "./HiddenPost";
import PostsFeed from "./PostsFeed";
import CommunityAbout from "../communities/CommunityAbout";

interface Props {
  postId: number;
  commentId?: number;
}

const PostGetter = ({ postId, commentId }: Props) => {
  const { data, loading, error } = useGetPostByIdQuery({
    variables: {
      id: postId,
    },
  });
  const { data: hiddenPosts } = useGetUserHiddenPostsQuery({
    variables: {
      options: {
        limit: 999999,
        page: 1,
      },
    },
  });

  const hiddenSet = new Set(
    hiddenPosts?.getUserHiddenPosts?.postsArray
      ? hiddenPosts.getUserHiddenPosts.postsArray.map((p) => p.id)
      : []
  );
  if (loading) <PostsFeedLoading count={1} />;
  if (data?.getPost.errors)
    return (
      <div>
        {"Error at :" +
          data.getPost.errors[0].field +
          ": " +
          data.getPost.errors[0].message}
      </div>
    );

  if (error) return <div>{error.message}</div>;
  const post = data?.getPost.post;
  if (!post) return <div>Error 404 - No post found</div>;
  if (hiddenSet.has(postId)) {
    return <HiddenPost postId={postId} />;
  }
  const community = post.community;
  return commentId ? (
    // Render single comment page
    <div className="flex flex-row gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <PostsFeed posts={[post]} count={1} />
        <CommentGetter commentId={commentId} postId={postId} />
      </div>
      {community ? <CommunityAbout community={community} /> : <></>}
    </div>
  ) : (
    // Render single post page
    <div className="relative flex flex-row gap-8 w-full">
      <div className="flex flex-col gap-8 w-full">
        <PostsFeed posts={[post]} count={1} />
        <CommentForm postId={postId} />
        <CommentsFeedGetter postId={postId} />
      </div>
      {community ? <CommunityAbout community={community} /> : <></>}
    </div>
  );
};

export default PostGetter;
