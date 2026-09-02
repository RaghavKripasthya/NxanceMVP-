"use client";

import {
  constructionAssetClassUniverse,
  type AssetClassItem,
} from "@/data/assetClassUniverse";

type ConstructionAssetClassSelectProps = {
  selected: string[];
  interestSignals: string[];
  onToggleSelect: (id: string) => void;
  onToggleInterest: (id: string) => void;
  hasExistingInvestments: string;
  onExistingInvestmentsChange: (value: string) => void;
};

const categoryColors: Record<string, string> = {
  Equity: "bg-[#dbeafe] text-[#2563eb]",
  "Fixed Income": "bg-[#dcfce7] text-[#16a34a]",
  Commodities: "bg-[#fef3c7] text-[#d97706]",
  "Real Assets": "bg-[#fce7f3] text-[#db2777]",
  Alternatives: "bg-[#ede9fe] text-[#7c3aed]",
};

export default function ConstructionAssetClassSelect({
  selected,
  interestSignals,
  onToggleSelect,
  onToggleInterest,
  hasExistingInvestments,
  onExistingInvestmentsChange,
}: ConstructionAssetClassSelectProps) {
  const liveAssets = constructionAssetClassUniverse.filter((item) => item.status === "live");
  const comingSoonAssets = constructionAssetClassUniverse.filter(
    (item) => item.status === "coming-soon",
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#0f172a]">Available asset classes</p>
        <p className="mt-1 text-sm text-[#64748b]">
          All live classes are included by default — uncheck any you don&apos;t want in your
          portfolio.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e8f0]">
          <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-[#64748b] sm:grid">
            <span>Asset class</span>
            <span>Category</span>
            <span className="text-right">Include</span>
          </div>
          <ul className="divide-y divide-[#e2e8f0]">
            {liveAssets.map((item) => (
              <LiveAssetRow
                key={item.id}
                item={item}
                checked={selected.includes(item.id)}
                onToggle={() => onToggleSelect(item.id)}
              />
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#0f172a]">Coming soon</p>
        <p className="mt-1 text-sm text-[#64748b]">
          Tap to register interest — we&apos;ll notify you when these become available.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e8f0]">
          <ul className="divide-y divide-[#e2e8f0]">
            {comingSoonAssets.map((item) => (
              <ComingSoonAssetRow
                key={item.id}
                item={item}
                interested={interestSignals.includes(item.id)}
                onToggle={() => onToggleInterest(item.id)}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#f1f5f9] pt-6">
        <p className="text-sm font-semibold text-[#0f172a]">
          Do you have existing investments we should account for?
        </p>
        <div className="mt-4 inline-flex rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1">
          {[
            { id: "yes", label: "Yes" },
            { id: "no", label: "No" },
          ].map((option) => {
            const isSelected = hasExistingInvestments === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onExistingInvestmentsChange(option.id)}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-white text-[#2563eb] shadow-sm"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LiveAssetRow({
  item,
  checked,
  onToggle,
}: {
  item: AssetClassItem;
  checked: boolean;
  onToggle: () => void;
}) {
  const categoryClass = categoryColors[item.category] ?? "bg-[#f1f5f9] text-[#64748b]";

  return (
    <li>
      <label className="flex cursor-pointer items-start gap-4 px-4 py-4 transition-colors hover:bg-[#f8faff] sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-[#0f172a]">{item.name}</p>
            {checked ? (
              <span className="rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#059669]">
                Included
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-[#64748b]">{item.description}</p>
          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:hidden ${categoryClass}`}
          >
            {item.category}
          </span>
        </div>
        <span
          className={`hidden rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:inline-flex ${categoryClass}`}
        >
          {item.category}
        </span>
        <div className="flex shrink-0 items-center justify-end sm:justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="h-5 w-5 rounded border-[#cbd5e1] text-[#2563eb] focus:ring-[#2563eb]"
            aria-label={`Include ${item.name}`}
          />
        </div>
      </label>
    </li>
  );
}

function ComingSoonAssetRow({
  item,
  interested,
  onToggle,
}: {
  item: AssetClassItem;
  interested: boolean;
  onToggle: () => void;
}) {
  const categoryClass = categoryColors[item.category] ?? "bg-[#f1f5f9] text-[#64748b]";

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-start gap-4 px-4 py-4 text-left transition-all sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center ${
          interested ? "bg-[#f5f3ff] hover:bg-[#ede9fe]" : "bg-[#fafafa] hover:bg-[#f8fafc]"
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-[#0f172a]">{item.name}</p>
            <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#64748b]">
              Coming soon
            </span>
            {interested ? (
              <span className="rounded-full bg-[#ede9fe] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#7c3aed]">
                Interested
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-[#64748b]">{item.description}</p>
          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:hidden ${categoryClass}`}
          >
            {item.category}
          </span>
        </div>
        <span
          className={`hidden rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:inline-flex ${categoryClass}`}
        >
          {item.category}
        </span>
        <div className="flex shrink-0 items-center justify-end sm:justify-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              interested
                ? "bg-[#7c3aed] text-white"
                : "border border-[#e2e8f0] bg-white text-[#64748b]"
            }`}
          >
            {interested ? "Notified" : "Notify me"}
          </span>
        </div>
      </button>
    </li>
  );
}
