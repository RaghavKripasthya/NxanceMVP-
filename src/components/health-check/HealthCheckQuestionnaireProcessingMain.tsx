"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

type CheckStatus = "pending" | "active" | "done";

type CheckItem = {
  id: string;
  label: string;
};

const checkItems: CheckItem[] = [
  { id: "extraction", label: "Portfolio data extraction complete" },
  { id: "volatility", label: "Historical volatility data synced" },
  { id: "redirecting", label: "All checks complete. Redirecting..." },
  { id: "diversification", label: "Generating final diversification score" },
];

const PROCESSING_DURATION_MS = 6000;
const ESTIMATED_SECONDS = 8;

export default function HealthCheckQuestionnaireProcessingMain() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Analysing portfolio...");
  const [secondsLeft, setSecondsLeft] = useState(ESTIMATED_SECONDS);
  const [checkStatuses, setCheckStatuses] = useState<CheckStatus[]>(
    checkItems.map((_, index) => (index === 0 ? "active" : "pending")),
  );

  useEffect(() => {
    const progressTimer = window.setTimeout(() => setProgress(100), 120);
    const readyTimer = window.setTimeout(() => setStatusLabel("Report Ready!"), 4800);

    const statusTimers = [
      window.setTimeout(
        () => setCheckStatuses(["done", "active", "pending", "pending"]),
        1600,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "active", "pending"]),
        3200,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "done", "active"]),
        4800,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "done", "done"]),
        5400,
      ),
    ];

    const countdown = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      router.push("/dashboard/reports/unlock");
    }, PROCESSING_DURATION_MS);

    return () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(readyTimer);
      statusTimers.forEach(window.clearTimeout);
      window.clearInterval(countdown);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-1 flex-col px-4 pb-6 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-8 sm:py-12">
        <ScrollReveal>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-sm">
              <ChartPulseIcon />
            </div>
            <h1 className="mt-5 text-xl font-semibold text-[#334155] sm:text-[1.35rem]">
              Your portfolio is being analysed...
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#94a3b8]">
              Nxance AI is currently parsing your holdings and calculating risk-adjusted
              macro scores.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
              Status
            </p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-lg font-bold text-[#0f172a]">{statusLabel}</p>
              <p className="text-lg font-bold text-[#2563eb]">{progress}%</p>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#e2e8f0]">
              <div
                className="analysis-progress-fill h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 rounded-xl bg-[#f8fafc] p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3">
                  <div className="h-16 rounded-lg bg-[#e2e8f0]/70" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded-md bg-[#e2e8f0]/60" />
                    <div className="h-10 rounded-md bg-[#e2e8f0]/60" />
                    <div className="h-10 rounded-md bg-[#e2e8f0]/60" />
                  </div>
                  <div className="h-8 rounded-md bg-[#e2e8f0]/50" />
                </div>
                <div className="flex min-h-[140px] items-center justify-center rounded-lg bg-[#eef2ff]/80">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#dbeafe] bg-white text-[#93c5fd]">
                    <SkeletonSpinnerIcon />
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-8 rounded-md bg-[#e2e8f0]/50" />
                <div className="h-8 rounded-md bg-[#e2e8f0]/50" />
                <div className="h-8 rounded-md bg-[#e2e8f0]/50" />
              </div>
            </div>

            <ul className="mt-6 space-y-3 border-t border-[#f1f5f9] pt-5">
              {checkItems.map((item, index) => (
                <ChecklistRow
                  key={item.id}
                  label={item.label}
                  status={checkStatuses[index] ?? "pending"}
                />
              ))}
            </ul>
          </div>

          <p className="mt-5 text-center text-sm italic text-[#94a3b8]">
            Estimated time remaining: {secondsLeft}s
          </p>
        </ScrollReveal>
      </div>

      <ProcessingFooter />
    </div>
  );
}

function ChecklistRow({ label, status }: { label: string; status: CheckStatus }) {
  const isActive = status === "active";
  const isDone = status === "done";

  return (
    <li className="flex items-center gap-3">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isDone
            ? "bg-[#dcfce7] text-[#16a34a]"
            : isActive
              ? "bg-[#dbeafe] text-[#2563eb]"
              : "bg-[#f1f5f9] text-[#cbd5e1]"
        }`}
      >
        {isDone ? (
          <CheckIcon />
        ) : isActive ? (
          <SpinnerIcon />
        ) : (
          <PendingDotsIcon />
        )}
      </span>
      <p
        className={`text-sm ${
          isActive
            ? "font-semibold text-[#2563eb]"
            : isDone
              ? "text-[#64748b]"
              : "text-[#cbd5e1]"
        }`}
      >
        {label}
      </p>
    </li>
  );
}

function ProcessingFooter() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-5xl border-t border-[#e2e8f0] pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#64748b] sm:text-sm">
          <span className="font-bold text-[#2563eb]">Nxance</span> © 2024. SEBI Registered
          Investment Advisor.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-medium text-[#2563eb] sm:text-sm">
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Compliance
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

function ChartPulseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 16l4-6 4 4 4-8 4 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkeletonSpinnerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="analysis-sync-spin h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M5 12l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="analysis-sync-spin h-3.5 w-3.5" aria-hidden="true">
      <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PendingDotsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
