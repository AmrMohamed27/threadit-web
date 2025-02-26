"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Post, useUpdatePostMutation } from "@/generated/graphql";
import EditPostSchema from "@/schema/EditPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePostErrorType } from "../../types";
import InputField from "./InputField";
import { useEffect } from "react";

interface Props {
  post: Post;
}

const EditPostForm = ({ post }: Props) => {
  // Destructure post
  const { id: postId, title, content } = post;
  // Define graphql mutation
  const [updatePostMutation, { data, loading, error }] =
    useUpdatePostMutation();
  console.log(data);
  // Router
  const router = useRouter();
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
    const { data } = await updatePostMutation({
      variables: {
        options: {
          title,
          content,
          id: postId,
        },
      },
      refetchQueries: [
        "GetPostById",
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetCommunityPosts",
      ],
    });
    const success = data?.updatePost.success;
    if (success) {
      // Redirect to home page
      router.push(`/posts/${postId}`);
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
