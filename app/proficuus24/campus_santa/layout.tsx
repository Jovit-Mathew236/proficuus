import { ModeToggle } from "@/components/theme-mode";
import AudioPlayer from "@/components/ui/audio-player";
import { Sparkles } from "@/components/ui/sparkles";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Proficuus | Campus Santa",
  description: "Campus Santa Form",
  openGraph: {
    title: "Proficuus | Campus Santa",
    description: "Campus Santa Form",
    url: "https://www.jymest.com/proficuus24/campus_santa", // The canonical URL of the page
    type: "website", // Can also be "article", "video", etc., depending on the content type
    images: [
      {
        url: "https://www.jymest.com/images/campus_santa.jpg", // The URL to an image you want to display for social sharing
        width: 1200,
        height: 630,
        alt: "Proficuus Campus Santa", // Alt text for the image
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full justify-center items-center  bg-cover bg-center">
      <div className="absolute top-10 right-4 flex gap-4 items-center justify-center h-3 z-10">
        <ModeToggle />
      </div>
      {/* <div className="flex h-screen w-full justify-center items-center bg-[url('/images/christmas-background.jpg')] bg-cover bg-center"> */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>{" "}
      {/* Dark overlay */}
      {/* Main content */}
      {children}
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
