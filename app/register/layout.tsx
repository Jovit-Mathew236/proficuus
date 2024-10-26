import { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-mode";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export const metadata: Metadata = {
  title: "PROFICUUS | Participants Registration",
  description: "Volunteer Registration Form",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <BackgroundBeamsWithCollision className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="container mx-auto space-y-8 p-10 pb-16 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl text-[#8343F3] font-bold tracking-tight">
              Be dressed ready for service and keep your lamps burning
            </h2>
            <p className="text-gray-700 mt-2">
              The king will reply:{" "}
              <b>
                &quot;I truly want to express that whatever you did for even one
                of my brothers and sisters, you did it for me.&quot;
              </b>{" "}
              (Matthew 25:40)
            </p>
            <p className="text-gray-700 mt-4">
              <b>Hello there, PROFICUUS &apos;24 is here!!</b>
              <br />
              We are recruiting true-blue <b>SOLDIERS</b> for the{" "}
              <b>PROFICUUS ARMY</b>. Yes! We need <b>VOLUNTEERS</b>! 🙌🏼 Share{" "}
              <b>the fuel within</b> and help your fellows embark on this
              journey with <b>lighted lamps</b>! 🪔 Expecting your faithful
              executions from beginning to the end! 🔥
              <br />
              <span className="font-semibold">
                Program Dates: December 20 to 23
              </span>
            </p>
          </div>
          <div className="flex items-center h-10">
            <ModeToggle />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/2">
            <Image
              src="/images/proficuus.png"
              width={1280}
              height={791}
              alt="Forms"
              className="block rounded-lg shadow-md"
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl p-6 bg-gray-100 rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
