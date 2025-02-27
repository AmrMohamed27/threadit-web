"use client";

import FileUpload from "@/components/common/FileUpload";
import { useState } from "react";

const Sandbox = () => {
  const [imageUrl, setImageUrl] = useState("");
  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };
  return (
    <div className="flex flex-col">
      <FileUpload onUploadComplete={handleUploadComplete} />
      <span>{imageUrl}</span>
    </div>
  );
};

export default Sandbox;
