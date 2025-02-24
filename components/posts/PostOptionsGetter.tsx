"use client";
import React from "react";
import {
  loggedOutUserOptionsDropdown,
  postOptionsDropdown,
  savedPostOptionsDropdown,
  savedUserPostOptionsDropdown,
  userPostOptionsDropdown,
} from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  useDeletePostMutation,
  useHidePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
} from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import OptionsUI from "./OptionsUI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleSavePost } from "@/lib/features/savedPostsSlice";
import { useRouter } from "next/navigation";

interface Props {
  authorId: number;
  postId: number;
}

const PostOptionsGetter = ({ authorId, postId }: Props) => {
  // Get current user
  const { user } = useCurrentUser();
  // Toast
  const { toast } = useToast();
  const savedArray = useSelector(
    (state: RootState) => state.savedPosts.savedPostsIds
  );
  const savedSet = new Set(savedArray);
  const isSaved = savedSet.has(postId);
  // Get options  depending on if the user is logged in, and if they are the author of the post, and the state of the post if it is saved or hidden
  const options = user
    ? user.id === authorId
      ? isSaved
        ? savedUserPostOptionsDropdown
        : userPostOptionsDropdown
      : isSaved
      ? savedPostOptionsDropdown
      : postOptionsDropdown
    : loggedOutUserOptionsDropdown;

  const dispatch = useDispatch();
  const reduxToggleSavedPost = (postId: number) => {
    dispatch(toggleSavePost(postId));
  };

  const [hidePostMutation] = useHidePostMutation();
  const handleHidePost = async () => {
    try {
      const { data } = await hidePostMutation({
        variables: {
          postId,
        },
        refetchQueries: ["GetAllPosts", "GetPostById", "GetHiddenPosts"],
      });
      if (data?.hidePost?.success) {
        toast({ title: "Post hidden successfully!" });
      } else {
        console.error(
          "Error Hiding post: ",
          data?.hidePost?.errors?.[0]?.message
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [savePostMutation] = useSavePostMutation();
  const handleSavePost = async () => {
    try {
      const { data } = await savePostMutation({
        variables: { postId },
        refetchQueries: [
          "GetAllPosts",
          "GetPostById",
          "GetSavedPosts",
          "GetSavedPostsIds",
        ],
      });

      if (data?.savePost?.success) {
        toast({ title: "Post saved successfully!" });
        reduxToggleSavedPost(postId);
      } else {
        console.error(
          "Error saving post: ",
          data?.savePost?.errors?.[0]?.message
        );
      }
    } catch (error) {
      console.error("Error saving post: ", error);
    }
  };

  const [unsavePostMutation] = useUnsavePostMutation();
  const handleUnsavePost = async () => {
    try {
      const { data } = await unsavePostMutation({
        variables: { postId },
        refetchQueries: [
          "GetAllPosts",
          "GetPostById",
          "GetSavedPosts",
          "GetSavedPostsIds",
        ],
      });

      if (data?.unsavePost?.success) {
        toast({ title: "Post unsaved successfully!" });
        reduxToggleSavedPost(postId);
      } else {
        console.error(
          "Error unsaving post: ",
          data?.unsavePost?.errors?.[0]?.message
        );
      }
    } catch (error) {
      console.error("Error unsaving post: ", error);
    }
  };

  const router = useRouter();
  const [deletePostMutation] = useDeletePostMutation();

  const handleDeletePost = async () => {
    const { data } = await deletePostMutation({
      variables: {
        id: postId,
      },
      refetchQueries: ["GetAllPosts", "GetPostById"],
    });
    if (data?.deletePost.success) {
      toast({
        title: "Post deleted successfully!",
      });
      router.push("/");
    } else if (data?.deletePost.errors) {
      toast({
        title: "Error deleting post",
        description: data.deletePost.errors[0].message,
        variant: "destructive",
      });
    }
  };
  return (
    <OptionsUI
      options={options}
      postId={postId}
      handleHide={handleHidePost}
      handleSave={handleSavePost}
      handleUnsave={handleUnsavePost}
      handleDelete={handleDeletePost}
      isSaved={isSaved}
    />
  );
};

export default PostOptionsGetter;
