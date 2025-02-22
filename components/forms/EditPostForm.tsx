"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { Post, useUpdatePostMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreatePostErrorType } from "../../types";
import CreatePostSchema from "@/schema/CreatePostSchema";

interface Props {
  post: Post;
}

const EditPostForm = ({ post }: Props) => {
  // Destructure post
  const { id: postId, title, content } = post;
  // Define graphql mutation
  const [
    updatePostMutation,
    { data: mutationResult, loading, error: mutationError },
  ] = useUpdatePostMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title,
      content,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    const { title, content } = values;
    await updatePostMutation({
      variables: {
        options: {
          title,
          content,
          id: postId,
        },
      },
      refetchQueries: ["GetPostById", "GetAllPosts"],
    });
  }

  useEffect(() => {
    if (mutationError) {
      console.error(mutationError);
    }
    if (mutationResult?.updatePost.errors) {
      for (const error of mutationResult.updatePost.errors) {
        form.setError(error.field as CreatePostErrorType, {
          message: error.message,
        });
      }
    }
    const success = mutationResult?.updatePost.success;
    if (success) {
      // Redirect to home page
      router.push(`/posts/${postId}`);
    }
  }, [mutationError, mutationResult, router, form, postId]);
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
          isTextArea
        />
        <Button type="submit">
          {loading ? <Loader className="animate-spin" /> : <span>Save</span>}
        </Button>
      </form>
    </Form>
  );
};

export default EditPostForm;
