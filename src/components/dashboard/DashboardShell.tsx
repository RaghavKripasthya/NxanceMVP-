"use client";

import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import AnalysisMinimalHeader from "@/components/health-check/AnalysisMinimalHeader";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAnalysisPage = pathname.startsWith("/dashboard/health-check/analysis");
  const isQuestionnairePage =
    pathname.startsWith("/dashboard/health-check/questionnaire") ||
    pathname === "/dashboard/construction";

  if (isAnalysisPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f8f9fc]">
        <AnalysisMinimalHeader />
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fc]">
      <DashboardSidebar variant={isQuestionnairePage ? "questionnaire" : "default"} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <DashboardTopBar />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
