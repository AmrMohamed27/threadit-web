"use client";
import {
  useGetPostByIdQuery,
  useGetUserHiddenPostsQuery
} from "@/generated/graphql";
import CommentGetter from "../comments/CommentGetter";
import CommentsFeedGetter from "../comments/CommentsFeedGetter";
import CommentForm from "../forms/CommentForm";
import EditPostForm from "../forms/EditPostForm";
import FormLoading from "../loading/FormLoading";
import PostsFeedLoading from "../loading/PostsFeedLoading";
import HiddenPost from "./HiddenPost";
import PostsFeed from "./PostsFeed";

interface Props {
  postId: number;
  isEdit?: boolean;
  commentId?: number;
}

const PostGetter = ({ postId, isEdit, commentId }: Props) => {
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
  if (loading)
    return isEdit ? (
      <FormLoading heading="Edit post" />
    ) : (
      <PostsFeedLoading count={1} />
    );
  if (data?.getPost.errors)
    return (
      <div>
        {"Error at :" +
          data.getPost.errors[0].field +
          ": " +
          data.getPost.errors[0].message}
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  const post = data?.getPost.post;
  if (!post) return <div>Error 404 - No post found</div>;
  if (hiddenSet.has(postId)) {
    return <HiddenPost postId={postId} />;
  }
  return isEdit ? (
    // Render Edit Post Form
    <div className="flex flex-col items-start gap-8 w-full">
      <h1 className="text-lg">Edit post</h1>
      <EditPostForm post={post} />
    </div>
  ) : commentId ? (
    // Render single comment page
    <div className="flex flex-col gap-4 w-full">
      <PostsFeed posts={[post]} count={1} />
      <CommentGetter commentId={commentId} postId={postId} />
    </div>
  ) : (
    // Render single post page
    <div className="flex flex-col gap-8 w-full">
      <PostsFeed posts={[post]} count={1} />
      <CommentForm postId={postId} />
      <CommentsFeedGetter postId={postId} />
    </div>
  );
};

export default PostGetter;
