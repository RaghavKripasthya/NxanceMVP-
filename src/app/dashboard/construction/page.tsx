import type { Metadata } from "next";
import ConstructionQuestionnaireMain from "@/components/construction/ConstructionQuestionnaireMain";

export const metadata: Metadata = {
  title: "Construction | Nxance AI",
  description: "Build your Nxance portfolio with the Construction questionnaire",
};

export default function ConstructionPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <ConstructionQuestionnaireMain />
    </main>
  );
}
