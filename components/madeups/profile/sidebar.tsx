"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar2";
import {
  IconArrowLeft,
  IconBuildingSkyscraper,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { motion } from "framer-motion";
import { useUser } from "@/lib/context/userContext";
import { ModeToggle } from "@/components/theme-mode";

export function ProfileSidebar() {
  const [open, setOpen] = useState(false);
  const { userData, error, loading } = useUser();

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/proficuus24/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const links = [
    {
      label: "Profile",
      href: "/proficuus24/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    userData?.isCoordinator
      ? {
          label: "My College",
          href: "/proficuus24/profile/college",
          icon: (
            <IconBuildingSkyscraper className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        }
      : null,
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      action: logout,
    },
  ].filter((link): link is NonNullable<typeof link> => link !== null); // Type guard to filter out null values

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} action={link.action} />
            ))}
          </div>
        </div>
        <div
          className={`flex  justify-center ${
            open ? "items-start" : "items-center flex-col gap-6"
          } w-full gap-2`}
        >
          <ModeToggle className="justify-center items-center h-full" />
          <SidebarLink
            className="w-full"
            link={{
              label: userData?.name || "User",
              href: "#",
              icon: (
                <Image
                  src={userData?.imageUrl || "/images/avatar.png"}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <Image src="/images/logo.png" alt="logo" width={50} height={50} />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Proficuus&apos;24
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <Image src="/images/logo.png" alt="logo" width={50} height={50} />
  </Link>
);
