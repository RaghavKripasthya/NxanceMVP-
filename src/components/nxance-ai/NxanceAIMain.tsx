"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";

const sectorTags = [
  "MARKET",
  "NEWS",
  "CURRENCY",
  "COMMODITIES",
  "EQUITIES",
  "MACRO",
  "TECHNOLOGY",
  "STARTUPS",
  "TRADE",
  "RESEARCH",
  "ANALYSIS",
];

const suggestedQueries = [
  "How current scenario affects my strategy?",
  "Make report card of my portfolio?",
  "Build strategy for me?",
  "What's going on in the market today?",
  "How can I improve my portfolio?",
];

const verificationLines = [
  "Verified Data: Pulled from internal ledger.",
  "Validated Inputs: Current market prices confirmed.",
  "Checked Calculations: Structural math passed.",
  "Audit Ready: Record ID #NX-8832-A.",
];

const randomAnalysisResponses = [
  "Your portfolio Sharpe Ratio is 1.42. You have a 6% overallocation in US Equities compared to your stated 'Aggressive Growth' baseline. Rebalancing could improve risk-adjusted returns by ~0.8%.",
  "Current macro signals suggest tightening liquidity. Your SIP-heavy allocation is well-positioned, but increasing gold exposure by 3–5% could reduce drawdown risk in the next 12 months.",
  "Sector rotation favors financials and industrials this quarter. Your portfolio is underweight both — a tactical tilt of ₹12,000/month could capture the momentum without breaching your risk cap.",
  "Debt allocation sits at 22% vs your 25% target. Redirecting ₹8,000/month from equity SIP into short-duration funds would restore balance within two quarters.",
  "Based on your conservative-moderate profile, your current beta of 0.82 is optimal. No structural changes needed — focus on tax-loss harvesting in underperforming mid-cap holdings.",
  "Market volatility is elevated. Your emergency cash buffer covers 4.2 months of expenses. Consider topping up liquid funds by ₹50,000 before increasing equity exposure.",
  "Your mutual fund overlap score is 0.14 — excellent diversification. The top opportunity is consolidating two large-cap funds to reduce expense ratio drag by ~0.35% annually.",
];

type ChatExchange = {
  id: string;
  userText: string;
  assistantText?: string;
  isThinking?: boolean;
};

function pickRandomResponse() {
  return randomAnalysisResponses[Math.floor(Math.random() * randomAnalysisResponses.length)];
}

export default function NxanceAIMain() {
  const [inputValue, setInputValue] = useState("");
  const [exchanges, setExchanges] = useState<ChatExchange[]>([
    {
      id: "initial",
      userText: "Analyze my overall portfolio health.",
      assistantText: randomAnalysisResponses[0],
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [exchanges]);

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    };
  }, []);

  const handleSend = (query?: string) => {
    const trimmed = (query ?? inputValue).trim();
    if (!trimmed) return;

    const exchangeId = `exchange-${Date.now()}`;
    const newExchange: ChatExchange = {
      id: exchangeId,
      userText: trimmed,
      isThinking: true,
    };

    setExchanges((prev) => [...prev, newExchange]);
    setInputValue("");

    if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    thinkingTimerRef.current = setTimeout(() => {
      setExchanges((prev) =>
        prev.map((exchange) =>
          exchange.id === exchangeId
            ? { ...exchange, isThinking: false, assistantText: pickRandomResponse() }
            : exchange,
        ),
      );
    }, 900);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSend();
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
  };

  const latestExchangeId = exchanges[exchanges.length - 1]?.id;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white font-mono">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white px-4 py-3 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f172a] sm:text-xs">
          Nxance LM | Financial Intelligence Terminal
        </p>
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb] sm:text-[11px]">
          <span className="live-pulse h-2 w-2 rounded-full bg-[#2563eb]" />
          Number Guard Active | Verified Data Environment
        </p>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden lg:flex-row">
        <aside className="w-full shrink-0 border-b border-[#e2e8f0] bg-white p-4 sm:p-5 lg:w-[300px] lg:overflow-y-auto lg:border-b-0 lg:border-r xl:w-[320px]">
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
              Sectors &amp; Data Streams
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {sectorTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="rounded border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-[#475569] transition-colors hover:border-[#cbd5e1] hover:bg-white hover:text-[#0f172a]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 lg:mt-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
              Suggested Query Vectors
            </h2>
            <div className="mt-3 space-y-2">
              {suggestedQueries.map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => handleSuggestedQuery(query)}
                  className={`w-full rounded-lg border px-3 py-3 text-left text-xs leading-relaxed transition-colors sm:text-[13px] ${
                    inputValue === query
                      ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]"
                      : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#bfdbfe] hover:bg-[#f8faff] hover:text-[#2563eb]"
                  }`}
                >
                  <span className="font-bold text-[#2563eb]">&gt;</span> {query}
                </button>
              ))}
            </div>
          </section>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex min-h-full flex-col justify-end gap-8">
              {exchanges.map((exchange) => (
                <div key={exchange.id} className="space-y-5">
                  <p
                    className={`text-sm font-semibold text-[#0f172a] sm:text-[15px] ${
                      exchange.id !== "initial" ? "nxance-chat-user-enter" : ""
                    }`}
                  >
                    <span className="text-[#2563eb]">&gt;</span> {exchange.userText}
                  </p>

                  {exchange.isThinking ? (
                    <div className="nxance-chat-answer-enter flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                        Nxance LM is analyzing
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="nxance-thinking-dot h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                        <span className="nxance-thinking-dot h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                        <span className="nxance-thinking-dot h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                      </span>
                    </div>
                  ) : exchange.assistantText ? (
                    <div
                      className={`space-y-6 ${
                        exchange.id !== "initial" ? "nxance-chat-answer-enter" : ""
                      }`}
                    >
                      <div className="nxance-chat-block-enter rounded-lg border border-[#2563eb]/40 bg-[#f8faff] p-4 sm:p-5">
                        <div className="flex items-center gap-2">
                          <ShieldIcon />
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
                            Number Guard Verification
                          </p>
                        </div>
                        <ul className="mt-4 space-y-2">
                          {verificationLines.map((line) => (
                            <li
                              key={`${exchange.id}-${line}`}
                              className="text-xs leading-relaxed text-[#2563eb] sm:text-[13px]"
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="nxance-chat-block-enter">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                          Portfolio Analysis Result
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-[15px]">
                          {exchange.assistantText}
                        </p>
                      </div>

                      {exchange.id === latestExchangeId ? (
                        <div className="nxance-chat-block-enter rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 sm:p-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                            Attached Document
                          </p>
                          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm font-bold uppercase tracking-wide text-[#0f172a]">
                              Nxance Financial Research Report
                            </p>
                            <button
                              type="button"
                              className="shrink-0 rounded bg-[#2563eb] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1d4ed8]"
                            >
                              Generate Report
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
              <div ref={chatEndRef} aria-hidden="true" className="h-px shrink-0" />
            </div>
          </div>

          <div className="shrink-0 border-t border-[#e2e8f0] bg-white px-4 py-4 sm:px-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
              Ask Nxance
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 shadow-sm"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Enter your query..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#64748b] transition-colors hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#2563eb]" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12l14-7-7 14-2-5-5-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
