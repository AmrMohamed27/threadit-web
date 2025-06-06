"use client";
import {
  useCreateVoteMutation,
  useDeleteVoteMutation,
  useUpdateVoteMutation,
  VoteOptions,
} from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import {
  ArrowBigDown as DownvoteIcon,
  ArrowBigUp as UpvoteIcon,
} from "lucide-react";
import React, { useState } from "react";

interface Props {
  upvotesCount: number;
  isUpvoted?: VoteOptions | null;
  postId?: number;
  commentId?: number;
}

const Votes = ({ upvotesCount, isUpvoted, postId, commentId }: Props) => {
  const [vote, setVote] = useState<VoteOptions>(isUpvoted ?? VoteOptions.None);
  const [count, setCount] = useState(upvotesCount);
  const { user } = useCurrentUser();

  //   UI Optimistic Update
  const handleClick = (newOption: VoteOptions) => {
    // Previous vote equals new vote, so we delete the previous vote.
    if (vote === newOption) {
      setVote(VoteOptions.None);
      if (newOption === VoteOptions.Upvote) {
        setCount((prev) => prev - 1);
      } else {
        setCount((prev) => prev + 1);
      }
    }
    // Previous vote is different from new vote, so we update the previous vote.
    else {
      // for a new upvote, we add 2 to the count if there was a previous downvote
      if (newOption === VoteOptions.Upvote) {
        if (vote === VoteOptions.Downvote) {
          setCount((prev) => prev + 2);
        } else {
          setCount((prev) => prev + 1);
        }
      }
      //   for a new downvote, we subtract 2 from the count if there was a previous upvote
      else if (newOption === VoteOptions.Downvote) {
        if (vote === VoteOptions.Upvote) {
          setCount((prev) => prev - 2);
        } else {
          setCount((prev) => prev - 1);
        }
      }
      //   for a new none vote "which shouldn't happen but we have to handle weird cases"
      else {
        if (vote === VoteOptions.Upvote) {
          setCount((prev) => prev - 1);
        } else if (vote === VoteOptions.Downvote) {
          setCount((prev) => prev + 1);
        }
      }
      setVote(newOption);
    }
  };

  const [createVoteMutation] = useCreateVoteMutation();
  const [updateVoteMutation] = useUpdateVoteMutation();
  const [deleteVoteMutation] = useDeleteVoteMutation();

  const addVote = async (isUpvote: boolean) => {
    // If the passed vote is equal to the current vote, delete the vote
    if (
      (isUpvote && vote === VoteOptions.Upvote) ||
      (!isUpvote && vote === VoteOptions.Downvote)
    ) {
      await deleteVoteMutation({
        variables: {
          options: {
            postId,
            commentId,
          },
        },
      });
    }
    // If it's not equal, check if there was a previous vote, if not, create one
    else if (vote === VoteOptions.None) {
      await createVoteMutation({
        variables: {
          options: {
            isUpvote,
            commentId,
            postId,
          },
        },
      });
    }
    // If there is a previous vote, update it
    else {
      await updateVoteMutation({
        variables: {
          options: {
            isUpvote,
            commentId,
            postId,
          },
        },
      });
    }
  };
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-1 bg-muted rounded-full",
        vote === VoteOptions.Upvote
          ? "bg-theme-red"
          : vote === VoteOptions.Downvote
          ? "bg-theme-purple"
          : ""
      )}
    >
      {/* Upvote Button */}
      <button
        className="hover:bg-muted-foreground/10 p-2 rounded-full"
        disabled={user === null}
        onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          handleClick(VoteOptions.Upvote);
          addVote(true);
        }}
      >
        <UpvoteIcon
          size={20}
          aria-label="Upvote Icon"
          className={cn(
            vote === VoteOptions.Upvote || vote === VoteOptions.Downvote
              ? "text-white"
              : ""
          )}
          strokeWidth={vote === VoteOptions.Upvote ? 3 : 1}
        />
      </button>
      {/* Upvote Count */}
      <span
        className={cn(
          "text-sm",
          vote === VoteOptions.Upvote || vote === VoteOptions.Downvote
            ? "text-white"
            : ""
        )}
      >
        {count}
      </span>
      {/* Downvote Button */}
      <button
        className="hover:bg-muted-foreground/10 p-2 rounded-full"
        disabled={user === null}
        onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          handleClick(VoteOptions.Downvote);
          addVote(false);
        }}
      >
        <DownvoteIcon
          size={20}
          aria-label="Upvote Icon"
          strokeWidth={vote === VoteOptions.Downvote ? 3 : 1}
          className={cn(
            vote === VoteOptions.Upvote || vote === VoteOptions.Downvote
              ? "text-white"
              : ""
          )}
        />
      </button>
    </div>
  );
};

export default Votes;
