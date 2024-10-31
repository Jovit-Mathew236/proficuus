import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-mode";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
// import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
// import { SidebarNav } from "@/components/madeups/volunteer/sidebar-nav";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { basePath } = publicRuntimeConfig;
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
      <BackgroundBeamsWithCollision className="h-full w-full">
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5 flex ">
            <div>
              <h2 className="text-2xl text-[#8343F3] font-bold tracking-tight">
                Call for the PROFICUUS&apos; 24 ARMY
              </h2>
              <p className="text-muted-foreground">
                The king will reply:
                <b>
                  &quot;I truly want to express that whatever you did for even
                  one of my brothers and sisters, you did it for me.&quot;
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
            <div className="absolute right-4 flex gap-4 items-center justify-center h-3">
              <ModeToggle />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/2">
              {/* <SidebarNav items={sidebarNavItems} /> */}
              {/* <NeonGradientCard> */}
              <Image
                src={`${basePath}/images/proficuus.png`}
                width={1280}
                height={791}
                alt="Forms"
                className="block rounded-lg"
              />
              {/* </NeonGradientCard> */}
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
}
