import { ModeToggle } from "@/components/theme-mode";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <main>
        <div className="flex bg-secondary h-10  justify-between w-screen px-5 py-2">
          <ModeToggle className="h-auto" />
        </div>
        <div className="flex-1">{children}</div>
      </main>
    </>
  );
}
