const trustItems = [
  {
    label: "SEBI COMPLIANT",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "BANK-GRADE SECURITY",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "AES-256 PROTOCOL",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 11h8M8 14h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "ISO 27001 CERTIFIED",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 2l8 4.5v5c0 5.25-3.5 10.1-8 11.5C7.5 21.6 4 16.75 4 11.5v-5L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
] as const;

export default function TrustBar() {
  return (
    <section
      className="border-y border-[#e2e8f0]/80 bg-[#f8f9fc] px-4 py-8 sm:px-6 sm:py-10"
      aria-label="Trust and compliance"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
        {trustItems.map(({ label, icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2.5 text-center sm:gap-3"
          >
            <span className="text-[#94a3b8]">{icon}</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8] sm:text-[10px] md:text-[11px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
