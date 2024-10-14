import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-mode";
// import { SidebarNav } from "@/components/madeups/volunteer/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

// const sidebarNavItems = [
//   {
//     title: "Account",
//     href: "/examples/forms/account",
//   },
// ];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5 flex ">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              PROFICUUS&apos; 24 Volunteers Registration
            </h2>
            <p className="text-muted-foreground">
              <b>
                &quot; My grace is sufficient for you, for my power is made
                perfect in weakness. &quot;
              </b>{" "}
              -2 Corinthians 12:9
              <br /> <br />
              This is a call for you to be part of the Mission of the Church, to
              spread the good news to the ends of the world. PROFICUUS is a
              program for the campus students from Medical and Engineering
              Colleges in Kerala, organised by All Kerala Jesus Youth
              Medical-Engineering Students Team(MEST). The program aims to pave
              way for a God Encounter in their lives and provide a great
              beginning of their spiritual journey. The program is for the
              beginners in the movement, so that they would be elevated to next
              step of their mission journey. Being a very fortunate person who
              tasted the goodness of Lord, your call is to accompany our little
              brothers and sisters in their spiritual growth.
              <br /> <br />
              Date of program : December 20 to 23
            </p>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/2">
            {/* <SidebarNav items={sidebarNavItems} /> */}
            <Image
              src="/images/proficuus.png"
              width={1280}
              height={791}
              alt="Forms"
              className="block"
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
