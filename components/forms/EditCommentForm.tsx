"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Comment, useUpdateCommentMutation } from "@/generated/graphql";
import CommentSchema from "@/schema/CommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentErrorType } from "../../types";
import InputField from "./InputField";
import sanitizeHtml from "sanitize-html";

interface Props {
  comment: Comment;
  toggleShowEditForm: () => void;
}

const EditCommentForm = ({ comment, toggleShowEditForm }: Props) => {
  // Destructure comment
  const { id: commentId, content } = comment;
  // Define graphql mutation
  const [updateCommentMutation, { loading }] = useUpdateCommentMutation();
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
    const safeContent = sanitizeHtml(content, {
      allowedTags: [],
    });
    const { data } = await updateCommentMutation({
      variables: {
        options: {
          content: safeContent,
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
      toggleShowEditForm();
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
        <InputField control={form.control} name="content" label="" isTextArea />
        <div className="flex flex-row justify-end items-center gap-4">
          <Button type="submit">
            {loading ? <Loader className="animate-spin" /> : <span>Save</span>}
          </Button>
          <Button
            variant={"red"}
            onClick={toggleShowEditForm}
            className="w-auto"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCommentForm;
