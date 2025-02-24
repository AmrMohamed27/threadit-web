import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideProps, Ellipsis as OptionsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import DeletePostDialog from "./DeletePostDialog";
import { PostOptions } from "@/types";

interface Props {
  options: PostOptions[];
  postId: number;
  handleHidePost: () => Promise<void>;
  handleSavePost: () => Promise<void>;
  handleUnsavePost: () => Promise<void>;
  isSaved: boolean;
}

const PostOptionsUI = ({
  options,
  postId,
  handleHidePost,
  handleSavePost,
  handleUnsavePost,
  isSaved,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted p-1 rounded-full">
        <OptionsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map(({ id, label, icon: Icon, href }) => (
          <DropdownMenuItem
            key={id}
            onSelect={(e) => {
              if (id === "delete") e.preventDefault(); // Prevent closing only for "Delete"
            }}
            onClick={(e) => {
              if (id === "delete") e.stopPropagation(); // Prevent closing only for "Delete"
            }}
          >
            {id === "delete" ? (
              <DeletePostDialog postId={postId}>
                <OptionButton label={label} Icon={Icon} postId={postId} />
              </DeletePostDialog>
            ) : (
              <OptionButton
                label={label}
                Icon={Icon}
                postId={postId}
                onClick={
                  id === "hide"
                    ? handleHidePost
                    : id === "save" && !isSaved
                    ? handleSavePost
                    : id === "unsave" && isSaved
                    ? handleUnsavePost
                    : undefined
                }
                href={href}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptionsUI;

interface OptionButtonProps {
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
  href?: (postId: number) => string;
  postId: number;
}

const OptionButton = ({
  label,
  Icon,
  onClick,
  href,
  postId,
}: OptionButtonProps) => {
  const router = useRouter();
  return (
    <button
      className="flex flex-row items-center gap-2 p-2 rounded-md"
      onClick={
        onClick ? onClick : href ? () => router.push(href(postId)) : undefined
      }
    >
      <Icon size={16} aria-label={label} />
      <span>{label}</span>
    </button>
  );
};
