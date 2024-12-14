import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate for Proficuus",
  description: "Donate for Proficuus24",
  openGraph: {
    title: "Donate for Proficuus",
    description: "Donate for Proficuus24",
    images: "/images/pay.png", // Replace with the actual path to your OG image
    url: "https://www.jymest.com/proficuus24/pay", // Replace with the actual URL of your page
  },
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <>{children}</>; // Correctly return children wrapped in a fragment
}
