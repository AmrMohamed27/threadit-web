"use client";

import { useToast } from "@/hooks/use-toast";
import { cn, UploadDropzone } from "@/lib/utils";

interface Props {
  onUploadComplete: (url: string) => Promise<void>;
  className?: string;
}

export default function VideoFileUpload({
  onUploadComplete,
  className,
}: Props) {
  const { toast } = useToast();
  return (
    <UploadDropzone
      className={cn("", className)}
      endpoint="videoUploader"
      onClientUploadComplete={async (res) => {
        res.forEach(async (file) => {
          await onUploadComplete(file.ufsUrl);
        });
        toast({
          title: "Upload Completed",
          description: `Uploaded ${res.length} video file${
            res.length > 1 ? "s" : ""
          }`,
        });
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
