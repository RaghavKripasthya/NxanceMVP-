"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Logo from "@/components/Logo";

const UNLOCK_STORAGE_KEY = "nxance-report-unlocked";

export function markReportUnlocked() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
  }
}

export default function HealthCheckFullReportMain({
  showExecute = true,
  onBack,
  belowContent,
}: {
  showExecute?: boolean;
  onBack?: () => void;
  belowContent?: ReactNode;
} = {}) {
  return (
    <div className="flex flex-1 flex-col bg-[#f8f9fc]">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <ScrollReveal>
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">
                Analysis Complete
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#0f172a] sm:text-3xl">
                Portfolio Health Result
              </h1>
              <p className="mt-2 text-sm text-[#64748b]">
                Last updated: Oct 24, 2024 • Based on 14 active positions
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
                className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] shadow-sm hover:border-[#cbd5e1]"
              >
                <DownloadIcon />
                Download Report
              </button>
              {showExecute ? (
                <Link
                  href="/dashboard/portfolio"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-2.5 text-sm font-semibold text-[#2563eb] shadow-sm transition-colors hover:border-[#93c5fd] hover:bg-[#dbeafe]"
                >
                  <ExecuteIcon />
                  Execute
                </Link>
              ) : null}
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[1.1fr_1fr]">
          <ScrollReveal delay={60}>
            <div className="relative h-full rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                Overall Health Score
              </p>
              <div className="mt-4 flex flex-col items-center">
                <HealthScoreDonut score={85} max={100} />
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#16a34a]">
                  <SparkIcon />
                  Stable &amp; Healthy
                </span>
                <p className="mt-4 max-w-xs text-center text-sm leading-relaxed text-[#64748b]">
                  Your portfolio is outperforming 78% of retail investors with similar risk
                  profiles.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={100}>
              <MetricCard
                icon={<ChartUpIcon />}
                iconBg="bg-[#dbeafe]"
                iconColor="text-[#2563eb]"
                badge="+12%"
                badgeColor="text-[#16a34a]"
                label="Diversification"
                value="Excellent"
                progress={88}
                progressColor="bg-[#2563eb]"
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <MetricCard
                icon={<WarningIcon />}
                iconBg="bg-[#fef3c7]"
                iconColor="text-[#d97706]"
                badge="Moderate"
                badgeIcon={<HeartIcon />}
                badgeColor="text-[#d97706]"
                label="Risk Profile"
                value="Aggressive Growth"
                segments={5}
                segmentFilled={4}
              />
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <MetricCard
                icon={<ShieldCheckIcon />}
                iconBg="bg-[#dcfce7]"
                iconColor="text-[#16a34a]"
                badge="Verified"
                badgeColor="text-[#16a34a]"
                label="Fraud Status"
                value="No Threats Found"
                footer="All 14 entities are SEBI registered."
              />
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ede9fe] text-[#7c3aed]">
                    <RupeeIcon />
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium text-[#94a3b8]">Annualized Yield</p>
                <p className="mt-1 text-2xl font-bold text-[#0f172a]">18.4%</p>
                <div className="mt-4 flex items-center gap-1">
                  <AvatarStack />
                  <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f5f9] text-[10px] font-bold text-[#64748b]">
                    +10
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={180}>
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ede9fe] text-[#7c3aed]">
                  <BrainIcon />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">AI Smart Actions</h2>
                  <p className="mt-0.5 text-sm text-[#64748b]">
                    Optimized suggestions to boost your health score to 95+
                  </p>
                </div>
              </div>
              <a href="#" className="text-sm font-semibold text-[#2563eb] hover:underline">
                Ask AI about this →
              </a>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <ActionCard
                tag="Reduce Risk"
                tagColor="text-[#7c3aed]"
                title="Tax Loss Harvesting"
                description="Potential annual tax savings of ₹12,400 identified across 3 underperforming assets."
                actionLabel="Review Assets"
                actionStyle="outline"
              />
              <ActionCard
                tag="Rebalance"
                tagColor="text-[#2563eb]"
                tagIcon={<ScaleIcon />}
                title="Debt Concentration"
                description="Your debt allocation is 12% above target. Shift ₹45k to Small Cap equity."
                actionLabel="Rebalance Now"
                actionStyle="primary"
              />
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cbd5e1] bg-white p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f5f9] text-[#94a3b8]">
                  <PlusIcon />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#0f172a]">Add Portfolio</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  Connect EPF or Real Estate to get a holistic view of your net worth.
                </p>
                <a href="#" className="mt-4 text-sm font-semibold text-[#2563eb] hover:underline">
                  Link Now
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {belowContent}

      <FullReportFooter />
    </div>
  );
}

function HealthScoreDonut({ score, max }: { score: number; max: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animatedOffset, setAnimatedOffset] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

  const circumference = 2 * Math.PI * 70;
  const targetOffset = circumference - (score / max) * circumference;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let ringFrame = 0;
    let scoreFrame = 0;
    const duration = 1800;
    const start = performance.now();

    ringFrame = requestAnimationFrame(() => {
      setAnimatedOffset(circumference);
      ringFrame = requestAnimationFrame(() => {
        setAnimatedOffset(targetOffset);
      });
    });

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) scoreFrame = requestAnimationFrame(tick);
    };

    scoreFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(ringFrame);
      cancelAnimationFrame(scoreFrame);
    };
  }, [visible, circumference, targetOffset, score]);

  const strokeOffset = animatedOffset ?? circumference;

  return (
    <div ref={ref} className="relative h-44 w-44">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="70" fill="none" stroke="#e2e8f0" strokeWidth="14" />
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="url(#healthGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className="health-score-ring transition-[stroke-dashoffset] duration-[1800ms] ease-out"
        />
      </svg>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <span className="text-4xl font-bold text-[#0f172a]">
          {displayScore}
          <span className="text-xl font-semibold text-[#94a3b8]"> / {max}</span>
        </span>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  iconBg,
  iconColor,
  badge,
  badgeIcon,
  badgeColor,
  label,
  value,
  footer,
  progress,
  progressColor,
  segments,
  segmentFilled,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  badge?: string;
  badgeIcon?: ReactNode;
  badgeColor?: string;
  label: string;
  value: string;
  footer?: string;
  progress?: number;
  progressColor?: string;
  segments?: number;
  segmentFilled?: number;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
          {icon}
        </span>
        {badge ? (
          <span className={`inline-flex items-center gap-1 text-xs font-bold ${badgeColor}`}>
            {badgeIcon}
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-xs font-medium text-[#94a3b8]">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#0f172a]">{value}</p>
      {footer ? <p className="mt-2 text-xs text-[#64748b]">{footer}</p> : null}
      {progress !== undefined ? (
        <div className="mt-auto pt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
            <div
              className={`h-full rounded-full ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}
      {segments !== undefined && segmentFilled !== undefined ? (
        <div className="mt-auto flex gap-1 pt-4">
          {Array.from({ length: segments }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 flex-1 rounded-full ${
                index < segmentFilled ? "bg-[#2563eb]" : "bg-[#e2e8f0]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ActionCard({
  tag,
  tagColor,
  tagIcon,
  title,
  description,
  actionLabel,
  actionStyle,
}: {
  tag: string;
  tagColor: string;
  tagIcon?: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  actionStyle: "primary" | "outline";
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm">
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${tagColor}`}>
        {tagIcon}
        {tag}
      </span>
      <h3 className="mt-3 text-lg font-bold text-[#0f172a]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">{description}</p>
      <button
        type="button"
        className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-bold ${
          actionStyle === "primary"
            ? "bg-[#2563eb] text-white shadow-sm hover:bg-[#1d4ed8]"
            : "border border-[#e2e8f0] bg-[#f8faff] text-[#475569] hover:border-[#cbd5e1]"
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
}

function AvatarStack() {
  const colors = ["bg-[#2563eb]", "bg-[#7c3aed]", "bg-[#16a34a]"];
  return (
    <div className="flex -space-x-2">
      {colors.map((color) => (
        <span
          key={color}
          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white ${color} text-[10px] font-bold text-white`}
        >
          A
        </span>
      ))}
    </div>
  );
}

function FullReportFooter() {
  return (
    <footer className="mt-auto border-t border-[#e2e8f0] bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="inline-flex">
          <Logo variant="footer" />
        </Link>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#94a3b8] sm:text-sm">
          © 2024 Nxance AI. SEBI Registered Investment Advisor (INA000012345). Investment in
          securities market are subject to market risks.
        </p>
      </div>
    </footer>
  );
}

export function useUnlockReport() {
  const router = useRouter();
  return () => {
    markReportUnlocked();
    router.push("/dashboard/health-check/full-report");
  };
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 4v10M8 10l4 4 4-4M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExecuteIcon() {
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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
      <path d="M12 3l1 1.5L14.5 6 12 7l-1.5-1L9 6l2.5-1.5L12 3z" fill="currentColor" />
    </svg>
  );
}

function ChartUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 16l5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.3 4.5h3.4L20 19H4L10.3 4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6 6h12M6 10h8M6 14h12M6 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10h.01M15 10h.01M9.5 15a3 3 0 015 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M12 4v16M5 8h14M8 8l-2 6h4l-2-6zM16 8l-2 6h4l-2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
