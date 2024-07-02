"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import type { Session } from "next-auth";

type Props = {
  children: ReactNode;
  session: Session | null;
};

const SessionProviderWrapper = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
