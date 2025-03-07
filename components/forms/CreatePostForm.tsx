"use client";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Community, useCreatePostMutation } from "@/generated/graphql";
import { useCurrentPage } from "@/hooks/use-current-page";
import CreatePostSchema from "@/schema/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { CreatePostErrorType } from "../../types";
import UploadDialog from "../common/UploadDialog";
import ChooseCommunity from "../communities/ChooseCommunity";
import InputField from "./InputField";

interface Props {
  communities: Community[];
}

const CreatePostForm = ({ communities }: Props) => {
  // Define graphql mutation
  const [createPostMutation, { loading }] = useCreatePostMutation();
  // Router
  const router = useRouter();
  const { communityId: paramsCommunityId } = useCurrentPage();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      communityId: paramsCommunityId
        ? parseInt(paramsCommunityId)
        : communities.length > 0
        ? communities[0].id
        : undefined,
    },
  });
  // Handle upload
  async function handleUploadComplete(url: string) {
    form.setValue(
      "media",
      form.getValues("media") ? [...form.getValues("media")!, url] : [url]
    );
  }
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    const { title, content, communityId, media } = values;
    // Sanitize html to prevent xss attacks
    const safeContent = sanitizeHtml(content, {
      allowedTags: [],
    });
    const { data } = await createPostMutation({
      variables: {
        options: {
          title,
          content: safeContent,
          communityId,
          media,
        },
      },
      refetchQueries: [
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetCommunityPosts",
        "GetCommunityByName",
        "GetUserPosts",
      ],
    });
    const post = data?.createPost.post;
    if (post) {
      // Redirect to home page
      router.push(`/posts/${post.id}`);
    } else if (data?.createPost.errors) {
      for (const error of data.createPost.errors) {
        form.setError(error.field as CreatePostErrorType, {
          message: error.message,
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Community Selector */}
        <div className="flex flex-row items-center gap-4">
          <FormLabel>Choose a community:</FormLabel>
          <ChooseCommunity
            communities={communities}
            selectedCommunityId={form.watch("communityId")}
            onSelect={(id) => form.setValue("communityId", id)}
          />
        </div>
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
          {/* Add media */}
          <UploadDialog handleUploadComplete={handleUploadComplete}>
            <Button variant={"default"}>Add media</Button>
          </UploadDialog>
          <Button type="submit">
            {loading ? <Loader className="animate-spin" /> : <span>Post</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;

