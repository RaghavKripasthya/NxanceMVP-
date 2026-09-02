import ScrollReveal from "./ScrollReveal";

const features = [
  "Full Risk Exposure Analysis",
  "Personalized Alpha Insights",
  "Tax Loss Harvesting Audit",
] as const;

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-[#f8f9fc] px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Left column */}
        <ScrollReveal>
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Professional Insights,
              <br />
              Entry-level Cost
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#64748b] sm:mt-6 sm:text-lg md:text-xl">
              We believe high-end financial intelligence shouldn&apos;t be gated
              behind massive fees. Get your first deep-dive portfolio health
              check for less than a cup of coffee.
            </p>

            <ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white">
                    <CheckIcon />
                  </span>
                  <span className="text-base font-medium text-[#334155] sm:text-lg">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Pricing card */}
        <ScrollReveal delay={180}>
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-[#e2e8f0]/80 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:mx-0 lg:ml-auto">
            <span className="absolute right-6 top-6 rounded-full bg-[#dbeafe] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563eb] sm:text-xs">
              Popular
            </span>

            <p className="text-lg font-bold text-[#0f172a] sm:text-xl">
              Single Audit Report
            </p>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[#0f172a] sm:text-5xl">
                ₹99
              </span>
              <span className="text-base text-[#64748b] sm:text-lg">
                /per report
              </span>
            </div>

            <a
              href="#"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:mt-8 sm:py-4 sm:text-lg"
            >
              Generate My Report
            </a>

            <p className="mt-4 text-center text-sm text-[#94a3b8] sm:text-base">
              No subscription required. Pay as you go.
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-[#f1f5f9] pt-6">
              <div className="flex -space-x-2.5">
                <Avatar color="from-[#2563eb] to-[#3b82f6]" />
                <Avatar color="from-[#7c3aed] to-[#a855f7]" />
                <Avatar color="from-[#0ea5e9] to-[#06b6d4]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8] sm:text-[11px]">
                Join 12,000+ Investors
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M5 12l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({ color }: { color: string }) {
  return (
    <div
      className={`h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br ${color} sm:h-10 sm:w-10`}
      aria-hidden="true"
    />
  );
}
