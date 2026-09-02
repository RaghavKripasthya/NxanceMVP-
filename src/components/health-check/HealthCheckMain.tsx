import Link from "next/link";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import HealthCheckFooter from "@/components/health-check/HealthCheckFooter";

const steps = [
  { num: 1, label: "Upload", active: true },
  { num: 2, label: "AI Analysis", active: false },
  { num: 3, label: "Diagnosis", active: false },
] as const;

const tips = [
  "Ensure your PDF is not password protected before uploading.",
  "Consolidated Account Statements (CAS) provide the highest accuracy.",
  "Multiple files? You can select all of them together.",
] as const;

const recentUploads = [
  { name: "statement_jan..", time: "2 days ago" },
  { name: "stocks_export..", time: "1 week ago" },
] as const;

const faqItems = [
  {
    question: "What files do you support?",
    answer:
      "We support official bank statements (PDF), NSDL/CDSL CAS, and custom Excel templates from major brokerages.",
  },
  {
    question: "Is my data shared with advisors?",
    answer:
      "No. The analysis is done purely by our AI models. An advisor only sees your data if you explicitly choose to share it later.",
  },
] as const;

export default function HealthCheckMain() {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <ScrollReveal>
        <Stepper steps={steps} />
      </ScrollReveal>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <ScrollReveal delay={80}>
          <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cbd5e1] bg-[#fafbfd] px-6 py-10 text-center sm:min-h-[380px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dbeafe]">
                <CloudUploadIcon />
              </div>
              <h1 className="mt-6 text-xl font-bold text-[#0f172a] sm:text-2xl">
                Upload your portfolio
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#64748b] sm:text-base">
                Drag and drop your investment statements or click to browse files from
                your computer.
              </p>
              <Link
                href="/dashboard/health-check/analysis"
                className="mt-8 inline-flex rounded-full bg-[#2563eb] px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Upload PDF, CAS, or Excel
              </Link>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <FormatBadge label="PDF" color="text-[#ef4444]" icon={<PdfIcon />} />
                <FormatBadge label="EXCEL" color="text-[#16a34a]" icon={<ExcelIcon />} />
                <FormatBadge label="CAS" color="text-[#7c3aed]" icon={<CasIcon />} />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-5">
          <ScrollReveal delay={120}>
            <div className="rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] p-5 text-white shadow-md sm:p-6">
              <div className="flex items-center gap-2">
                <ShieldIcon />
                <h2 className="font-bold">Enterprise Privacy</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Your financial data is encrypted with AES-256 standards. Nxance AI reads
                and anonymizes your data instantly—never sharing it with third parties.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                <LockIcon />
                SOC-2 Type II Certified
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <LightbulbIcon />
                <h2 className="font-bold text-[#0f172a]">Tips for a faster check</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm leading-relaxed text-[#64748b]">
                    <CheckIcon />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="rounded-2xl border border-[#e2e8f0]/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-[#0f172a]">Recent Uploads</h2>
                <a href="#" className="text-sm font-semibold text-[#2563eb] hover:underline">
                  View All
                </a>
              </div>
              <div className="space-y-3">
                {recentUploads.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileIcon />
                      <span className="text-sm font-medium text-[#0f172a]">{file.name}</span>
                    </div>
                    <span className="text-xs text-[#94a3b8]">{file.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={100}>
        <section className="pt-2">
          <h2 className="text-xl font-bold text-[#0f172a] sm:text-2xl">Common Questions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {faqItems.map((item, i) => (
              <ScrollReveal key={item.question} delay={140 + i * 80}>
                <div className="h-full rounded-xl border border-[#e2e8f0]/80 bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-[#0f172a]">{item.question}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#64748b]">
                    {item.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <HealthCheckFooter />
    </div>
  );
}

function Stepper({
  steps,
}: {
  steps: readonly { num: number; label: string; active: boolean }[];
}) {
  return (
    <div className="flex items-center justify-center gap-0 sm:gap-2">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                step.active
                  ? "bg-[#2563eb] text-white shadow-sm"
                  : "bg-[#e2e8f0] text-[#94a3b8]"
              }`}
            >
              {step.num}
            </span>
            <span
              className={`text-xs font-semibold sm:text-sm ${
                step.active ? "text-[#2563eb]" : "text-[#94a3b8]"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <div className="mx-3 hidden h-px w-12 bg-[#e2e8f0] sm:mx-6 sm:block md:w-20 lg:w-28" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function FormatBadge({
  label,
  color,
  icon,
}: {
  label: string;
  color: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className={color}>{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
        {label}
      </span>
    </div>
  );
}

function CloudUploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-[#2563eb]" aria-hidden="true">
      <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6-1.5A4 4 0 0119 14H7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 12v6M9 15l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ExcelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CasIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#f59e0b]" aria-hidden="true">
      <path d="M9 18h6M10 22h4M12 2a6 6 0 016 6c0 2.2-1.2 4.1-3 5.2V16H9v-2.8C7.2 12.1 6 10.2 6 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-[#7c3aed]" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#94a3b8]" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
