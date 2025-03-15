"use client";

import MediaFileUpload from "@/components/common/MediaFileUpload";
import { useState } from "react";

const Sandbox = () => {
  const [imageUrl, setImageUrl] = useState("");
  const handleUploadComplete = async (url: string) => {
    setImageUrl(url);
  };
  return (
    <div className="flex flex-col">
      <MediaFileUpload onUploadComplete={handleUploadComplete} />
      <span>{imageUrl}</span>
    </div>
  );
};

export default Sandbox;
