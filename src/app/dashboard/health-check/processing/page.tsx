import type { Metadata } from "next";
import HealthCheckQuestionnaireProcessingMain from "@/components/health-check/HealthCheckQuestionnaireProcessingMain";

export const metadata: Metadata = {
  title: "Analysing Portfolio | Nxance AI",
  description: "Nxance AI is analysing your portfolio and questionnaire responses",
};

export default function HealthCheckProcessingPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <HealthCheckQuestionnaireProcessingMain />
    </main>
  );
}
