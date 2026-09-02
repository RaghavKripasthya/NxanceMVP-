import type { Metadata } from "next";
import PortfolioMain from "@/components/portfolio/PortfolioMain";

export const metadata: Metadata = {
  title: "Portfolio | Nxance AI",
  description: "Combined Health Check and Construction portfolio performance",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1 overflow-auto">
      <PortfolioMain />
    </main>
  );
}
