"use client";

import { useEffect, useRef, useState } from "react";

function useChartVisible(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      setVisible(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
    });

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function PortfolioChartAnimated() {
  const { ref, visible } = useChartVisible();

  return (
    <div ref={ref} className={`h-full w-full ${visible ? "charts-visible" : ""}`}>
      <svg viewBox="0 0 600 200" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="dashboardChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M0 160 L100 145 L200 130 L300 110 L400 85 L500 60 L600 40 L600 200 L0 200 Z"
          fill="url(#dashboardChartFill)"
          className="portfolio-chart-area"
        />
        <path
          d="M0 160 L100 145 L200 130 L300 110 L400 85 L500 60 L600 40"
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="portfolio-chart-line"
        />
      </svg>
    </div>
  );
}

export function DonutChartAnimated() {
  const { ref, visible } = useChartVisible();

  return (
    <div ref={ref} className={`relative mx-auto h-36 w-36 ${visible ? "charts-visible" : ""}`}>
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="donut-segment donut-segment-1"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="donut-segment donut-segment-2"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#b45309"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="donut-segment donut-segment-3"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-medium text-[#64748b]">Diversified</span>
        <span className={`text-lg font-bold text-[#0f172a] ${visible ? "donut-center-pop" : "opacity-0"}`}>
          68%
        </span>
      </div>
    </div>
  );
}

export function MarketWatchAnimated() {
  const { ref, visible } = useChartVisible(0.15);

  const markets = [
    { icon: "S", label: "S&P 500", price: "5,137.08", change: "+0.82%", positive: true },
    { icon: "N", label: "NASDAQ 100", price: "18,302.91", change: "+1.14%", positive: true },
    { icon: "B", label: "Bitcoin", price: "67,294.28", change: "-0.45%", positive: false },
  ] as const;

  return (
    <div ref={ref} className={visible ? "charts-visible" : ""}>
      <div className="space-y-3">
        {markets.map((item) => (
          <div
            key={item.label}
            className="market-row-enter flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#64748b] shadow-sm">
                {item.icon}
              </span>
              <span className="font-semibold text-[#0f172a]">{item.label}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#0f172a]">{item.price}</p>
              <p
                className={`text-sm font-semibold ${
                  item.positive ? "text-[#16a34a]" : "text-[#ef4444]"
                }`}
              >
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SentimentProgress({ score }: { score: number }) {
  const { ref, visible } = useChartVisible(0.15);

  return (
    <div ref={ref} className="mt-4">
      <div className="h-2 overflow-hidden rounded-full bg-white/25">
        <div
          className={`h-full rounded-full bg-white ${visible ? "sentiment-progress-fill" : "w-0"}`}
          style={{ ["--sentiment-progress" as string]: `${score}%` }}
        />
      </div>
    </div>
  );
}
