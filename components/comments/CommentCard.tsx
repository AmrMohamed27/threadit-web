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

  const showForm = () => {
    setIsFormVisible(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
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
            <AvatarWrapper
              src={author?.image ?? getDefaultAvatar({ name: author?.name })}
              alt={`${author?.name ?? "Author"}'s profile picture`}
              className="w-6 h-6"
            />
            {/* Name */}
            <span className="text-xs">{author?.name ?? "Author"}</span>
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
        />
      </div>
      {/* Content */}
      <div dir={isArabicContent ? "rtl" : "ltr"}>
        {<p className={cn(" text-sm")}>{content}</p>}
      </div>
      {/* Interactions */}
      <div className="flex flex-row flex-wrap items-center gap-4">
        <Votes
          upvotesCount={upvotesCount ?? 0}
          isUpvoted={isUpvoted}
          commentId={commentId}
        />
        {/* Comment Buttons */}
        <div>
          <Button
            className="flex flex-row items-center gap-2 px-4 py-2 text-foreground"
            variant={"grey"}
            onClick={showForm}
          >
            <CommentIcon size={20} aria-label="Comment Icon" />
            {/* Comments Count */}
            <span className="text-sm">Reply</span>
          </Button>
        </div>
        <div>
          <ShareButton commentId={comment.id} postId={comment.postId} />
        </div>
        <div>
          <Link
            href={commentLink}
            className="flex flex-row items-center gap-2 bg-muted hover:bg-muted-foreground/30 px-4 py-2 rounded-full"
          >
            <GoToIcon size={20} aria-label="Go to comment" />
            <span className="text-sm">Go to comment</span>
          </Link>
        </div>
      </div>
      {isFormVisible && (
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
