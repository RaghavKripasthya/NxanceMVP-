"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Logo from "@/components/Logo";
import { markReportUnlocked } from "@/components/health-check/HealthCheckFullReportMain";
import { markConstructionUnlocked } from "@/components/construction/ConstructionFullReportMain";

type BillingCycle = "monthly" | "yearly";

type PricingPlan = {
  id: string;
  tier: string;
  monthlyPrice: string | null;
  yearlyPrice: string | null;
  oneTime?: boolean;
  note?: string;
  features: string[];
  popular?: boolean;
  ctaLabel: string;
};

const pricingPlans: PricingPlan[] = [
  {
    id: "one-time",
    tier: "One-Time unlock",
    monthlyPrice: "₹99",
    yearlyPrice: null,
    oneTime: true,
    note: "not a plan",
    features: [
      "Full Health Check report unlock",
      "MBP success-gate funnel qualifier",
    ],
    ctaLabel: "Unlock report — ₹99",
  },
  {
    id: "starter",
    tier: "Plan 1 — Starter",
    monthlyPrice: "₹399",
    yearlyPrice: "₹3,990",
    features: [
      "2 portfolios",
      "Health Check + Construction",
      "7–8 sub-engines",
      "limited NxanceLM",
      "monthly auto re-check",
    ],
    ctaLabel: "Choose Starter",
  },
  {
    id: "growth",
    tier: "Plan 2 — Growth",
    monthlyPrice: "₹899",
    yearlyPrice: "₹8,990",
    popular: true,
    features: [
      "2–5 portfolios",
      "10–15 sub-engines",
      "deep re-check",
      "rebalancing nudges",
      "execution",
      "priority queue",
    ],
    ctaLabel: "Choose Growth",
  },
  {
    id: "pro",
    tier: "Plan 3 — Pro",
    monthlyPrice: "₹1,499",
    yearlyPrice: "₹14,990",
    features: [
      "5–10 portfolios",
      "all 26+ sub-engines",
      "unlimited NxanceLM",
      "fastest queue",
      "priority support",
      "early access",
    ],
    ctaLabel: "Choose Pro",
  },
];

export default function PremiumUpgradeMain() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="flex flex-1 flex-col bg-[#f8f9fc]">
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              <SparkleBadgeIcon />
              Premium Access
            </span>
            <h1 className="mt-5 text-3xl font-bold text-[#0f172a] sm:text-4xl">
              Elevate Your Wealth Intelligence
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#64748b] sm:text-base">
              Unlock professional-grade financial tools and AI-driven insights designed to
              outperform the market.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-[#e2e8f0] bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-[#2563eb] text-white"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-[#2563eb] text-white"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} billingCycle={billingCycle} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <TrustItem icon={<ShieldTrustIcon />} label="Secure Payment" />
            <TrustItem icon={<NoHiddenIcon />} label="No Hidden Charges" />
            <TrustItem icon={<CalendarTrustIcon />} label="Cancel Anytime" />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={<TaxIcon />}
              iconBg="bg-[#dbeafe]"
              iconColor="text-[#2563eb]"
              title="Tax-Efficient Investing"
              description="Our AI automatically scans for tax-loss harvesting opportunities, helping you offset gains and save thousands annually."
            />
            <FeatureCard
              icon={<RocketIcon />}
              iconBg="bg-[#ede9fe]"
              iconColor="text-[#7c3aed]"
              title="Next-Gen Rebalancing"
              description="Stay on track with real-time alerts. When market movements shift your risk profile, Nxance AI suggests the optimal trades."
            />
          </div>
        </ScrollReveal>
      </div>

      <UpgradeFooter />
    </div>
  );
}

function PricingCard({
  plan,
  billingCycle,
}: {
  plan: PricingPlan;
  billingCycle: BillingCycle;
}) {
  const router = useRouter();

  const displayPrice = plan.oneTime
    ? `${plan.monthlyPrice} one-time`
    : billingCycle === "monthly"
      ? `${plan.monthlyPrice}/mo`
      : `${plan.yearlyPrice}/yr`;

  const priceSubtext = plan.oneTime
    ? "One-time payment"
    : billingCycle === "monthly"
      ? `or ${plan.yearlyPrice}/year`
      : `equivalent to ${plan.monthlyPrice}/mo`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${
        plan.popular
          ? "border-[#2563eb] ring-2 ring-[#2563eb]/20"
          : "border-[#e2e8f0]/80"
      }`}
    >
      {plan.popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0f172a] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Most Popular
        </span>
      ) : null}

      <p className="text-sm font-bold text-[#2563eb]">{plan.tier}</p>
      <p className="mt-3 text-2xl font-bold text-[#0f172a]">{displayPrice}</p>
      <p className="mt-1 text-xs text-[#94a3b8]">{priceSubtext}</p>

      {plan.note ? (
        <p className="mt-2 text-[11px] font-medium italic text-[#94a3b8]">{plan.note}</p>
      ) : null}

      <div className="mt-5 border-t border-[#f1f5f9] pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
          What&apos;s included
        </p>
        <ul className="mt-3 space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[#475569]">
              <span className="mt-0.5 shrink-0 text-[#2563eb]">
                <CheckIcon />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          if (plan.oneTime) {
            markReportUnlocked();
            router.push("/dashboard/health-check/full-report");
            return;
          }
          if (plan.id === "starter") {
            markConstructionUnlocked();
            router.push("/dashboard/construction/report");
          }
        }}
        className={`mt-6 w-full rounded-full px-4 py-3 text-sm font-bold transition-transform hover:scale-[1.01] ${
          plan.popular || plan.oneTime
            ? "bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white shadow-md"
            : "border border-[#2563eb] bg-white text-[#2563eb] hover:bg-[#eff6ff]"
        }`}
      >
        {plan.ctaLabel}
      </button>
    </div>
  );
}

function TrustItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2563eb]">
      {icon}
      {label}
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#0f172a]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{description}</p>
    </div>
  );
}

function UpgradeFooter() {
  return (
    <footer className="mt-auto w-full border-t border-[#e2e8f0] bg-white">
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm shrink-0">
            <Link href="/dashboard" className="inline-flex">
              <Logo variant="footer" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
              Elevating wealth management through sophisticated artificial intelligence and
              user-centric design.
            </p>
          </div>

          <div className="flex shrink-0 gap-12 sm:gap-16 lg:ml-auto lg:justify-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                Resources
              </p>
              <ul className="mt-3 space-y-2">
                {["Compliance", "API Docs", "Security"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#64748b] hover:text-[#2563eb]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                Legal
              </p>
              <ul className="mt-3 space-y-2">
                {["Terms of Service", "Privacy Policy", "Contact Us"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#64748b] hover:text-[#2563eb]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#e2e8f0] pt-6">
          <p className="text-xs text-[#94a3b8] sm:text-sm">
            © 2024 Nxance AI. SEBI Registered Investment Advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SparkleBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12l3 3 9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldTrustIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoHiddenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarTrustIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3c2 3 2 6 0 9-2-3-2-6 0-9zM12 12v9M9 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
