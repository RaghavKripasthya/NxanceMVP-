import type { Metadata } from "next";
import NxanceAIMain from "@/components/nxance-ai/NxanceAIMain";

export const metadata: Metadata = {
  title: "Nxance LM | Nxance AI",
  description: "Nxance LM financial intelligence terminal",
};

export default function NxanceAIPage() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <NxanceAIMain />
    </main>
  );
}
