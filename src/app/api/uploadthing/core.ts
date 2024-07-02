import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from "../../../lib/prisma";
import { ratelimit } from "~/server/ratelimit";
import { ensureUserExists } from '../../../utils/ensureUserExists';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 40 } })
    .middleware(async () => {
      const { userId } = auth();

      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }

      await ensureUserExists(userId);


      const { success } = await ratelimit.limit(userId);
      if (!success) throw new UploadThingError("Ratelimited");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: metadata.userId },
      });

      if (!existingUser) {
        throw new UploadThingError("User not found");
      }

      // Create the post
      await prisma.post.create({
        data: {
          title: file.name,
          imageUrl: file.url,
          createdById: metadata.userId,
        },
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
