"use client";
import { Comment } from "@/generated/graphql";
import { cn, getDefaultAvatar, isArabic, timeAgo } from "@/lib/utils";
import { MessageCircle as CommentIcon, Redo2 as GoToIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AvatarWrapper from "../common/AvatarWrapper";
import ShareButton from "../common/ShareButton";
import Votes from "../common/Votes";
import CommentForm from "../forms/CommentForm";
import CommentOptionsGetter from "../posts/CommentOptionsGetter";
import { Button } from "../ui/button";
import EditCommentForm from "../forms/EditCommentForm";
import { useCurrentUser } from "@/hooks/use-current-user";

interface Props {
  comment: Comment;
  depth?: number;
  maxDepth?: number;
}

const CommentCard = ({ comment, depth = 0, maxDepth = 3 }: Props) => {
  // Destructure comment
  const {
    content,
    createdAt,
    updatedAt,
    author,
    id: commentId,
    isUpvoted,
    upvotesCount,
  } = comment;

  const isArabicContent = isArabic(content);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { user } = useCurrentUser();

  const showForm = () => {
    setIsFormVisible(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
  };
  const toggleShowEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  const commentLink = `/posts/${comment.postId}/comment/${comment.id}`;

  return (
    <div className="relative flex flex-col gap-2 p-4 pl-8 border-muted border-l w-full">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* Info */}
        <div className="flex md:flex-row flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            {/* Image */}
            <Link href={`/users/${author?.name ?? "#"}`}>
              <AvatarWrapper
                src={author?.image ?? getDefaultAvatar({ name: author?.name })}
                alt={`${author?.name ?? "Author"}'s profile picture`}
                className="w-6 h-6"
              />
            </Link>
            {/* Name */}
            <Link href={`/users/${author?.name ?? "#"}`} className="text-xs">
              {author?.name ?? "Author"}
            </Link>
            {/* Separator */}
            <span className="text-muted-foreground text-xs">•</span>
            {/* Date created */}
            <span className="text-muted-foreground text-xs">
              {timeAgo(createdAt)}
            </span>
          </div>
          {/* Date Updated if updatedAt is different from createdAt */}
          {updatedAt !== createdAt && (
            <span className="hidden md:block text-muted-foreground text-xs">
              (Last updated: {timeAgo(updatedAt)})
            </span>
          )}
        </div>
        {/* Options */}
        <CommentOptionsGetter
          commentId={commentId}
          postId={comment.postId}
          authorId={comment.authorId}
          toggleShowEditForm={toggleShowEditForm}
        />
      </div>
      {/* Content */}
      {showEditForm ? (
        <EditCommentForm
          comment={comment}
          toggleShowEditForm={toggleShowEditForm}
        />
      ) : (
        <div dir={isArabicContent ? "rtl" : "ltr"}>
          {<p className={cn(" text-sm")}>{content}</p>}
        </div>
      )}
      {/* Interactions */}
      {!showEditForm && (
        <div className="flex flex-row flex-wrap items-center gap-4">
          <Votes
            upvotesCount={upvotesCount ?? 0}
            isUpvoted={isUpvoted}
            commentId={commentId}
          />
          {/* Comment Buttons */}
          <Button
            className="flex flex-row items-center gap-2 p-0 sm:px-4 sm:py-2 w-auto max-sm:w-9 max-sm:h-9 text-foreground"
            variant={"grey"}
            onClick={showForm}
          >
            <CommentIcon size={20} aria-label="Comment Icon" />
            {/* Comments Count */}
            <span className="max-sm:hidden text-sm">Reply</span>
          </Button>
          <ShareButton commentId={comment.id} postId={comment.postId} />
          <Link
            href={commentLink}
            className="flex flex-row justify-center items-center gap-2 bg-muted hover:bg-muted-foreground/30 sm:px-4 sm:py-2 rounded-full max-sm:w-9 max-sm:h-9"
          >
            <GoToIcon size={16} />
            <span className="max-sm:hidden text-sm">Go to comment</span>
          </Link>
        </div>
      )}
      {isFormVisible && user && (
        <CommentForm
          postId={comment.postId}
          parentCommentId={
            depth === maxDepth ? comment.parentCommentId! : comment.id
          }
          hideForm={hideForm}
        />
      )}
    </div>
  );
};

export default CommentCard;
