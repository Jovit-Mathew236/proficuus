import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proficuus'24",
  description:
    "Initial level leaders training begins with a God encounter retreat followed by equipping them for Campus Evangelization in medical and engineering colleges.",
  keywords:
    "jymest,proficuus,proficuus24,footprints,discovery,Jesus Youth, medical students, engineering students, JY MEST, student team, Christian students, community, youth ministry",
  authors: [{ name: "Jesus Youth MEST Team", url: "https://www.jymest.com" }], // Or the name of the person or organization that created the content
  robots: "index, follow", // Default for other pages, but will be overridden for /dashboard
  openGraph: {
    title: "Proficuus'24 - Jesus Youth Medical and Engineering Student Team",
    description:
      "Initial level leaders training begins with a God encounter retreat followed by equipping them for Campus Evangelization in medical and engineering colleges.",
    url: "https://www.jymest.com/proficuus24/register", // The canonical URL of the page
    type: "website", // Can also be "article", "video", etc., depending on the content type
    images: [
      {
        url: "https://www.jymest.com/images/logo.png", // The URL to an image you want to display for social sharing
        width: 1200,
        height: 630,
        alt: "JY MEST Community Image", // Alt text for the image
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Type of Twitter card (summary, summary_large_image, etc.)
    title: "Proficuus'24 - Jesus Youth Medical and Engineering Student Team",
    description:
      "Initial level leaders training begins with a God encounter retreat followed by equipping them for Campus Evangelization in medical and engineering colleges.",
    images: "https://www.jymest.com/images/logo.png", // Image to display on Twitter
  },
  viewport: "width=device-width, initial-scale=1", // Mobile responsive setting
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1">{children}</div>;
}
