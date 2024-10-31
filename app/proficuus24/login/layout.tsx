import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Proficuus | Login",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      {children}
    </div>
  );
}
