import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideProps, Ellipsis as OptionsIcon } from "lucide-react";
import {
  loggedOutUserOptionsDropdown,
  postOptionsDropdown,
  userPostOptionsDropdown,
} from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import DeletePostDialog from "./DeletePostDialog";
import { useHidePostMutation } from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";

interface Props {
  authorId: number;
  postId: number;
}

const PostOptions = ({ authorId, postId }: Props) => {
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const options = user
    ? user.id === authorId
      ? userPostOptionsDropdown
      : postOptionsDropdown
    : loggedOutUserOptionsDropdown;

  const [hidePostMutation, { data: hideResult, error: hideError }] =
    useHidePostMutation();
  const handleHidePost = async () => {
    await hidePostMutation({
      variables: {
        postId,
      },
      refetchQueries: ["GetAllPosts", "GetPostById", "GetHiddenPosts"],
    });
  };

  useEffect(() => {
    if (hideError) {
      console.error("Error hiding post: ", hideError);
    } else if (hideResult?.hidePost.errors) {
      console.error(
        "Error hiding post: ",
        hideResult.hidePost.errors[0].message
      );
    } else if (hideResult?.hidePost.success) {
      toast({
        title: "Post hidden successfully!",
      });
    }
  }, [hideError, hideResult, toast]);

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
                onClick={id === "hide" ? handleHidePost : undefined}
                href={href}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;

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
