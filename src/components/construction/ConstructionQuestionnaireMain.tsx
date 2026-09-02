"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ConstructionAssetClassSelect from "@/components/construction/ConstructionAssetClassSelect";
import { constructionDefaultLiveAssetIds } from "@/data/assetClassUniverse";

const TOTAL_STEPS = 10;

const stepSubtitles: Record<number, string> = {
  1: "Defining your financial north star",
  2: "Planning when you'll need the money",
  3: "Choosing how you'll fund the portfolio",
  4: "How you react when markets fall",
  5: "Understanding your financial cushion",
  6: "Setting your return expectations",
  7: "Your projected outcome",
  8: "Setting your preferences",
  9: "Q8 — Choosing your asset classes",
  10: "Q9 — A few quick things about you",
};

const experienceOptions = [
  { id: "first-time", label: "First-time" },
  { id: "some-experience", label: "Some experience" },
  { id: "experienced", label: "Experienced" },
];

const involvementOptions = [
  { id: "set-forget", label: "Set & forget" },
  { id: "review-changes", label: "Review before changes" },
  { id: "full-control", label: "Full control" },
];

const taxPreferenceOptions = [
  { id: "minimize-tax", label: "Minimize tax impact" },
  { id: "maximize-returns", label: "Maximize returns" },
  { id: "no-preference", label: "No preference" },
];

const exclusionOptions = [
  { id: "tobacco", label: "Tobacco" },
  { id: "fossil-fuels", label: "Fossil Fuels" },
  { id: "alcohol", label: "Alcohol" },
  { id: "gambling", label: "Gambling" },
  { id: "defense", label: "Defense" },
  { id: "crypto", label: "Crypto" },
  { id: "none", label: "None" },
];

const tiltOptions = [
  { id: "ai-robotics", label: "AI & Robotics" },
  { id: "renewable-tech", label: "Renewable Tech" },
  { id: "healthcare", label: "Healthcare" },
  { id: "banking", label: "Banking" },
  { id: "consumer", label: "Consumer" },
  { id: "export-oriented", label: "Export-oriented" },
  { id: "small-cap", label: "Small-cap" },
  { id: "large-cap", label: "Large-cap" },
  { id: "no-preference", label: "No preference" },
];

const expectedReturnOptions = [
  { id: "6-8", label: "6–8%" },
  { id: "8-10", label: "8–10%" },
  { id: "10-12", label: "10–12%" },
  { id: "12-14", label: "12–14%" },
  { id: "14-16", label: "14–16%" },
  { id: "16-plus", label: "16%+" },
];

const investmentMethodOptions = [
  { id: "lump-sum-only", label: "Lump sum only" },
  { id: "sip-only", label: "SIP (monthly) only" },
  { id: "both", label: "Both" },
];

const lumpSumBandOptions = [
  { id: "under-1l", label: "Under ₹1L" },
  { id: "1-5l", label: "₹1–5L" },
  { id: "5-10l", label: "₹5–10L" },
  { id: "10-25l", label: "₹10–25L" },
  { id: "25l-plus", label: "₹25L+" },
  { id: "exact", label: "Enter exact amount" },
];

const sipBandOptions = [
  { id: "under-5k", label: "Under ₹5k" },
  { id: "5-15k", label: "₹5–15k" },
  { id: "15-30k", label: "₹15–30k" },
  { id: "30-50k", label: "₹30–50k" },
  { id: "50k-plus", label: "₹50k+" },
  { id: "exact", label: "Enter exact amount" },
];

const sipStepUpOptions = [
  { id: "flat", label: "No, keep it flat" },
  { id: "10-yearly", label: "Yes — 10% every year", recommended: true },
  { id: "customize", label: "Customize" },
];

const stepUpFrequencyOptions = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "6-month", label: "Every 6 months" },
  { id: "yearly", label: "Yearly" },
];

const drawdownReactionOptions = [
  { id: "sell-everything", label: "Sell everything, I can't handle it" },
  { id: "sell-some", label: "Sell some to reduce exposure" },
  { id: "wait-it-out", label: "Do nothing, wait it out" },
  { id: "invest-more", label: "Invest more — buying opportunity" },
];

const financialCushionOptions = [
  {
    id: "small-with-ef",
    label: "Small part of savings, and I have an emergency fund",
  },
  {
    id: "meaningful-with-buffer",
    label: "Meaningful chunk, but I have some emergency buffer",
  },
  {
    id: "large-limited-buffer",
    label: "Large portion, and my emergency buffer is limited",
  },
  {
    id: "building-ef",
    label: "I'm still building my emergency fund",
  },
];

const goalOptions = [
  {
    id: "retirement",
    label: "Retirement",
    description: "Long-term wealth for peace of mind.",
    icon: <PersonIcon />,
  },
  {
    id: "dream-home",
    label: "Dream Home",
    description: "Accumulating capital for a downpayment.",
    icon: <HomeIcon />,
  },
  {
    id: "children-education",
    label: "Children's Education",
    description: "Planning for future university costs.",
    icon: <GraduationIcon />,
  },
  {
    id: "wealth-creation",
    label: "Wealth Creation",
    description: "General high-growth portfolio strategy.",
    icon: <BuildingIcon />,
  },
];

const horizonOptions = [
  { id: "less-than-2", label: "Less than 2 years" },
  { id: "2-5-years", label: "2–5 years" },
  { id: "5-10-years", label: "5–10 years" },
  { id: "10-plus", label: "10+ years" },
  { id: "no-fixed-date", label: "No fixed date" },
];

function isAmountBandComplete(band: string, exactAmount: string) {
  if (!band) return false;
  if (band === "exact") return Boolean(exactAmount.trim());
  return true;
}

function isInvestmentStepComplete({
  method,
  lumpSumBand,
  lumpSumExact,
  sipBand,
  sipExact,
  sipStepUp,
}: {
  method: string;
  lumpSumBand: string;
  lumpSumExact: string;
  sipBand: string;
  sipExact: string;
  sipStepUp: string;
}) {
  if (!method) return false;
  const needsLumpSum = method === "lump-sum-only" || method === "both";
  const needsSip = method === "sip-only" || method === "both";
  if (needsLumpSum && !isAmountBandComplete(lumpSumBand, lumpSumExact)) return false;
  if (needsSip && (!isAmountBandComplete(sipBand, sipExact) || !sipStepUp)) return false;
  return true;
}

function formatSipDate(day: number) {
  const suffix =
    day >= 11 && day <= 13
      ? "th"
      : day % 10 === 1
        ? "st"
        : day % 10 === 2
          ? "nd"
          : day % 10 === 3
            ? "rd"
            : "th";
  return `${day}${suffix}`;
}

function getConstructionHorizonMeta(horizonId: string) {
  const map: Record<string, { years: number; label: string }> = {
    "less-than-2": { years: 2, label: "2" },
    "2-5-years": { years: 4, label: "4" },
    "5-10-years": { years: 8, label: "8" },
    "10-plus": { years: 10, label: "10" },
    "no-fixed-date": { years: 7, label: "7" },
  };
  return map[horizonId] ?? { years: 7, label: "7" };
}

function getReturnRateRange(optionId: string) {
  const map: Record<string, { min: number; max: number }> = {
    "6-8": { min: 0.06, max: 0.08 },
    "8-10": { min: 0.08, max: 0.1 },
    "10-12": { min: 0.1, max: 0.12 },
    "12-14": { min: 0.12, max: 0.14 },
    "14-16": { min: 0.14, max: 0.16 },
    "16-plus": { min: 0.16, max: 0.18 },
  };
  return map[optionId] ?? { min: 0.08, max: 0.12 };
}

function parseAmount(value: string) {
  return Number(value.replace(/,/g, "").replace(/[^\d.]/g, "")) || 0;
}

function resolveLumpSumAmount(band: string, exact: string) {
  if (band === "exact") return parseAmount(exact);
  const map: Record<string, number> = {
    "under-1l": 50_000,
    "1-5l": 300_000,
    "5-10l": 750_000,
    "10-25l": 1_750_000,
    "25l-plus": 3_000_000,
  };
  return map[band] ?? 0;
}

function resolveSipAmount(band: string, exact: string) {
  if (band === "exact") return parseAmount(exact);
  const map: Record<string, number> = {
    "under-5k": 3_000,
    "5-15k": 10_000,
    "15-30k": 22_500,
    "30-50k": 40_000,
    "50k-plus": 60_000,
  };
  return map[band] ?? 0;
}

function computeConstructionCorpus({
  annualRate,
  years,
  investmentMethod,
  lumpSumBand,
  lumpSumExact,
  sipBand,
  sipExact,
  sipStepUp,
  customStepUpPercent,
}: {
  annualRate: number;
  years: number;
  investmentMethod: string;
  lumpSumBand: string;
  lumpSumExact: string;
  sipBand: string;
  sipExact: string;
  sipStepUp: string;
  customStepUpPercent: number;
}) {
  const monthlyRate = annualRate / 12;
  let total = 0;

  if (investmentMethod === "lump-sum-only" || investmentMethod === "both") {
    const lump = resolveLumpSumAmount(lumpSumBand, lumpSumExact);
    total += lump * (1 + annualRate) ** years;
  }

  if (investmentMethod === "sip-only" || investmentMethod === "both") {
    let monthlySip = resolveSipAmount(sipBand, sipExact);
    for (let year = 0; year < years; year += 1) {
      const months = 12;
      if (monthlyRate > 0) {
        total =
          total * (1 + annualRate) +
          monthlySip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      } else {
        total += monthlySip * months;
      }

      if (sipStepUp === "10-yearly") {
        monthlySip *= 1.1;
      } else if (sipStepUp === "customize") {
        monthlySip *= 1 + customStepUpPercent / 100;
      }
    }
  }

  return total;
}

function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ConstructionQuestionnaireMain() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("dream-home");
  const [selectedHorizon, setSelectedHorizon] = useState("");
  const [selectedInvestmentMethod, setSelectedInvestmentMethod] = useState("");
  const [investmentTab, setInvestmentTab] = useState<"lump-sum" | "sip">("lump-sum");
  const [lumpSumBand, setLumpSumBand] = useState("");
  const [lumpSumExact, setLumpSumExact] = useState("");
  const [sipBand, setSipBand] = useState("");
  const [sipExact, setSipExact] = useState("");
  const [sipStepUp, setSipStepUp] = useState("10-yearly");
  const [customStepUpPercent, setCustomStepUpPercent] = useState(10);
  const [customStepUpFrequency, setCustomStepUpFrequency] = useState("yearly");
  const [sipDebitDay, setSipDebitDay] = useState(5);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDrawdownReaction, setSelectedDrawdownReaction] = useState("");
  const [selectedFinancialCushion, setSelectedFinancialCushion] = useState("");
  const [selectedExpectedReturn, setSelectedExpectedReturn] = useState("");
  const [selectedExclusions, setSelectedExclusions] = useState<string[]>([]);
  const [selectedTilts, setSelectedTilts] = useState<string[]>([]);
  const [selectedConstructionAssets, setSelectedConstructionAssets] = useState<string[]>(
    () => [...constructionDefaultLiveAssetIds],
  );
  const [constructionAssetInterestSignals, setConstructionAssetInterestSignals] = useState<
    string[]
  >([]);
  const [hasExistingInvestments, setHasExistingInvestments] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedInvolvement, setSelectedInvolvement] = useState("");
  const [selectedTaxPreference, setSelectedTaxPreference] = useState("");

  const progress = Math.round((currentStep / TOTAL_STEPS) * 100);
  const stepSubtitle = stepSubtitles[currentStep] ?? "Building your construction";
  const canProceed =
    currentStep === 1
      ? Boolean(selectedGoal)
      : currentStep === 2
        ? Boolean(selectedHorizon)
        : currentStep === 3
          ? isInvestmentStepComplete({
              method: selectedInvestmentMethod,
              lumpSumBand,
              lumpSumExact,
              sipBand,
              sipExact,
              sipStepUp,
            })
          : currentStep === 4
            ? Boolean(selectedDrawdownReaction)
            : currentStep === 5
              ? Boolean(selectedFinancialCushion)
              : currentStep === 6
                ? Boolean(selectedExpectedReturn)
                : currentStep === 7
                  ? true
                  : currentStep === 8
                    ? selectedExclusions.length > 0 && selectedTilts.length > 0
                    : currentStep === 9
                      ? selectedConstructionAssets.length > 0 &&
                        (hasExistingInvestments === "yes" || hasExistingInvestments === "no")
                      : currentStep === 10
                        ? Boolean(
                            selectedExperience && selectedInvolvement && selectedTaxPreference,
                          )
                        : false;

  const horizon = getConstructionHorizonMeta(selectedHorizon);
  const returnRange = getReturnRateRange(selectedExpectedReturn);
  const corpusInputs = {
    years: horizon.years,
    investmentMethod: selectedInvestmentMethod,
    lumpSumBand,
    lumpSumExact,
    sipBand,
    sipExact,
    sipStepUp,
    customStepUpPercent,
  };
  const corpusLow = computeConstructionCorpus({
    annualRate: returnRange.min,
    ...corpusInputs,
  });
  const corpusHigh = computeConstructionCorpus({
    annualRate: returnRange.max,
    ...corpusInputs,
  });
  const corpusRange = {
    low: Math.min(corpusLow, corpusHigh),
    high: Math.max(corpusLow, corpusHigh),
  };

  const handleInvestmentMethodSelect = (id: string) => {
    setSelectedInvestmentMethod(id);
    if (id === "lump-sum-only") {
      setInvestmentTab("lump-sum");
    } else if (id === "sip-only") {
      setInvestmentTab("sip");
    }
  };

  const toggleExclusion = (id: string) => {
    setSelectedExclusions((prev) => {
      if (id === "none") return prev.includes("none") ? [] : ["none"];
      const withoutNone = prev.filter((item) => item !== "none");
      return withoutNone.includes(id)
        ? withoutNone.filter((item) => item !== id)
        : [...withoutNone, id];
    });
  };

  const toggleTilt = (id: string) => {
    setSelectedTilts((prev) => {
      if (id === "no-preference") return prev.includes("no-preference") ? [] : ["no-preference"];
      const withoutNeutral = prev.filter((item) => item !== "no-preference");
      return withoutNeutral.includes(id)
        ? withoutNeutral.filter((item) => item !== id)
        : [...withoutNeutral, id];
    });
  };

  const toggleConstructionAsset = (id: string) => {
    setSelectedConstructionAssets((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleConstructionAssetInterest = (id: string) => {
    setConstructionAssetInterestSignals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS && canProceed) {
      router.push("/dashboard/construction/processing");
      return;
    }
    if (currentStep < TOTAL_STEPS && canProceed) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-[#f5f3ff]/40">
      <div
        className={`mx-auto w-full flex-1 px-4 py-8 sm:px-6 lg:py-10 ${
          currentStep === 9 || currentStep === 10 ? "max-w-4xl" : "max-w-3xl"
        }`}
      >
        <ScrollReveal key={`construction-step-${currentStep}`}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0f172a] sm:text-3xl">
              Build Your Nxance Construction
            </h1>
            <p className="mt-2 text-sm text-[#64748b] sm:text-base">
              Step {currentStep} of {TOTAL_STEPS}: {stepSubtitle}
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              <span>Questionnaire Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
              <div
                className="h-full rounded-full bg-[#2563eb] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-8">
            {currentStep === 1 ? (
              <StepOneContent selectedGoal={selectedGoal} onSelectGoal={setSelectedGoal} />
            ) : currentStep === 2 ? (
              <StepTwoContent selected={selectedHorizon} onSelect={setSelectedHorizon} />
            ) : currentStep === 3 ? (
              <StepThreeInvestmentContent
                selectedMethod={selectedInvestmentMethod}
                onSelectMethod={handleInvestmentMethodSelect}
                activeTab={investmentTab}
                onTabChange={setInvestmentTab}
                lumpSumBand={lumpSumBand}
                onLumpSumBandChange={setLumpSumBand}
                lumpSumExact={lumpSumExact}
                onLumpSumExactChange={setLumpSumExact}
                sipBand={sipBand}
                onSipBandChange={setSipBand}
                sipExact={sipExact}
                onSipExactChange={setSipExact}
                sipStepUp={sipStepUp}
                onSipStepUpChange={setSipStepUp}
                customStepUpPercent={customStepUpPercent}
                onCustomStepUpPercentChange={setCustomStepUpPercent}
                customStepUpFrequency={customStepUpFrequency}
                onCustomStepUpFrequencyChange={setCustomStepUpFrequency}
                sipDebitDay={sipDebitDay}
                onSipDebitDayChange={setSipDebitDay}
                showDatePicker={showDatePicker}
                onToggleDatePicker={() => setShowDatePicker((open) => !open)}
              />
            ) : currentStep === 4 ? (
              <StepFourDrawdownContent
                selected={selectedDrawdownReaction}
                onSelect={setSelectedDrawdownReaction}
              />
            ) : currentStep === 5 ? (
              <StepFiveFinancialCushionContent
                selected={selectedFinancialCushion}
                onSelect={setSelectedFinancialCushion}
              />
            ) : currentStep === 6 ? (
              <StepSixExpectedReturnContent
                selected={selectedExpectedReturn}
                onSelect={setSelectedExpectedReturn}
              />
            ) : currentStep === 7 ? (
              <StepSevenCorpusEstimateContent
                horizonYears={horizon.label}
                corpusLow={corpusRange.low}
                corpusHigh={corpusRange.high}
              />
            ) : currentStep === 8 ? (
              <StepEightExclusionsTiltsContent
                selectedExclusions={selectedExclusions}
                selectedTilts={selectedTilts}
                onToggleExclusion={toggleExclusion}
                onToggleTilt={toggleTilt}
              />
            ) : currentStep === 9 ? (
              <StepNineAssetClassesContent
                selected={selectedConstructionAssets}
                interestSignals={constructionAssetInterestSignals}
                onToggleSelect={toggleConstructionAsset}
                onToggleInterest={toggleConstructionAssetInterest}
                hasExistingInvestments={hasExistingInvestments}
                onExistingInvestmentsChange={setHasExistingInvestments}
              />
            ) : (
              <StepTenAboutYouContent
                selectedExperience={selectedExperience}
                onExperienceChange={setSelectedExperience}
                selectedInvolvement={selectedInvolvement}
                onInvolvementChange={setSelectedInvolvement}
                selectedTaxPreference={selectedTaxPreference}
                onTaxPreferenceChange={setSelectedTaxPreference}
              />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            {currentStep === 1 ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
              >
                Back
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm font-medium text-[#64748b] hover:text-[#0f172a]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={!canProceed}
              onClick={handleNext}
              className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-8 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentStep === 7 ? "Continue" : currentStep === TOTAL_STEPS ? "Finish" : "Next Step"}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function StepOneContent({
  selectedGoal,
  onSelectGoal,
}: {
  selectedGoal: string;
  onSelectGoal: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">What are you investing for?</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Selecting your primary goal helps our AI engine optimize for the right horizon and risk
        tolerance.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {goalOptions.map((option) => {
          const isSelected = selectedGoal === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectGoal(option.id)}
              className={`flex flex-col rounded-xl border-2 p-5 text-left transition-all ${
                isSelected
                  ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  isSelected ? "bg-[#dbeafe] text-[#2563eb]" : "bg-[#f8fafc] text-[#94a3b8]"
                }`}
              >
                {option.icon}
              </span>
              <p className="mt-4 font-bold text-[#0f172a]">{option.label}</p>
              <p className="mt-1.5 text-sm text-[#64748b]">{option.description}</p>
            </button>
          );
        })}
      </div>
    </>
  );
}

function StepTwoContent({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">When do you need this money?</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Your time horizon shapes how much risk the portfolio can take and which assets belong in
        the mix.
      </p>

      <div className="mt-6 space-y-3" role="radiogroup" aria-label="When do you need this money?">
        {horizonOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                isSelected
                  ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
              }`}
            >
              <input
                type="radio"
                name="construction-horizon"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="font-semibold text-[#0f172a]">{option.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

function StepThreeInvestmentContent({
  selectedMethod,
  onSelectMethod,
  activeTab,
  onTabChange,
  lumpSumBand,
  onLumpSumBandChange,
  lumpSumExact,
  onLumpSumExactChange,
  sipBand,
  onSipBandChange,
  sipExact,
  onSipExactChange,
  sipStepUp,
  onSipStepUpChange,
  customStepUpPercent,
  onCustomStepUpPercentChange,
  customStepUpFrequency,
  onCustomStepUpFrequencyChange,
  sipDebitDay,
  onSipDebitDayChange,
  showDatePicker,
  onToggleDatePicker,
}: {
  selectedMethod: string;
  onSelectMethod: (id: string) => void;
  activeTab: "lump-sum" | "sip";
  onTabChange: (tab: "lump-sum" | "sip") => void;
  lumpSumBand: string;
  onLumpSumBandChange: (id: string) => void;
  lumpSumExact: string;
  onLumpSumExactChange: (value: string) => void;
  sipBand: string;
  onSipBandChange: (id: string) => void;
  sipExact: string;
  onSipExactChange: (value: string) => void;
  sipStepUp: string;
  onSipStepUpChange: (id: string) => void;
  customStepUpPercent: number;
  onCustomStepUpPercentChange: (value: number) => void;
  customStepUpFrequency: string;
  onCustomStepUpFrequencyChange: (id: string) => void;
  sipDebitDay: number;
  onSipDebitDayChange: (day: number) => void;
  showDatePicker: boolean;
  onToggleDatePicker: () => void;
}) {
  const showLumpSum = selectedMethod === "lump-sum-only" || selectedMethod === "both";
  const showSip = selectedMethod === "sip-only" || selectedMethod === "both";
  const tabsEnabled = Boolean(selectedMethod);
  const showBothTabs = selectedMethod === "both";

  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">How do you want to invest?</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Your funding approach helps us size the portfolio and calibrate risk for your goal.
      </p>

      <div className="mt-6 space-y-3" role="radiogroup" aria-label="How do you want to invest?">
        {investmentMethodOptions.map((option) => {
          const isSelected = selectedMethod === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                isSelected
                  ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
              }`}
            >
              <input
                type="radio"
                name="construction-investment-method"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelectMethod(option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="font-semibold text-[#0f172a]">{option.label}</span>
            </label>
          );
        })}
      </div>

      <div
        className={`mt-10 border-t border-[#f1f5f9] pt-8 transition-opacity ${
          tabsEnabled ? "opacity-100" : "pointer-events-none opacity-40"
        }`}
      >
        {!tabsEnabled ? (
          <p className="text-sm text-[#94a3b8]">Select an option above to configure amounts.</p>
        ) : (
          <>
            {showBothTabs ? (
              <div
                className="inline-flex rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1"
                role="tablist"
                aria-label="Investment type"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "lump-sum"}
                  onClick={() => onTabChange("lump-sum")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === "lump-sum"
                      ? "bg-white text-[#2563eb] shadow-sm"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Lump Sum
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "sip"}
                  onClick={() => onTabChange("sip")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === "sip"
                      ? "bg-white text-[#7c3aed] shadow-sm"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Monthly SIP
                </button>
              </div>
            ) : null}

            {showLumpSum && (!showBothTabs || activeTab === "lump-sum") ? (
              <div className="mt-6" role="tabpanel">
                <h3 className="text-base font-bold text-[#0f172a]">Lump sum amount</h3>
                <p className="mt-1 text-sm text-[#64748b]">
                  How much do you plan to invest upfront?
                </p>
                <AmountBandRadioGroup
                  name="construction-lump-sum-band"
                  ariaLabel="Lump sum amount"
                  options={lumpSumBandOptions}
                  selected={lumpSumBand}
                  onSelect={onLumpSumBandChange}
                />
                {lumpSumBand === "exact" ? (
                  <ExactAmountInput
                    id="construction-lump-sum-exact"
                    label="Exact lump sum amount"
                    value={lumpSumExact}
                    onChange={onLumpSumExactChange}
                  />
                ) : null}
              </div>
            ) : null}

            {showSip && (!showBothTabs || activeTab === "sip") ? (
              <div className="mt-6 space-y-8" role="tabpanel">
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">Monthly SIP amount</h3>
                  <p className="mt-1 text-sm text-[#64748b]">
                    How much will you invest each month?
                  </p>
                  <AmountBandRadioGroup
                    name="construction-sip-band"
                    ariaLabel="Monthly SIP amount"
                    options={sipBandOptions}
                    selected={sipBand}
                    onSelect={onSipBandChange}
                  />
                  {sipBand === "exact" ? (
                    <ExactAmountInput
                      id="construction-sip-exact"
                      label="Exact monthly SIP amount"
                      value={sipExact}
                      onChange={onSipExactChange}
                    />
                  ) : null}
                </div>

                <div className="border-t border-[#f1f5f9] pt-6">
                  <h3 className="text-base font-bold text-[#0f172a]">
                    Increase your SIP over time?
                  </h3>
                  <div
                    className="mt-4 space-y-3"
                    role="radiogroup"
                    aria-label="SIP step-up preference"
                  >
                    {sipStepUpOptions.map((option) => {
                      const isSelected = sipStepUp === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                            isSelected
                              ? "border-[#7c3aed] bg-[#f5f3ff] shadow-sm"
                              : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="construction-sip-step-up"
                            value={option.id}
                            checked={isSelected}
                            onChange={() => onSipStepUpChange(option.id)}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              isSelected
                                ? "border-[#7c3aed] bg-[#7c3aed]"
                                : "border-[#cbd5e1] bg-white"
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected ? (
                              <span className="h-2 w-2 rounded-full bg-white" />
                            ) : null}
                          </span>
                          <span className="flex flex-wrap items-center gap-2 font-semibold text-[#0f172a]">
                            {option.label}
                            {option.recommended ? (
                              <span className="rounded-full bg-[#ede9fe] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#7c3aed]">
                                Recommended
                              </span>
                            ) : null}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {sipStepUp === "customize" ? (
                    <div className="mt-5 rounded-xl border border-[#ede9fe] bg-[#faf5ff] p-5">
                      <label
                        htmlFor="step-up-percent"
                        className="text-sm font-semibold text-[#0f172a]"
                      >
                        Step-up percentage: {customStepUpPercent}%
                      </label>
                      <input
                        id="step-up-percent"
                        type="range"
                        min={1}
                        max={100}
                        value={customStepUpPercent}
                        onChange={(event) =>
                          onCustomStepUpPercentChange(Number(event.target.value))
                        }
                        className="mt-3 w-full accent-[#7c3aed]"
                      />
                      <div className="mt-1 flex justify-between text-xs text-[#94a3b8]">
                        <span>1%</span>
                        <span>100%</span>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#0f172a]">Frequency</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {stepUpFrequencyOptions.map((option) => {
                          const isSelected = customStepUpFrequency === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => onCustomStepUpFrequencyChange(option.id)}
                              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                                isSelected
                                  ? "border-[#7c3aed] bg-[#7c3aed] text-white"
                                  : "border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#cbd5e1]"
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-[#f1f5f9] pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-[#475569]">
                      SIP debit date:{" "}
                      <span className="font-semibold text-[#0f172a]">
                        {formatSipDate(sipDebitDay)} of every month
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={onToggleDatePicker}
                      className="text-sm font-semibold text-[#2563eb] hover:underline"
                    >
                      Change date
                    </button>
                  </div>
                  {showDatePicker ? (
                    <SipDatePicker
                      selectedDay={sipDebitDay}
                      onSelectDay={(day) => {
                        onSipDebitDayChange(day);
                        onToggleDatePicker();
                      }}
                      onClose={onToggleDatePicker}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

function AmountBandRadioGroup({
  name,
  ariaLabel,
  options,
  selected,
  onSelect,
}: {
  name: string;
  ariaLabel: string;
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 transition-all ${
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
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
              }`}
              aria-hidden="true"
            >
              {isSelected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
            </span>
            <span className="text-sm font-semibold text-[#0f172a]">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function ExactAmountInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="text-lg font-bold text-[#2563eb]">₹ </span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder="Enter amount"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-[calc(100%-1.5rem)] bg-transparent text-lg font-bold text-[#2563eb] outline-none placeholder:font-normal placeholder:text-[#94a3b8]"
      />
    </div>
  );
}

function SipDatePicker({
  selectedDay,
  onSelectDay,
  onClose,
}: {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onClose: () => void;
}) {
  const days = Array.from({ length: 28 }, (_, index) => index + 1);

  return (
    <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#0f172a]">Choose debit day</p>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-[#64748b] hover:text-[#0f172a]"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const isSelected = day === selectedDay;
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={`flex h-9 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                isSelected
                  ? "bg-[#2563eb] text-white shadow-sm"
                  : "text-[#475569] hover:bg-[#f1f5f9]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-[#94a3b8]">
        Days 1–28 shown to avoid month-end conflicts.
      </p>
    </div>
  );
}

function StepFourDrawdownContent({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">
        If your portfolio fell 20% in a bad month, what would you do?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Your honest reaction helps us calibrate risk so the portfolio matches your comfort level
        when markets get rough.
      </p>

      <div
        className="mt-6 space-y-3"
        role="radiogroup"
        aria-label="If your portfolio fell 20% in a bad month, what would you do?"
      >
        {drawdownReactionOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                isSelected
                  ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
              }`}
            >
              <input
                type="radio"
                name="construction-drawdown-reaction"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="font-semibold text-[#0f172a]">{option.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

function StepFiveFinancialCushionContent({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">
        Which best describes your financial cushion for this investment?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        How this money fits alongside your savings and emergency fund helps us set a risk level
        you can stick with.
      </p>

      <div
        className="mt-6 space-y-3"
        role="radiogroup"
        aria-label="Which best describes your financial cushion for this investment?"
      >
        {financialCushionOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                isSelected
                  ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
              }`}
            >
              <input
                type="radio"
                name="construction-financial-cushion"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="font-semibold text-[#0f172a]">{option.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

function StepSixExpectedReturnContent({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">
        What annual return do you expect from this portfolio?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Your target return shapes the asset mix we recommend — be as realistic as you can.
      </p>

      <div
        className="mt-6 space-y-3"
        role="radiogroup"
        aria-label="What annual return do you expect from this portfolio?"
      >
        {expectedReturnOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                isSelected
                  ? "border-[#2563eb] bg-[#f8faff] shadow-sm"
                  : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
              }`}
            >
              <input
                type="radio"
                name="construction-expected-return"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-[#2563eb] bg-[#2563eb]" : "border-[#cbd5e1] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="font-semibold text-[#0f172a]">{option.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

function StepSevenCorpusEstimateContent({
  horizonYears,
  corpusLow,
  corpusHigh,
}: {
  horizonYears: string;
  corpusLow: number;
  corpusHigh: number;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dbeafe] text-[#2563eb]">
        <ChartIcon />
      </div>
      <h2 className="mt-5 text-lg font-bold text-[#0f172a] sm:text-xl">Your projected outcome</h2>
      <p className="mt-4 text-sm leading-relaxed text-[#475569] sm:text-base">
        Based on your inputs, your estimated corpus in{" "}
        <span className="font-semibold text-[#0f172a]">{horizonYears} years</span> is{" "}
        <span className="font-bold text-[#2563eb]">{formatIndianCurrency(corpusLow)}</span>
        {" – "}
        <span className="font-bold text-[#7c3aed]">{formatIndianCurrency(corpusHigh)}</span>.
      </p>
      <p className="mt-4 text-xs text-[#94a3b8]">
        Estimate uses your investment amounts, horizon, and selected return range. Actual results
        may vary.
      </p>
    </div>
  );
}

function StepEightExclusionsTiltsContent({
  selectedExclusions,
  selectedTilts,
  onToggleExclusion,
  onToggleTilt,
}: {
  selectedExclusions: string[];
  selectedTilts: string[];
  onToggleExclusion: (id: string) => void;
  onToggleTilt: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">Exclusions &amp; Tilts</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Tell us what to avoid and where you&apos;d like extra exposure. Pick at least one option in
        each group — use <span className="font-medium text-[#0f172a]">None</span> or{" "}
        <span className="font-medium text-[#0f172a]">No preference</span> if nothing applies.
      </p>

      <div className="mt-8">
        <p className="text-sm font-semibold text-[#475569]">Exclude</p>
        <p className="mt-1 text-xs text-[#94a3b8]">
          Hard constraints — we won&apos;t include these in your portfolio.
        </p>
        <MultiSelectChipGroup
          options={exclusionOptions}
          selected={selectedExclusions}
          onToggle={onToggleExclusion}
          variant="exclude"
          ariaLabel="Exclusion preferences"
        />
      </div>

      <div className="mt-8 border-t border-[#f1f5f9] pt-8">
        <p className="text-sm font-semibold text-[#475569]">Tilt toward</p>
        <p className="mt-1 text-xs text-[#94a3b8]">
          Soft preferences — we&apos;ll overweight these themes where possible.
        </p>
        <MultiSelectChipGroup
          options={tiltOptions}
          selected={selectedTilts}
          onToggle={onToggleTilt}
          variant="tilt"
          ariaLabel="Tilt preferences"
        />
      </div>
    </>
  );
}

function MultiSelectChipGroup({
  options,
  selected,
  onToggle,
  variant,
  ariaLabel,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  variant: "exclude" | "tilt";
  ariaLabel: string;
}) {
  const selectedStyles =
    variant === "exclude"
      ? "border-[#fecaca] bg-[#fef2f2] text-[#dc2626] ring-2 ring-[#fecaca]"
      : "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb] ring-2 ring-[#bfdbfe]";
  const defaultStyles =
    variant === "exclude"
      ? "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#fecaca] hover:bg-[#fef2f2]"
      : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#bfdbfe] hover:bg-[#eff6ff]";

  return (
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(option.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              isSelected ? selectedStyles : defaultStyles
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function StepNineAssetClassesContent({
  selected,
  interestSignals,
  onToggleSelect,
  onToggleInterest,
  hasExistingInvestments,
  onExistingInvestmentsChange,
}: {
  selected: string[];
  interestSignals: string[];
  onToggleSelect: (id: string) => void;
  onToggleInterest: (id: string) => void;
  hasExistingInvestments: string;
  onExistingInvestmentsChange: (value: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">
        <span className="mr-2 inline-flex rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[#2563eb]">
          Q8
        </span>
        Asset classes
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        Choose which asset classes to include in your portfolio. Live classes are pre-selected —
        uncheck any you don&apos;t want. Answer the existing-investments question at the bottom to
        continue.
      </p>
      <div className="mt-8">
        <ConstructionAssetClassSelect
          selected={selected}
          interestSignals={interestSignals}
          onToggleSelect={onToggleSelect}
          onToggleInterest={onToggleInterest}
          hasExistingInvestments={hasExistingInvestments}
          onExistingInvestmentsChange={onExistingInvestmentsChange}
        />
      </div>
    </>
  );
}

function StepTenAboutYouContent({
  selectedExperience,
  onExperienceChange,
  selectedInvolvement,
  onInvolvementChange,
  selectedTaxPreference,
  onTaxPreferenceChange,
}: {
  selectedExperience: string;
  onExperienceChange: (id: string) => void;
  selectedInvolvement: string;
  onInvolvementChange: (id: string) => void;
  selectedTaxPreference: string;
  onTaxPreferenceChange: (id: string) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#0f172a] sm:text-xl">
        <span className="mr-2 inline-flex rounded-full bg-[#dbeafe] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[#2563eb]">
          Q9
        </span>
        A few quick things about you
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
        These help us tailor how we build and manage your portfolio.
      </p>

      <div className="mt-8 space-y-8">
        <CompactSingleSelectGroup
          label="Experience"
          name="construction-experience"
          options={experienceOptions}
          selected={selectedExperience}
          onSelect={onExperienceChange}
        />
        <CompactSingleSelectGroup
          label="Involvement"
          name="construction-involvement"
          options={involvementOptions}
          selected={selectedInvolvement}
          onSelect={onInvolvementChange}
        />
        <CompactSingleSelectGroup
          label="Taxes"
          name="construction-taxes"
          options={taxPreferenceOptions}
          selected={selectedTaxPreference}
          onSelect={onTaxPreferenceChange}
        />
      </div>
    </>
  );
}

function CompactSingleSelectGroup({
  label,
  name,
  options,
  selected,
  onSelect,
}: {
  label: string;
  name: string;
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#475569]">{label}</p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <label key={option.id} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[#2563eb] bg-[#2563eb] text-white shadow-sm"
                    : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#cbd5e1]"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path
        d="M4 19V5M4 19h16M8 16V11M12 16V8M16 16v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
