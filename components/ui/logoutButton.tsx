"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function LogoutButton() {
  const logout = () => {
    signOut(auth);
    window.location.href = "/";
  };

  return (
    <Button variant={"destructive"} onClick={logout}>
      Logout
    </Button>
  );
}
