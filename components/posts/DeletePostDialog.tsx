"use client";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useDeletePostMutation } from "@/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  postId: number;
}

const DeletePostDialog = ({ children, postId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deletePostMutation, { data, loading, error }] =
    useDeletePostMutation();

  const handleDeletePost = async () => {
    await deletePostMutation({
      variables: {
        id: postId,
      },
      refetchQueries: ["GetAllPosts", "GetPostById"],
    });
  };

  useEffect(() => {
    if (error) {
      console.error("Error deleting post: ", error);
    } else if (data?.deletePost.errors) {
      console.error("Error deleting post: ", data.deletePost.errors[0].message);
    } else if (data?.deletePost.success) {
      toast({
        title: "Post deleted successfully!",
      });
      router.push("/");
    }
  }, [data, toast, error, router]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Once you delete this post, it can't be restored.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"grey"}>Go Back</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"red"} onClick={handleDeletePost}>
              {loading ? <Loader className="animate-spin" /> : "Yes, Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
