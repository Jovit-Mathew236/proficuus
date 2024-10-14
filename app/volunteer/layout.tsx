import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-mode";
// import { SidebarNav } from "@/components/madeups/volunteer/sidebar-nav";

export const metadata: Metadata = {
  title: "PROFICUUS | Volunteer registration",
  description: "Volunteer registration Form",
};

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
              The king will reply:
              <b>
                &quot;I truly want to express that whatever you did for even one
                of my brothers and sisters, you did it for me.&quot;
              </b>{" "}
              (Mathew 25:40)
              <br /> <br />
              <b>Hello there, PROFICUUS &apos;24 is here!! </b> <br /> <br />
              And we are recruiting true-blue <b>SOLDIER</b> to the{" "}
              <b>PROFICUUS ARMY</b>
              Yes! We need <b>VOLUNTEERS</b>! 🙌🏼 Share &apos;
              <b>the fuel within</b>&apos; and help your fellows embark this
              journey with &apos;<b>lighted 𝗹𝗮𝗺𝗽𝘀</b>&apos;!🪔 Expecting your
              faithful executions from beginning to the end! 🔥
              PROFICUUS&apos;24 𝘋𝘦𝘤𝘦𝘮𝘣𝘦𝘳 20-2
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
