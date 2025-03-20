import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import { useToast } from "@/hooks/use-toast";
import { copyLinkToClipboard } from "@/lib/utils";
import { Link as CopyLinkIcon, Share2 as ShareIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  postId: number;
  commentId?: number;
}

const ShareButton = ({ postId, commentId }: Props) => {
  const { toast } = useToast();
  const link = commentId
    ? `${env.NEXT_PUBLIC_HOME_URL}/posts/${postId}/comment/${commentId}`
    : `${env.NEXT_PUBLIC_HOME_URL}/posts/${postId}`;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-row justify-center items-center gap-2 w-auto max-sm:w-9 max-sm:h-9"
          variant={"grey"}
        >
          <ShareIcon size={16} aria-label="Share Button" />
          <span className="max-sm:hidden text-sm">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-muted" sideOffset={5} align="start">
        <DropdownMenuItem
          className="px-4 py-2"
          onTouchStart={(e) => e.stopPropagation()}
        >
          <button
            className="flex flex-row justify-center items-center gap-2"
            onClick={() => {
              copyLinkToClipboard(link, () => {
                toast({
                  title: "Link copied to clipboard!",
                });
              });
            }}
          >
            <CopyLinkIcon size={20} aria-label="Copy Link Icon" />
            <span className="text-sm">Copy link</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
