"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { Comment, useUpdateCommentMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommentErrorType } from "../../types";
import CommentSchema from "@/schema/CommentSchema";

interface Props {
  comment: Comment;
}

const EditCommentForm = ({ comment }: Props) => {
  // Destructure comment
  const { id: commentId, content } = comment;
  // Define graphql mutation
  const [updateCommentMutation, { loading }] = useUpdateCommentMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CommentSchema>) {
    const { content } = values;
    const { data } = await updateCommentMutation({
      variables: {
        options: {
          content,
          id: commentId,
        },
      },
      refetchQueries: [
        "GetComment",
        "GetPostComments",
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetPostById",
      ],
    });
    const success = data?.updateComment?.success;
    if (success) {
      // Redirect to home page
      router.push(`/posts/${comment.postId}/comment/${commentId}`);
    } else if (data?.updateComment?.errors) {
      for (const error of data.updateComment.errors) {
        form.setError(error.field as CommentErrorType, {
          message: error.message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Content */}
        <InputField
          control={form.control}
          name="content"
          label="Content"
          isTextArea
        />
        <Button type="submit">
          {loading ? <Loader className="animate-spin" /> : <span>Save</span>}
        </Button>
      </form>
    </Form>
  );
};

export default EditCommentForm;
