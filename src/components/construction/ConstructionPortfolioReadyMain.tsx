"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ConstructionPageFooter from "@/components/construction/ConstructionPageFooter";

const allocationSegments = [
  { label: "Equity", pct: 65, color: "#2563eb" },
  { label: "Debt", pct: 25, color: "#7c3aed" },
  { label: "Gold/Alts", pct: 10, color: "#a16207" },
];

const previewHoldings = [
  {
    id: "large-cap",
    name: "Equity Large Cap Fund",
    allocation: "24.5%",
    icon: <DollarIcon />,
  },
  {
    id: "mid-cap",
    name: "Strategic Mid-cap Exposure",
    allocation: "18.0%",
    icon: <ChartIcon />,
  },
  {
    id: "liquid-debt",
    name: "Liquid Debt Instrument",
    allocation: "15.0%",
    icon: <BuildingIcon />,
  },
  {
    id: "corp-bond",
    name: "Corporate Bond Fund",
    allocation: "10.0%",
    icon: <PiggyBankIcon />,
  },
];

function useChartVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      setVisible(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(el);

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
    });

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}

export default function ConstructionPortfolioReadyMain() {
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f8f9fc]">
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ScrollReveal>
          <div className="text-center">
            <h1 className="animate-rise-up text-2xl font-bold text-[#0f172a] sm:text-3xl">
              Your Nxance Construction is Ready
            </h1>
            <p
              className="animate-rise-up mt-2 text-sm text-[#64748b] sm:text-base"
              style={{ animationDelay: "0.1s" }}
            >
              We&apos;ve optimized 14 instruments to map exactly to your &apos;Dream Home&apos;
              goal.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal delay={80}>
            <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
              <div className="flex items-center gap-2">
                <span className="construction-sparkle-pulse">
                  <SparkleIcon />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
                  AI Allocation Model
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                <AllocationDonut />
                <AllocationLegend />
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            <ScrollReveal delay={140}>
              <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff] text-[#7c3aed]">
                      <TargetIcon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a]">
                        The odds for this design have been calculated
                      </p>
                      <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
                        Projected Success Probability
                      </p>
                      <SuccessProbabilityBar />
                    </div>
                  </div>
                  <span className="donut-center-pop shrink-0 rounded-full bg-[#eff6ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2563eb]">
                    Goal Feasibility: Optimized
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="rounded-2xl bg-[#0f172a] p-5 shadow-sm transition-transform duration-300 hover:scale-[1.005] sm:p-6">
                <div className="flex items-center gap-2">
                  <LockIcon />
                  <p className="text-base font-bold text-white">Lock in this Plan</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
                  Get the full instrument breakdown, step-by-step execution guide, and automated
                  tracking setup.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/upgrade")}
                  className="construction-cta-shimmer mt-5 w-full rounded-xl bg-[#2563eb] px-4 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Unlock Construction — ₹399
                </button>
                <Link
                  href="/dashboard/construction"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#334155] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#475569]"
                >
                  Change my answers
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={260}>
          <HoldingsBreakdown onUnlock={() => router.push("/dashboard/upgrade")} />
        </ScrollReveal>
      </div>

      <ConstructionPageFooter />
    </div>
  );
}

function AllocationDonut() {
  const { ref, visible } = useChartVisible();

  return (
    <div
      ref={ref}
      className={`relative flex h-44 w-44 items-center justify-center ${visible ? "construction-charts-visible" : ""}`}
    >
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="construction-donut-seg construction-donut-seg-1"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="construction-donut-seg construction-donut-seg-2"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#a16207"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="construction-donut-seg construction-donut-seg-3"
        />
      </svg>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center ${visible ? "donut-center-pop" : "opacity-0"}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
          Total Assets
        </p>
        <p className="mt-0.5 text-xl font-bold text-[#0f172a]">14 Funds</p>
      </div>
    </div>
  );
}

function AllocationLegend() {
  const { ref, visible } = useChartVisible();

  return (
    <div
      ref={ref}
      className={`w-full space-y-3 sm:max-w-[200px] ${visible ? "construction-charts-visible" : ""}`}
    >
      {allocationSegments.map((segment, index) => (
        <LegendRow key={segment.label} segment={segment} index={index} active={visible} />
      ))}
    </div>
  );
}

function LegendRow({
  segment,
  index,
  active,
}: {
  segment: (typeof allocationSegments)[number];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(segment.pct, active, 900 + index * 120);

  return (
    <div
      className="construction-holding-enter flex items-center justify-between gap-3"
      style={{ animationDelay: `${0.5 + index * 0.12}s` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: segment.color }}
        />
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#64748b]">
          {segment.label}
        </span>
      </div>
      <span className="text-sm font-bold text-[#0f172a]">{count}%</span>
    </div>
  );
}

function SuccessProbabilityBar() {
  const { ref, visible } = useChartVisible(0.2);

  return (
    <div ref={ref} className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#e2e8f0]">
      <div
        className={`h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] blur-[2px] ${visible ? "sentiment-progress-fill" : "w-0"}`}
        style={{ ["--sentiment-progress" as string]: "72%" }}
      />
    </div>
  );
}

function HoldingsBreakdown({ onUnlock }: { onUnlock: () => void }) {
  const { ref, visible } = useChartVisible(0.1);

  return (
    <div
      ref={ref}
      className={`mt-4 overflow-hidden rounded-2xl border border-[#e2e8f0]/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${visible ? "construction-charts-visible" : ""}`}
    >
      <div className="flex items-center justify-between border-b border-[#f1f5f9] px-5 py-4 sm:px-6">
        <p className="text-base font-bold text-[#0f172a]">Detailed Instrument Breakdown</p>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
          14 Total Holdings
        </p>
      </div>

      <ul className="divide-y divide-[#f1f5f9]">
        {previewHoldings.map((holding) => (
          <li
            key={holding.id}
            className="construction-holding-enter flex flex-wrap items-center gap-4 px-5 py-4 sm:flex-nowrap sm:px-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#2563eb]">
              {holding.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#0f172a]">{holding.name}</p>
              <p
                className="construction-locked-shimmer mt-1 h-3 w-32 rounded bg-[#f1f5f9] blur-[3px]"
                aria-hidden="true"
              />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
                Allocation
              </p>
              <p className="text-sm font-bold text-[#0f172a]">{holding.allocation}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
                Est. Amount
              </p>
              <p
                className="construction-locked-shimmer mt-1 h-4 w-16 rounded bg-[#f1f5f9] blur-[3px]"
                aria-hidden="true"
              />
            </div>
            <span className="ml-auto flex h-8 w-8 items-center justify-center text-[#cbd5e1] sm:ml-0">
              <SmallLockIcon />
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-[#dbeafe] bg-[#f8faff] px-5 py-3.5 text-center sm:px-6">
        <button
          type="button"
          onClick={onUnlock}
          className="text-sm font-semibold text-[#2563eb] transition-colors hover:underline"
        >
          View 10 More Instruments (Locked)
        </button>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#2563eb]" aria-hidden="true">
      <path d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z" fill="currentColor" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 11V8a4 4 0 118 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmallLockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 11V8a4 4 0 118 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 4v16M9 7.5h4.5a2.5 2.5 0 010 5H9M9 12h5a2.5 2.5 0 010 5H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 18V6M8 18v-6M12 18V9M16 18v-3M20 18v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h2M14 12h2M8 16h2M14 16h2M10 8V5h4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PiggyBankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M6 12a6 6 0 0112 0c0 2.5-1.5 4-3 4h-1l-1 3H10l-1-3H8c-1.5 0-3-1.5-3-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}
