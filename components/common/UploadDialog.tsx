import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import MediaFileUpload from "./MediaFileUpload";
import ImageFileUpload from "./ImageFIleUpload";
import VideoFileUpload from "./VideoFileUpload";

type Props = {
  children?: React.ReactNode;
  handleUploadComplete: (url: string) => Promise<void>;
  type: "image" | "video" | "media";
};

const UploadDialog = ({ children, handleUploadComplete, type }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add media to post</DialogTitle>
        </DialogHeader>
        {type === "image" ? (
          <ImageFileUpload
            onUploadComplete={async (url: string) => {
              await handleUploadComplete(url);
              setOpen(false);
            }}
          />
        ) : type === "media" ? (
          <MediaFileUpload
            onUploadComplete={async (url: string) => {
              await handleUploadComplete(url);
              setOpen(false);
            }}
          />
        ) : type === "video" ? (
          <VideoFileUpload
            onUploadComplete={async (url: string) => {
              await handleUploadComplete(url);
              setOpen(false);
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
