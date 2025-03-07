import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

// Define what file types and sizes you allow
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 24 } }) // Adjust size as needed
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("File uploaded:", file.ufsUrl);
      return { fileUrl: file.ufsUrl, metadata };
    }),
  videoUploader: f({ video: { maxFileSize: "16MB", maxFileCount: 1 } }) // Adjust as needed
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video uploaded:", file.ufsUrl);
      return { fileUrl: file.ufsUrl, metadata };
    }),
  mediaUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 24 },
    video: { maxFileSize: "16MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("File uploaded:", file.ufsUrl);
    return { fileUrl: file.ufsUrl, metadata };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
export const utapi = new UTApi();
