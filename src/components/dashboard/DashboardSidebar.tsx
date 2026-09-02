"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Logo from "@/components/Logo";

const mainNavItems: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Dashboard", href: "/dashboard", icon: <GridIcon /> },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: <BriefcaseIcon /> },
  { label: "Health Check", href: "/dashboard/health-check", icon: <ShieldNavIcon /> },
  { label: "Construction", href: "/dashboard/construction", icon: <PortfolioBuilderIcon /> },
  { label: "Nxance AI", href: "/dashboard/nxance-ai", icon: <SparkleIcon /> },
  { label: "Reports", href: "/dashboard/reports/unlock", icon: <ChartIcon /> },
  { label: "Upgrade", href: "/dashboard/upgrade", icon: <UpgradeNavIcon /> },
];

const bottomNavItems: { label: string; href: string; icon: ReactNode; danger?: boolean }[] = [
  { label: "Settings", href: "#", icon: <GearIcon /> },
  { label: "Help", href: "#", icon: <HelpIcon /> },
  { label: "Sign Out", href: "/", icon: <SignOutIcon />, danger: true },
];

type DashboardSidebarProps = {
  variant?: "default" | "questionnaire";
};

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/dashboard/health-check") {
    return pathname.startsWith("/dashboard/health-check");
  }
  if (href === "/dashboard/reports/unlock") {
    return pathname.startsWith("/dashboard/reports");
  }
  if (href === "/dashboard/construction") {
    return pathname.startsWith("/dashboard/construction");
  }
  if (href === "/dashboard/upgrade") {
    return pathname.startsWith("/dashboard/upgrade");
  }
  if (href === "/dashboard/nxance-ai") {
    return pathname.startsWith("/dashboard/nxance-ai");
  }
  if (href === "/dashboard/portfolio") {
    return pathname.startsWith("/dashboard/portfolio");
  }
  return pathname.startsWith(href);
}

export default function DashboardSidebar({ variant = "default" }: DashboardSidebarProps) {
  const pathname = usePathname();
  const isQuestionnaire = variant === "questionnaire";

  return (
    <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[#e2e8f0] bg-white lg:flex xl:w-[260px]">
      <div className="border-b border-[#f1f5f9] px-5 py-5">
        <Link href="/dashboard" className="inline-flex">
          <Logo variant="dashboard" />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4" aria-label="Dashboard">
        {mainNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }`}
            >
              {active ? (
                <span className="absolute bottom-1.5 left-0 top-1.5 w-[3px] rounded-full bg-[#2563eb]" />
              ) : null}
              <span className={active ? "text-[#2563eb]" : "text-[#94a3b8]"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#f1f5f9] px-3 py-4">
        {isQuestionnaire ? (
          <>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a]"
            >
              <span className="text-[#94a3b8]">
                <GearIcon />
              </span>
              Settings
            </Link>
            <div className="mt-3 rounded-xl bg-[#f3e8ff]/70 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7c3aed]">
                Pro Access
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
                Unlock deep AI analytics.
              </p>
              <Link
                href="/dashboard/upgrade"
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#2563eb] px-3 py-2 text-sm font-bold text-white shadow-sm"
              >
                Upgrade to Pro
              </Link>
            </div>
          </>
        ) : (
          bottomNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.danger
                  ? "text-[#ef4444] hover:bg-[#fef2f2]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }`}
            >
              <span className={item.danger ? "text-[#ef4444]" : "text-[#94a3b8]"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))
        )}
      </div>
    </aside>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PortfolioBuilderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UpgradeNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5a2.5 2.5 0 014.5 1.5c0 2-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
