import type { Metadata } from "next";
import HealthCheckMain from "@/components/health-check/HealthCheckMain";

export const metadata: Metadata = {
  title: "Health Check | Nxance AI",
  description: "Upload your portfolio for an AI-powered health check",
};

export default function HealthCheckPage() {
  return (
    <main className="flex-1 overflow-auto">
      <HealthCheckMain />
    </main>
  );
}
