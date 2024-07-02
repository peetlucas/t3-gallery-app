import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
// import { ensureUserExists } from '../../../utils/ensureUserExists';

interface PostRequestBody {
  title: string;
  imageUrl: string;
  userId: string;
}

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      createdBy: true,
      likes: true,
    },
  });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // await ensureUserExists(userId);
  // Ensure the user exists in the database via the API route
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ensureUserExists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  const { title, imageUrl } = await request.json() as PostRequestBody;
  
  const newPost = await prisma.post.create({
    data: {
      title,
      imageUrl,
      createdById: userId,
    },
  });
  return NextResponse.json(newPost, { status: 201 });
}
