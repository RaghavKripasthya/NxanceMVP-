import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  DonutChartAnimated,
  MarketWatchAnimated,
  PortfolioChartAnimated,
  SentimentProgress,
} from "@/components/dashboard/DashboardCharts";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import RecentActivityPanel from "@/components/dashboard/RecentActivityPanel";

export default function DashboardMain() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <ScrollReveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
              Good morning, Alex
            </h1>
            <p className="mt-1 text-sm text-[#64748b] sm:text-base">
              Your portfolio is up by{" "}
              <span className="font-semibold text-[#2563eb]">1.2%</span> today.
              Nxance AI found 2 new opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-medium text-[#64748b]"
            >
              <CalendarIcon />
              Past 30 Days
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white shadow-sm"
            >
              + Invest Funds
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2" delay={80}>
          <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                  Total Net Worth
                </p>
                <p className="mt-1 text-3xl font-bold text-[#0f172a] sm:text-4xl">
                  $124,500.00
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                  Today&apos;s Gain
                </p>
                <p className="mt-1 flex items-center justify-end gap-1 text-lg font-bold text-[#2563eb]">
                  <TrendIcon />
                  +$1,240.42 (1.2%)
                </p>
              </div>
            </div>
            <div className="mt-6 h-44 sm:h-52">
              <PortfolioChartAnimated />
            </div>
            <div className="mt-2 flex justify-between text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
              {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
              Asset Allocation
            </p>
            <div className="mt-4">
              <DonutChartAnimated />
            </div>
            <div className="mt-4 space-y-2">
              <AllocationRow color="bg-[#2563eb]" label="Stocks" value="58%" />
              <AllocationRow color="bg-[#7c3aed]" label="Mutual Funds" value="28%" />
              <AllocationRow color="bg-[#b45309]" label="Fixed Deposit" value="14%" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ScrollReveal delay={0}>
          <Link href="/dashboard/health-check" className="block h-full">
            <ActionCard
              icon={<ShieldIcon />}
              iconBg="bg-[#dbeafe]"
              iconColor="text-[#2563eb]"
              title="Start Health Check"
              description="Deep scan your portfolio for risks and diversification leaks."
            />
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <ActionCard
            icon={<CompassIcon />}
            iconBg="bg-[#ede9fe]"
            iconColor="text-[#7c3aed]"
            title="Build Portfolio"
            description="Create custom investment plans based on your future goals."
          />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <ActionCard
            icon={<BotIcon />}
            iconBg="bg-[#dbeafe]"
            iconColor="text-[#2563eb]"
            title="Ask Nxance AI"
            description="Get instant answers to 'Should I buy Nvidia today?' and more."
            highlighted
          />
        </ScrollReveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2" delay={60}>
          <RecentActivityPanel />
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={120}>
            <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0f172a]">Market Watch</h2>
                <span className="live-pulse rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2563eb]">
                  Live
                </span>
              </div>
              <MarketWatchAnimated />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] p-5 text-white shadow-md sm:p-6">
              <LightningWatermark />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                AI Sentiment Score
              </p>
              <p className="mt-2 text-4xl font-bold">
                78{" "}
                <span className="text-lg font-medium text-white/70">/ 100</span>
              </p>
              <SentimentProgress score={78} />
              <p className="mt-4 text-sm leading-relaxed text-white/90">
                Market sentiment is strongly &apos;Bullish&apos;. AI suggests holding
                current tech positions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}

function AllocationRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-[#64748b]">{label}</span>
      </div>
      <span className="font-semibold text-[#0f172a]">{value}</span>
    </div>
  );
}

function ActionCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  highlighted,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  const inner = (
    <div className="relative h-full overflow-hidden rounded-2xl bg-white p-5">
      {highlighted ? <BrainWatermark /> : null}
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <h3 className="mt-4 font-bold text-[#0f172a]">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{description}</p>
    </div>
  );

  if (highlighted) {
    return (
      <div className="h-full rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] p-px shadow-sm">
        {inner}
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <h3 className="mt-4 font-bold text-[#0f172a]">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{description}</p>
    </div>
  );
}

function BrainWatermark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-[#2563eb]/10"
      aria-hidden="true"
    >
      <path
        d="M8 5c-2 0-3 1.5-3 3.5S7 12 8 12M16 5c2 0 3 1.5 3 3.5S17 12 16 12M8 12v4M16 12v4M12 8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LightningWatermark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute -right-4 -top-2 h-28 w-28 text-white/10"
      aria-hidden="true"
    >
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 16l5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 9.5L10 14l-1.5-4.5L14.5 9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8V6a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
