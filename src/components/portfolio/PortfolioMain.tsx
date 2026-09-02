"use client";

import { useEffect, useState, type ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import RecentActivityPanel from "@/components/dashboard/RecentActivityPanel";
import HealthCheckFullReportMain from "@/components/health-check/HealthCheckFullReportMain";
import ConstructionFullReportMain from "@/components/construction/ConstructionFullReportMain";
import { recordPortfolioReportView } from "@/lib/recentActivity";

type ReportView = "health-check" | "construction";

type PortfolioSlice = {
  id: ReportView;
  title: string;
  subtitle: string;
  badge: string;
  invested: number;
  current: number;
  returnPct: number;
  xirr: number;
  accent: string;
  soft: string;
  icon: ReactNode;
  highlights: string[];
};

const healthCheckSlice: PortfolioSlice = {
  id: "health-check",
  title: "Health Check Portfolio",
  subtitle: "Live holdings analysed for risk, leakage & diversification",
  badge: "14 positions",
  invested: 1245000,
  current: 1482450,
  returnPct: 19.07,
  xirr: 14.2,
  accent: "#2563eb",
  soft: "#eff6ff",
  icon: <ShieldIcon />,
  highlights: ["Health score 85", "Diversification Excellent", "Tax leakage flagged"],
};

const constructionSlice: PortfolioSlice = {
  id: "construction",
  title: "Construction Portfolio",
  subtitle: "Goal-mapped blueprint built from your Construction answers",
  badge: "Dream Home",
  invested: 850000,
  current: 912750,
  returnPct: 7.38,
  xirr: 11.4,
  accent: "#7c3aed",
  soft: "#f5f3ff",
  icon: <BlueprintIcon />,
  highlights: ["Equity 65% · Debt 25%", "SIP ₹18,500 / mo", "72% goal probability"],
};

const slices = [healthCheckSlice, constructionSlice];

const combinedInvested = slices.reduce((sum, s) => sum + s.invested, 0);
const combinedCurrent = slices.reduce((sum, s) => sum + s.current, 0);
const combinedReturnPct = ((combinedCurrent - combinedInvested) / combinedInvested) * 100;
const combinedXirr =
  slices.reduce((sum, s) => sum + s.xirr * s.invested, 0) / combinedInvested;

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function readViewFromUrl(): ReportView | null {
  if (typeof window === "undefined") return null;
  const view = new URLSearchParams(window.location.search).get("view");
  if (view === "health-check" || view === "construction") return view;
  return null;
}

function syncViewToUrl(view: ReportView | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (view) url.searchParams.set("view", view);
  else url.searchParams.delete("view");
  window.history.replaceState({}, "", `${url.pathname}${url.search}`);
}

export default function PortfolioMain() {
  const [metricsReady, setMetricsReady] = useState(false);
  const [activeReport, setActiveReport] = useState<ReportView | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setActiveReport(readViewFromUrl());
      setMetricsReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const openReport = (view: ReportView) => {
    setActiveReport(view);
    syncViewToUrl(view);
    recordPortfolioReportView(view);
    requestAnimationFrame(() => {
      const scroller = document.querySelector("main");
      scroller?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const closeReport = () => {
    setActiveReport(null);
    syncViewToUrl(null);
    requestAnimationFrame(() => {
      const scroller = document.querySelector("main");
      scroller?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  if (activeReport) {
    const activityCard = (
      <div
        className={`mx-auto mt-2 mb-6 w-full px-4 sm:px-6 lg:px-8 ${
          activeReport === "health-check" ? "max-w-6xl" : "max-w-7xl"
        }`}
      >
        <ScrollReveal delay={80}>
          <RecentActivityPanel limit={5} />
        </ScrollReveal>
      </div>
    );

    return (
      <div className="portfolio-report-enter flex min-h-full flex-col bg-[#f8f9fc]">
        {activeReport === "health-check" ? (
          <HealthCheckFullReportMain
            showExecute={false}
            onBack={closeReport}
            belowContent={activityCard}
          />
        ) : (
          <ConstructionFullReportMain
            showExecute={false}
            onBack={closeReport}
            belowContent={activityCard}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-[#f8f9fc]">
      <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <ScrollReveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">
                Unified Holdings View
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#0f172a] sm:text-3xl">
                Portfolio
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748b]">
                Combined performance from your Health Check holdings and Construction
                blueprint — open either card for the full detailed report.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dbeafe] bg-[#eff6ff] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              <span className="live-pulse h-2 w-2 rounded-full bg-[#2563eb]" />
              Live calculation
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div
            className={`portfolio-metrics-panel rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6 ${
              metricsReady ? "portfolio-metrics-visible" : ""
            }`}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                  Combined Snapshot
                </p>
                <p className="mt-1 text-sm text-[#64748b]">
                  Health Check + Construction, weighted XIRR
                </p>
              </div>
              <p className="text-xs font-medium text-[#94a3b8]">
                Absolute gain{" "}
                <span className="font-bold text-[#16a34a]">
                  {formatInr(combinedCurrent - combinedInvested)}
                </span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricTile
                label="Current Value"
                value={formatInr(combinedCurrent)}
                hint="Mark-to-market"
                delay={0}
              />
              <MetricTile
                label="Invested Amount"
                value={formatInr(combinedInvested)}
                hint="Capital deployed"
                delay={1}
              />
              <MetricTile
                label="Return"
                value={formatPct(combinedReturnPct)}
                hint="Absolute"
                tone="positive"
                delay={2}
              />
              <MetricTile
                label="XIRR"
                value={`${combinedXirr.toFixed(1)}%`}
                hint="Annualised"
                tone="accent"
                delay={3}
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[#0f172a]">Your Portfolios</h2>
            <p className="text-xs font-medium text-[#94a3b8]">
              Tap a card to open full report here
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {slices.map((slice, index) => (
            <ScrollReveal key={slice.id} delay={180 + index * 100}>
              <PortfolioCard slice={slice} onOpen={() => openReport(slice.id)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}

function MetricTile({
  label,
  value,
  hint,
  tone = "default",
  delay,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "positive" | "accent";
  delay: number;
}) {
  const valueColor =
    tone === "positive"
      ? "text-[#16a34a]"
      : tone === "accent"
        ? "text-[#2563eb]"
        : "text-[#0f172a]";

  return (
    <div
      className="portfolio-metric-tile rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-4"
      style={{ animationDelay: `${0.12 + delay * 0.08}s` }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
        {label}
      </p>
      <p className={`mt-2 text-xl font-bold sm:text-2xl ${valueColor}`}>{value}</p>
      <p className="mt-1 text-[11px] text-[#94a3b8]">{hint}</p>
    </div>
  );
}

function PortfolioCard({
  slice,
  onOpen,
}: {
  slice: PortfolioSlice;
  onOpen: () => void;
}) {
  const gain = slice.current - slice.invested;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-md sm:p-6"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-90 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${slice.accent}, transparent 85%)`,
        }}
      />
      <div className="portfolio-card-shimmer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: slice.soft, color: slice.accent }}
          >
            {slice.icon}
          </span>
          <div>
            <p className="text-base font-bold text-[#0f172a] sm:text-lg">{slice.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#64748b]">{slice.subtitle}</p>
          </div>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ backgroundColor: slice.soft, color: slice.accent }}
        >
          {slice.badge}
        </span>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <MiniStat label="Current" value={formatInr(slice.current)} />
        <MiniStat label="Invested" value={formatInr(slice.invested)} />
        <MiniStat label="Return" value={formatPct(slice.returnPct)} tone="positive" />
        <MiniStat label="XIRR" value={`${slice.xirr.toFixed(1)}%`} tone="accent" />
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {slice.highlights.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[11px] font-medium text-[#64748b]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-[#f1f5f9] pt-4">
        <p className="text-xs text-[#94a3b8]">
          Gain{" "}
          <span className="font-semibold text-[#16a34a]">{formatInr(gain)}</span>
        </p>
        <span
          className="inline-flex items-center gap-1.5 text-sm font-bold transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ color: slice.accent }}
        >
          View full report
          <ArrowIcon />
        </span>
      </div>
    </button>
  );
}

function MiniStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "accent";
}) {
  const valueColor =
    tone === "positive"
      ? "text-[#16a34a]"
      : tone === "accent"
        ? "text-[#2563eb]"
        : "text-[#0f172a]";

  return (
    <div className="rounded-xl bg-[#f8fafc] px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
        {label}
      </p>
      <p className={`mt-1 text-sm font-bold sm:text-[15px] ${valueColor}`}>{value}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
