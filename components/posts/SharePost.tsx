import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 as ShareIcon, Link as CopyLinkIcon } from "lucide-react";
import { copyLinkToClipboard } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { env } from "@/env";

interface Props {
  postId: number;
}

const SharePost = ({ postId }: Props) => {
  const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row items-center gap-2 bg-muted hover:bg-muted-foreground/30 px-4 py-2 rounded-full">
          <ShareIcon size={20} aria-label="Share Icon" />
          <span className="text-sm">Share</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-muted">
        <DropdownMenuItem className="px-4 py-2">
          <button
            className="flex flex-row justify-center items-center gap-2"
            onClick={() => {
              copyLinkToClipboard(
                `${env.NEXT_PUBLIC_HOME_URL}/posts/${postId}`,
                () => {
                  toast({
                    title: "Link copied to clipboard!",
                  });
                }
              );
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

export default SharePost;
