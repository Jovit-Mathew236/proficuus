import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Transition from "@/components/framer/transition";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "JY MEST",
  description: "Jesus Youth Medical and Engineering Student Team",
  keywords:
    "jymest,proficuus,footprints,discovery,Jesus Youth, medical students, engineering students, JY MEST, student team, Christian students, community, youth ministry",
  authors: [{ name: "Jesus Youth MEST Team", url: "https://www.jymest.com" }], // Or the name of the person or organization that created the content
  robots: "index, follow", // Default for other pages, but will be overridden for /dashboard
  openGraph: {
    title: "JY MEST - Jesus Youth Medical and Engineering Student Team",
    description:
      "A community of medical and engineering students united by faith and service in the Jesus Youth movement.",
    url: "https://www.jymest.com", // The canonical URL of the page
    type: "website", // Can also be "article", "video", etc., depending on the content type
    images: [
      {
        url: "https://www.jymest.com/images/jymestlogo.png", // The URL to an image you want to display for social sharing
        width: 1200,
        height: 630,
        alt: "JY MEST Community Image", // Alt text for the image
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Type of Twitter card (summary, summary_large_image, etc.)
    title: "JY MEST - Jesus Youth Medical and Engineering Student Team",
    description:
      "A community of medical and engineering students united by faith and service in the Jesus Youth movement.",
    images: "https://www.jymest.com/images/jymestlogo.png", // Image to display on Twitter
  },
  viewport: "width=device-width, initial-scale=1", // Mobile responsive setting

  // Prevent crawling on /dashboard route
  // This will need to be set conditionally in the /dashboard pages
  // Example for your /dashboard route:
  // If you're dynamically setting this in your Next.js application,
  // you can return the following for any pages in the /dashboard route:

  ...(typeof window !== "undefined" &&
  window.location.pathname.startsWith("/dashboard")
    ? { robots: "noindex, nofollow" }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Transition>{children}</Transition>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
