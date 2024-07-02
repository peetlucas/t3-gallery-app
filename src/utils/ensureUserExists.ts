import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma";

export async function ensureUserExists(userId: string) {
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(userId);

    if (!clerkUser?.emailAddresses?.[0]) {
      throw new Error('Clerk user or email addresses are missing.');
    }

    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
      },
    });
  }

  return user;
}
