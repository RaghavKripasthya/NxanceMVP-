"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useUnlockReport } from "@/components/health-check/HealthCheckFullReportMain";
import Logo from "@/components/Logo";

const features = [
  {
    title: "Deep-dive Analysis",
    description: "Granular risk-reward breakdown for every asset.",
    icon: <BarChartFeatureIcon />,
  },
  {
    title: "16-Layer FIT Mapping",
    description: "Financial Intelligence Topology covering tax and exit.",
    icon: <LayersFeatureIcon />,
  },
  {
    title: "Backtested Alts",
    description: "Compare 5 optimized portfolio alternatives.",
    icon: <HistoryFeatureIcon />,
  },
];

export default function HealthCheckUnlockReportMain() {
  const unlockReport = useUnlockReport();

  return (
    <div className="flex flex-1 flex-col bg-[#f8f9fc]">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <ScrollReveal>
          <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
                <CheckBadgeIcon />
                Analysis Complete
              </span>
            </div>

            <h1 className="mt-6 text-center text-2xl font-bold leading-tight text-[#0f172a] sm:text-[1.75rem]">
              Unlock the Nxance{" "}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
                Full Report
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
              Our AI has mapped 1,400+ data points for your portfolio. Get the definitive
              strategy to optimize your wealth.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-4 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#64748b] shadow-sm">
                    {feature.icon}
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#0f172a]">{feature.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#64748b]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={unlockReport}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-4 text-base font-bold text-white shadow-md transition-transform hover:scale-[1.01]"
            >
              Unlock full report — ₹99 →
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/dashboard/health-check/results"
                className="text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
              >
                Not now, keep the basic summary
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#f1f5f9] pt-6">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                <LockIcon />
                Secure payment powered by Stripe
              </p>
              <div className="flex items-center gap-2">
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
              </div>
            </div>
          </div>

          <blockquote className="mx-auto mt-8 max-w-xl text-center">
            <p className="text-sm italic leading-relaxed text-[#64748b] sm:text-[15px]">
              &ldquo;Nxance analysis revealed ₹1.2L in hidden tax leakages in my first week.
              Best ₹99 I ever spent.&rdquo;
            </p>
            <footer className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
              — Raghav Kripasthya, Venture Partner
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>

      <UnlockReportFooter />
    </div>
  );
}

function UnlockReportFooter() {
  return (
    <footer className="mt-auto w-full border-t border-[#e2e8f0] bg-white">
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm shrink-0">
            <Link href="/dashboard" className="inline-flex">
              <Logo variant="footer" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
              AI-First investment intelligence for the modern professional. Precisely
              engineered, globally backtested.
            </p>
          </div>

          <div className="flex shrink-0 gap-12 sm:gap-16 lg:ml-auto lg:justify-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                Legal
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#" className="text-sm text-[#64748b] hover:text-[#2563eb]">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#64748b] hover:text-[#2563eb]">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                Contact
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#" className="text-sm text-[#64748b] hover:text-[#2563eb]">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-[#64748b] hover:text-[#2563eb]">
                    Advisor Access
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 border-t border-[#e2e8f0] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#94a3b8] sm:text-sm">
            © 2026 Nxance, SEBI compliant.
          </p>
          <div className="flex items-center gap-4 text-[#94a3b8] sm:ml-auto">
            <button
              type="button"
              aria-label="Language"
              className="transition-colors hover:text-[#64748b]"
            >
              <GlobeIcon />
            </button>
            <button
              type="button"
              aria-label="Share"
              className="transition-colors hover:text-[#64748b]"
            >
              <ShareIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CardPlaceholder() {
  return <span className="h-6 w-10 rounded bg-[#e2e8f0]" aria-hidden="true" />;
}

function CheckBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M5 12l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarChartFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LayersFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function HistoryFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12a9 9 0 101.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.6 10.7l6.8-3.9M8.6 13.3l6.8 3.9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
