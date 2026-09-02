import type { Metadata } from "next";
import HealthCheckUnlockReportMain from "@/components/health-check/HealthCheckUnlockReportMain";

export const metadata: Metadata = {
  title: "Unlock Full Report | Nxance AI",
  description: "Unlock your Nxance full portfolio report",
};

export default function ReportsUnlockPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <HealthCheckUnlockReportMain />
    </main>
  );
}
