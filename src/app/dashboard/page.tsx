import type { Metadata } from "next";
import DashboardMain from "@/components/dashboard/DashboardMain";

export const metadata: Metadata = {
  title: "Dashboard | Nxance AI",
  description: "Your Nxance AI investment dashboard",
};

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto">
      <DashboardMain />
    </main>
  );
}
