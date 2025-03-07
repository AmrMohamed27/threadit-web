"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useCreateCommentMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { CommentErrorType } from "../../types";
import CommentSchema from "@/schema/CommentSchema";
import sanitizeHtml from "sanitize-html";

interface Props {
  postId: number;
  parentCommentId?: number;
  hideForm?: () => void;
}

const CommentForm = ({ postId, parentCommentId, hideForm }: Props) => {
  // Define graphql mutation
  const [createCommentMutation, { loading }] = useCreateCommentMutation();
  // Router
  // 1. Define your form.
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CommentSchema>) {
    const { content } = values;
    const safeContent = sanitizeHtml(content, {
      allowedTags: [], // Remove all HTML if you only want raw Markdown
    });
    // Perform the mutation
    const { data } = await createCommentMutation({
      variables: {
        options: {
          postId,
          content: safeContent,
          parentCommentId,
        },
      },
      refetchQueries: [
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetPostById",
        "GetCommentById",
        "GetSavedPosts",
        "GetPostComments",
      ],
    });
    // Redirect to post page on success and display errors on failure
    const comment = data?.createComment.comment;
    if (comment) {
      if (hideForm) hideForm();
      form.reset();
    } else if (data?.createComment.errors) {
      for (const error of data.createComment.errors) {
        form.setError(error.field as CommentErrorType, {
          message: error.message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* Content */}
        <InputField
          control={form.control}
          name="content"
          label={parentCommentId ? "Add a reply" : "Add a comment"}
          isTextArea
        />
        <div className="flex flex-row gap-4">
          <Button type="submit">
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <span>{parentCommentId ? "Reply" : "Comment"}</span>
            )}
          </Button>
          {hideForm && (
            <Button
              variant={"red"}
              className="max-w-[100px]"
              onClick={hideForm}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
