import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { AuthProvider } from "@/lib/provider/authProvider";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Proficuus | Profile",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <div className="flex h-screen w-full justify-center items-center"> */}
      <AuthProvider>
        <BackgroundBeamsWithCollision className="h-full w-full">
          {children}
        </BackgroundBeamsWithCollision>
      </AuthProvider>
      {/* </div> */}
    </>
  );
}
