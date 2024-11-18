import { ParticipantsProvider } from "@/lib/context/participantContext";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <ParticipantsProvider>{children}</ParticipantsProvider>
    </>
  );
}
