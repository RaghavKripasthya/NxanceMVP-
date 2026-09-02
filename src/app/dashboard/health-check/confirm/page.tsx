import type { Metadata } from "next";
import ConfirmHoldingsMain from "@/components/health-check/ConfirmHoldingsMain";

export const metadata: Metadata = {
  title: "Confirm Holdings | Nxance AI",
  description: "Verify your parsed portfolio holdings",
};

export default function ConfirmHoldingsPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <ConfirmHoldingsMain />
    </main>
  );
}
