import { Comment, useGetPostCommentsQuery } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import React from "react";
import CommentCard from "./CommentCard";
import SortBy from "./SortBy";
import SearchBar from "../common/SearchBar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MAX_REPLY_DEPTH } from "@/constants";

interface Props {
  postId: number;
}

interface ThreadProps {
  comment: Comment;
  depth?: number;
  maxDepth?: number;
}

const CommentThread = ({ comment, depth = 0, maxDepth = 3 }: ThreadProps) => {
  return (
    <div className="flex flex-col gap-0">
      <CommentCard comment={comment} depth={depth} maxDepth={maxDepth} />
      {comment.replies && comment.replies.length > 0 && depth < maxDepth && (
        <div className="flex flex-col gap-0 pl-12 border-muted border-l">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsFeed = ({ postId }: Props) => {
  const { sortBy, pathname, searchTerm } = useCurrentPage();
  const { data, loading, error } = useGetPostCommentsQuery({
    variables: {
      options: {
        postId,
        sortBy,
        searchTerm,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (data?.getPostComments.errors)
    return <div>{data?.getPostComments.errors[0].message}</div>;
  const comments = data?.getPostComments.commentsArray ?? [];
  const count = data?.getPostComments.count ?? 0;

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <div className="flex flex-row items-center gap-4">
        {!searchTerm && <SortBy />}
        <SearchBar origin={pathname} placeholder="Search comments" />
      </div>
      {searchTerm && (
        <Link
          className="flex flex-row justify-center items-center gap-4 hover:bg-muted px-4 py-2 rounded-full max-w-[160px] text-sm"
          href={pathname}
        >
          <ArrowLeft size={16} aria-label="Back to all comments" />
          <span>All Comments</span>
        </Link>
      )}
      {searchTerm && <span>{count} results found</span>}
      <div className="flex flex-col gap-0">
        {comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            maxDepth={MAX_REPLY_DEPTH}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsFeed;
