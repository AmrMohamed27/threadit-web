"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateMessageMutation } from "@/generated/graphql";
import MessageSchema from "@/schema/MessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader, SendHorizontal as SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageErrorType } from "../../types";
import InputField from "./InputField";
import UploadDialog from "../common/UploadDialog";

type Props = {
  receiverId: number;
};

const CreateMessageForm = ({ receiverId }: Props) => {
  // Define graphql mutation
  const [createMessageMutation, { loading }] = useCreateMessageMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      content: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MessageSchema>) {
    const { content, media } = values;
    const { data, errors } = await createMessageMutation({
      variables: {
        options: {
          content,
          media,
          receiverId,
        },
      },
      refetchQueries: [],
    });
    if (errors) {
      console.error(errors);
    } else if (data?.createMessage?.errors) {
      for (const error of data.createMessage.errors) {
        form.setError(error.field as MessageErrorType, {
          message: error.message,
        });
      }
    }
  }

  const formContent = form.watch("content");
  // Handle upload
  async function handleUploadComplete(url: string) {
    form.setValue("media", url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-row items-center gap-2 px-4 py-2 w-full">
          {/* Media */}
          <UploadDialog handleUploadComplete={handleUploadComplete}>
            <Button variant={"ghost"} size="icon">
              <Camera className="w-8 h-8" />
            </Button>
          </UploadDialog>
          {/* Content */}
          <InputField
            control={form.control}
            name="content"
            label=""
            isTextArea
          />
          <Button
            type="submit"
            variant={"ghost"}
            size="icon"
            disabled={formContent.length === 0}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <SendIcon className="" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateMessageForm;
