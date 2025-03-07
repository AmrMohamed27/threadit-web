import { Comment } from "@/generated/graphql";
import CommentCard from "./CommentCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { Plus as ExpandIcon, Minus as ShrinkIcon } from "lucide-react";
import { useState } from "react";

interface ThreadProps {
  comment: Comment;
  depth?: number;
  maxDepth?: number;
}

const CommentThread = ({ comment, depth = 0, maxDepth = 3 }: ThreadProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
  };
  return (
    <div className="relative flex flex-col gap-0">
      <CommentCard comment={comment} depth={depth} maxDepth={maxDepth} />
      {comment.replies && comment.replies.length > 0 && depth < maxDepth && (
        <Collapsible
          defaultOpen
          open={isOpen}
          onOpenChange={() => handleOpenChange(!isOpen)}
        >
          <CollapsibleTrigger asChild>
            <Button
              className="top-2/3 -left-0 z-50 absolute bg-background -translate-x-1/2 -translate-y-2"
              variant={"outline"}
              size={"icon"}
            >
              {!isOpen ? (
                <ExpandIcon className="w-2 h-2" />
              ) : (
                <ShrinkIcon className="w-2 h-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default CommentThread;
