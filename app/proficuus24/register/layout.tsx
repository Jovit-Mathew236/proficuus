/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-mode";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Card, CardContent } from "@/components/ui/card";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// const { basePath } = publicRuntimeConfig;
export const metadata: Metadata = {
  title: "PROFICUUS | Participants registration",
  description: "Volunteer registration Form",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <BackgroundBeamsWithCollision className="h-full w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="relative mb-8 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  "Be dressed ready for service and keep your lamps
                  burning"🪔(LUKE 12:35)
                </h2>
                <div className="prose prose-sm dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    Hello there ,Young lantern!! Yeah you!📸🤩
                  </p>

                  <div className="mt-6 space-y-4">
                    <p className="font-bold text-lg text-foreground">
                      𝗜𝗴𝗻𝗶𝘁𝗲 𝘁𝗵𝗮𝘁 𝗘𝗺𝗯𝗲𝗿 𝗜𝗻𝘀𝗶𝗱𝗲 <br />
                      𝗦𝗲𝘁 𝗔𝗯𝗹𝗮𝘇𝗲 𝘆𝗼𝘂𝗿 𝗛𝗲𝗮𝗿𝘁❤‍🔥 <br />
                      𝗕𝗲 𝘁𝗵𝗲 𝗹𝗮𝗺𝗽 𝗼𝗻 𝘁𝗵𝗲 𝘁𝗮𝗯𝗹𝗲
                      <br />
                      𝗟𝗲𝘁 𝘆𝗼𝘂𝗿 𝗹𝗶𝗴𝗵𝘁 𝘀𝗵𝗶𝗻𝗲 𝗯𝗿𝗶𝗴𝗵𝘁✨
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-bold text-foreground">
                        𝙋𝙧𝙤𝙛𝙞𝙘𝙪𝙪𝙨'24 is 𝗵𝗲𝗿𝗲...
                      </span>
                      Time to get your skates on!! <br />
                      <span className="font-bold text-foreground">
                        𝗗𝗮𝘁𝗲𝘀: 𝗗𝗲𝗰𝗲𝗺𝗯𝗲𝗿 𝟮𝟬-𝟮𝟯
                      </span>{" "}
                    </p>
                    <p className="font-semibold text-foreground">
                      𝗦𝘁𝗲𝗽 𝗼𝗻!!🥳 <br /> 𝗦𝗹𝗼𝘁𝘀 𝗮𝗿𝗲 𝗼𝗽𝗲𝗻...!🎰 <br /> 𝗧𝗶𝗰𝗸𝗲𝘁𝘀 𝗮𝗿𝗲
                      𝗼𝘂𝘁..! 🎟 <br />
                      👉🏼𝗛𝘂𝗿𝗿𝘆 𝘂𝗽 & 𝗚𝗿𝗮𝗯 𝘁𝗵𝗲𝗺 𝗯𝗲𝗳𝗼𝗿𝗲 𝗰𝗹𝗼𝘀𝘂𝗿𝗲
                    </p>
                    <br />
                    <p className="font-semibold text-foreground">
                      PROFICUUS'24 - December 20-23
                    </p>
                  </div>
                </div>
              </div>
              <ModeToggle />
            </div>
          </div>

          <Separator className="my-8" />

          {/* Main Content Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image Section */}
            <Card className="overflow-hidden bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm">
              <CardContent className="p-1">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/proficuus.png"
                    // src={`${basePath}/images/proficuus.png`}
                    width={1280}
                    height={791}
                    alt="Proficuus"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Section */}
            <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm">
              <CardContent className="p-6">{children}</CardContent>
            </Card>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
