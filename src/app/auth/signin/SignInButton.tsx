// auth/signin/SignInButton.tsx
"use client";

import { signIn } from "next-auth/react";

type SignInButtonProps = {
  providerId: string;
  providerName: string;
};

const SignInButton = ({ providerId, providerName }: SignInButtonProps) => {
  return (
    <button onClick={() => signIn(providerId)}>
      Sign in with {providerName}
    </button>
  );
};

export default SignInButton;
