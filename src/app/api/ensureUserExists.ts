import { type NextApiRequest, type NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  console.log(userId);

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      if (!clerkUser?.emailAddresses?.[0]) {
        return res.status(400).json({ error: 'Clerk user or email addresses are missing.' });
      }

      user = await prisma.user.create({
        data: {
          id: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error ensuring user existence:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
