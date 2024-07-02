"use client";

import { signIn, signOut } from "next-auth/react";

type Props = {
  isSignedIn: boolean;
};

const InteractiveButton = ({ isSignedIn }: Props) => {
  return (
    <button
      onClick={() => (isSignedIn ? signOut() : signIn())}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      {isSignedIn ? "Sign out" : "Sign in"}
    </button>
  );
};

export default InteractiveButton;
