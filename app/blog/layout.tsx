import { ModeToggle } from "@/components/theme-mode";
import { Lora } from "next/font/google";
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});
interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <main className={lora.className}>
        <div className="flex bg-secondary h-10  justify-between w-screen px-5 py-2">
          <ModeToggle className="h-auto" />
        </div>
        <div className="flex-1 px-4">{children}</div>
      </main>
    </>
  );
}
