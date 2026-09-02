"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ConstructionPageFooter from "@/components/construction/ConstructionPageFooter";

export const CONSTRUCTION_UNLOCK_STORAGE_KEY = "nxance-construction-unlocked";

export function markConstructionUnlocked() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONSTRUCTION_UNLOCK_STORAGE_KEY, "true");
  }
}

export function isConstructionUnlocked() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSTRUCTION_UNLOCK_STORAGE_KEY) === "true";
}

const allocationSegments = [
  { label: "Equity", pct: 65, color: "#2563eb" },
  { label: "Debt / Fixed Income", pct: 25, color: "#7c3aed" },
  { label: "Gold & Alternatives", pct: 10, color: "#d97706" },
];

type HoldingItem = {
  id: string;
  name: string;
  subtitle?: string;
  amount: string;
  units?: string;
};

type HoldingColumn = {
  id: string;
  title: string;
  dotColor: string;
  items: HoldingItem[];
};

const holdingColumns: HoldingColumn[] = [
  {
    id: "mutual-fund",
    title: "Mutual Fund",
    dotColor: "#2563eb",
    items: [
      {
        id: "uti-nifty",
        name: "UTI Nifty 50 Index Fund",
        subtitle: "Direct Growth",
        amount: "₹6,475.00",
        units: "142.76",
      },
      {
        id: "ppfc",
        name: "Parag Parikh Flexi Cap",
        subtitle: "Direct Growth",
        amount: "₹4,625.00",
        units: "78.12",
      },
      {
        id: "icici-bond",
        name: "ICICI Prudential All Seasons Bond",
        subtitle: "Debt Fund",
        amount: "₹5,550.00",
        units: "214.90",
      },
    ],
  },
  {
    id: "equity",
    title: "Equity",
    dotColor: "#2563eb",
    items: [
      { id: "reliance", name: "Reliance Industries", amount: "₹12,400.00" },
      { id: "hdfc-bank", name: "HDFC Bank", amount: "₹8,250.00" },
      { id: "infosys", name: "Infosys", amount: "₹6,800.00" },
      { id: "tcs", name: "Tata Consultancy Services", amount: "₹5,950.00" },
    ],
  },
  {
    id: "debt-bonds",
    title: "Debt / Bonds",
    dotColor: "#7c3aed",
    items: [
      { id: "rbi-bond", name: "RBI Floating Rate Bond", amount: "₹4,200.00" },
      { id: "hdfc-corp", name: "HDFC Corp Bond — Series VII", amount: "₹3,750.00" },
      { id: "govt-sec", name: "7.18% GOI Sovereign Bond", amount: "₹3,100.00" },
    ],
  },
  {
    id: "gold",
    title: "Gold",
    dotColor: "#d97706",
    items: [
      { id: "sgb", name: "Sovereign Gold Bond (Series IV)", amount: "₹2,800.00" },
      { id: "gold-etf", name: "Nippon India Gold ETF", amount: "₹1,950.00" },
    ],
  },
  {
    id: "fd-cash",
    title: "FD / Cash",
    dotColor: "#16a34a",
    items: [
      { id: "hdfc-fd", name: "HDFC Bank FD — 12M", amount: "₹2,500.00" },
      { id: "icici-fd", name: "ICICI Prudential Liquid Fund", amount: "₹1,800.00" },
      { id: "cash-reserve", name: "Emergency Cash Reserve", amount: "₹1,200.00" },
    ],
  },
];

function columnTotal(items: HoldingItem[]) {
  const total = items.reduce((sum, item) => {
    const numeric = Number(item.amount.replace(/[₹,]/g, ""));
    return sum + (Number.isFinite(numeric) ? numeric : 0);
  }, 0);
  return `₹${total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const monteCarloBars = [18, 28, 42, 58, 72, 88, 100, 88, 72, 58, 42, 28, 18];

const conclusionSteps = [
  {
    step: 1,
    title: "The Goal",
    description: "Build ₹4.2 Cr corpus in 12 years with moderate risk.",
  },
  {
    step: 2,
    title: "Considered",
    description: "Analyzed 2,400+ funds, macro indicators, and tax efficiency.",
  },
  {
    step: 3,
    title: "Why This Not That",
    description: "Rejected Mid-Cap heavy approach due to current valuation peaks.",
  },
  {
    step: 4,
    title: "Risk Check",
    description: "Recession stress-test: Max 18-month recovery period expected.",
  },
];

function useChartVisible(threshold = 0.12) {
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
      { threshold, rootMargin: "0px 0px -24px 0px" },
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

export default function ConstructionFullReportMain({
  showExecute = true,
  onBack,
  belowContent,
}: {
  showExecute?: boolean;
  onBack?: () => void;
  belowContent?: ReactNode;
} = {}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f8f9fc]">
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ScrollReveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
                Your Nxance Portfolio Report
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b] sm:text-[15px]">
                This is an optimized, mathematically validated plan engineered for your 12-year
                wealth accumulation goal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] shadow-sm transition-colors hover:border-[#cbd5e1] hover:text-[#0f172a]"
                >
                  <BackIcon />
                  Back to Portfolio
                </button>
              ) : null}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] shadow-sm transition-colors hover:border-[#cbd5e1]"
              >
                <DownloadIcon />
                Download PDF
              </button>
              {showExecute ? (
                <Link
                  href="/dashboard/portfolio"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-2.5 text-sm font-semibold text-[#2563eb] transition-colors hover:border-[#93c5fd] hover:bg-[#dbeafe]"
                >
                  <ExecuteIcon />
                  Execute
                </Link>
              ) : null}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          <ScrollReveal delay={80}>
            <StrategicAllocationCard />
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <MonthlySipCard />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <HoldingsTable />
        </ScrollReveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <ScrollReveal delay={240}>
            <DiversificationProofCard />
          </ScrollReveal>
          <ScrollReveal delay={280}>
            <MonteCarloProjectionCard />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={320}>
          <ConclusionTimelineCard />
        </ScrollReveal>

        <ScrollReveal delay={360}>
          <NeutralExecutionBanner />
        </ScrollReveal>
      </div>

      {belowContent}

      <ConstructionPageFooter />

      <button
        type="button"
        className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Open Nxance assistant"
      >
        <AssistantIcon />
      </button>
    </div>
  );
}

function StrategicAllocationCard() {
  const { ref, visible } = useChartVisible();

  return (
    <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a]">Strategic Asset Allocation</h2>
          <p className="mt-1 text-sm text-[#64748b]">Optimized for 14.2% Expected IRR</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:underline"
        >
          <ChatIcon />
          Explain this
        </button>
      </div>

      <div
        ref={ref}
        className={`mt-6 grid gap-6 lg:grid-cols-[auto_1fr_1fr] lg:items-center ${visible ? "construction-charts-visible" : ""}`}
      >
        <AllocationDonut visible={visible} />

        <div className="space-y-3">
          {allocationSegments.map((segment, index) => (
            <div
              key={segment.label}
              className="construction-holding-enter flex items-center justify-between gap-3"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-[#475569]">{segment.label}</span>
              </div>
              <span className="text-sm font-bold text-[#0f172a]">{segment.pct}%</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[#dbeafe] bg-[#f8faff] p-4 lg:max-w-[220px]">
          <p className="text-sm font-bold text-[#0f172a]">Why this split?</p>
          <p className="mt-2 text-xs leading-relaxed text-[#64748b]">
            Based on your risk capacity and 12-year horizon, we&apos;ve capped equity drawdown
            exposure while maintaining growth velocity.
          </p>
        </div>
      </div>
    </div>
  );
}

function AllocationDonut({ visible }: { visible: boolean }) {
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center sm:mx-0">
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
          stroke="#d97706"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="construction-donut-seg construction-donut-seg-3"
        />
      </svg>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center ${visible ? "donut-center-pop" : "opacity-0"}`}
      >
        <p className="text-2xl font-bold text-[#0f172a]">65%</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
          Equity
        </p>
      </div>
    </div>
  );
}

function MonthlySipCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-white p-[1px] shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6366f1] to-[#2563eb] opacity-90" />
      <div className="relative flex h-full flex-col rounded-[15px] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="construction-sparkle-pulse text-[#7c3aed]">
            <SparkleIcon />
          </span>
          <p className="text-sm font-bold text-[#0f172a]">Monthly SIP Plan</p>
        </div>

        <p className="mt-5 text-sm text-[#64748b]">Recommended Investment</p>
        <p className="mt-1 text-3xl font-bold text-[#2563eb]">₹18,500</p>
        <p className="mt-2 text-sm text-[#64748b]">Execution Date: 5th of every month</p>

        <button
          type="button"
          className="construction-cta-shimmer mt-6 w-full rounded-xl bg-[#2563eb] px-4 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
        >
          Start SIP in Broker
        </button>
        <p className="mt-3 text-center text-xs text-[#94a3b8]">
          External execution recommended via Zerodha or Groww
        </p>
      </div>
    </div>
  );
}

function HoldingsTable() {
  const { ref, visible } = useChartVisible(0.08);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const activeColumn = holdingColumns.find((column) => column.id === selectedCategoryId);

  return (
    <div
      ref={ref}
      className={`mt-4 overflow-hidden rounded-2xl border border-[#e2e8f0]/80 bg-white shadow-sm ${visible ? "construction-charts-visible" : ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] px-5 py-4 sm:px-6">
        <div>
          <p className="text-base font-bold text-[#0f172a]">Portfolio Holdings</p>
          <p className="mt-0.5 text-xs text-[#94a3b8]">
            Select an asset class to view holdings
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16a34a]">
          <span className="live-pulse h-2 w-2 rounded-full bg-[#16a34a]" />
          Active Market
        </span>
      </div>

      <div className="border-b border-[#f1f5f9] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Asset class filters">
          {holdingColumns.map((column) => {
            const isActive = selectedCategoryId === column.id;
            return (
              <button
                key={column.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategoryId(column.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "border-[#2563eb] bg-[#2563eb] text-white shadow-sm"
                    : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#cbd5e1] hover:text-[#0f172a]"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isActive ? "#fff" : column.dotColor }}
                />
                {column.title}
              </button>
            );
          })}
        </div>
      </div>

      {activeColumn ? (
        <div key={activeColumn.id} className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#0f172a]">
              {activeColumn.title}{" "}
              <span className="font-normal text-[#64748b]">
                ({activeColumn.items.length}{" "}
                {activeColumn.items.length === 1 ? "holding" : "holdings"})
              </span>
            </p>
            <p className="text-sm font-bold text-[#2563eb]">
              Total: {columnTotal(activeColumn.items)}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]/80">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="bg-[#f8fafc] text-[11px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
                  <th className="px-5 py-3">Company / Instrument</th>
                  <th className="px-4 py-3">Investment Amount</th>
                  {activeColumn.id === "mutual-fund" ? (
                    <th className="px-4 py-3">Units</th>
                  ) : null}
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {activeColumn.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="construction-holding-enter bg-white transition-colors hover:bg-[#fafbfd]"
                    style={{ animationDelay: `${0.06 + index * 0.08}s` }}
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#0f172a]">{item.name}</p>
                      {item.subtitle ? (
                        <p className="mt-0.5 text-xs text-[#94a3b8]">{item.subtitle}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[#0f172a]">
                      {item.amount}
                    </td>
                    {activeColumn.id === "mutual-fund" ? (
                      <td className="px-4 py-4 text-sm font-semibold text-[#0f172a]">
                        {item.units ?? "—"}
                      </td>
                    ) : null}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="text-sm font-semibold text-[#2563eb] hover:underline"
                      >
                        Why this asset?
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <p className="text-sm font-semibold text-[#475569]">No category selected</p>
          <p className="mt-1 max-w-sm text-sm text-[#94a3b8]">
            Tap Mutual Fund, Equity, Debt / Bonds, Gold, or FD / Cash above to view investments
            in that class.
          </p>
        </div>
      )}
    </div>
  );
}

function DiversificationProofCard() {
  return (
    <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-[#0f172a]">Diversification Proof</h2>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#dcfce7] text-[#16a34a]">
            <ShieldCheckIcon />
          </div>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#16a34a]">
            Optimal
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#0f172a]">
            Verified: No secret overlaps across holdings.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
            Portfolio overlap score is 0.12, indicating true diversification. Gains in one sector
            won&apos;t be wiped out by concentrated risks in another.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#f5f3ff] px-3 py-1.5 text-xs font-semibold text-[#7c3aed]">
          Avg Correlation: 0.45
        </span>
        <span className="rounded-full bg-[#f5f3ff] px-3 py-1.5 text-xs font-semibold text-[#7c3aed]">
          Beta: 0.82
        </span>
      </div>
    </div>
  );
}

function MonteCarloProjectionCard() {
  const { ref, visible } = useChartVisible(0.1);

  return (
    <div
      ref={ref}
      className={`h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6 ${visible ? "construction-charts-visible" : ""}`}
    >
      <h2 className="text-lg font-bold text-[#0f172a]">Monte Carlo Projection</h2>

      <div className="relative mt-6">
        <div className="flex h-32 items-end justify-between gap-1 px-1">
          {monteCarloBars.map((height, index) => (
            <div
              key={index}
              className="construction-holding-enter flex-1 rounded-t-sm bg-gradient-to-t from-[#2563eb] to-[#60a5fa] transition-all"
              style={{
                height: visible ? `${height}%` : "0%",
                opacity: height >= 88 ? 1 : 0.35 + height / 200,
                animationDelay: `${0.05 + index * 0.04}s`,
                transitionDelay: `${index * 40}ms`,
              }}
            />
          ))}
        </div>
        <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-lg border border-[#dbeafe] bg-white px-2.5 py-1 text-[10px] font-bold text-[#2563eb] shadow-sm">
          72% Probability of Success
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#dbeafe] bg-[#f8faff] px-4 py-3.5 text-sm leading-relaxed text-[#475569]">
        <span className="font-semibold text-[#0f172a]">Next Step:</span> Increase SIP to ₹24k →{" "}
        <span className="font-bold text-[#2563eb]">88% probability</span> of meeting your target
        goal.
      </div>
    </div>
  );
}

function ConclusionTimelineCard() {
  return (
    <div className="mt-6 rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-[#0f172a]">How We Reached This Conclusion</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {conclusionSteps.map((item, index) => (
          <div key={item.step} className="relative">
            {index < conclusionSteps.length - 1 ? (
              <span
                className="absolute left-5 top-5 hidden h-px w-[calc(100%+1rem)] bg-[#e2e8f0] lg:block"
                aria-hidden="true"
              />
            ) : null}
            <div className="relative flex flex-col items-start">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  item.step === 1
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "bg-[#f1f5f9] text-[#94a3b8]"
                }`}
              >
                {item.step}
              </span>
              <p className="mt-3 text-sm font-bold text-[#0f172a]">{item.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#64748b]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeutralExecutionBanner() {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#0f172a] p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#334155] text-white">
          <ShieldOutlineIcon />
        </span>
        <div>
          <p className="text-base font-bold text-white sm:text-lg">
            Execute elsewhere. We stay neutral.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94a3b8]">
            Execute this plan yourself with your own broker. Nxance never touches your money and
            accepts no commissions.
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right text-xs text-[#64748b] sm:text-sm">
        <p>Report ID: S19-BETA-2024</p>
        <p className="mt-0.5">v2.4 Engine</p>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 4v10M8 11l4 4 4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExecuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 6a3 3 0 013-3h8a3 3 0 013 3v6a3 3 0 01-3 3h-5l-4 3v-3H8a3 3 0 01-3-3V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z" fill="currentColor" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AssistantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="5" y="8" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.5" cy="13" r="1" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
      <path d="M12 5V8M9 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
