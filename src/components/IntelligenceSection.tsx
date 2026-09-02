import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Secure Connect",
    description:
      "Link your existing portfolios securely via encrypted read-only API access. We never touch your actual funds.",
    icon: <GridIcon />,
    iconBg: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
  },
  {
    number: "2",
    title: "AI Synthesis",
    description:
      "Nxance AI analyzes 140+ global market indicators against your risk profile to find hidden optimizations.",
    icon: <BrainIcon />,
    iconBg: "bg-[#ede9fe]",
    iconColor: "text-[#7c3aed]",
  },
  {
    number: "3",
    title: "Precise Growth",
    description:
      "Receive execution-ready reports and smart alerts to rebalance your wealth for maximum tax-efficient growth.",
    icon: <SparkleIcon />,
    iconBg: "bg-[#ffedd5]",
    iconColor: "text-[#ea580c]",
  },
] as const;

export default function IntelligenceSection() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Intelligence in Three Acts
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#64748b] sm:mt-5 sm:text-lg md:text-xl">
              Complex financial engineering distilled into a seamless three-step
              experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-3 md:gap-8 lg:mt-16">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={120 + index * 120}>
              <article className="flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 md:p-8">
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBg} ${step.iconColor} sm:h-14 sm:w-14`}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] sm:text-xl">
                  {step.number}. {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748b] sm:text-base">
                  {step.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <path
        d="M9.5 4.5a3.5 3.5 0 00-2.8 5.6 3 3 0 00-.7 5.9v.5a3 3 0 003 3h1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14.5 4.5a3.5 3.5 0 012.8 5.6 3 3 0 01.7 5.9v.5a3 3 0 01-3 3H13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 14v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <path
        d="M12 3l1.2 4.2L17.5 8.5 13.2 9.7 12 14l-1.2-4.3L6.5 8.5l4.3-1.3L12 3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
