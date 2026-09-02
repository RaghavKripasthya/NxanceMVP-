"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import HealthCheckFlowFooter from "@/components/health-check/HealthCheckFlowFooter";

type HoldingRow = {
  name: string;
  type: string;
  typeStyle: "mf" | "stock" | "fd";
  qty: string;
  buyPrice: string;
  buyDate: string;
  buyDateMissing?: boolean;
  currentValue: string;
  warning?: string;
  highlight?: boolean;
  action: "edit" | "warning" | "upload";
};

const holdings: HoldingRow[] = [
  {
    name: "HDFC Top 100 Fund - Growth",
    type: "MF",
    typeStyle: "mf",
    qty: "1,240.50",
    buyPrice: "₹412.00",
    buyDate: "12 Jan 2022",
    currentValue: "₹5,11,086",
    action: "edit",
  },
  {
    name: "Reliance Industries Ltd.",
    type: "STOCK",
    typeStyle: "stock",
    qty: "150.00",
    buyPrice: "₹2,450.00",
    buyDate: "05 Mar 2023",
    currentValue: "₹3,67,500",
    warning: "qty × price ≠ stated value — please fix or confirm.",
    highlight: true,
    action: "warning",
  },
  {
    name: "Axis Bluechip Fund - Direct",
    type: "MF",
    typeStyle: "mf",
    qty: "850.25",
    buyPrice: "₹48.00",
    buyDate: "Missing",
    buyDateMissing: true,
    currentValue: "₹40,812",
    action: "upload",
  },
  {
    name: "SBI Fixed Deposit (FD_9921)",
    type: "FD",
    typeStyle: "fd",
    qty: "1",
    buyPrice: "₹2,00,000.00",
    buyDate: "10 Oct 2021",
    currentValue: "₹2,34,500",
    action: "edit",
  },
];

export default function ConfirmHoldingsMain() {
  return (
    <div className="flex flex-1 flex-col px-4 pb-8 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto w-full max-w-5xl pt-6 sm:pt-8">
          <nav aria-label="Breadcrumb" className="text-sm text-[#64748b]">
            <Link href="/dashboard/health-check" className="hover:text-[#2563eb]">
              Health Check
            </Link>
            <span className="mx-2 text-[#cbd5e1]">/</span>
            <span className="font-semibold text-[#0f172a]">Confirm Holdings</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold text-[#0f172a] sm:text-3xl">
            Confirm Your Holdings
          </h1>
          <p className="mt-2 text-sm text-[#64748b] sm:text-base">
            We&apos;ve parsed your portfolio. Please verify the details below to ensure
            the most accurate analysis.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="mx-auto mt-6 w-full max-w-5xl">
          <div className="flex flex-col gap-4 rounded-xl border border-[#2563eb]/30 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2563eb]">
                <DocChartIcon />
              </div>
              <div>
                <p className="text-lg font-bold text-[#0f172a] sm:text-xl">
                  Total invested: ₹12,45,000
                </p>
                <p className="mt-0.5 text-sm text-[#64748b]">
                  Values successfully read from your uploaded Statement_May24.pdf
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-bold text-white shadow-sm"
              >
                <CheckIcon />
                Confirm All
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748b] hover:border-[#cbd5e1]"
              >
                Edit Summary
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div className="mx-auto mt-4 w-full max-w-5xl">
          <div className="flex flex-col gap-3 rounded-lg bg-[#f3e8ff]/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-[#475569]">
              <span className="mr-1.5 inline-flex align-middle text-[#f59e0b]">
                <InfoIcon />
              </span>
              No buy date found for some assets → XIRR can&apos;t be calculated, only
              current-state analysis.{" "}
              <a href="#" className="font-semibold text-[#2563eb] hover:underline">
                Add this column
              </a>{" "}
              for full insights.
            </p>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-medium text-[#64748b] hover:border-[#cbd5e1]"
            >
              Fix Column Mapping
            </button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div className="mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-xl border border-[#e2e8f0]/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#f1f5f9] bg-[#fafbfd]">
                  {["Name", "Type", "Qty", "Buy Price", "Buy Date", "Current Value", "Actions"].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {holdings.map((row) => (
                  <tr
                    key={row.name}
                    className={`border-b border-[#f1f5f9] last:border-0 ${
                      row.highlight ? "bg-[#fff7ed]" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#0f172a]">{row.name}</p>
                      {row.warning ? (
                        <p className="mt-1 text-xs text-[#ea580c]">{row.warning}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4">
                      <TypeBadge style={row.typeStyle} label={row.type} />
                    </td>
                    <td className="px-4 py-4 text-[#64748b]">{row.qty}</td>
                    <td className="px-4 py-4 text-[#64748b]">{row.buyPrice}</td>
                    <td className="px-4 py-4">
                      <span
                        className={
                          row.buyDateMissing
                            ? "italic text-[#94a3b8]"
                            : "text-[#64748b]"
                        }
                      >
                        {row.buyDate}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-[#0f172a]">
                      {row.currentValue}
                    </td>
                    <td className="px-4 py-4">
                      <RowAction action={row.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 border-t border-[#f1f5f9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="text-sm font-semibold text-[#2563eb] hover:underline">
              + Add a new row manually
            </button>
            <p className="text-xs text-[#94a3b8]">Showing 4 of 4 assets detected.</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard/health-check"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#ef4444] hover:underline"
          >
            <TrashIcon />
            Upload a different file
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-semibold text-[#64748b] hover:border-[#cbd5e1]"
            >
              Save Draft
            </button>
            <Link
              href="/dashboard/health-check/results"
              className="rounded-lg bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-2.5 text-sm font-bold text-white shadow-sm"
            >
              Looks right — analyse →
            </Link>
          </div>
        </div>
      </ScrollReveal>

      <HealthCheckFlowFooter />
    </div>
  );
}

function TypeBadge({ style, label }: { style: "mf" | "stock" | "fd"; label: string }) {
  const styles = {
    mf: "bg-[#ede9fe] text-[#7c3aed]",
    stock: "bg-[#f1f5f9] text-[#64748b]",
    fd: "bg-[#dbeafe] text-[#2563eb]",
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${styles[style]}`}>
      {label}
    </span>
  );
}

function RowAction({ action }: { action: HoldingRow["action"] }) {
  if (action === "warning") {
    return (
      <span className="inline-flex text-[#ea580c]">
        <WarningIcon />
      </span>
    );
  }
  if (action === "upload") {
    return (
      <button type="button" aria-label="Upload buy date" className="text-[#94a3b8] hover:text-[#2563eb]">
        <UploadIcon />
      </button>
    );
  }
  return (
    <button type="button" aria-label="Edit row" className="text-[#94a3b8] hover:text-[#2563eb]">
      <PencilIcon />
    </button>
  );
}

function DocChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6M8 13v5M12 11v7M16 15v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="inline h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10v5M12 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 16V8M9 11l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
