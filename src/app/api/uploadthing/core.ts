import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  cadUploader: f({ 
    blob: { maxFileSize: "128MB", maxFileCount: 1 } 
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for file url:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
