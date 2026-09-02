"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import ConstructionPageFooter from "@/components/construction/ConstructionPageFooter";

type CheckStatus = "pending" | "active" | "done";

const checkItems = [
  { id: "intake", label: "Investor intake & goal analysis complete" },
  { id: "blueprint", label: "Macro-param class-wise blueprint generated" },
  { id: "fit", label: "Running 16-layer FIT instrument selection..." },
  { id: "risk", label: "Cross-correlation & risk modeling" },
  { id: "monte-carlo", label: "Monte Carlo forecasting & tax optimization" },
  { id: "backtest", label: "Backtest validation & MVO weight adjustment" },
];

const PROCESSING_DURATION_MS = 8000;

export default function ConstructionProcessingMain() {
  const router = useRouter();
  const [progress, setProgress] = useState(12);
  const [checkStatuses, setCheckStatuses] = useState<CheckStatus[]>(
    checkItems.map((_, index) => (index === 0 ? "active" : "pending")),
  );
  const [showFinalizing, setShowFinalizing] = useState(false);

  useEffect(() => {
    const progressKeyframes = [
      window.setTimeout(() => setProgress(28), 800),
      window.setTimeout(() => setProgress(45), 1800),
      window.setTimeout(() => setProgress(62), 2800),
      window.setTimeout(() => setProgress(85), 4000),
      window.setTimeout(() => setProgress(94), 6200),
      window.setTimeout(() => setProgress(100), 7400),
    ];

    const statusKeyframes = [
      window.setTimeout(
        () => setCheckStatuses(["done", "active", "pending", "pending", "pending", "pending"]),
        1400,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "active", "pending", "pending", "pending"]),
        2800,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "done", "active", "pending", "pending"]),
        4200,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "done", "done", "active", "pending"]),
        5600,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "done", "done", "done", "active"]),
        6800,
      ),
      window.setTimeout(
        () => setCheckStatuses(["done", "done", "done", "done", "done", "done"]),
        7600,
      ),
    ];

    const finalizingTimer = window.setTimeout(() => setShowFinalizing(true), 5200);

    const redirectTimer = window.setTimeout(() => {
      router.push("/dashboard/construction/ready");
    }, PROCESSING_DURATION_MS);

    return () => {
      progressKeyframes.forEach(window.clearTimeout);
      statusKeyframes.forEach(window.clearTimeout);
      window.clearTimeout(finalizingTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f8f9fc]">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14">
        <ScrollReveal>
          <div className="text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2563eb]">
              <NetworkNodesIcon />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-[#0f172a] sm:text-[1.65rem]">
              Your Nxance construction is being built...
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
              Nxance AI is currently running an 8-step optimization pipeline to map your goals to
              the ideal investment instruments.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#e2e8f0]/80 bg-white shadow-sm">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
                  Optimization progress
                </p>
                <p className="text-sm font-bold text-[#2563eb]">{progress}%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className="analysis-progress-fill h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <ul className="mt-6 space-y-3.5">
                {checkItems.map((item, index) => (
                  <ChecklistRow
                    key={item.id}
                    label={item.label}
                    status={checkStatuses[index] ?? "pending"}
                  />
                ))}
              </ul>
            </div>

            {showFinalizing ? (
              <div className="border-t border-[#dbeafe] bg-[#eff6ff] px-5 py-3.5 text-center sm:px-6">
                <p className="text-sm font-medium text-[#2563eb]">Finalizing your blueprint...</p>
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
              Previewing allocation blueprint
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="h-24 rounded-xl border border-[#e2e8f0]/80 bg-white/70 shadow-sm sm:h-28"
                >
                  <div className="flex h-full flex-col justify-center gap-2 px-3 py-4">
                    <div className="h-2.5 w-3/4 rounded-full bg-[#e2e8f0]/80" />
                    <div className="h-2 w-1/2 rounded-full bg-[#f1f5f9]" />
                    <div className="mt-1 h-8 rounded-lg bg-[#f8fafc]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ConstructionPageFooter />
    </div>
  );
}

function ChecklistRow({ label, status }: { label: string; status: CheckStatus }) {
  const isActive = status === "active";
  const isDone = status === "done";

  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
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
          <PendingDotIcon />
        )}
      </span>
      <p
        className={`text-sm leading-snug ${
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

function NetworkNodesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.3 11.2L15.2 7.2M8.3 12.8l6.9 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
      <path
        d="M5 12l3 3 11-11"
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
    <svg viewBox="0 0 24 24" fill="none" className="analysis-sync-spin h-3 w-3" aria-hidden="true">
      <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PendingDotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
