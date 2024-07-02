import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import prisma from "lib/prisma";

export async function getMyImages() {
  const images = await prisma.post.findMany({
    include: {
      createdBy: true,
      likes: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return images;
}

export async function getImage(id: number) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const image = await prisma.post.findFirst({
    where: {
      id: id,
    },
    include: {
      createdBy: true,
    },
  });
  if (!image) throw new Error("Image not found");

  if (image.createdById !== userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.post.deleteMany({
    where: {
      id: id,
      createdById: userId,
    },
  });

  analyticsServerClient.capture({
    distinctId: userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
