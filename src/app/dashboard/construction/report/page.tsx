import type { Metadata } from "next";
import ConstructionFullReportMain from "@/components/construction/ConstructionFullReportMain";

export const metadata: Metadata = {
  title: "Portfolio Report | Nxance AI",
  description: "Your unlocked Nxance construction portfolio report",
};

export default function ConstructionFullReportPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <ConstructionFullReportMain />
    </main>
  );
}
