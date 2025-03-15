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

type Props = {
  children?: React.ReactNode;
  handleUploadComplete: (url: string) => Promise<void>;
  isImage?: boolean;
};

const UploadDialog = ({ children, handleUploadComplete, isImage }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add media to post</DialogTitle>
        </DialogHeader>
        {isImage ? (
          <ImageFileUpload
            onUploadComplete={async (url: string) => {
              await handleUploadComplete(url);
              setOpen(false);
            }}
          />
        ) : (
          <MediaFileUpload
            onUploadComplete={async (url: string) => {
              await handleUploadComplete(url);
              setOpen(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
