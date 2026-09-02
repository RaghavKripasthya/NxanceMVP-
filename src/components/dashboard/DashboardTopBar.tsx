"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const topTabs: { label: string; href: string; match: string }[] = [
  { label: "Dashboard", href: "/dashboard", match: "/dashboard" },
  { label: "Portfolio", href: "/dashboard/portfolio", match: "/dashboard/portfolio" },
  { label: "Health Check", href: "/dashboard/health-check", match: "/dashboard/health-check" },
  { label: "Construction", href: "/dashboard/construction", match: "/dashboard/construction" },
  { label: "Reports", href: "/dashboard/reports/unlock", match: "/dashboard/reports" },
  { label: "Upgrade", href: "/dashboard/upgrade", match: "/dashboard/upgrade" },
];

export default function DashboardTopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[#e2e8f0] bg-white/95 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-[#e2e8f0] px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="inline-flex">
          <Logo variant="dashboard" />
        </Link>
      </div>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6" aria-label="Top navigation">
          {topTabs.map((tab) => {
            const active =
              tab.match === "/dashboard"
                ? pathname === "/dashboard"
                : tab.match === "/dashboard/health-check"
                  ? pathname.startsWith("/dashboard/health-check") &&
                    !pathname.startsWith("/dashboard/reports")
                  : pathname.startsWith(tab.match);
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`text-sm font-semibold transition-colors ${
                  active
                    ? "border-b-2 border-[#2563eb] pb-0.5 text-[#2563eb]"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden min-w-[220px] flex-1 sm:block lg:min-w-[300px]">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search markets, assets..."
              className="w-full rounded-full bg-[#f1f5f9] py-2.5 pl-10 pr-4 text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>
          <Link
            href="/dashboard/upgrade"
            className={`hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold shadow-sm transition-colors sm:inline-flex ${
              pathname.startsWith("/dashboard/upgrade")
                ? "bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white"
                : "border border-[#2563eb]/30 bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]"
            }`}
          >
            <UpgradeIcon />
            Upgrade
          </Link>
          <Link
            href="/dashboard/nxance-ai"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-sm transition-colors ${
              pathname.startsWith("/dashboard/nxance-ai")
                ? "bg-[#1d4ed8] text-white"
                : "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
            }`}
          >
            Nxance AI
          </Link>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UpgradeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
