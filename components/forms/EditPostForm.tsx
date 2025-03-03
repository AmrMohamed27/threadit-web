"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Post, useUpdatePostMutation } from "@/generated/graphql";
import EditPostSchema from "@/schema/EditPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePostErrorType } from "../../types";
import InputField from "./InputField";
import { useEffect } from "react";
import sanitizeHtml from "sanitize-html";

interface Props {
  post: Post;
  toggleShowEditForm: () => void;
}

const EditPostForm = ({ post, toggleShowEditForm }: Props) => {
  // Destructure post
  const { id: postId, title, content } = post;
  // Define graphql mutation
  const [updatePostMutation, { loading, error }] = useUpdatePostMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof EditPostSchema>>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      title,
      content,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditPostSchema>) {
    const { title, content } = values;
    const safeContent = sanitizeHtml(content, {
      allowedTags: [],
    });
    const { data } = await updatePostMutation({
      variables: {
        options: {
          title,
          content: safeContent,
          id: postId,
        },
      },
      refetchQueries: [
        "GetPostById",
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetCommunityPosts",
        "GetUserPosts",
      ],
    });
    const success = data?.updatePost.success;
    if (success) {
      toggleShowEditForm();
    } else if (data?.updatePost.errors) {
      for (const error of data.updatePost.errors) {
        form.setError(error.field as CreatePostErrorType, {
          message: error.message,
        });
      }
    }
  }

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Title */}
        <InputField control={form.control} name="title" label="Title" />
        {/* Content */}
        <InputField
          control={form.control}
          name="content"
          label="Content"
          isMarkdown
        />
        <div className="flex flex-row items-center gap-4">
          <Button type="submit">
            {loading ? <Loader className="animate-spin" /> : <span>Save</span>}
          </Button>
          <Button
            variant={"red"}
            className="w-auto"
            onClick={toggleShowEditForm}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPostForm;
