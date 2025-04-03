"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AutoLogout() {
  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  return null;
}
