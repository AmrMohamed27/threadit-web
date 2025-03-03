import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import FileUpload from "./FileUpload";

type Props = {
  children?: React.ReactNode;
  handleUploadComplete: (url: string) => Promise<void>;
};

const UploadDialog = ({ children, handleUploadComplete }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add media to post</DialogTitle>
        </DialogHeader>
        <FileUpload
          onUploadComplete={async (url: string) => {
            await handleUploadComplete(url);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
