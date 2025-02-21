"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useCreatePostMutation } from "@/generated/graphql";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreatePostErrorType } from "../../types";
import CreatePostSchema from "@/schema/CreatePostSchema";

const CreatePostForm = () => {
  // Define graphql mutation
  const [
    createPostMutation,
    { data: mutationResult, loading, error: mutationError },
  ] = useCreatePostMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    const { title, content } = values;
    await createPostMutation({
      variables: {
        options: {
          title,
          content,
        },
      },
      refetchQueries: ["GetAllPosts"],
    });
  }

  useEffect(() => {
    if (mutationError) {
      console.error(mutationError);
    }
    if (mutationResult?.createPost.errors) {
      for (const error of mutationResult.createPost.errors) {
        form.setError(error.field as CreatePostErrorType, {
          message: error.message,
        });
      }
    }
    const post = mutationResult?.createPost.post;
    if (post) {
      // Redirect to home page
      router.push(`/posts/${post.id}`);
    }
  }, [mutationError, mutationResult, router, form]);
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
          {loading ? <Loader className="animate-spin" /> : <span>Post</span>}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
