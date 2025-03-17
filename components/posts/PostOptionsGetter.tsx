"use client";
import {
  deletePostOption,
  editPostOption,
  hidePostOption,
  reportPostOption,
  savePostOption,
  unhidePostOption,
  unsavePostOption,
} from "@/constants";
import {
  useDeletePostMutation,
  useGetUserHiddenPostsQuery,
  useHidePostMutation,
  useSavePostMutation,
  useUnhidePostMutation,
  useUnsavePostMutation,
} from "@/generated/graphql";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/hooks/use-toast";
import { toggleSavePost } from "@/lib/features/savedPostsSlice";
import { RootState } from "@/lib/store";
import { PostOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import OptionsUI from "./OptionsUI";

interface Props {
  authorId: number;
  postId: number;
  handleEdit?: () => void;
}

const PostOptionsGetter = ({ authorId, postId, handleEdit }: Props) => {
  // Get current user
  const { user } = useCurrentUser();
  // Toast
  const { toast } = useToast();
  const savedArray = useSelector(
    (state: RootState) => state.savedPosts.savedPostsIds
  );
  const savedSet = new Set(savedArray);
  const isSaved = savedSet.has(postId);
  const { data: hiddenPosts } = useGetUserHiddenPostsQuery({
    variables: {
      options: {
        limit: 999999,
        page: 1,
      },
    },
  });

  const hiddenSet = new Set(
    hiddenPosts?.getUserHiddenPosts?.postsArray
      ? hiddenPosts.getUserHiddenPosts.postsArray.map((p) => p.id)
      : []
  );
  const isHidden = hiddenSet.has(postId);
  const dispatch = useDispatch();
  const [hidePostMutation] = useHidePostMutation();
  const [unhideMutation] = useUnhidePostMutation();
  const [savePostMutation] = useSavePostMutation();
  const [unsavePostMutation] = useUnsavePostMutation();
  const router = useRouter();
  const [deletePostMutation] = useDeletePostMutation();

  const options: PostOptions[] = [];
  if (!user) {
    return null;
  } else {
    // Hidden options
    if (isHidden) {
      options.push(unhidePostOption);
    } else {
      options.push(hidePostOption);
    }
    // Saved options
    if (isSaved) {
      options.push(unsavePostOption);
    } else {
      options.push(savePostOption);
    }
    if (user.id === authorId) {
      // Author options
      options.push(editPostOption);
      options.push(deletePostOption);
    } else {
      // Non-author options
      options.push(reportPostOption);
    }
  }

  const reduxToggleSavedPost = (postId: number) => {
    dispatch(toggleSavePost(postId));
  };

  const handleHidePost = async () => {
    try {
      const { data } = await hidePostMutation({
        variables: {
          postId,
        },
        refetchQueries: [
          "GetAllPosts",
          "GetPostById",
          "GetUserCommunityPosts",
          "GetUserPosts",
          "GetUserHiddenPosts",
          "GetCommunityPosts",
          "GetUserVotedPosts",
        ],
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

  const handleUnhide = async () => {
    try {
      const { data } = await unhideMutation({
        variables: {
          postId: postId,
        },
        refetchQueries: [
          "GetAllPosts",
          "GetPostById",
          "GetUserCommunityPosts",
          "GetUserHiddenPosts",
        ],
      });
      if (!data?.unhidePost?.success) {
        console.error(
          "Error Hiding post: ",
          data?.unhidePost?.errors?.[0]?.message
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSavePost = async () => {
    try {
      const { data } = await savePostMutation({
        variables: { postId },
        refetchQueries: [
          "GetAllPosts",
          "GetUserCommunityPosts",
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

  const handleUnsavePost = async () => {
    try {
      const { data } = await unsavePostMutation({
        variables: { postId },
        refetchQueries: [
          "GetAllPosts",
          "GetUserCommunityPosts",
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

  const handleDeletePost = async () => {
    const { data } = await deletePostMutation({
      variables: {
        id: postId,
      },
      refetchQueries: [
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetPostById",
        "GetUserPosts",
      ],
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
      handleUnhide={handleUnhide}
      handleSave={handleSavePost}
      handleUnsave={handleUnsavePost}
      handleDelete={handleDeletePost}
      handleEdit={handleEdit}
      isSaved={isSaved}
    />
  );
};

export default PostOptionsGetter;
