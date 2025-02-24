import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideProps, Ellipsis as OptionsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteDialog from "./DeleteDialog";
import { CommentOptions, PostOptions } from "@/types";

interface Props {
  options: PostOptions[] & CommentOptions[];
  postId: number;
  commentId?: number;
  handleHide?: () => Promise<void>;
  handleSave?: () => Promise<void>;
  handleUnsave?: () => Promise<void>;
  handleDelete: () => Promise<void>;
  isSaved?: boolean;
}

const OptionsUI = ({
  options,
  postId,
  commentId,
  handleHide,
  handleSave,
  handleUnsave,
  handleDelete,
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
              <DeleteDialog
                handleDelete={handleDelete}
                label={commentId ? "comment" : "post"}
              >
                <OptionButton label={label} Icon={Icon} postId={postId} />
              </DeleteDialog>
            ) : (
              <OptionButton
                label={label}
                Icon={Icon}
                postId={postId}
                commentId={commentId}
                onClick={
                  id === "hide"
                    ? handleHide
                    : id === "save" && !isSaved
                    ? handleSave
                    : id === "unsave" && isSaved
                    ? handleUnsave
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

export default OptionsUI;

interface OptionButtonProps {
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
  href?: (({ postId }: { postId: number }) => string) &
    (({ postId, commentId }: { postId: number; commentId: number }) => string);
  postId: number;
  commentId?: number;
}

const OptionButton = ({
  label,
  Icon,
  onClick,
  href,
  postId,
  commentId,
}: OptionButtonProps) => {
  const router = useRouter();
  return (
    <button
      className="flex flex-row items-center gap-2 p-2 rounded-md"
      onClick={
        onClick
          ? onClick
          : href
          ? () =>
              router.push(
                commentId ? href({ postId, commentId }) : href({ postId })
              )
          : undefined
      }
    >
      <Icon size={16} aria-label={label} />
      <span>{label}</span>
    </button>
  );
};
