import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { AuthProvider } from "@/lib/provider/authProvider";
import { UserProvider } from "@/lib/context/userContext";
import { ProfileSidebar } from "@/components/madeups/profile/sidebar";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Proficuus | Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <UserProvider>
        <div
          className={cn(
            "md:rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
            " h-min-[100vh]"
          )}
        >
          <ProfileSidebar />
          <BackgroundBeamsWithCollision className="w-full h-auto">
            {children}
          </BackgroundBeamsWithCollision>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}
