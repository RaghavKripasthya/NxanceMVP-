import type { Metadata } from "next";
import Link from "next/link";
import KYCVerification from "@/components/KYCVerification";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "KYC Verification | Nxance AI",
  description: "Verify your identity to unlock AI-powered investing",
};

export default function KYCPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eef0f4]">
      <header className="flex items-center justify-between border-b border-[#e2e8f0]/80 bg-[#eef0f4] px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Back to home">
          <Logo variant="kycHeader" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Help"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:text-[#0f172a]"
          >
            <HelpIcon />
          </button>
          <button
            type="button"
            aria-label="Information"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:text-[#0f172a]"
          >
            <InfoIcon />
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <KYCSidebar />
        <KYCVerification />
      </div>

      <footer className="flex flex-col items-center gap-4 border-t border-[#e2e8f0]/80 px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left lg:px-10">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#94a3b8] sm:text-[11px]">
          © 2026 Nxance, SEBI compliant.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#94a3b8] sm:gap-5 sm:text-sm">
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Terms of Service
          </a>
          <a href="#" className="transition-colors hover:text-[#64748b]">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}

function KYCSidebar() {
  const steps = [
    { label: "Identity", status: "done" as const, icon: <CheckIcon /> },
    { label: "Verification", status: "active" as const, icon: <ShieldIcon /> },
    { label: "Liveness", status: "pending" as const, icon: <UserIcon /> },
    { label: "Review", status: "pending" as const, icon: <ReviewIcon /> },
  ];

  return (
    <aside className="border-b border-[#e2e8f0]/80 bg-[#eef0f4] px-5 py-6 lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r lg:px-6 lg:py-8 xl:w-[300px]">
      <div className="lg:sticky lg:top-0">
        <h2 className="text-lg font-bold text-[#2563eb]">Nxance KYC</h2>
        <p className="mt-0.5 text-sm text-[#94a3b8]">Step 1 of 4</p>

        <nav className="mt-6 space-y-1" aria-label="KYC steps">
          {steps.map((step) => (
            <div
              key={step.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                step.status === "active"
                  ? "border-r-[3px] border-[#2563eb] bg-[#dbeafe]/70 text-[#2563eb]"
                  : step.status === "done"
                    ? "text-[#2563eb]"
                    : "text-[#64748b]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  step.status === "active"
                    ? "bg-[#2563eb] text-white"
                    : step.status === "done"
                      ? "bg-[#dbeafe] text-[#2563eb]"
                      : "bg-[#e2e8f0]/80 text-[#94a3b8]"
                }`}
              >
                {step.icon}
              </span>
              {step.label}
            </div>
          ))}
        </nav>

        <a
          href="#"
          className="mt-8 inline-block text-sm font-semibold text-[#2563eb] hover:underline lg:mt-12"
        >
          Need help?
        </a>
      </div>
    </aside>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 9.5a2.5 2.5 0 014.5 1.5c0 2-2.5 2-2.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.75" fill="currentColor" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10v6M12 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
