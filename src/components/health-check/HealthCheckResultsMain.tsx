"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import HealthCheckResultsFooter from "@/components/health-check/HealthCheckResultsFooter";

const complianceChecks = [
  "Scheme Authenticity",
  "AMC Regulatory Status",
  "NAV Drift Check",
] as const;

const deepDivePlaceholders = [
  "Asset Alignment Score",
  "Tax Optimization Potential",
  "Risk Exposure Map",
  "Goal Readiness Index",
] as const;

export default function HealthCheckResultsMain() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-5 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                  <TargetIcon />
                  Base Portfolio Quality
                </span>
              </div>
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <HealthScoreGauge score={72} grade="Grade B" />
                <div>
                  <h2 className="text-xl font-bold text-[#0f172a] sm:text-2xl">
                    Your initial health score.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
                    This score evaluates the technical quality of your current holdings
                    based on asset quality, expense ratios, and volatility patterns
                    detected in your uploaded statement.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
                    <span className="font-semibold text-[#2563eb]">Note:</span> This is a
                    technical score only. Complete the questionnaire to unlock
                    goal-aligned insights.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
                    <ShieldIcon />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-[#0f172a]">Fraud &amp; Compliance</h2>
                    <p className="mt-0.5 text-sm text-[#64748b]">
                      7 deep-scan checks performed on your holdings.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#16a34a]">
                  All Checks Passed
                </span>
              </div>
              <div className="mt-5 space-y-2.5">
                {complianceChecks.map((check) => (
                  <div
                    key={check}
                    className="flex items-center justify-between rounded-xl border border-[#f1f5f9] bg-[#fafbfd] px-4 py-3"
                  >
                    <span className="text-sm font-medium text-[#0f172a]">{check}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                      <CheckIcon />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
          <ScrollReveal delay={120} className="lg:col-span-1">
            <div className="h-full rounded-2xl border-2 border-[#7c3aed]/40 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <SparkleIcon />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
                  Smart Insight
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-[#0f172a]">Concentration Alert</h2>
              <p className="mt-3 text-sm italic leading-relaxed text-[#64748b]">
                &ldquo;4 of your 6 funds are 0.9 correlated. Your portfolio may look
                diversified, but it behaves like a single large-cap equity bet.&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-[#f1f5f9] pt-4">
                <span className="text-xs text-[#94a3b8]">AI Engine v4.2</span>
                <a href="#" className="text-sm font-semibold text-[#2563eb] hover:underline">
                  Fix this →
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160} className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-[#0f172a]">
                  Upcoming Deep-Dive Analysis
                </h2>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                  <LockIcon />
                  Unlocked via questionnaire
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {deepDivePlaceholders.map((label) => (
                  <div
                    key={label}
                    className="relative overflow-hidden rounded-xl bg-[#f1f5f9] px-4 py-8"
                  >
                    <div className="absolute inset-0 backdrop-blur-[2px]" aria-hidden="true" />
                    <p className="relative text-sm font-medium text-[#94a3b8] blur-[2px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col gap-6 rounded-2xl border border-[#dbeafe]/80 bg-[#f8faff] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                  <BrainIcon />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f172a] sm:text-2xl">
                    Now tell us what this money is for.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
                    A portfolio isn&apos;t just a collection of assets—it serves a specific
                    purpose. Answer a few questions so Nxance AI can align your holdings
                    with your real financial goals.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:min-w-[200px]">
                <Link
                  href="/dashboard/health-check/questionnaire"
                  className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
                >
                  Answer questions
                </Link>
                <button
                  type="button"
                  className="rounded-xl border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#64748b] hover:border-[#cbd5e1]"
                >
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <HealthCheckResultsFooter />
    </div>
  );
}

function HealthScoreGauge({ score, grade }: { score: number; grade: string }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36 shrink-0 sm:mx-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#2563eb"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="health-score-ring transition-all duration-[1.8s] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-[#0f172a]">{score}</span>
        <span className="text-sm font-medium text-[#64748b]">{grade}</span>
      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#7c3aed]" aria-hidden="true">
      <path d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z" fill="currentColor" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10h.01M15 10h.01M9.5 15a3 3 0 015 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 6v2M8 8c0-1 .5-2 2-2M16 8c0-1-.5-2-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
