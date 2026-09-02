import type { Metadata } from "next";
import HealthCheckQuestionnaireMain from "@/components/health-check/HealthCheckQuestionnaireMain";

export const metadata: Metadata = {
  title: "Questionnaire | Nxance AI",
  description: "Answer questions to align your portfolio with your goals",
};

export default function HealthCheckQuestionnairePage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <HealthCheckQuestionnaireMain />
    </main>
  );
}
