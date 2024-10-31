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
                  Be dressed ready for service and keep your lamps burning
                </h2>
                <div className="prose prose-sm dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    The king will reply:{" "}
                    <span className="font-semibold text-foreground">
                      "I truly want to express that whatever you did for even
                      one of my brothers and sisters, you did it for me."
                    </span>{" "}
                    (Mathew 25:40)
                  </p>

                  <div className="mt-6 space-y-4">
                    <p className="font-bold text-lg text-foreground">
                      Hello there, PROFICUUS '24 is here!!
                    </p>
                    <p className="text-muted-foreground">
                      We are recruiting true-blue{" "}
                      <span className="font-bold">SOLDIER</span> to the{" "}
                      <span className="font-bold">PROFICUUS ARMY</span>! Yes! We
                      need <span className="font-bold">VOLUNTEERS</span>! 🙌🏼
                    </p>
                    <p className="text-muted-foreground">
                      Share 'the fuel within' and help your fellows embark this
                      journey with 'lighted lamps'!🪔 Expecting your faithful
                      executions from beginning to the end! 🔥
                    </p>
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
