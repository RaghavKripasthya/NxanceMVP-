"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AssetClassMultiSelect from "@/components/portfolio/AssetClassMultiSelect";

const TOTAL_STEPS = 9;

type QuestionOption = {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
};

type Question =
  | {
      kind: "single";
      badge: string;
      question: string;
      options: QuestionOption[];
      defaultOption: string;
      showComparison?: boolean;
    }
  | {
      kind: "diversification";
      badge: string;
      question: string;
      options: QuestionOption[];
      defaultOption: string;
    };

const returnExpectationOptions: QuestionOption[] = [
  {
    id: "6-8",
    label: "6–8%",
    description: "Conservative return expectation.",
    icon: <PercentIcon />,
  },
  {
    id: "8-10",
    label: "8–10%",
    description: "Moderate, steady growth target.",
    icon: <PercentIcon />,
  },
  {
    id: "10-12",
    label: "10–12%",
    description: "Balanced market-aligned expectation.",
    icon: <PercentIcon />,
  },
  {
    id: "12-14",
    label: "12–14%",
    description: "Above-average growth ambition.",
    icon: <PercentIcon />,
  },
  {
    id: "14-16",
    label: "14–16%",
    description: "Aggressive return target.",
    icon: <PercentIcon />,
  },
  {
    id: "16-plus",
    label: "16%+",
    description: "Very high return expectation.",
    icon: <PercentIcon />,
  },
  {
    id: "no-expectation",
    label: "Honestly, I didn't think about this",
    description: "No specific return was in mind when investing.",
    icon: <QuestionIcon />,
  },
];

const PORTFOLIO_VALUE = 1245000;

const questions: Question[] = [
  {
    kind: "single",
    badge: "Defining your financial north star",
    question: "When you started this portfolio, what was it for?",
    defaultOption: "dream-home",
    options: [
      {
        id: "retirement",
        label: "Retirement",
        description: "Building long-term wealth for a peaceful future.",
        icon: <UmbrellaIcon />,
      },
      {
        id: "dream-home",
        label: "Dream Home",
        description: "Saving for a down payment or property purchase.",
        icon: <HomeIcon />,
      },
      {
        id: "children-education",
        label: "Children's Education",
        description: "Securing the best academic path for your family.",
        icon: <GraduationIcon />,
      },
      {
        id: "wealth-creation",
        label: "Wealth Creation",
        description: "General accumulation to maximize net worth.",
        icon: <BuildingIcon />,
      },
      {
        id: "general-savings",
        label: "General savings",
        description: "Flexible savings without a fixed goal yet.",
        icon: <PiggyBankIcon />,
      },
      {
        id: "not-sure",
        label: "Honestly, not sure",
        description: "Still figuring out what this portfolio is for.",
        icon: <QuestionIcon />,
      },
    ],
  },
  {
    kind: "single",
    badge: "Planning your investment horizon",
    question: "How much longer do you plan to stay invested, from today?",
    defaultOption: "3-5-years",
    options: [
      {
        id: "less-than-1",
        label: "Less than 1 year",
        description: "Short-term goals or near-term liquidity needs.",
        icon: <ClockIcon />,
      },
      {
        id: "1-3-years",
        label: "1–3 years",
        description: "A medium-short horizon for upcoming milestones.",
        icon: <CalendarIcon />,
      },
      {
        id: "3-5-years",
        label: "3–5 years",
        description: "Balanced time to ride market cycles.",
        icon: <TimelineIcon />,
      },
      {
        id: "5-10-years",
        label: "5–10 years",
        description: "Long enough for meaningful compound growth.",
        icon: <ChartIcon />,
      },
      {
        id: "10-plus",
        label: "10+ years",
        description: "Maximum runway for long-term wealth building.",
        icon: <GrowthIcon />,
      },
    ],
  },
  {
    kind: "single",
    badge: "Understanding your contribution pattern",
    question: "Are you still adding to this portfolio?",
    defaultOption: "monthly-sip",
    options: [
      {
        id: "one-time",
        label: "No, one-time investment",
        description: "This portfolio was funded once and is not being added to.",
        icon: <OneTimeIcon />,
      },
      {
        id: "lump-sum",
        label: "Yes — lump sum top-ups",
        description: "You occasionally add larger amounts when available.",
        icon: <LumpSumIcon />,
      },
      {
        id: "monthly-sip",
        label: "Yes — monthly SIP",
        description: "You invest a fixed amount every month automatically.",
        icon: <SipIcon />,
      },
      {
        id: "both",
        label: "Yes — both",
        description: "You combine regular SIPs with occasional lump sum top-ups.",
        icon: <BothIcon />,
      },
    ],
  },
  {
    kind: "single",
    badge: "Setting your return expectations",
    question: "What annual return did you originally expect?",
    defaultOption: "10-12",
    options: returnExpectationOptions,
  },
  {
    kind: "single",
    badge: "Setting your return expectations",
    question: "What do you expect now, going forward?",
    defaultOption: "8-10",
    options: returnExpectationOptions,
    showComparison: true,
  },
  {
    kind: "diversification",
    badge: "Exploring diversification options",
    question:
      "If your current asset mix can't realistically get you to your expected return, would you be open to diversifying into other asset classes?",
    defaultOption: "",
    options: [
      {
        id: "keep-current",
        label: "No, keep it within what I already hold",
        description: "Stay focused on optimizing your existing asset classes only.",
        icon: <ShieldCheckIcon />,
      },
      {
        id: "open-to-diversify",
        label: "Yes, show me what else could help",
        description: "Explore additional asset classes that could improve your mix.",
        icon: <LayersIcon />,
      },
    ],
  },
  {
    kind: "single",
    badge: "How you react when markets fall",
    question: "Since you started, has your portfolio ever fallen sharply? What did you do?",
    defaultOption: "",
    options: [
      {
        id: "sold",
        label: "It fell and I sold",
        description: "You exited some or all positions during the downturn.",
        icon: <TrendDownExitIcon />,
      },
      {
        id: "did-nothing",
        label: "It fell and I did nothing",
        description: "You held steady and waited for the market to recover.",
        icon: <HoldSteadyIcon />,
      },
      {
        id: "added-more",
        label: "It fell and I added more",
        description: "You saw the dip as a buying opportunity and invested further.",
        icon: <BuyDipIcon />,
      },
      {
        id: "hasnt-fallen",
        label: "Hasn't fallen significantly yet",
        description: "Your portfolio hasn't experienced a major drawdown so far.",
        icon: <CalmChartIcon />,
      },
      {
        id: "dont-track",
        label: "I don't track it closely",
        description: "You're not sure how it performed during past market stress.",
        icon: <EyeOffIcon />,
      },
    ],
  },
  {
    kind: "single",
    badge: "How you react when markets fall",
    question: "How would you react today if it fell 20% this month?",
    defaultOption: "",
    options: [
      {
        id: "sell-everything",
        label: "Sell everything",
        description: "You would exit the portfolio to avoid further losses.",
        icon: <SellAllIcon />,
      },
      {
        id: "sell-some",
        label: "Sell some",
        description: "You would trim positions to reduce risk but stay invested.",
        icon: <SellSomeIcon />,
      },
      {
        id: "wait-it-out",
        label: "Do nothing, wait it out",
        description: "You would hold your current allocation through the volatility.",
        icon: <HoldSteadyIcon />,
      },
      {
        id: "invest-more",
        label: "Invest more",
        description: "You would treat the drop as a chance to buy at lower prices.",
        icon: <BuyDipIcon />,
      },
    ],
  },
  {
    kind: "single",
    badge: "What brought you here today",
    question: "What's worrying you most about this portfolio right now?",
    defaultOption: "",
    options: [
      {
        id: "low-returns",
        label: "Returns feel lower than expected",
        description: "Performance hasn't matched what you had in mind.",
        icon: <TrendDownIcon />,
      },
      {
        id: "too-much-risk",
        label: "Too much risk-volatility",
        description: "Swings feel larger or scarier than you're comfortable with.",
        icon: <VolatilityIcon />,
      },
      {
        id: "not-sure-ownership",
        label: "Not sure what I own",
        description: "The holdings or allocation aren't clear enough to you.",
        icon: <PuzzleIcon />,
      },
      {
        id: "high-fees",
        label: "Fees feel high",
        description: "Costs may be eating into returns more than you'd like.",
        icon: <FeeIcon />,
      },
      {
        id: "just-checkup",
        label: "Nothing specific, just a checkup",
        description: "No major concern — you want a routine health review.",
        icon: <CheckupIcon />,
      },
    ],
  },
];

function getHorizonMeta(horizonId: string) {
  const map: Record<string, { years: number; label: string }> = {
    "less-than-1": { years: 1, label: "1 year" },
    "1-3-years": { years: 2, label: "1–3 years" },
    "3-5-years": { years: 4, label: "3–5 years" },
    "5-10-years": { years: 7, label: "5–10 years" },
    "10-plus": { years: 10, label: "10+ years" },
  };
  return map[horizonId] ?? { years: 4, label: "3–5 years" };
}

function getReturnRate(optionId: string) {
  const map: Record<string, number> = {
    "6-8": 0.07,
    "8-10": 0.09,
    "10-12": 0.11,
    "12-14": 0.13,
    "14-16": 0.15,
    "16-plus": 0.17,
    "no-expectation": 0.1,
  };
  return map[optionId] ?? 0.1;
}

function computeCorpus(principal: number, annualRate: number, years: number) {
  return principal * (1 + annualRate) ** years;
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function HealthCheckQuestionnaireMain() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    Object.fromEntries(
      questions.map((question, index) => [index + 1, question.defaultOption]),
    ),
  );
  const [selectedAssetClasses, setSelectedAssetClasses] = useState<string[]>([]);
  const [interestSignals, setInterestSignals] = useState<string[]>([]);

  const questionIndex = currentStep - 1;
  const currentQuestion = questions[questionIndex];
  const selected = answers[currentStep] ?? "";
  const originalReturn = answers[4] ?? "";
  const forwardReturn = answers[5] ?? "";
  const progress = (currentStep / TOTAL_STEPS) * 100;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;
  const isDiversificationStep = currentQuestion?.kind === "diversification";
  const showAssetPicker = isDiversificationStep && selected === "open-to-diversify";
  const canProceed =
    currentQuestion?.kind === "diversification"
      ? selected === "keep-current" ||
        (selected === "open-to-diversify" &&
          (selectedAssetClasses.length > 0 || interestSignals.length > 0))
      : Boolean(selected);

  const horizon = getHorizonMeta(answers[2] ?? "3-5-years");
  const originalCorpus = computeCorpus(
    PORTFOLIO_VALUE,
    getReturnRate(originalReturn),
    horizon.years,
  );
  const forwardCorpus = computeCorpus(
    PORTFOLIO_VALUE,
    getReturnRate(forwardReturn),
    horizon.years,
  );

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((step) => step + 1);
      return;
    }
    router.push("/dashboard/health-check/processing");
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  const toggleAssetClass = (id: string) => {
    setSelectedAssetClasses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleInterestSignal = (id: string) => {
    setInterestSignals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-lg font-semibold text-[#0f172a]">More questions coming soon.</p>
        <Link
          href="/dashboard/health-check/results"
          className="mt-4 text-sm font-medium text-[#2563eb] hover:underline"
        >
          Return to results
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <ScrollReveal key={`header-${currentStep}`}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">
                Questionnaire
              </p>
              <h1 className="mt-1 text-3xl font-bold text-[#0f172a] sm:text-4xl">
                The Core Questions
              </h1>
            </div>
            <div className="sm:text-right">
              <p className="text-sm font-semibold text-[#64748b]">
                Step {currentStep} of {TOTAL_STEPS}
              </p>
              <div className="mt-2 h-1.5 w-full min-w-[180px] overflow-hidden rounded-full bg-[#e2e8f0] sm:w-48">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80} key={`card-${currentStep}`}>
          <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb] text-white">
                <StarIcon />
              </span>
              <span className="text-sm font-medium text-[#64748b]">
                {currentQuestion.badge}
              </span>
            </div>

            <h2 className="text-xl font-bold leading-snug text-[#0f172a] sm:text-2xl">
              {currentQuestion.question}
            </h2>
            <div
              className={
                currentQuestion.kind === "single" && currentQuestion.showComparison
                  ? "mt-5 space-y-6"
                  : showAssetPicker
                    ? "mt-5 space-y-8"
                    : "mt-5"
              }
            >
              <OptionGrid
                name={`question-${currentStep}`}
                options={currentQuestion.options}
                selected={selected}
                onSelect={(id) =>
                  setAnswers((prev) => ({ ...prev, [currentStep]: id }))
                }
                ariaLabel={currentQuestion.question}
              />
              {currentQuestion.kind === "single" && currentQuestion.showComparison && originalReturn && forwardReturn ? (
                <div className="rounded-xl border border-[#dbeafe] bg-[#f8faff] p-5">
                  <p className="text-sm leading-relaxed text-[#475569] sm:text-[15px]">
                    At your original expectation, your estimated corpus by{" "}
                    <span className="font-semibold text-[#0f172a]">{horizon.label}</span>{" "}
                    would be{" "}
                    <span className="font-bold text-[#2563eb]">
                      {formatIndianCurrency(originalCorpus)}
                    </span>
                    . At your current pace, it&apos;s tracking toward{" "}
                    <span className="font-bold text-[#7c3aed]">
                      {formatIndianCurrency(forwardCorpus)}
                    </span>
                    .
                  </p>
                </div>
              ) : null}
              {showAssetPicker ? (
                <AssetClassMultiSelect
                  selected={selectedAssetClasses}
                  interestSignals={interestSignals}
                  onToggleSelect={toggleAssetClass}
                  onToggleInterest={toggleInterestSignal}
                />
              ) : null}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140} key={`nav-${currentStep}`}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {isFirstStep ? (
              <Link
                href="/dashboard/health-check/results"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
              >
                <ArrowLeftIcon />
                Back
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
              >
                <ArrowLeftIcon />
                Back
              </button>
            )}
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <Link
                href="/dashboard/health-check/results"
                className="text-sm font-medium text-[#64748b] transition-colors hover:text-[#0f172a]"
              >
                Skip for now
              </Link>
              <button
                type="button"
                disabled={!canProceed}
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLastStep ? "Finish" : "Next Question"}
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <QuestionnaireFooter />
    </div>
  );
}

function OptionGrid({
  name,
  options,
  selected,
  onSelect,
  ariaLabel,
}: {
  name: string;
  options: QuestionOption[];
  selected: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <label
            key={`${name}-${option.id}`}
            className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-5 transition-all ${
              isSelected
                ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={isSelected}
              onChange={() => onSelect(option.id)}
              className="sr-only"
            />
            <div className="flex items-start justify-between gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? "bg-[#dbeafe] text-[#2563eb]" : "bg-[#f8fafc] text-[#94a3b8]"
                }`}
              >
                {option.icon}
              </span>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
            </div>
            <p className="mt-4 font-bold text-[#0f172a]">{option.label}</p>
            {option.description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{option.description}</p>
            ) : null}
          </label>
        );
      })}
    </div>
  );
}

function QuestionnaireFooter() {
  return (
    <footer className="mt-auto border-t border-[#e2e8f0] bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
            Nxance Investment Group
          </p>
          <p className="mt-1 text-sm text-[#64748b]">
            © 2026 Nxance, SEBI compliant.
          </p>
        </div>
        <div className="flex gap-5 text-sm text-[#64748b]">
          <a href="#" className="transition-colors hover:text-[#2563eb]">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-[#2563eb]">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z" fill="currentColor" />
    </svg>
  );
}

function UmbrellaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3v1M6 8a6 6 0 0112 0M4 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 9l9-4 9 4-9 4-9-4zM6 11v4c0 2 3 3 6 3s6-1 6-3v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PiggyBankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6 10h12v8H6zM8 10V8a4 4 0 018 0v2M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5a2.5 2.5 0 014.5 1.5c0 2-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 16l5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OneTimeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LumpSumIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="5" y="8" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 8l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BothIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="6" width="7" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="6" width="7" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 4l8 4-8 4-8-4 8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function TrendDownExitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HoldSteadyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BuyDipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 16l5-5 4 4 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 14v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalmChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 12h16M6 12v4M10 12v2M14 12v3M18 12v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9 9 0 0112 5c4 0 7 4 7 7 0 1.3-.3 2.5-.9 3.6M6.1 6.1C4.2 7.4 3 9.1 3 12c0 3 3 7 9 7 1.7 0 3.2-.4 4.6-1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SellAllIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 18h16M7 14l3-8h4l3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SellSomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 16h10M14 16l4-4M14 12v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VolatilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 14l3-6 3 4 3-8 3 6 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M8 4h3a2 2 0 012 2 1 1 0 002 0 2 2 0 012 2v3a2 2 0 01-2 2 1 1 0 000 2 2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2 1 1 0 00-2 0 2 2 0 01-2 2H4a2 2 0 01-2-2v-3a2 2 0 012-2 1 1 0 000-2 2 2 0 01-2-2V8a2 2 0 012-2h3a2 2 0 012 2 1 1 0 002 0 2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function FeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M9.5 10.5c0-1 1-1.5 2.5-1.5s2.5.5 2.5 1.5-1 1.5-2.5 1.5S9.5 13.5 9.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
