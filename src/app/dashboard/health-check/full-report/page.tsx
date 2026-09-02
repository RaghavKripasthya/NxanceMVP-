import type { Metadata } from "next";
import HealthCheckFullReportMain from "@/components/health-check/HealthCheckFullReportMain";

export const metadata: Metadata = {
  title: "Portfolio Health Result | Nxance AI",
  description: "Your full portfolio health report and AI smart actions",
};

export default function HealthCheckFullReportPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <HealthCheckFullReportMain />
    </main>
  );
}
