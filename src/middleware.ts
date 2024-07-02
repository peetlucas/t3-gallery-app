import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// export default clerkMiddleware();
export default clerkMiddleware(async(auth, req) => {
  // if (!auth().userId && isProtectedRoute(req)) {
  //   return auth().redirectToSignIn();
  // }
  const userId = auth().userId;

  if (userId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ensureUserExists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to ensure user existence');
      }
    } catch (error) {
      console.error('Error ensuring user existence:', error);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
