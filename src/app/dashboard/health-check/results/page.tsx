import type { Metadata } from "next";
import HealthCheckResultsMain from "@/components/health-check/HealthCheckResultsMain";

export const metadata: Metadata = {
  title: "Health Check Results | Nxance AI",
  description: "Your portfolio health score and initial analysis",
};

export default function HealthCheckResultsPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <HealthCheckResultsMain />
    </main>
  );
}
