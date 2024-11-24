import AudioPlayer from "@/components/ui/audio-player";
import { Sparkles } from "@/components/ui/sparkles";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Proficuus | Campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-[url('/images/christmas-background.jpg')] bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>{" "}
      {/* Dark overlay */}
      {/* Main content */}
      <div className="w-11/12 md:w-auto relative z-10 p-4 rounded-lg bg-background/90 bg-opacity-50 backdrop-blur-sm shadow-lg">
        <h1 className="text-center text-4xl font-bold text-red-950 mb-6 molle">
          Merry Christmas and Give your gift
        </h1>
        {children}
      </div>
      {/* Sparkles background with opacity */}
      <div className="absolute bottom-0 z-[2] h-screen w-screen overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#ffffff,transparent_90%)] before:opacity-10 after:absolute">
        <Sparkles
          density={1800}
          speed={1.2}
          color="#ffffff"
          direction="bottom"
          className="absolute inset-x-0 bottom-0 h-full w-full "
        />
      </div>
      {/* GIF at the bottom of the form */}
      <div className="absolute bottom-0 right-4 w-auto text-right z-[10]">
        <Image
          src="/images/santa.gif" // Replace with your GIF URL
          alt="Christmas GIF"
          width={1000}
          height={1000}
          className="mx-auto h-[200px] w-auto"
        />
      </div>
      {/* Include the AudioPlayer component here */}
      <AudioPlayer />
    </div>
  );
}
