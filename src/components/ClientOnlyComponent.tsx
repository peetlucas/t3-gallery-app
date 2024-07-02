"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

const ClientOnlyComponent = () => {
  const { signOut } = useClerk();

  //   useEffect(() => {
  //     // Automatically sign out the user on app start
  //     signOut().catch((err) => {
  //       console.error("Failed to sign out:", err);
  //     });
  //   }, [signOut]);

  //   return null;
};

export default ClientOnlyComponent;
