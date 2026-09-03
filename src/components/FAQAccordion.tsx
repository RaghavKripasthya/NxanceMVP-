"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "Is my data safe with Nxance?",
    answer:
      "Absolutely. We use bank-grade AES-256 encryption. We utilize read-only API access via regulated account aggregators, meaning we can never move or access your actual capital.",
  },
  {
    question: "How does the AI provide recommendations?",
    answer:
      "Nxance AI synthesizes 140+ global market indicators with your personal risk profile and portfolio holdings to surface actionable, execution-ready insights tailored to your goals.",
  },
  {
    question: "Is this a SEBI registered platform?",
    answer:
      "Not yet, we are currently building techstack while we complete our SEBI registration, expected once funding closes - and we hold ourselves to SEBI's compliance standards regardless.",
  },
] as const;

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-[#e2e8f0]/60 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
              aria-expanded={isOpen}
            >
              <span className="text-base font-bold text-[#0f172a] sm:text-lg">
                {item.question}
              </span>
              <ChevronIcon open={isOpen} />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#64748b] sm:px-6 sm:pb-6 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-5 w-5 shrink-0 text-[#64748b] transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
