"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateMessageMutation } from "@/generated/graphql";
import MessageSchema from "@/schema/MessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader, SendHorizontal as SendIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageErrorType } from "../../types";
import UploadDialog from "../common/UploadDialog";
import InputField from "./InputField";
import Image from "next/image";

type Props = {
  chatId: number;
};

const CreateMessageForm = ({ chatId }: Props) => {
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
          chatId,
        },
      },
      // refetchQueries: [
      //   "GetChatParticipants",
      //   "GetUserChats",
      //   "GetChatMessages",
      // ],
    });
    form.reset();
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
  const formMedia = form.watch("media");
  // Handle upload
  async function handleUploadComplete(url: string) {
    form.setValue("media", url);
  }
  async function handleRemoveImage() {
    form.setValue("media", undefined);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bottom-0 z-50 sticky space-y-0 bg-background dark:bg-black w-full"
      >
        {formMedia && (
          <div className="relative pl-4 rounded-lg max-w-[64px]">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="top-0 right-0 absolute hover:bg-transparent w-4 h-4"
              onClick={handleRemoveImage}
            >
              <X className="w-2 h-2" />
            </Button>
            <Image
              src={formMedia}
              alt="Image uploaded to message"
              width={64}
              height={64}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-row items-center gap-2 px-4 py-2 w-full">
          {/* Media */}
          <UploadDialog handleUploadComplete={handleUploadComplete} isImage>
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
