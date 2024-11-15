import { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-mode";
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { AuthProvider } from "@/lib/provider/authProvider";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "PROFICUUS | Volunteer registration",
  description: "Volunteer registration Dashboard",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <AuthProvider>
        {/* <BackgroundBeamsWithCollision className="h-full w-full"> */}
        <SidebarProvider>
          <AppSidebar />
          <main>
            <div className="flex sm:hidden bg-secondary h-10  justify-between w-screen px-5 py-2">
              <SidebarTrigger className="" />
              <p>Admin dashboard</p>
              <ModeToggle className="h-auto" />
            </div>
            <div className="space-y-6 p-5 pb-16 h-screen">
              <div className="h-full flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </main>
        </SidebarProvider>
        {/* </BackgroundBeamsWithCollision> */}
      </AuthProvider>
    </>
  );
}
