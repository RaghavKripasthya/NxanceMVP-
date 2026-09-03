import Link from "next/link";
import Logo from "./Logo";
import ScrollReveal from "./ScrollReveal";

const platformLinks = [
  "Portfolio Builder",
  "Health Check",
  "Reports",
  "Compliance",
] as const;

const legalLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Conflict Policy",
  "Disclosures",
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fc] px-5 pb-8 pt-4 sm:px-8 sm:pb-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            {/* Left — logo placeholder + tagline + social */}
            <div className="max-w-sm">
              <Link href="/" className="inline-flex">
                <Logo variant="footer" />
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-[#64748b] sm:text-base">
                Empowering the next generation of investors with
                institution-grade artificial intelligence.
              </p>
              <div className="mt-5 flex items-center gap-4 text-[#64748b]">
                <a
                  href="#"
                  aria-label="Website"
                  className="transition-opacity hover:opacity-70"
                >
                  <GlobeIcon />
                </a>
                <a
                  href="#"
                  aria-label="Email"
                  className="transition-opacity hover:opacity-70"
                >
                  <EnvelopeIcon />
                </a>
                <a
                  href="#"
                  aria-label="Contact"
                  className="transition-opacity hover:opacity-70"
                >
                  <MessageIcon />
                </a>
              </div>
            </div>

            {/* Right — link columns */}
            <div className="flex gap-12 sm:gap-16 md:gap-20 lg:gap-24">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#334155] sm:text-[13px]">
                  Platform
                </h3>
                <ul className="mt-4 space-y-3">
                  {platformLinks.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#64748b] transition-colors hover:text-[#0f172a] sm:text-base"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#334155] sm:text-[13px]">
                  Legal
                </h3>
                <ul className="mt-4 space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#64748b] transition-colors hover:text-[#0f172a] sm:text-base"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-10 flex flex-col gap-4 border-t border-[#e2e8f0] pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#94a3b8] sm:text-sm">
              © 2026 Nxance, SEBI compliant.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]"
                aria-hidden="true"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8] sm:text-[11px]">
                Systems Operational
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 7l9 6 9-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
