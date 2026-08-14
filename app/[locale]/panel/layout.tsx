import PanelShell from "@/components/panel/PanelShell";
import { PanelProvider } from "@/components/panel/PanelProvider";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PanelProvider>
      <PanelShell>{children}</PanelShell>
    </PanelProvider>
  );
}