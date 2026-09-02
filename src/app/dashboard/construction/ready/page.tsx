import type { Metadata } from "next";
import ConstructionPortfolioReadyMain from "@/components/construction/ConstructionPortfolioReadyMain";

export const metadata: Metadata = {
  title: "Construction Ready | Nxance AI",
  description: "Your Nxance construction blueprint is ready to unlock",
};

export default function ConstructionPortfolioReadyPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <ConstructionPortfolioReadyMain />
    </main>
  );
}
