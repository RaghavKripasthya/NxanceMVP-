"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import HealthCheckFlowFooter from "@/components/health-check/HealthCheckFlowFooter";

const analysisSteps = [
  { label: "Reading file", status: "done" as const },
  { label: "Matching schemes", status: "active" as const },
  { label: "Checking values", status: "pending" as const },
];

export default function HealthCheckAnalysisMain() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressFrame = requestAnimationFrame(() => setProgress(90));

    const completeTimer = setTimeout(() => setProgress(100), 2800);

    const redirectTimer = setTimeout(() => {
      router.push("/dashboard/health-check/confirm");
    }, 4000);

    return () => {
      cancelAnimationFrame(progressFrame);
      clearTimeout(completeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-1 flex-col px-4 pb-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-6 sm:py-10">
        <ScrollReveal>
          <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e8ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7c3aed]">
                <SparkleIcon />
                AI Analysis in Progress
              </span>
            </div>

            <h1 className="mt-6 text-center text-2xl font-bold text-[#0f172a] sm:text-[1.65rem]">
              Analyzing Your Portfolio
            </h1>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
              Our AI is processing your data to unlock personalized health insights
              and risk mitigation strategies.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {analysisSteps.map((step) => (
                <AnalysisStep key={step.label} label={step.label} status={step.status} />
              ))}
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
              <div
                className="analysis-progress-fill h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/dashboard/health-check"
                className="text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
              >
                Cancel processing
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <HealthCheckFlowFooter />
    </div>
  );
}

function AnalysisStep({
  label,
  status,
}: {
  label: string;
  status: "done" | "active" | "pending";
}) {
  if (status === "done") {
    return (
      <div className="flex flex-col items-center rounded-xl bg-[#eff6ff] px-3 py-5 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] text-white">
          <CheckIcon />
        </span>
        <p className="mt-3 text-sm font-bold text-[#2563eb]">{label}</p>
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="flex flex-col items-center rounded-xl border-2 border-[#2563eb] bg-white px-3 py-5 text-center shadow-sm">
        <span className="flex h-10 w-10 items-center justify-center text-[#2563eb]">
          <SyncIcon />
        </span>
        <p className="mt-3 text-sm font-bold text-[#0f172a]">{label}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-xl border border-[#f1f5f9] bg-white px-3 py-5 text-center opacity-70">
      <span className="flex h-10 w-10 items-center justify-center text-[#cbd5e1]">
        <HourglassIcon />
      </span>
      <p className="mt-3 text-sm font-medium text-[#94a3b8]">{label}</p>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3zM5 16l.8 2.4L8 19l-2.4.8L5 22l-.8-2.2L2 19l2.2-.6L5 16z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="analysis-sync-spin h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 6h4V2M8 18H4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M8 2h8M8 22h8M8 6h8l-2 4 2 4H8l2-4-2-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
