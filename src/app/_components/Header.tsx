"use client";

// import { signIn, signOut, useSession } from "next-auth/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export default function Header() {
  // const { data: session } = useSession();

  return (
    <header>
      <nav className="flex w-full items-center justify-between border-b text-lg font-semibold">
        <div> Gallery </div>
        <div className="flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SimpleUploadButton />
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
