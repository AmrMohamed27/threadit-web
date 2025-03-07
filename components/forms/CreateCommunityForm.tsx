"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateCommunityMutation } from "@/generated/graphql";
import CreateCommunitySchema from "@/schema/CreateCommunitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateCommunityErrorType } from "../../types";
import InputField from "./InputField";

const CreateCommunityForm = () => {
  // Define graphql mutation
  const [createCommunityMutation, { loading }] = useCreateCommunityMutation();
  // Router
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateCommunitySchema>>({
    resolver: zodResolver(CreateCommunitySchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateCommunitySchema>) {
    const { name, description, isPrivate } = values;
    const { data } = await createCommunityMutation({
      variables: {
        options: {
          name,
          description,
          isPrivate,
        },
      },
      refetchQueries: [
        "GetAllPosts",
        "GetUserCommunityPosts",
        "GetAllCommunities",
        "GetUserCommunities",
      ],
    });
    const community = data?.createCommunity.community;
    if (community) {
      // Redirect to community page
      router.push(`/c/${community.name}`);
    } else if (data?.createCommunity.errors) {
      for (const error of data.createCommunity.errors) {
        form.setError(error.field as CreateCommunityErrorType, {
          message: error.message,
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Name */}
        <InputField control={form.control} name="name" label="Name" />
        {/* Description */}
        <InputField
          control={form.control}
          name="description"
          label="Description"
          isTextArea
        />
        {/* IsPrivate */}
        <div className="w-fit">
          <InputField
            type="checkbox"
            name="isPrivate"
            label="Private Community"
            control={form.control}
          />
        </div>
        <Button type="submit">
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <span>Create Community</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCommunityForm;
