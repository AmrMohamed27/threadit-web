import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  handleRemove: () => void;
  imageSrc?: string;
  videoSrc?: string;
  className?: string;
};

const MediaPreview = ({
  handleRemove,
  imageSrc,
  videoSrc,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "relative bg-muted rounded-lg w-[64px] h-[64px]",
        className
      )}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className="top-0 right-0 z-50 absolute hover:bg-transparent w-4 h-4 cursor-pointer"
        onClick={handleRemove}
      >
        <X className="w-2 h-2" />
      </Button>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt="Image uploaded to message"
          width={64}
          height={64}
          className="rounded-lg w-full h-full object-center"
        />
      ) : videoSrc ? (
        <video className="z-10 rounded-lg w-full h-full object-center">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
};

export default MediaPreview;
