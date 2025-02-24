import { Comment } from "@/generated/graphql";
import CommentCard from "./CommentCard";

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

export default CommentThread;
