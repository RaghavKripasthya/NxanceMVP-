import type { Metadata } from "next";
import HealthCheckAnalysisMain from "@/components/health-check/HealthCheckAnalysisMain";

export const metadata: Metadata = {
  title: "AI Analysis | Nxance AI",
  description: "Your portfolio is being analyzed by Nxance AI",
};

export default function HealthCheckAnalysisPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col">
      <HealthCheckAnalysisMain />
    </main>
  );
}
