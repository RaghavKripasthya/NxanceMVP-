import type { Metadata } from "next";
import ConstructionProcessingMain from "@/components/construction/ConstructionProcessingMain";

export const metadata: Metadata = {
  title: "Building Construction | Nxance AI",
  description: "Nxance AI is building your optimized construction blueprint",
};

export default function ConstructionProcessingPage() {
  return (
    <main className="flex flex-1 flex-col overflow-auto">
      <ConstructionProcessingMain />
    </main>
  );
}
